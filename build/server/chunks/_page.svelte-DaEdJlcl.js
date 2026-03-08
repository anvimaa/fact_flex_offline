import { av as head, az as attr_class, aw as attr, _ as derived, ax as store_get, ah as sanitize_props, ai as spread_props, ap as slot, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { a as authClient } from './auth-client-DRWmmDkL.js';
import { B as Button } from './button-DjcfiVkK.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { u as Circle_check, x as formatDate, y as formatDateTime, l as Circle_x, I as Icon } from './utils3-DjmiJAAD.js';
import { U as User } from './user-D18r-fvg.js';
import { M as Mail } from './mail-B-m3CooH.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { U as Upload } from './upload-DVPyzTWg.js';
import './index-CQZxJQQs.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './index2-Cz2gv4fD.js';
import './public-B844qK3e.js';

function Pen_line($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 20h9" }],
    [
      "path",
      {
        "d": "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "pen-line" },
    $$sanitized_props,
    {
      /**
       * @component @name PenLine
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMjBoOSIgLz4KICA8cGF0aCBkPSJNMTYuMzc2IDMuNjIyYTEgMSAwIDAgMSAzLjAwMiAzLjAwMkw3LjM2OCAxOC42MzVhMiAyIDAgMCAxLS44NTUuNTA2bC0yLjg3Mi44MzhhLjUuNSAwIDAgMS0uNjItLjYybC44MzgtMi44NzJhMiAyIDAgMCAxIC41MDYtLjg1NHoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/pen-line
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
    var $$store_subs;
    let { data } = $$props;
    let user = derived(() => data.user);
    const session = authClient.useSession();
    const isOwnProfile = derived(() => store_get($$store_subs ??= {}, "$session", session).data?.user?.id === user()?.id);
    let isEditing = false;
    let editedUser = derived(() => ({ ...user() }));
    let isSubmitting = false;
    function toggleEdit() {
      isEditing = !isEditing;
      if (!isEditing) {
        editedUser({ ...user() });
      }
    }
    async function handleSave() {
      try {
        isSubmitting = true;
        const response = await fetch("/api/profile/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editedUser().name })
        });
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor");
        }
        const result = await response.json();
        if (result.success) {
          toast.success("Perfil atualizado com sucesso!");
          data.user = result.user;
          isEditing = false;
        } else {
          toast.error(result.error || "Erro ao atualizar perfil");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
        toast.error("Erro ao atualizar perfil");
      } finally {
        isSubmitting = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("710dm7", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>FACT FLEXI - Perfil do Usuário</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto px-4 py-8"><div class="grid gap-8 md:grid-cols-3"><div class="md:col-span-2"><div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"><div class="mb-8 flex items-center space-x-6"><div class="relative"><div${attr_class("group relative cursor-pointer", void 0, { "cursor-pointer": isEditing })} role="button" tabindex="0">`);
      if (data.user?.image) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<img${attr("src", data.user.image)} alt="Foto de perfil" class="h-24 w-24 rounded-full object-cover ring-4 ring-purple-100 transition-all group-hover:ring-purple-200 dark:ring-purple-900 dark:group-hover:ring-purple-800"/>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 ring-4 ring-purple-100 transition-all group-hover:ring-purple-200 dark:ring-purple-900 dark:group-hover:ring-purple-800"><span class="text-3xl font-bold text-white">${escape_html(data.user?.name?.[0]?.toUpperCase() || "?")}</span></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (isEditing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">`);
        Upload($$renderer3, { class: "h-6 w-6 text-white" });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <input type="file" accept="image/*" class="hidden"/></div> <div><h2 class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(data.user?.name)}</h2> <p class="text-gray-600 dark:text-gray-400">${escape_html(data.user?.email)}</p></div></div> <div class="mb-6 flex items-center justify-between"><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Perfil</h1> `);
      if (isOwnProfile()) {
        $$renderer3.push("<!--[-->");
        Button($$renderer3, {
          variant: "outline",
          onclick: () => toggleEdit(),
          children: ($$renderer4) => {
            if (isEditing) {
              $$renderer4.push("<!--[-->");
              Circle_x($$renderer4, { class: "mr-2 h-4 w-4" });
              $$renderer4.push(`<!----> Cancelar`);
            } else {
              $$renderer4.push("<!--[!-->");
              Pen_line($$renderer4, { class: "mr-2 h-4 w-4" });
              $$renderer4.push(`<!----> Editar`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="space-y-6"><div class="flex items-center space-x-4"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">`);
      User($$renderer3, { class: "h-6 w-6 text-purple-600 dark:text-purple-300" });
      $$renderer3.push(`<!----></div> <div class="flex-1">`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Nome Completo`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (isEditing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex gap-2">`);
        Input($$renderer3, {
          class: "dark:border-white",
          placeholder: "Nome",
          get value() {
            return editedUser().name;
          },
          set value($$value) {
            editedUser().name = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-lg font-medium text-gray-900 dark:text-white">${escape_html(data.user?.name)}</p>`);
      }
      $$renderer3.push(`<!--]--></div></div> <div class="flex items-center space-x-4"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">`);
      Mail($$renderer3, { class: "h-6 w-6 text-blue-600 dark:text-blue-300" });
      $$renderer3.push(`<!----></div> <div class="flex-1">`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Email`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="flex items-center gap-2"><p class="text-lg text-gray-900 dark:text-white">${escape_html(data.user?.email)}</p> `);
      if (data.user?.emailVerified) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<span class="flex items-center text-sm text-green-600 dark:text-green-400">`);
        Circle_check($$renderer3, { class: "mr-1 h-4 w-4" });
        $$renderer3.push(`<!----> Verificado</span>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></div> <div class="flex items-center justify-between space-x-4"><div class="flex items-center space-x-4"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">`);
      Calendar($$renderer3, { class: "h-6 w-6 text-green-600 dark:text-green-300" });
      $$renderer3.push(`<!----></div> <div class="flex-1">`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Conta Criada desde`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <p class="text-lg text-gray-900 dark:text-white">${escape_html(data.user?.createdAt.toLocaleDateString("pt-BR", formatDate))}</p></div></div> <div class="flex items-center space-x-4"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">`);
      Calendar($$renderer3, { class: "h-6 w-6 text-green-600 dark:text-green-300" });
      $$renderer3.push(`<!----></div> <div class="flex-1">`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Última atualização`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <p class="text-lg text-gray-900 dark:text-white">${escape_html(data.user?.updatedAt.toLocaleDateString("pt-BR", formatDateTime))}</p></div></div></div> `);
      if (isEditing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex justify-end space-x-2 pt-4">`);
        Button($$renderer3, {
          variant: "outline",
          onclick: () => toggleEdit(),
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          onclick: () => handleSave(),
          disabled: isSubmitting,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Salvar Alterações`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></div> <div class="space-y-6"><div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"><h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Status da Conta</h2> <div class="space-y-4"><div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Email Verificado</span> <span${attr_class(`flex items-center ${data.user?.emailVerified ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`)}>`);
      if (data.user?.emailVerified) {
        $$renderer3.push("<!--[-->");
        Circle_check($$renderer3, { class: "mr-1 h-4 w-4" });
        $$renderer3.push(`<!----> Sim`);
      } else {
        $$renderer3.push("<!--[!-->");
        Circle_x($$renderer3, { class: "mr-1 h-4 w-4" });
        $$renderer3.push(`<!----> Não`);
      }
      $$renderer3.push(`<!--]--></span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Estado da Conta</span> <span${attr_class(`flex items-center ${data.user?.active ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`)}>`);
      if (data.user?.active) {
        $$renderer3.push("<!--[-->");
        Circle_check($$renderer3, { class: "mr-1 h-4 w-4" });
        $$renderer3.push(`<!----> Activado`);
      } else {
        $$renderer3.push("<!--[!-->");
        Circle_x($$renderer3, { class: "mr-1 h-4 w-4" });
        $$renderer3.push(`<!----> Inactivado`);
      }
      $$renderer3.push(`<!--]--></span></div></div></div></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DaEdJlcl.js.map
