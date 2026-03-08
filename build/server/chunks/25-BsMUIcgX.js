import { d as db } from './db-BUWqG89e.js';
import { e as error } from './index-BWA_9C9m.js';
import '@prisma/client';
import './utils-FiC4zhrQ.js';

const load = async ({ params }) => {
  const produto = await db.produto.findUnique({
    where: { id: params.id }
  });
  if (!produto) {
    throw error(404, "Produto não encontrado");
  }
  return {
    produto
  };
};
const actions = {
  default: async ({ params }) => {
    try {
      await db.produto.delete({
        where: { id: params.id }
      });
      return { success: true };
    } catch (err) {
      console.error("Error deleting product:", err);
      throw error(500, "Erro ao excluir produto");
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-6klXdU_i.js')).default;
const server_id = "src/routes/(app)/cadastros/produtos/delete/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/25.TacfscFv.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-BsMUIcgX.js.map
