import { d as db } from './db-BUWqG89e.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { Decimal } from '@prisma/client/runtime/library';

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
class FaturaReciboService {
  docService = new DocumentoFiscalService();
  async criarFaturaRecibo(dados) {
    if (!dados.formaPagamento) {
      throw new Error("Forma de Pagamento é obrigatória para Fatura-Recibo");
    }
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
        dados.empresaId,
        "FR",
        tx
      );
      const { itensCalculados, resumo } = this.docService.calcularTotais(dados.itens);
      const documento = await tx.documentoFiscal.create({
        data: {
          empresaId: dados.empresaId,
          clienteId: dados.clienteId,
          createdBy: dados.usuarioId,
          tipoDocumento: "FACTURA_RECIBO",
          status: "EMITIDO",
          // Documento válido
          estado: "liquidada",
          // Estado de negócio
          numero,
          serie: "FR",
          numeroSequencial,
          dataEmissao: dados.dataEmissao,
          dataVencimento: dados.dataVencimento,
          dataOperacao: dados.dataEmissao,
          // Data do recebimento = emissão
          moeda: dados.moeda,
          subtotal: resumo.subtotal,
          totalDesconto: resumo.totalDesconto,
          totalImpostos: resumo.totalImpostos,
          total: resumo.total,
          observacao: dados.observacao,
          retencao: dados.retencao ? new Decimal(dados.retencao) : new Decimal(0),
          formaPagamento: dados.formaPagamento,
          referenciaOriginal: dados.referenciaOriginal,
          regimeFiscal: dados.regimeFiscal || "NORMAL",
          hashDocumento: this.docService.gerarHashDocumento({
            numero,
            dataEmissao: dados.dataEmissao,
            total: resumo.total.toFixed(2),
            empresaId: dados.empresaId,
            tipo: "FR"
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
            motivoIsencao: item.motivoIsencao || ""
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
              observacao: `Fatura-Recibo ${numero}`
            }
          });
          await tx.produto.update({
            where: { id: item.produtoId },
            data: {
              quantidade: {
                decrement: item.quantidade
              }
            }
          });
        }
      }
      return documento;
    });
  }
}

export { FaturaReciboService as F };
//# sourceMappingURL=fatura-recibo.service-C7NRnvyz.js.map
