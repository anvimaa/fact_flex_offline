import { a as auth } from './auth-ke1JlaCA.js';
import { r as redirect } from './index-BWA_9C9m.js';
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
import './utils-FiC4zhrQ.js';

const load = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (session) {
    redirect(302, "/dashboard");
  }
  return {};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 62;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BVzP06ul.js')).default;
const server_id = "src/routes/(auth)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/62.CCZcKX5Q.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/QT1BUcEK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/kiaROp02.js","_app/immutable/chunks/DH_bmPGr.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=62-CIlcHn6S.js.map
