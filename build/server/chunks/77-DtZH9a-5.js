import { e as error } from './index-BWA_9C9m.js';
import { p as plans } from './constants-DhttDS3t.js';
import './utils-FiC4zhrQ.js';

const load = async ({ url }) => {
  const selectedPlan = url.searchParams.get("plano");
  const selectedPeriod = url.searchParams.get("periodo");
  const plan = plans.find((plan2) => plan2.id === selectedPlan);
  if (!plan) {
    throw error(404, "Plano não encontrado");
  }
  return {
    selectedPlan,
    selectedPeriod: selectedPeriod === "mensal" ? "mensal" : "anual"
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 77;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CVTBfi8i.js')).default;
const server_id = "src/routes/pagamento/+page.server.ts";
const imports = ["_app/immutable/nodes/77.DHhgL5H2.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/DU78yB6-.js","_app/immutable/chunks/C6y7tQs4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/3qPBDteD.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DcvGvDXv.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DuR1xrli.js","_app/immutable/chunks/BwOxh7gK.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/57zjA3Wr.js","_app/immutable/chunks/DH_bmPGr.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/77.DHiSxrAz.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=77-DtZH9a-5.js.map
