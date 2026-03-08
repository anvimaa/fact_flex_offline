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

const load = async ({ params, request }) => {
  const empresaId = await getEmpresaId(request);
  const documentoId = params.id;
  const documento = await db.documentoFiscal.findUnique({
    where: { id: documentoId },
    include: {
      cliente: true
    }
  });
  if (!documento || documento.empresaId !== empresaId) {
    throw new Error("Documento não encontrado");
  }
  const logs = await db.logDocumento.findMany({
    where: { documentoId },
    include: {
      usuario: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return {
    documento: {
      ...documento,
      subtotal: documento.subtotal.toNumber(),
      totalDesconto: documento.totalDesconto.toNumber(),
      totalImpostos: documento.totalImpostos.toNumber(),
      total: documento.total.toNumber(),
      retencao: documento.retencao.toNumber()
    },
    logs
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 44;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DRjccsp5.js')).default;
const server_id = "src/routes/(app)/documentos/fiscais/[id]/logs/+page.server.ts";
const imports = ["_app/immutable/nodes/44.BcxnFpMq.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/BWw0RkM7.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/CLXrGED-.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=44-OQ2oYQZI.js.map
