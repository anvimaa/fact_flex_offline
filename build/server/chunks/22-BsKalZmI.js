import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
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
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const produtos = await db.produto.findMany({
    where: { empresaId },
    include: {
      categoria: {
        select: { nome: true }
      },
      fornecedor: {
        select: { nome: true }
      },
      taxa: {
        select: { valor: true, descricao: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return serialize({
    produtos
  });
};
const actions = {};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DsZaW_j0.js')).default;
const server_id = "src/routes/(app)/cadastros/produtos/+page.server.ts";
const imports = ["_app/immutable/nodes/22.DikTCffK.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/WKkgRa7A.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/tExnXwJ7.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/CyJIJDjq.js","_app/immutable/chunks/C8ASZhvd.js","_app/immutable/chunks/91OW602I.js","_app/immutable/chunks/DBGQ1RqH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/DcvGvDXv.js","_app/immutable/chunks/BhzTBi1t.js","_app/immutable/chunks/Cn_k5L3X.js","_app/immutable/chunks/ByL5rCyh.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=22-BsKalZmI.js.map
