import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { S as SUPER_USER_LOGIN, a as SUPER_USER_PW } from './private-BNWMvB1R.js';
import { e as encryptSession, d as decryptSession } from './crypto-Dg_tq0Mh.js';
import './utils-FiC4zhrQ.js';
import 'crypto';

const load = async ({ cookies }) => {
  const sessionCookie = cookies.get("admin_session");
  if (sessionCookie) {
    const decrypted = decryptSession(sessionCookie);
    if (decrypted && decrypted.startsWith("authenticated")) {
      throw redirect(302, "/admin");
    }
  }
  return {};
};
const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const login = formData.get("login")?.toString();
    const password = formData.get("password")?.toString();
    if (!login || !password) {
      return fail(400, {
        error: "Credenciais inválidas. Preencha todos os campos."
      });
    }
    if (login === SUPER_USER_LOGIN && password === SUPER_USER_PW) {
      const payload = `authenticated:${Date.now()}`;
      const encryptedSession = encryptSession(payload);
      cookies.set("admin_session", encryptedSession, {
        path: "/admin",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1
        // 1 hour
      });
      throw redirect(302, "/admin");
    } else {
      return fail(401, {
        error: "Login ou Palavra-passe incorretos."
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-jdfIzH3a.js')).default;
const server_id = "src/routes/(admin)/admin/login/+page.server.ts";
const imports = ["_app/immutable/nodes/9.DVwYMoEV.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-C9p6j1bb.js.map
