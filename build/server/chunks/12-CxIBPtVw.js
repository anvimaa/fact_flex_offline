import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, z as zod } from './zod-vsheQqNr.js';
import { d as db } from './db-BUWqG89e.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import { o as objectType, b as booleanType, n as numberType, s as stringType } from './types-C7xnNV5k.js';
import './utils-FiC4zhrQ.js';
import './parse-DXcVuhZ4.js';
import '@prisma/client';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';

const parceiroSchema = objectType({
  id: stringType().optional(),
  nome: stringType().min(1, "Nome é obrigatório"),
  email: stringType().email("Email inválido"),
  telefone: stringType().optional().nullable(),
  codigoRecomendacao: stringType().min(1, "Código é obrigatório"),
  percentagemComissao: numberType().min(0).max(100).default(10),
  ativo: booleanType().default(true)
});
const load = async () => {
  const parceiros = await db.parceiro.findMany({
    include: {
      _count: {
        select: { empresas: true, comissoes: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const form = await superValidate(zod(parceiroSchema));
  return serialize({
    parceiros,
    form
  });
};
const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, zod(parceiroSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.parceiro.create({
        data: {
          nome: form.data.nome,
          email: form.data.email,
          telefone: form.data.telefone,
          codigoRecomendacao: form.data.codigoRecomendacao,
          percentagemComissao: form.data.percentagemComissao,
          ativo: form.data.ativo
        }
      });
      return { form, success: true, message: "Parceiro criado com sucesso!" };
    } catch (error) {
      console.error("Error creating parceiro:", error);
      return fail(500, { form, success: false, message: "Erro ao criar parceiro" });
    }
  },
  update: async ({ request }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, zod(parceiroSchema));
    if (!form.valid || !form.data.id) {
      return fail(400, { form });
    }
    try {
      await db.parceiro.update({
        where: { id: form.data.id },
        data: {
          nome: form.data.nome,
          email: form.data.email,
          telefone: form.data.telefone,
          codigoRecomendacao: form.data.codigoRecomendacao,
          percentagemComissao: form.data.percentagemComissao,
          ativo: form.data.ativo
        }
      });
      return { form, success: true, message: "Parceiro atualizado com sucesso!" };
    } catch (error) {
      console.error("Error updating parceiro:", error);
      return fail(500, { form, success: false, message: "Erro ao atualizar parceiro" });
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id")?.toString();
    if (!id) return fail(400, { success: false, message: "ID obrigatório" });
    try {
      await db.parceiro.delete({ where: { id } });
      return { success: true, message: "Parceiro removido com sucesso!" };
    } catch (err) {
      return fail(500, { success: false, message: "Erro ao remover parceiro" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-koF7H1zV.js')).default;
const server_id = "src/routes/(admin)/admin/parceiros/+page.server.ts";
const imports = ["_app/immutable/nodes/12.BrXv-0Xd.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/D6wW5i9R.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/C3L2ZEEU.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CxIBPtVw.js.map
