import { d as db } from './db-BUWqG89e.js';
import { e as error, r as redirect } from './index-BWA_9C9m.js';
import '@prisma/client';
import './utils-FiC4zhrQ.js';

const load = async ({ params }) => {
  const cliente = await db.cliente.findUnique({
    where: { id: params.id }
  });
  if (!cliente) {
    redirect(307, "/cadastros/clientes");
  }
  return {
    cliente
  };
};
const actions = {
  default: async ({ params }) => {
    try {
      await db.cliente.delete({
        where: { id: params.id }
      });
    } catch (err) {
      console.error("Error deleting client:", err);
      throw error(500, "Erro ao excluir cliente");
    } finally {
      redirect(303, "/cadastros/clientes");
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CGt03JO1.js')).default;
const server_id = "src/routes/(app)/cadastros/clientes/delete/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/18.DUZ01trZ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-lk57yQEl.js.map
