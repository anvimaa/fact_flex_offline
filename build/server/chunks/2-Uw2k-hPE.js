import { r as redirect } from './index-BWA_9C9m.js';
import { d as decryptSession } from './crypto-Dg_tq0Mh.js';
import './utils-FiC4zhrQ.js';
import 'crypto';
import './private-BNWMvB1R.js';

const load = async ({ cookies, url }) => {
  if (url.pathname === "/admin/login") {
    return {};
  }
  const sessionCookie = cookies.get("admin_session");
  if (!sessionCookie) {
    throw redirect(302, "/admin/login");
  }
  const decrypted = decryptSession(sessionCookie);
  if (!decrypted || !decrypted.startsWith("authenticated")) {
    throw redirect(302, "/admin/login");
  }
  return {
    superAdmin: {
      name: "Super Administrador",
      role: "superroot"
    }
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-qc1bTkGs.js')).default;
const server_id = "src/routes/(admin)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.Wg7gv7SR.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/g0ngLbhj.js","_app/immutable/chunks/Big5sRC4.js","_app/immutable/chunks/DsTWAe0h.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/CRyByzT4.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Uw2k-hPE.js.map
