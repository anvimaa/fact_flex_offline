import { a as auth } from './auth-ke1JlaCA.js';
import { r as redirect } from './index-BWA_9C9m.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { d as db } from './db-BUWqG89e.js';
import { d as differenceInDays } from './differenceInDays-DxuNzxW_.js';
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
import './differenceInCalendarDays-DtxpX8GL.js';

const load = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session) {
    redirect(302, "/login");
  }
  const empresaId = await getEmpresaId(request);
  let isTrial = false;
  let trialDaysLeft = 0;
  const empresa = await db.empresa.findUnique({
    where: { id: empresaId },
    include: {
      subscriptions: true
    }
  });
  const subscription = await db.subscription.findFirst({
    where: {
      empresaId: empresa?.id,
      status: "ACTIVE"
    }
  });
  if (subscription) {
    const daysLeft = differenceInDays(new Date(subscription?.endDate), /* @__PURE__ */ new Date());
    if (daysLeft <= 0) {
      await db.subscription.update({
        where: { id: subscription?.id },
        data: { status: "EXPIRED" }
      });
      redirect(302, "/subscription-expired");
    }
  } else {
    const elapsedDays = differenceInDays(/* @__PURE__ */ new Date(), new Date(empresa?.createdAt));
    trialDaysLeft = 15 - elapsedDays;
    if (trialDaysLeft > 0) {
      isTrial = true;
    } else {
      trialDaysLeft = 0;
      redirect(302, "/subscription-expired");
    }
  }
  return { session, empresa, isTrial, trialDaysLeft };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-6MvglMpD.js')).default;
const server_id = "src/routes/(app)/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.L28tkLMb.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BxypHi1s.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BMqQavlV.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DBGQ1RqH.js","_app/immutable/chunks/DcvGvDXv.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/C1-49jkj.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/91OW602I.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/CRyByzT4.js","_app/immutable/chunks/iSAE_zK9.js","_app/immutable/chunks/QT1BUcEK.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/BhzTBi1t.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/CerSVr2r.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/C6y7tQs4.js","_app/immutable/chunks/Di22MuPF.js","_app/immutable/chunks/CnL7aqFd.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-FJbBLO9o.js.map
