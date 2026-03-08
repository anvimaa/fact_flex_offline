import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { d as db } from './db-BUWqG89e.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, z as zod, m as message } from './zod-vsheQqNr.js';
import { c as categoriaSchema } from './index4-6B8efaf4.js';
import './auth-ke1JlaCA.js';
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
import './parse-DXcVuhZ4.js';

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const categorias = await db.categoria.findMany({
    where: { empresaId },
    include: {
      _count: {
        select: {
          produtos: true
        }
      }
    }
  });
  const form = await superValidate(zod(categoriaSchema));
  return { categorias, form };
};
const actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(categoriaSchema));
    const empresaId = await getEmpresaId(request);
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.categoria.create({
        data: {
          ...form.data,
          empresaId
        }
      });
      return message(form, "Categoria criado com sucesso!");
    } catch (error) {
      console.error("Error creating supplier:", error);
      return fail(500, {
        form,
        error: "Erro ao criar Categoria"
      });
    }
  },
  edit: async ({ request, url }) => {
    const form = await superValidate(request, zod(categoriaSchema));
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(400, { form, error: "ID do Categoria não fornecido" });
    }
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.categoria.update({
        where: { id },
        data: form.data
      });
      return message(form, "Categoria atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating supplier:", error);
      return fail(500, {
        form,
        error: "Erro ao atualizar Categoria"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dxt05gTW.js')).default;
const server_id = "src/routes/(app)/cadastros/categorias/+page.server.ts";
const imports = ["_app/immutable/nodes/15.tVVOpSAx.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C05BI6PQ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/C1-49jkj.js","_app/immutable/chunks/WKkgRa7A.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/tExnXwJ7.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/CyJIJDjq.js","_app/immutable/chunks/C8ASZhvd.js","_app/immutable/chunks/91OW602I.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js","_app/immutable/chunks/Df8C-86c.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-CfjvnSXc.js.map
