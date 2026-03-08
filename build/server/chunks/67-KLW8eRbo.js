import { f as fail } from './index-BWA_9C9m.js';
import { sendPartnerApplicationEmail } from './email-6u-JEkRs.js';
import './utils-FiC4zhrQ.js';
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
import './public-B844qK3e.js';
import './private-BNWMvB1R.js';

const load = async () => {
  return { ok: true };
};
const actions = {
  apply: async ({ request }) => {
    const data = await request.formData();
    const companyName = data.get("companyName")?.toString().trim() ?? "";
    const contactName = data.get("contactName")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const phone = data.get("phone")?.toString().trim() ?? "";
    const partnerType = data.get("partnerType")?.toString().trim() ?? "";
    const province = data.get("province")?.toString().trim() ?? "";
    const website = data.get("website")?.toString().trim() || void 0;
    const message = data.get("message")?.toString().trim() || void 0;
    if (!companyName || !contactName || !email || !phone || !partnerType || !province) {
      return fail(400, { error: "Preencha todos os campos obrigatórios." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: "O endereço de e-mail não é válido." });
    }
    const success = await sendPartnerApplicationEmail({
      companyName,
      contactName,
      email,
      phone,
      partnerType,
      province,
      website,
      message
    });
    if (!success) {
      return fail(500, {
        error: "Ocorreu um erro ao enviar a candidatura. Por favor tente novamente."
      });
    }
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 67;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DNffpit6.js')).default;
const server_id = "src/routes/(landing)/parceiros/+page.server.ts";
const imports = ["_app/immutable/nodes/67.Ba6BLtSq.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/DU78yB6-.js","_app/immutable/chunks/C6y7tQs4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/8TzZoK6t.js","_app/immutable/chunks/BNb8TLk_.js"];
const stylesheets = ["_app/immutable/assets/67.CjhNUkaA.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=67-KLW8eRbo.js.map
