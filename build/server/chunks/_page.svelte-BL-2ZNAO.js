import { av as head, aw as attr, az as attr_class, an as ensure_array_like, _ as derived } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import './events-GtUqDgmb.js';
import './utils3-DjmiJAAD.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let startDate = "";
    let endDate = "";
    let status = "idle";
    let errors = { start: "", end: "", api: "" };
    const canExport = derived(() => startDate && endDate);
    const isLoading = derived(() => status === "loading");
    function setPreset(preset) {
      const today = /* @__PURE__ */ new Date();
      const y = today.getFullYear();
      const m = today.getMonth();
      let start, end;
      switch (preset) {
        case "this_month":
          start = new Date(y, m, 1);
          end = new Date(y, m + 1, 0);
          break;
        case "last_month":
          start = new Date(y, m - 1, 1);
          end = new Date(y, m, 0);
          break;
        case "last_30_days":
          start = /* @__PURE__ */ new Date();
          start.setDate(today.getDate() - 30);
          end = today;
          break;
        case "last_year":
          start = new Date(y - 1, m, 1);
          end = new Date(y, m + 1, 0);
          break;
      }
      startDate = start?.toISOString().split("T")[0];
      endDate = end?.toISOString().split("T")[0];
      status = "idle";
    }
    setPreset("this_month");
    head("oxx0j7", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Exportação SAFT-AO</title>`);
      });
    });
    $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-5"><aside class="col-span-1 bg-white p-8 dark:bg-zinc-900 lg:col-span-2"><header class="mb-10 flex items-center gap-4"><div class="rounded-lg bg-blue-600 p-3 shadow-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg></div> <div><h1 class="text-2xl font-bold">Exportar SAFT-AO</h1> <p class="text-sm">Ferramenta avançada de exportação</p></div></header> <div class="space-y-8"><div><label for="btnmo" class="mb-3 block text-sm font-semibold">Períodos Rápidos</label> <div class="grid grid-cols-4 gap-2">`);
    Button($$renderer2, {
      onclick: () => setPreset("this_month"),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Este Mês`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      onclick: () => setPreset("last_month"),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Mês Passado`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      onclick: () => setPreset("last_30_days"),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->30 Dias`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      onclick: () => setPreset("last_year"),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->1 ano`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div><label for="btnm" class="mb-3 block text-sm font-semibold">Período Personalizado</label> <div class="space-y-4"><div><label for="start-date" class="text-xs font-medium">De</label> <input type="date" id="start-date"${attr("value", startDate)}${attr_class("mt-1 w-full rounded-md border p-2.5 shadow-sm transition focus:border-blue-500 focus:ring-2", void 0, {
      "border-red-500": errors.start,
      "focus:ring-red-500": errors.start,
      "border-slate-300": true
    })}/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div><label for="end-date" class="text-xs font-medium">Até</label> <input type="date" id="end-date"${attr("value", endDate)}${attr_class("mt-1 w-full rounded-md border p-2.5 shadow-sm transition focus:border-blue-500 focus:ring-2", void 0, {
      "border-red-500": errors.end,
      "focus:ring-red-500": errors.end,
      "border-slate-300": true
    })}/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="border-t border-slate-200 pt-4"><button${attr("disabled", !canExport() || isLoading(), true)} class="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none">`);
    if (isLoading()) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span>A Gerar Ficheiro...</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"></path></svg> <span>Exportar Agora</span>`);
    }
    $$renderer2.push(`<!--]--></button></div></div></aside> <main class="col-span-1 overflow-y-auto p-8 lg:col-span-3 lg:p-12"><div class="min-h-[90px]">`);
    if (status === "success") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-start gap-4 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 text-emerald-800 shadow-sm" role="alert"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 flex-shrink-0 text-emerald-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg> <div><h3 class="font-bold">Exportação Concluída</h3> <p class="text-sm">O ficheiro foi gerado com sucesso e o download foi iniciado.</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (status === "error" && errors.api) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-start gap-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4 text-rose-800 shadow-sm" role="alert"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 flex-shrink-0 text-rose-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"></path></svg> <div><h3 class="font-bold">Ocorreu um Erro</h3> <p class="text-sm">${escape_html(errors.api)}</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8"><h2 class="mb-4 text-xl font-bold">Histórico de Exportações</h2> `);
    if (data.exportHistory.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="rounded-lg bg-slate-100 px-6 py-12 text-center dark:bg-zinc-800"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12 text-slate-400"><path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836A8.967 8.967 0 0 1 12 3c1.18 0 2.32.22 3.364.636m-6.728 0a8.966 8.966 0 0 0-3.364.636M12 21a8.966 8.966 0 0 1-3.364-.636m0 0a8.966 8.966 0 0 0-3.364-3.364m6.728 3.364a8.966 8.966 0 0 1 3.364-3.364m0 0a8.966 8.966 0 0 0 3.364-3.364m-6.728-3.364a8.966 8.966 0 0 1-3.364-3.364"></path></svg> <p class="mt-4">Ainda não foram realizadas exportações.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<ul class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(data.exportHistory);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<li class="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:bg-zinc-800"><div class="flex items-center gap-4">`);
        if (item.status === "success") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="text-rose-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg></div>`);
        }
        $$renderer2.push(`<!--]--> <div><p class="font-semibold">${escape_html(item.fileName)}</p> <p class="text-sm">Período: ${escape_html(item.period)}</p></div></div> <span class="group-hover: text-xs text-slate-400">${escape_html(item.createdAt.toLocaleDateString("pt-PT", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }))}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div></main></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BL-2ZNAO.js.map
