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

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const documentosElegiveis = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: {
        in: ["GUIA_REMESSA", "NOTA_CREDITO", "NOTA_DEBITO"]
        // Expandir conforme necessário: VENDA_DINHEIRO, etc.
      },
      status: "EMITIDO"
    },
    orderBy: { createdAt: "desc" },
    take: 100,
    // Limite para performance
    include: {
      cliente: { select: { id: true, nome: true, nif: true } },
      itens: true
    }
  });
  const clientes = await db.cliente.findMany({
    where: { empresaId },
    orderBy: { nome: "asc" }
  });
  return {
    documentosElegiveis,
    clientes
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 39;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BkMFT7Ma.js')).default;
const server_id = "src/routes/(app)/documentos/fatura-global/selecao/+page.server.ts";
const imports = ["_app/immutable/nodes/39.BWAB7Yk9.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BAYmGL1H.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/CLXrGED-.js","_app/immutable/chunks/BR84ViWi.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-DosPpUJg.js.map
