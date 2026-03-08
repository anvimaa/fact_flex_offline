import { d as db } from './db-BUWqG89e.js';
import crypto__default__default from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
class DocumentoFiscalService {
  /**
   * Gera próximo número sequencial para um tipo de documento
   * Formato: "SERIE AAAA/NNN" (ex: "FT 2025/001")
   */
  async gerarNumeroSequencial(empresaId, serie, tx, codigoSerie) {
    const dataAtual = /* @__PURE__ */ new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const sequencia = await tx?.sequenciaDocumento.upsert({
      where: {
        empresaId_serie_ano_codigoSerie: {
          empresaId,
          serie,
          ano,
          codigoSerie: codigoSerie || serie
        }
      },
      update: { ultimoNumero: { increment: 1 } },
      create: {
        empresaId,
        serie,
        ano,
        mes,
        ultimoNumero: 1,
        codigoSerie: codigoSerie || serie
      }
    });
    const novoNumero = sequencia.ultimoNumero;
    const numeroFormatado = `${serie} ${codigoSerie || ano}/${novoNumero}`;
    return {
      numero: numeroFormatado,
      numeroSequencial: novoNumero
    };
  }
  /**
   * Gera hash SHA-256 do documento para facturação electrónica
   */
  gerarHashDocumento(dados) {
    const payload = JSON.stringify(dados, Object.keys(dados).sort());
    return crypto__default__default.createHash("sha256").update(payload).digest("hex");
  }
  /**
   * Gera dados para QR Code de validação
   * Formato: "AGT|NIF|NUMERO|DATA|TOTAL|HASH"
   */
  async gerarDadosQRCode(documentoId) {
    const documento = await db.documentoFiscal.findUnique({
      where: { id: documentoId },
      include: { empresa: true }
    });
    if (!documento) {
      throw new Error("Documento não encontrado");
    }
    const qrData = [
      "AGT",
      documento.empresa.nif,
      documento.numero,
      documento.dataEmissao.toISOString().split("T")[0],
      documento.total.toFixed(2),
      documento.hashDocumento || ""
    ].join("|");
    return qrData;
  }
  /**
   * Valida se um documento pode ser emitido
   */
  validarDocumento(documento, itens) {
    const { DocumentoFiscalValidator } = require("@/server/validators/documento-fiscal.validator");
    const itensParaValidar = itens || documento.itens || [];
    return DocumentoFiscalValidator.validarEmissao(documento, itensParaValidar);
  }
  /**
   * Calcula totais do documento a partir dos itens
   */
  calcularTotais(itens) {
    let totalBruto = new Decimal(0);
    let totalDesconto = new Decimal(0);
    let totalIVA = new Decimal(0);
    let totalGeral = new Decimal(0);
    const itensCalculados = itens.map((item) => {
      const qtd = new Decimal(item.quantidade);
      const preco = new Decimal(item.precoUnitario);
      const descPerc = new Decimal(item.desconto || 0);
      const taxaPerc = new Decimal(item.taxa || 0);
      const itemSubtotal = qtd.mul(preco);
      const itemDescontoValor = itemSubtotal.mul(descPerc.div(100));
      const baseTributavel = itemSubtotal.sub(itemDescontoValor);
      const itemTaxaValor = baseTributavel.mul(taxaPerc.div(100));
      const itemTotalFinal = baseTributavel.add(itemTaxaValor);
      totalBruto = totalBruto.add(itemSubtotal);
      totalDesconto = totalDesconto.add(itemDescontoValor);
      totalIVA = totalIVA.add(itemTaxaValor);
      totalGeral = totalGeral.add(itemTotalFinal);
      return {
        ...item,
        subtotal: itemSubtotal,
        descontoValor: itemDescontoValor,
        taxaValor: itemTaxaValor,
        total: itemTotalFinal
      };
    });
    return {
      itensCalculados,
      resumo: {
        subtotal: totalBruto,
        totalDesconto,
        totalImpostos: totalIVA,
        total: totalGeral
      }
    };
  }
  /**
   * Verifica se um documento pode ser anulado/creditado.
   * Utiliza Decimal para garantir que a soma das Notas de Crédito parciais
   * não diverja do total do documento original.
   */
  async podeAnular(documentoId) {
    const documento = await db.documentoFiscal.findUnique({
      where: { id: documentoId },
      include: {
        documentosRelacionados: {
          where: { status: { not: "ANULADO" } }
          // Apenas NCs válidas
        }
      }
    });
    if (!documento) {
      return { pode: false, motivo: "Documento não encontrado." };
    }
    if (documento.status === "ANULADO") {
      return { pode: false, motivo: "O documento já se encontra anulado." };
    }
    if (documento.status === "RASCUNHO") {
      return {
        pode: false,
        motivo: "Documentos em rascunho não requerem Nota de Crédito, podem ser eliminados ou editados."
      };
    }
    const totalDocumento = new Decimal(documento.total);
    const totalJaCreditado = documento.documentosRelacionados.filter((d) => d.tipoDocumento === "NOTA_CREDITO").reduce((acc, nc) => {
      return acc.add(new Decimal(nc.total));
    }, new Decimal(0));
    if (totalJaCreditado.gte(totalDocumento)) {
      return {
        pode: false,
        motivo: `O documento já foi totalmente creditado (Total: ${totalDocumento.toFixed(2)}, Creditado: ${totalJaCreditado.toFixed(2)}).`
      };
    }
    return { pode: true };
  }
  /**
   * Cria uma nova Factura
   */
  async criarFactura(dados) {
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.gerarNumeroSequencial(
        dados.empresaId,
        dados.serie,
        tx,
        dados.codigoSerie
      );
      const { itensCalculados, resumo } = this.calcularTotais(dados.itens);
      const valorRetencao = dados.retencao ? resumo.subtotal.sub(resumo.totalDesconto).mul(new Decimal(dados.retencao).div(100)) : new Decimal(0);
      const documento = await tx.documentoFiscal.create({
        data: {
          empresaId: dados.empresaId,
          clienteId: dados.clienteId,
          createdBy: dados.usuarioId,
          tipoDocumento: dados.tipoDocumento,
          status: "EMITIDO",
          numero,
          serie: dados.serie,
          codigoSerie: dados.codigoSerie,
          numeroSequencial,
          dataEmissao: dados.dataEmissao || /* @__PURE__ */ new Date(),
          dataVencimento: dados.dataVencimento,
          moeda: dados.moeda || "AOA",
          subtotal: resumo.subtotal,
          totalDesconto: resumo.totalDesconto,
          totalImpostos: resumo.totalImpostos,
          total: resumo.total,
          retencao: valorRetencao,
          observacao: dados.observacao,
          formaPagamento: dados.formaPagamento,
          hashDocumento: this.gerarHashDocumento({
            numero,
            data: (/* @__PURE__ */ new Date()).toISOString(),
            total: resumo.total.toFixed(2),
            empresaId: dados.empresaId
          })
        }
      });
      for (const item of itensCalculados) {
        await tx.itemDocumento.create({
          data: {
            documentoId: documento.id,
            empresaId: dados.empresaId,
            produtoId: item.produtoId,
            codigo: item.codigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            desconto: item.desconto || 0,
            descontoValor: item.descontoValor || 0,
            taxa: item.taxa || 0,
            taxaValor: item.taxaValor || 0,
            subtotal: item.subtotal,
            total: item.total,
            motivoIsencao: item.motivoIsencao
          }
        });
        if (item.produtoId) {
          await tx.movimentoEstoque.create({
            data: {
              empresaId: dados.empresaId,
              produtoId: item.produtoId,
              usuarioId: dados.usuarioId,
              tipo: "SAIDA",
              quantidade: item.quantidade,
              motivo: "VENDA",
              observacao: `Factura ${numero}`
            }
          });
          await tx.produto.update({
            where: { id: item.produtoId },
            data: { quantidade: { decrement: item.quantidade } }
          });
        }
      }
      return documento;
    });
  }
  /**
   * CONVERSÃO DE PRO-FORMA PARA FACTURA
   */
  async converterProForma(proformaId, usuarioId) {
    const proforma = await db.documentoFiscal.findUnique({
      where: { id: proformaId },
      include: { itens: true }
    });
    if (!proforma || proforma.tipoDocumento !== "FACTURA_PROFORMA") {
      throw new Error("Pro-forma inválida ou não encontrada");
    }
    const jaConvertida = await db.documentoFiscal.findFirst({
      where: { documentoOriginalId: proformaId }
    });
    if (jaConvertida) throw new Error(`Já convertida na factura ${jaConvertida.numero}`);
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.gerarNumeroSequencial(
        proforma.empresaId,
        "FT",
        tx
      );
      const factura = await tx.documentoFiscal.create({
        data: {
          empresaId: proforma.empresaId,
          clienteId: proforma.clienteId,
          createdBy: usuarioId,
          tipoDocumento: "FACTURA",
          status: "EMITIDO",
          numero,
          serie: "FT",
          numeroSequencial,
          dataEmissao: /* @__PURE__ */ new Date(),
          dataVencimento: proforma.dataVencimento,
          moeda: proforma.moeda,
          subtotal: proforma.subtotal,
          totalDesconto: proforma.totalDesconto,
          totalImpostos: proforma.totalImpostos,
          total: proforma.total,
          retencao: proforma.retencao,
          documentoOriginalId: proforma.id,
          referenciaOriginal: proforma.numero,
          hashDocumento: this.gerarHashDocumento({
            numero,
            data: (/* @__PURE__ */ new Date()).toISOString(),
            total: new Decimal(proforma.total).toFixed(2),
            empresaId: proforma.empresaId
          })
        }
      });
      for (const item of proforma.itens) {
        await tx.itemDocumento.create({
          data: {
            documentoId: factura.id,
            empresaId: item.empresaId,
            produtoId: item.produtoId,
            codigo: item.codigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            desconto: item.desconto || 0,
            descontoValor: item.descontoValor || 0,
            taxa: item.taxa || 0,
            taxaValor: item.taxaValor || 0,
            subtotal: item.subtotal,
            total: item.total
          }
        });
        if (item.produtoId) {
          await tx.produto.update({
            where: { id: item.produtoId },
            data: { quantidade: { decrement: item.quantidade } }
          });
        }
      }
      return factura;
    });
  }
}

export { DocumentoFiscalService as D };
//# sourceMappingURL=documento-fiscal.service-B72KZQqg.js.map
