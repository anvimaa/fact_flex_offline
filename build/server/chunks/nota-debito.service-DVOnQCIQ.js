import { d as db } from './db-BUWqG89e.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { L as LogService } from './log.service-DCmGal4h.js';
import { Decimal } from '@prisma/client/runtime/library';

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
class NotaDebitoService {
  docService = new DocumentoFiscalService();
  logService = new LogService();
  /**
   * Emite uma nota de débito
   */
  async emitirNotaDebito(params) {
    const { facturaId, clienteId, empresaId, motivo, itens, observacao, usuarioId } = params;
    let facturaOriginal = null;
    if (facturaId) {
      facturaOriginal = await db.documentoFiscal.findUnique({
        where: { id: facturaId },
        include: { empresa: true }
      });
      if (!facturaOriginal) {
        throw new Error("Factura não encontrada");
      }
      if (facturaOriginal.tipoDocumento !== "FACTURA") {
        throw new Error("Documento original deve ser uma factura");
      }
    }
    const empresa = await db.empresa.findUnique({
      where: { id: empresaId }
    });
    if (!empresa) {
      throw new Error("Empresa não encontrada");
    }
    if (!itens || itens.length === 0) {
      throw new Error("Nota de débito deve ter pelo menos um item");
    }
    return await db.$transaction(
      async (tx) => {
        const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
          empresaId,
          "ND",
          tx
        );
        let subtotal = new Decimal(0);
        const itensNota = itens.map((item) => {
          const qtd = new Decimal(item.quantidade);
          const preco = new Decimal(item.precoUnitario);
          const itemSubtotal = qtd.mul(preco);
          subtotal = subtotal.add(itemSubtotal);
          return {
            codigo: item.codigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            unidade: item.unidade || "UN",
            precoUnitario: item.precoUnitario,
            desconto: 0,
            descontoValor: 0,
            taxa: 0,
            // Notas de débito não têm imposto
            taxaValor: 0,
            subtotal: itemSubtotal,
            total: itemSubtotal,
            empresaId
          };
        });
        const total = subtotal;
        const notaDebito = await tx.documentoFiscal.create({
          data: {
            tipoDocumento: "NOTA_DEBITO",
            numero,
            serie: "ND",
            numeroSequencial,
            dataEmissao: /* @__PURE__ */ new Date(),
            dataOperacao: /* @__PURE__ */ new Date(),
            empresaId,
            clienteId,
            moeda: facturaOriginal?.moeda || "AOA",
            subtotal,
            totalDesconto: new Decimal(0),
            totalImpostos: new Decimal(0),
            // Sem imposto
            total,
            retencao: new Decimal(0),
            observacao: observacao || `Nota de débito - ${motivo}`,
            motivoEmissao: motivo,
            referenciaOriginal: facturaOriginal?.numero,
            documentoOriginalId: facturaId,
            status: "EMITIDO",
            estado: "finalizado",
            regimeFiscal: facturaOriginal?.regimeFiscal || "NORMAL",
            createdBy: usuarioId,
            itens: {
              create: itensNota
            }
          },
          include: { itens: true }
        });
        const hash = this.docService.gerarHashDocumento(notaDebito);
        await tx.documentoFiscal.update({
          where: { id: notaDebito.id },
          data: { hashDocumento: hash }
        });
        await this.logService.registrarLog(tx, {
          documentoId: notaDebito.id,
          acao: "CRIADO",
          descricao: `Nota de débito emitida${facturaOriginal ? ` para ${facturaOriginal.numero}` : ""}`,
          usuarioId,
          dadosNovos: JSON.stringify({ motivo, total, itens: itensNota.length })
        });
        if (facturaId) {
          await this.logService.registrarLog(tx, {
            documentoId: facturaId,
            acao: "NOTA_DEBITO_EMITIDA",
            descricao: `Nota de débito ${numero} emitida`,
            usuarioId,
            dadosNovos: JSON.stringify({ notaDebitoId: notaDebito.id, valor: total })
          });
        }
        return notaDebito;
      },
      {
        maxWait: 2e4,
        // 20s
        timeout: 6e4
        // 60s
      }
    );
  }
  /**
   * Lista notas de débito de uma factura
   */
  async listarNotasDebito(facturaId) {
    return await db.documentoFiscal.findMany({
      where: {
        documentoOriginalId: facturaId,
        tipoDocumento: "NOTA_DEBITO"
      },
      include: {
        itens: true,
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { dataEmissao: "desc" }
    });
  }
}

export { NotaDebitoService as N };
//# sourceMappingURL=nota-debito.service-DVOnQCIQ.js.map
