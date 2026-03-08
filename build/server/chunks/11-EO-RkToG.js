import { d as db } from './db-BUWqG89e.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import '@prisma/client';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';

const load = async () => {
  const payments = await db.payment.findMany({
    include: {
      subscription: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return serialize({ payments });
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CNwSjiY3.js')).default;
const server_id = "src/routes/(admin)/admin/pagamentos/+page.server.ts";
const imports = ["_app/immutable/nodes/11.Dkkvwmh7.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-EO-RkToG.js.map
