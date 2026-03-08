import { f as fail } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';

const load = async () => {
  const comissoes = await db.comissao.findMany({
    include: {
      parceiro: true,
      empresa: true,
      payment: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return serialize({
    comissoes
  });
};
const actions = {
  apurar: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    if (!id) return fail(400, { success: false, message: "ID obrigatório para apuramento." });
    try {
      const comissao = await db.comissao.findUnique({ where: { id } });
      if (!comissao || comissao.status !== "PENDENTE") {
        return fail(400, { success: false, message: "Comissão não encontrada ou já apurada." });
      }
      await db.comissao.update({
        where: { id },
        data: {
          status: "APURADA",
          dataApuramento: /* @__PURE__ */ new Date()
        }
      });
      return { success: true, message: "Comissão apurada com sucesso!" };
    } catch (error) {
      console.error("Error apurando comissão:", error);
      return fail(500, { success: false, message: "Erro ao apurar a comissão." });
    }
  },
  pagar: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    if (!id) return fail(400, { success: false, message: "ID obrigatório para pagamento." });
    try {
      const comissao = await db.comissao.findUnique({ where: { id } });
      if (!comissao || comissao.status !== "APURADA") {
        return fail(400, { success: false, message: "A comissão precisa estar apurada para ser liquidada." });
      }
      await db.comissao.update({
        where: { id },
        data: {
          status: "PAGA"
        }
      });
      return { success: true, message: "Comissão registada como paga!" };
    } catch (error) {
      console.error("Error liquidando comissão:", error);
      return fail(500, { success: false, message: "Erro ao liquidar a comissão." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dm1lF6Ke.js')).default;
const server_id = "src/routes/(admin)/admin/comissoes/+page.server.ts";
const imports = ["_app/immutable/nodes/6.DNW3p6V-.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/BNRiUsVl.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-DX6soKWp.js.map
