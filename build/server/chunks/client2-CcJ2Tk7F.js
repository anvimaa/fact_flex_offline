import './root-B0ubZxsu.js';
import { w as writable } from './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';

function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
function invalidateAll() {
  {
    throw new Error("Cannot call invalidateAll() on the server");
  }
}
async function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}

export { applyAction as a, goto as g, invalidateAll as i, stores as s };
//# sourceMappingURL=client2-CcJ2Tk7F.js.map
