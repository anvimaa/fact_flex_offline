import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { d as db } from './db-BUWqG89e.js';
import { Decimal } from '@prisma/client/runtime/library';
import './auth-ke1JlaCA.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import '@prisma/client';
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
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
class RelatorioService {
  /**
   * Gera relatório fiscal com base nos filtros
   */
  async gerarRelatorioFiscal(filtros) {
    const { empresaId, dataInicio, dataFim, tipoDocumento, clienteId, status } = filtros;
    const where = {
      empresaId,
      dataEmissao: {
        gte: dataInicio,
        lte: dataFim
      }
    };
    if (tipoDocumento) {
      where.tipoDocumento = tipoDocumento;
    }
    if (clienteId) {
      where.clienteId = clienteId;
    }
    if (status) {
      where.status = status;
    }
    const documentos = await db.documentoFiscal.findMany({
      where,
      include: {
        cliente: {
          select: {
            nome: true,
            nif: true
          }
        },
        usuario: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        dataEmissao: "desc"
      }
    });
    let valorTotalBruto = new Decimal(0);
    let valorTotalImpostos = new Decimal(0);
    let valorTotalLiquido = new Decimal(0);
    const porTipo = {};
    const porStatus = {};
    for (const doc of documentos) {
      const isValido = ["EMITIDO", "VALIDADO_AGT", "ENVIADO_AGT", "PENDENTE_ENVIO"].includes(
        doc.status
      );
      if (isValido) {
        valorTotalBruto = valorTotalBruto.add(new Decimal(doc.subtotal));
        valorTotalImpostos = valorTotalImpostos.add(new Decimal(doc.totalImpostos));
        valorTotalLiquido = valorTotalLiquido.add(new Decimal(doc.total));
      }
      if (!porTipo[doc.tipoDocumento]) {
        porTipo[doc.tipoDocumento] = {
          quantidade: 0,
          total: new Decimal(0),
          impostos: new Decimal(0)
        };
      }
      porTipo[doc.tipoDocumento].quantidade++;
      if (isValido) {
        porTipo[doc.tipoDocumento].total = porTipo[doc.tipoDocumento].total.add(
          new Decimal(doc.total)
        );
        porTipo[doc.tipoDocumento].impostos = porTipo[doc.tipoDocumento].impostos.add(
          new Decimal(doc.totalImpostos)
        );
      }
      if (!porStatus[doc.status]) {
        porStatus[doc.status] = 0;
      }
      porStatus[doc.status]++;
    }
    const resumo = {
      totalDocumentos: documentos.length,
      valorTotalBruto: valorTotalBruto.toNumber(),
      valorTotalImpostos: valorTotalImpostos.toNumber(),
      valorTotalLiquido: valorTotalLiquido.toNumber(),
      porTipo: Object.fromEntries(
        Object.entries(porTipo).map(([key, value]) => [
          key,
          {
            quantidade: value.quantidade,
            total: value.total.toNumber(),
            impostos: value.impostos.toNumber()
          }
        ])
      ),
      porStatus
    };
    return {
      filtros: {
        ...filtros,
        dataInicio: filtros.dataInicio.toISOString(),
        dataFim: filtros.dataFim.toISOString()
      },
      resumo,
      documentos
    };
  }
}
const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const now = /* @__PURE__ */ new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  lastDay.setHours(23, 59, 59, 999);
  const dataInicioStr = url.searchParams.get("dataInicio") || firstDay.toISOString().split("T")[0];
  const dataFimStr = url.searchParams.get("dataFim") || lastDay.toISOString().split("T")[0];
  const tipoDocumento = url.searchParams.get("tipoDocumento");
  const status = url.searchParams.get("status");
  const dataInicio = new Date(dataInicioStr);
  const dataFim = new Date(dataFimStr);
  dataFim.setHours(23, 59, 59, 999);
  const relatorioService = new RelatorioService();
  const relatorio = await relatorioService.gerarRelatorioFiscal({
    empresaId,
    dataInicio,
    dataFim,
    tipoDocumento: tipoDocumento || void 0,
    // undefined se string vazia
    status: status || void 0
  });
  return {
    relatorio: {
      ...relatorio,
      documentos: relatorio.documentos.map((doc) => ({
        ...doc,
        subtotal: doc.subtotal.toNumber(),
        totalDesconto: doc.totalDesconto.toNumber(),
        totalImpostos: doc.totalImpostos.toNumber(),
        total: doc.total.toNumber(),
        retencao: doc.retencao.toNumber()
      }))
    },
    filtrosAtuais: {
      dataInicio: dataInicioStr,
      dataFim: dataFimStr,
      tipoDocumento: tipoDocumento || "",
      status: status || ""
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 52;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CZ5shQjd.js')).default;
const server_id = "src/routes/(app)/documentos/relatorios/+page.server.ts";
const imports = ["_app/immutable/nodes/52.9kr8aZKW.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/DWMGhE4s.js"];
const stylesheets = ["_app/immutable/assets/52.C9A9aRUv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=52-CY6GduG8.js.map
