import { e as error } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const load = async ({ params }) => {
  const cliente = await db.cliente.findUnique({
    where: { id: params.id },
    include: {
      empresa: true,
      _count: {
        select: {
          facturas: true,
          vendas: true,
          DocumentoFiscal: true
        }
      }
    }
  });
  if (!cliente) {
    throw error(404, "Cliente não encontrado");
  }
  const canDelete = cliente._count.facturas === 0 && cliente._count.vendas === 0 && cliente._count.DocumentoFiscal === 0;
  return {
    cliente,
    canDelete
  };
};
const actions = {
  delete: async ({ params }) => {
    try {
      await db.cliente.delete({
        where: {
          id: params.id
        }
      });
      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Erro ao excluir cliente" };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BiRxEg4U.js')).default;
const server_id = "src/routes/(app)/cadastros/clientes/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/17.BjzrpFtU.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/s2C54vnN.js","_app/immutable/chunks/DDfbYvrD.js","_app/immutable/chunks/-i6G_qng.js","_app/immutable/chunks/CLXrGED-.js","_app/immutable/chunks/B6NB2YT5.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/ByL5rCyh.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-Bkf9GbTI.js.map
