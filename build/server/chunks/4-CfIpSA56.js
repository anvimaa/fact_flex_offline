import { a as auth } from './auth-ke1JlaCA.js';
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

const load = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (session) {
    await auth.api.signOut({
      headers: request.headers
    });
  }
  return {};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BOX5jjoo.js')).default;
const server_id = "src/routes/(landing)/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.CrkUz9QN.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/C6y7tQs4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DH_bmPGr.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/kiaROp02.js","_app/immutable/chunks/Bj6ZxzB-.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/DU78yB6-.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/DuR1xrli.js"];
const stylesheets = ["_app/immutable/assets/4.B-t0ERwV.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-CfIpSA56.js.map
