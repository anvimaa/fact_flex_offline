import { e as error } from './index-BWA_9C9m.js';
import { s as servicos } from './constants-DhttDS3t.js';
import './utils-FiC4zhrQ.js';

const load = ({ params }) => {
  const servico = servicos.find((s) => s.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") === params.slug);
  if (!servico) {
    throw error(404, {
      message: "Serviço não encontrado"
    });
  }
  return {
    servico
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 71;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DooTMNuW.js')).default;
const server_id = "src/routes/(landing)/servicos/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/71.DpW583rR.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/DU78yB6-.js","_app/immutable/chunks/C6y7tQs4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DuR1xrli.js","_app/immutable/chunks/8TzZoK6t.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/Bj6ZxzB-.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=71-B5nCGez4.js.map
