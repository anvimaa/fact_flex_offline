import { _ as derived, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function Chart_column($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "M18 17V9" }],
    ["path", { "d": "M13 17V5" }],
    ["path", { "d": "M8 17v-3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-column" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartColumn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0iTTE4IDE3VjkiIC8+CiAgPHBhdGggZD0iTTEzIDE3VjUiIC8+CiAgPHBhdGggZD0iTTggMTd2LTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-column
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Page_header($$renderer, $$props) {
  let { title, description, icon } = $$props;
  const PageIcon = derived(() => icon);
  $$renderer.push(`<div class="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 ring-1 ring-gray-200/50 backdrop-blur-xl transition-all dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-transparent dark:ring-white/10"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">`);
  if (PageIcon()) {
    $$renderer.push("<!--[-->");
    PageIcon()($$renderer, { class: "h-6 w-6" });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
  $$renderer.push(`</div> <div><h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">${escape_html(title)}</h1> <p class="text-gray-600 dark:text-gray-400">${escape_html(description)}</p></div></div> <div></div></div></div>`);
}

export { Chart_column as C, Page_header as P };
//# sourceMappingURL=page-header-DmZsTkVi.js.map
