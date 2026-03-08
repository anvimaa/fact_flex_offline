import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { L as LogService } from './log.service-DCmGal4h.js';
import { Decimal as Decimal$1 } from '@prisma/client/runtime/library';
import { D as Decimal, s as serialize } from './utils3-DjmiJAAD.js';
import '@prisma/client';
import './auth-ke1JlaCA.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import './private-BNWMvB1R.js';
import './public-B844qK3e.js';
import './api-BO0T-px8.js';
import 'net';
import 'url';
import 'util';
import 'crypto';
import 'buffer';
import 'http';
import 'https';
import 'stream';
import 'zlib';
import 'querystring';
import 'assert';
import './index-64ZZ3C7M.js';
import 'path';
import 'tls';
import 'fs';
import 'events';
import './performance-now-L-NpSMJt.js';
import './utils-FiC4zhrQ.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

Decimal$1.set({ precision: 20, rounding: Decimal$1.ROUND_HALF_UP });
class ReciboService {
  docService = new DocumentoFiscalService();
  logService = new LogService();
  /**
   * Emite um recibo para uma factura
   */
  async emitirRecibo(params) {
    const { facturaId, valorPago, retencao, dataPagamento, formaPagamento, observacao, usuarioId } = params;
    const factura = await db.documentoFiscal.findUnique({
      where: { id: facturaId },
      include: { empresa: true, cliente: true }
    });
    if (!factura) {
      throw new Error("Factura não encontrada");
    }
    if (factura.tipoDocumento !== "FACTURA") {
      throw new Error("Apenas facturas podem gerar recibos");
    }
    if (factura.status === "ANULADO") {
      throw new Error("Não é possível emitir recibo para factura anulada");
    }
    if (factura.status === "RASCUNHO") {
      throw new Error("Não é possível emitir recibo para factura em rascunho");
    }
    return await db.$transaction(
      async (tx) => {
        const recibosAnteriores = await tx.documentoFiscal.findMany({
          where: {
            documentoOriginalId: facturaId,
            tipoDocumento: "RECIBO",
            status: { not: "ANULADO" }
          }
        });
        const totalJaPago = recibosAnteriores.reduce(
          (sum, r) => sum.add(new Decimal$1(r.total)),
          new Decimal$1(0)
        );
        const saldoDevedor = new Decimal$1(factura.total).sub(totalJaPago);
        const valorPagoDecimal = new Decimal$1(valorPago);
        if (valorPagoDecimal.gt(saldoDevedor.add(new Decimal$1(0.01)))) {
          throw new Error(
            `Valor do pagamento (${valorPago}) excede o saldo devedor (${saldoDevedor.toFixed(2)})`
          );
        }
        const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
          factura.empresaId,
          "RC",
          tx
        );
        const recibo = await tx.documentoFiscal.create({
          data: {
            tipoDocumento: "RECIBO",
            numero,
            serie: "RC",
            numeroSequencial,
            dataEmissao: /* @__PURE__ */ new Date(),
            dataOperacao: dataPagamento,
            empresaId: factura.empresaId,
            clienteId: factura.clienteId,
            moeda: factura.moeda,
            subtotal: valorPago,
            // Em recibos, subtotal = total pago
            totalDesconto: 0,
            totalImpostos: 0,
            total: valorPago,
            retencao: retencao || 0,
            observacao: observacao || `Recibo referente à ${factura.numero}`,
            formaPagamento,
            referenciaOriginal: factura.numero,
            documentoOriginalId: factura.id,
            status: "EMITIDO",
            estado: "finalizado",
            regimeFiscal: factura.regimeFiscal,
            createdBy: usuarioId
          }
        });
        if (factura.regimeFiscal === "ELECTRONICO") {
          const hash = this.docService.gerarHashDocumento(recibo);
          await tx.documentoFiscal.update({
            where: { id: recibo.id },
            data: { hashDocumento: hash }
          });
        }
        await this.logService.registrarLog(tx, {
          documentoId: recibo.id,
          acao: "CRIADO",
          descricao: `Recibo emitido para ${factura.numero}`,
          usuarioId,
          dadosNovos: JSON.stringify({
            valorPago,
            formaPagamento,
            saldoRestante: saldoDevedor.sub(valorPagoDecimal).toFixed(2)
          })
        });
        await this.logService.registrarLog(tx, {
          documentoId: factura.id,
          acao: "PAGAMENTO_RECEBIDO",
          descricao: `Pagamento de ${valorPago} recebido (Recibo ${numero})`,
          usuarioId,
          dadosNovos: JSON.stringify({ reciboId: recibo.id, valor: valorPago })
        });
        return recibo;
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
   * Lista recibos de uma factura
   */
  async listarRecibos(facturaId) {
    return await db.documentoFiscal.findMany({
      where: {
        documentoOriginalId: facturaId,
        tipoDocumento: "RECIBO"
      },
      include: {
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
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const facturaId = url.searchParams.get("factura");
  const facturas = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: "FACTURA",
      status: {
        in: ["EMITIDO", "VALIDADO_AGT"]
      }
    },
    include: {
      cliente: true,
      documentosRelacionados: {
        // Buscar recibos no novo modelo
        where: {
          tipoDocumento: "RECIBO",
          status: { not: "ANULADO" }
        }
      }
    },
    orderBy: { dataEmissao: "desc" },
    take: 50
  });
  const facturasComSaldo = facturas.map((f) => {
    const totalPago = f.documentosRelacionados.reduce((sum, r) => sum.add(r.total), new Decimal(0));
    return {
      ...f,
      totalPago,
      saldo: f.total.sub(totalPago)
    };
  });
  let facturaSelecionada = null;
  if (facturaId) {
    const factura = await db.documentoFiscal.findUnique({
      where: { id: facturaId },
      include: {
        cliente: true,
        documentosRelacionados: {
          // Recibos emitidos (novo modelo)
          where: {
            tipoDocumento: "RECIBO",
            status: { not: "ANULADO" }
          }
        }
      }
    });
    if (factura) {
      const totalPago = factura.documentosRelacionados.reduce(
        (sum, r) => sum.add(r.total),
        new Decimal(0)
      );
      facturaSelecionada = {
        ...factura,
        totalPago,
        saldo: factura.total.sub(totalPago)
      };
    }
  }
  return serialize({
    facturas: facturasComSaldo,
    facturaSelecionada
  });
};
const actions = {
  emitir: async ({ request }) => {
    await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    const data = await request.formData();
    const facturaId = data.get("facturaId")?.toString();
    const valorPagoStr = data.get("valorPago")?.toString() || "0";
    const dataPagamentoStr = data.get("dataPagamento")?.toString();
    const formaPagamento = data.get("formaPagamento")?.toString();
    const observacao = data.get("observacao")?.toString();
    const retencaoStr = data.get("retencao")?.toString() || "0";
    const valorPago = new Decimal(valorPagoStr);
    const retencao = new Decimal(retencaoStr);
    if (!facturaId) {
      return fail(400, { error: "Factura é obrigatória" });
    }
    if (valorPago.lte(0)) {
      return fail(400, { error: "Valor pago deve ser maior que zero" });
    }
    if (!dataPagamentoStr) {
      return fail(400, { error: "Data de pagamento é obrigatória" });
    }
    if (!formaPagamento) {
      return fail(400, { error: "Forma de pagamento é obrigatória" });
    }
    try {
      const reciboService = new ReciboService();
      const recibo = await reciboService.emitirRecibo({
        facturaId,
        valorPago,
        retencao,
        dataPagamento: new Date(dataPagamentoStr),
        formaPagamento,
        observacao,
        usuarioId
      });
      return {
        success: true,
        message: "Recibo emitido com sucesso",
        reciboId: recibo.id,
        numero: recibo.numero
      };
    } catch (error) {
      console.error("Erro ao emitir recibo:", error);
      return fail(500, { error: error.message || "Erro ao emitir recibo" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 51;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CfkA-oUj.js')).default;
const server_id = "src/routes/(app)/documentos/recibos/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/51.DZ15R778.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/CLXrGED-.js","_app/immutable/chunks/DsTWAe0h.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=51-D_8XXPkv.js.map
