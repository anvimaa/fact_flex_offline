import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
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
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const status = url.searchParams.get("status");
  const dataInicio = url.searchParams.get("dataInicio");
  const dataFim = url.searchParams.get("dataFim");
  const where = {
    empresaId,
    tipoDocumento: "FACTURA_PROFORMA"
  };
  if (status) {
    where.status = status;
  }
  if (dataInicio || dataFim) {
    where.dataEmissao = {};
    if (dataInicio) where.dataEmissao.gte = new Date(dataInicio);
    if (dataFim) where.dataEmissao.lte = new Date(dataFim);
  }
  const documentos = await db.documentoFiscal.findMany({
    where,
    include: {
      cliente: true,
      usuario: {
        select: {
          id: true,
          name: true
        }
      },
      itens: true
    },
    orderBy: { dataEmissao: "desc" },
    take: 50
  });
  return {
    documentos: documentos.map((doc) => ({
      ...doc,
      subtotal: doc.subtotal.toNumber(),
      totalDesconto: doc.totalDesconto.toNumber(),
      totalImpostos: doc.totalImpostos.toNumber(),
      total: doc.total.toNumber(),
      retencao: doc.retencao.toNumber(),
      itens: doc.itens.map((item) => ({
        ...item,
        precoUnitario: item.precoUnitario.toNumber(),
        desconto: item.desconto.toNumber(),
        descontoValor: item.descontoValor.toNumber(),
        taxa: item.taxa.toNumber(),
        taxaValor: item.taxaValor.toNumber(),
        subtotal: item.subtotal.toNumber(),
        total: item.total.toNumber()
      }))
    }))
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 48;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CNDqcZ1V.js')).default;
const server_id = "src/routes/(app)/documentos/pro-forma/+page.server.ts";
const imports = ["_app/immutable/nodes/48.CXg1vcWF.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/Cy1XOpfF.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/uhbZFQfB.js","_app/immutable/chunks/DNjCieoT.js","_app/immutable/chunks/DsTWAe0h.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Cf6qd43C.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/DZKL8MBn.js"];
const stylesheets = ["_app/immutable/assets/list-documents.DdPxsbHX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=48-CjlF7STN.js.map
