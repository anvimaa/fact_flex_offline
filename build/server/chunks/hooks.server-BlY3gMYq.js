import { a as auth } from './auth-ke1JlaCA.js';
import './db-BUWqG89e.js';
import './client3-D6-MZ0VN.js';
import './index-Ciy6OqN0.js';
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
import './index-Dn-KpEFr.js';
import './_commonjsHelpers-BFTU3MAI.js';
import 'http2';
import 'tty';
import 'os';
import 'node:fs';
import '@prisma/client/runtime/library';

var h=async({auth:e,event:t,resolve:r})=>{let{building:n}=await import('$app/environment').catch(s=>{}).then(s=>s||{});if(n)return r(t);let{request:a,url:i}=t;return u(i.toString(),e.options)?e.handler(a):r(t)};function u(e,t){let r=new URL(e),n=new URL(`${t.baseURL||r.origin}${t.basePath||"/api/auth"}`);return !(r.origin!==n.origin||!r.pathname.startsWith(n.pathname.endsWith("/")?n.pathname:`${n.pathname}/`))}

const handle = async ({ event, resolve }) => {
  return h({ event, resolve, auth });
};

export { handle };
//# sourceMappingURL=hooks.server-BlY3gMYq.js.map
