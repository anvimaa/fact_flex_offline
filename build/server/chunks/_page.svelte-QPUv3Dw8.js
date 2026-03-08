import { av as head, an as ensure_array_like, az as attr_class, aB as stringify, aA as attr_style, aw as attr } from './index-DPRpZFUH.js';
import { C as Clock, f as formatCurrency } from './utils3-DjmiJAAD.js';
import { T as Trending_up } from './trending-up-suqfe4Iy.js';
import { F as File_check } from './file-check-CmnhUGqR.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { R as Receipt } from './receipt-DYJGkjI7.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-BVkdjet-.js';
import { E as Eye } from './eye-BbooT3RA.js';
import { S as Shopping_cart } from './shopping-cart-DlXvsSgE.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';

function quickActionBtn($$renderer, href, label, description, icon) {
  const ActionIcon = icon;
  $$renderer.push(`<a${attr("href", href)} class="group flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-gray-200/50 transition-all hover:shadow-md dark:bg-white/5 dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">`);
  if (ActionIcon) {
    $$renderer.push("<!--[-->");
    ActionIcon($$renderer, { class: "h-5 w-5" });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
  $$renderer.push(`</div> <div><p class="font-medium text-gray-900 dark:text-white">${escape_html(label)}</p> <p class="text-xs text-gray-600 dark:text-gray-400">${escape_html(description)}</p></div></a>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const statsConfig = {
      faturasEmitidas: {
        icone: Receipt,
        corIcone: "text-blue-500",
        corFundo: "bg-blue-500/10",
        corBorda: "border-blue-500/20",
        gradiente: "from-blue-500/20 to-blue-600/20"
      },
      valorFaturado: {
        icone: Dollar_sign,
        corIcone: "text-green-500",
        corFundo: "bg-green-500/10",
        corBorda: "border-green-500/20",
        gradiente: "from-green-500/20 to-green-600/20"
      },
      proformasConvertidas: {
        icone: File_check,
        corIcone: "text-purple-500",
        corFundo: "bg-purple-500/10",
        corBorda: "border-purple-500/20",
        gradiente: "from-purple-500/20 to-purple-600/20"
      },
      receitaProjetada: {
        icone: Trending_up,
        corIcone: "text-orange-500",
        corFundo: "bg-orange-500/10",
        corBorda: "border-orange-500/20",
        gradiente: "from-orange-500/20 to-orange-600/20"
      }
    };
    function getStatsEntries(stats) {
      return Object.entries(stats);
    }
    const quickActions = [
      {
        href: "/documentos/factura/nova",
        label: "Nova Fatura",
        description: "Emitir factura",
        icon: Receipt
      },
      {
        href: "/documentos/pro-forma/nova",
        label: "Pró-forma",
        description: "Emitir Pró-forma",
        icon: Receipt
      },
      {
        href: "/cadastros/produtos",
        label: "Produtos",
        description: "Ver catálogo",
        icon: Shopping_cart
      },
      {
        href: "/reports",
        label: "Relatórios",
        description: "Análises detalhadas",
        icon: Trending_up
      }
    ];
    const maxChartValue = Math.max(...data.dadosGrafico.map((d) => d.valor), 1);
    head("1tyszyy", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard - FACT FLEXI</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 ring-1 ring-gray-200/50 backdrop-blur-xl transition-all dark:bg-gradient-to-br dark:from-blue-500/10 dark:via-purple-500/10 dark:to-transparent dark:ring-1 dark:ring-white/10"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Bem-vindo de volta! 👋</h1> <p class="mt-1 text-gray-600 dark:text-gray-400">Aqui está o resumo do seu negócio hoje</p></div> <div class="hidden md:block"><div class="flex items-center gap-2 rounded-xl px-4 py-2 ring-1 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10">`);
    Clock($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }))}</span></div></div></div></div> <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:ring-1 dark:ring-white/10"><h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Ações Rápidas</h3> <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
    const each_array = ensure_array_like(quickActions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let action = each_array[$$index];
      quickActionBtn($$renderer2, action.href, action.label, action.description, action.icon);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4"><!--[-->`);
    const each_array_1 = ensure_array_like(getStatsEntries(data.stats));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let [key, stat] = each_array_1[$$index_1];
      const config = statsConfig[key];
      $$renderer2.push(`<div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white/5 dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:shadow-xl"><div${attr_class(`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stringify(config?.gradiente)}`)}></div> <div class="relative"><div class="flex items-start justify-between"><div class="flex-1"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">${escape_html(key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))}</p> <div class="mt-2 flex items-baseline gap-2"><h3 class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(key === "proformasConvertidas" ? `${stat.valor}%` : key === "valorFaturado" || key === "receitaProjetada" ? formatCurrency(stat.valor) : stat.valor.toLocaleString("pt-BR"))}</h3></div> <div class="mt-3 flex items-center gap-2"><span${attr_class(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${stat.crescimento > 0 ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"}`)}>`);
      if (stat.crescimento > 0) {
        $$renderer2.push("<!--[-->");
        Arrow_up($$renderer2, { class: "h-3 w-3" });
      } else {
        $$renderer2.push("<!--[!-->");
        Arrow_down($$renderer2, { class: "h-3 w-3" });
      }
      $$renderer2.push(`<!--]--> ${escape_html(Math.abs(stat.crescimento))}%</span> <p class="text-xs text-gray-500 dark:text-gray-500">${escape_html(stat.subTexto)}</p></div></div> <div${attr_class(`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stringify(config?.corFundo)} ring-1 ${stringify(config?.corBorda)}`)}>`);
      if (key === "faturasEmitidas") {
        $$renderer2.push("<!--[-->");
        Receipt($$renderer2, { class: `h-6 w-6 ${stringify(config?.corIcone)}` });
      } else if (key === "valorFaturado") {
        $$renderer2.push("<!--[1-->");
        Dollar_sign($$renderer2, { class: `h-6 w-6 ${stringify(config?.corIcone)}` });
      } else if (key === "proformasConvertidas") {
        $$renderer2.push("<!--[2-->");
        File_check($$renderer2, { class: `h-6 w-6 ${stringify(config?.corIcone)}` });
      } else if (key === "receitaProjetada") {
        $$renderer2.push("<!--[3-->");
        Trending_up($$renderer2, { class: `h-6 w-6 ${stringify(config?.corIcone)}` });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid gap-6 lg:grid-cols-2"><div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-1 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Faturamento Mensal</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Últimos 5 meses</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">`);
    Trending_up($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><!--[-->`);
    const each_array_2 = ensure_array_like(data.dadosGrafico);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let { mes, valor } = each_array_2[$$index_2];
      const percentage = valor / maxChartValue * 100;
      $$renderer2.push(`<div class="space-y-2"><div class="flex items-center justify-between text-sm"><span class="font-medium text-gray-700 dark:text-gray-300">${escape_html(mes)}</span> <span class="font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(valor))}</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-1 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Últimos Documentos</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Atividade recente</p></div> <a href="/documentos/fiscais" class="flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-300 dark:text-blue-400">Ver tudo `);
    Eye($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----></a></div> <div class="space-y-3"><!--[-->`);
    const each_array_3 = ensure_array_like(data.ultimasOperacoes);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let op = each_array_3[$$index_3];
      $$renderer2.push(`<div class="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">`);
      if (op.tipo === "Fatura") {
        $$renderer2.push("<!--[-->");
        Receipt($$renderer2, { class: "h-5 w-5 text-blue-600" });
      } else {
        $$renderer2.push("<!--[!-->");
        File_check($$renderer2, { class: "h-5 w-5 text-purple-600" });
      }
      $$renderer2.push(`<!--]--></div> <div><p class="font-medium text-gray-900 dark:text-white">${escape_html(op.cliente)}</p> <div class="flex items-center gap-2"><p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(op.tipo)}</p> <span class="text-gray-500">•</span> <p class="text-sm text-gray-500 dark:text-gray-400">${escape_html(new Date(op.data).toLocaleDateString("pt-BR"))}</p></div></div></div> <div class="text-right"><p class="font-semibold text-gray-900 dark:text-white">${escape_html(formatCurrency(op.valor))}</p> <span${attr_class(`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${op.status === "Paga" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : op.status === "Pendente" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400" : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"}`)}>${escape_html(op.status)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-QPUv3Dw8.js.map
