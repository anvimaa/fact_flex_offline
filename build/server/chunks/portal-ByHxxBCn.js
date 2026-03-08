import { aD as getAllContexts, _ as derived } from './index-DPRpZFUH.js';
import { m as mount, u as unmount } from './index-server-CziyT60N.js';
import { w as watch } from './use-id-BeJs9ypc.js';
import { i as isBrowser } from './noop-CfhljDhh.js';

function Portal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { to = "body", children, disabled } = $$props;
    getAllContexts();
    let target = derived(getTarget);
    function getTarget() {
      if (!isBrowser || disabled) return null;
      let localTarget = null;
      if (typeof to === "string") {
        localTarget = document.querySelector(to);
      } else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
        localTarget = to;
      } else ;
      return localTarget;
    }
    let instance;
    function unmountInstance() {
      if (instance) {
        unmount();
        instance = null;
      }
    }
    watch([() => target(), () => disabled], ([target2, disabled2]) => {
      if (!target2 || disabled2) {
        unmountInstance();
        return;
      }
      instance = mount();
      return () => {
        unmountInstance();
      };
    });
    if (disabled) {
      $$renderer2.push("<!--[-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { Portal as P };
//# sourceMappingURL=portal-ByHxxBCn.js.map
