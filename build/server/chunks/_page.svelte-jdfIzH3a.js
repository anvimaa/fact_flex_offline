import { av as head, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import './events-GtUqDgmb.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './public-B844qK3e.js';

function Lock($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "11",
        "x": "3",
        "y": "11",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "lock" },
    $$sanitized_props,
    {
      /**
       * @component @name Lock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHg9IjMiIHk9IjExIiByeD0iMiIgcnk9IjIiIC8+CiAgPHBhdGggZD0iTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/lock
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let isLoading = false;
    head("40dz43", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>FACT FLEXI Admin | Login</title>`);
      });
    });
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-muted/30 px-4"><div class="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-sm"><div class="flex flex-col items-center space-y-2 text-center"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">`);
    Lock($$renderer2, { class: "h-6 w-6 text-primary" });
    $$renderer2.push(`<!----></div> <h1 class="text-2xl font-bold tracking-tight">Super Admin</h1> <p class="text-sm text-muted-foreground">Painel restrito a administradores de sistema.</p></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-500">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="space-y-6"><div class="space-y-4"><div class="space-y-2">`);
    Label($$renderer2, {
      for: "login",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Login`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Input($$renderer2, {
      id: "login",
      name: "login",
      required: true,
      disabled: isLoading,
      autocomplete: "off"
    });
    $$renderer2.push(`<!----></div> <div class="space-y-2">`);
    Label($$renderer2, {
      for: "password",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Palavra-passe Secreta`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Input($$renderer2, {
      id: "password",
      name: "password",
      type: "password",
      required: true,
      disabled: isLoading,
      autocomplete: "off"
    });
    $$renderer2.push(`<!----></div></div> `);
    Button($$renderer2, {
      type: "submit",
      class: "w-full",
      disabled: isLoading,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html("Entrar Seguramente")}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></form></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-jdfIzH3a.js.map
