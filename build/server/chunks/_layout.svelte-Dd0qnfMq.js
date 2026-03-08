import { T as Toaster, d as disableTransitions, t as themeColors, a as darkClassNames, l as lightClassNames, m as modeStorageKey, b as themeStorageKey, s as setInitialMode, c as defineConfig } from './Toaster-7LkCQXIZ.js';
import { ak as fallback, av as head, aq as bind_props, aw as attr } from './index-DPRpZFUH.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './index2-Cz2gv4fD.js';
import './index-server-CziyT60N.js';
import './escaping-CqgfEcN3.js';

function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Mode_watcher($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let trueNonce;
    let track = fallback($$props["track"], true);
    let defaultMode = fallback($$props["defaultMode"], "system");
    let themeColors$1 = fallback($$props["themeColors"], () => void 0, true);
    let disableTransitions$1 = fallback($$props["disableTransitions"], true);
    let darkClassNames$1 = fallback($$props["darkClassNames"], () => ["dark"], true);
    let lightClassNames$1 = fallback($$props["lightClassNames"], () => [], true);
    let defaultTheme = fallback($$props["defaultTheme"], "");
    let nonce = fallback($$props["nonce"], "");
    let themeStorageKey$1 = fallback($$props["themeStorageKey"], "mode-watcher-theme");
    let modeStorageKey$1 = fallback($$props["modeStorageKey"], "mode-watcher-mode");
    const initConfig = defineConfig({
      defaultMode,
      themeColors: themeColors$1,
      darkClassNames: darkClassNames$1,
      lightClassNames: lightClassNames$1,
      defaultTheme,
      modeStorageKey: modeStorageKey$1,
      themeStorageKey: themeStorageKey$1
    });
    disableTransitions.set(disableTransitions$1);
    themeColors.set(themeColors$1);
    darkClassNames.set(darkClassNames$1);
    lightClassNames.set(lightClassNames$1);
    modeStorageKey.set(modeStorageKey$1);
    themeStorageKey.set(themeStorageKey$1);
    trueNonce = typeof window === "undefined" ? nonce : "";
    head("157sqhd", $$renderer2, ($$renderer3) => {
      if (themeColors$1) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="theme-color"${attr("content", themeColors$1.dark)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (trueNonce) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`${html(`<script nonce=${trueNonce}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`${html(`<script>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`);
      }
      $$renderer3.push(`<!--]-->`);
    });
    bind_props($$props, {
      track,
      defaultMode,
      themeColors: themeColors$1,
      disableTransitions: disableTransitions$1,
      darkClassNames: darkClassNames$1,
      lightClassNames: lightClassNames$1,
      defaultTheme,
      nonce,
      themeStorageKey: themeStorageKey$1,
      modeStorageKey: modeStorageKey$1
    });
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  Mode_watcher($$renderer, {});
  $$renderer.push(`<!----> `);
  Toaster($$renderer, { position: "top-center" });
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!---->`);
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-Dd0qnfMq.js.map
