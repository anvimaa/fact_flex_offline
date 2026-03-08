import { av as head, an as ensure_array_like, aw as attr, az as attr_class, am as clsx, ax as store_get, ay as unsubscribe_stores, _ as derived, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { p as page } from './stores-BBk2HDxH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { h as cn, I as Icon } from './utils3-DjmiJAAD.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { L as Log_out } from './log-out-FXa2-WqQ.js';
import { B as Building_2 } from './building-2-iv7t62nJ.js';
import { U as Users } from './users-CSW0O0kd.js';
import { C as Credit_card } from './credit-card-BMaAHNh2.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './events-GtUqDgmb.js';

function Layout_dashboard($$renderer, $$props) {
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
      { "width": "7", "height": "9", "x": "3", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "14", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "9", "x": "14", "y": "12", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "3", "y": "16", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "layout-dashboard" },
    $$sanitized_props,
    {
      /**
       * @component @name LayoutDashboard
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4PSIzIiB5PSIzIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIxNCIgeT0iMyIgcng9IjEiIC8+CiAgPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIzIiB5PSIxNiIgcng9IjEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/layout-dashboard
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
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data, children } = $$props;
    let isLoginPage = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname === "/admin/login");
    const menuItems = [
      { title: "Dashboard", href: "/admin", icon: Layout_dashboard },
      { title: "Empresas", href: "/admin/empresas", icon: Building_2 },
      { title: "Utilizadores", href: "/admin/users", icon: Users },
      {
        title: "Pagamentos",
        href: "/admin/pagamentos",
        icon: Credit_card
      },
      { title: "Parceiros", href: "/admin/parceiros", icon: Users },
      { title: "Comissões", href: "/admin/comissoes", icon: File_text }
    ];
    head("we7dkw", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>FACT FLEXI | Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="relative flex min-h-screen">`);
    if (!isLoginPage()) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<aside class="sticky top-0 flex h-screen w-72 flex-col border-r bg-background px-4"><div class="flex h-14 items-center border-b px-2 py-4"><span class="text-lg font-semibold">FACT FLEXI Admin</span></div> <nav class="flex-1 space-y-2 py-4"><!--[-->`);
      const each_array = ensure_array_like(menuItems);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<a${attr("href", item.href)}${attr_class(clsx(cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground", store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href && "bg-accent")))}>`);
        if (item.icon) {
          $$renderer2.push("<!--[-->");
          item.icon($$renderer2, { class: "h-4 w-4" });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
        $$renderer2.push(` ${escape_html(item.title)}</a>`);
      }
      $$renderer2.push(`<!--]--></nav> <div class="border-t p-4"><div class="flex items-center gap-3 rounded-lg px-3 py-2"><div class="flex flex-1 items-center gap-3"><div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary"><span class="text-sm font-medium text-primary-foreground">S</span></div> <div class="flex flex-col"><span class="text-sm font-medium">${escape_html(data?.superAdmin?.name || "Super Admin")}</span> <span class="text-xs text-muted-foreground">Acesso Restrito</span></div></div></div> <div class="mt-2"><form method="POST" action="/admin/logout">`);
      Button($$renderer2, {
        type: "submit",
        variant: "ghost",
        class: "w-full justify-start gap-3",
        children: ($$renderer3) => {
          Log_out($$renderer3, { class: "h-4 w-4 text-destructive" });
          $$renderer3.push(`<!----> <span class="text-destructive font-medium">Sair com Segurança</span>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></form></div></div></aside>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex-1 overflow-auto"><div class="container mx-auto py-2">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-qc1bTkGs.js.map
