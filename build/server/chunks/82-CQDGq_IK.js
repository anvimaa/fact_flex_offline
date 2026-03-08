import { d as db } from './db-BUWqG89e.js';
import { c as createHash } from './hash-generator-ERpeX74n.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import '@prisma/client';
import 'crypto';
import 'fs';
import 'path';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';

const load = async ({ params }) => {
  const factura = await db.documentoFiscal.findFirst({
    where: { id: params.id },
    include: {
      cliente: true,
      itens: {
        include: { produto: true }
      },
      empresa: true
    }
  });
  if (!factura) {
    throw new Error("Documento não encontrada");
  }
  const hash = createHash(factura?.numero).slice(0, 4);
  return serialize({ factura, hash });
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 82;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-JAJQoOyo.js')).default;
const server_id = "src/routes/reports/recibos/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/82.BAuvc3cX.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/CK9HSTeE.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/DBGQ1RqH.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/DcvGvDXv.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/CBrSDip1.js","_app/immutable/chunks/CAnT7MRO.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/s2C54vnN.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/InvoiceTemplate.KepqdDox.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=82-CQDGq_IK.js.map
