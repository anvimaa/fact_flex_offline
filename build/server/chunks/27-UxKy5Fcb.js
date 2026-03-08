import { d as db } from './db-BUWqG89e.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, z as zod, m as message } from './zod-vsheQqNr.js';
import { o as objectType, s as stringType, c as coerce } from './types-C7xnNV5k.js';
import '@prisma/client';
import './utils-FiC4zhrQ.js';
import './parse-DXcVuhZ4.js';

const taxaSchema = objectType({
  tipo: stringType().min(1),
  codigo: stringType().min(1),
  regiao: stringType().min(1),
  descricao: stringType().min(1),
  valor: coerce.number().min(0, "Valor deve ser maior ou igual a 0"),
  observacao: stringType().optional().nullable()
});
const load = async () => {
  const taxas = await db.taxa.findMany({
    include: {
      _count: {
        select: {
          produtos: true
        }
      }
    }
  });
  const form = await superValidate(zod(taxaSchema));
  return {
    taxas: taxas.map((t) => ({
      ...t,
      valor: t.valor.toNumber()
    })),
    form
  };
};
const actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(taxaSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.taxa.create({
        data: form.data
      });
      return message(form, "Taxa criada com sucesso!");
    } catch (error) {
      console.error("Error creating tax:", error);
      return fail(500, {
        form,
        error: "Erro ao criar taxa"
      });
    }
  },
  edit: async ({ request, url }) => {
    const form = await superValidate(request, zod(taxaSchema));
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(400, { form, error: "ID da taxa não fornecido" });
    }
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.taxa.update({
        where: { id },
        data: form.data
      });
      return message(form, "Taxa atualizada com sucesso!");
    } catch (error) {
      console.error("Error updating tax:", error);
      return fail(500, {
        form,
        error: "Erro ao atualizar taxa"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 27;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bl7wjg_k.js')).default;
const server_id = "src/routes/(app)/cadastros/taxas/+page.server.ts";
const imports = ["_app/immutable/nodes/27.ZSVBvYPE.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C05BI6PQ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/C1-49jkj.js","_app/immutable/chunks/WKkgRa7A.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/tExnXwJ7.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/CyJIJDjq.js","_app/immutable/chunks/C8ASZhvd.js","_app/immutable/chunks/91OW602I.js","_app/immutable/chunks/Cgkz4crr.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/C3yVhP7I.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js","_app/immutable/chunks/Df8C-86c.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-UxKy5Fcb.js.map
