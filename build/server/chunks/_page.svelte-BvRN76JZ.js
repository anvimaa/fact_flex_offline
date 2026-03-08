import { av as head, az as attr_class, an as ensure_array_like, aA as attr_style, aB as stringify, _ as derived, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { P as Page_header, C as Chart_column } from './page-header-DmZsTkVi.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { A as Activity } from './activity-0wvLMWe1.js';
import { T as Trending_up } from './trending-up-suqfe4Iy.js';
import { U as Users } from './users-CSW0O0kd.js';
import { k as Circle_check_big, l as Circle_x, m as Circle_alert, C as Clock, I as Icon } from './utils3-DjmiJAAD.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-BVkdjet-.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';

function Shopping_bag($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      { "d": "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }
    ],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M16 10a4 4 0 0 1-8 0" }]
  ];
  Icon($$renderer, spread_props([
    { name: "shopping-bag" },
    $$sanitized_props,
    {
      /**
       * @component @name ShoppingBag
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiAyIDMgNnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNmwtMy00WiIgLz4KICA8cGF0aCBkPSJNMyA2aDE4IiAvPgogIDxwYXRoIGQ9Ik0xNiAxMGE0IDQgMCAwIDEtOCAwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/shopping-bag
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
function Target($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["circle", { "cx": "12", "cy": "12", "r": "6" }],
    ["circle", { "cx": "12", "cy": "12", "r": "2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "target" },
    $$sanitized_props,
    {
      /**
       * @component @name Target
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/target
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
    let { data } = $$props;
    function formatCurrency(value) {
      return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2 }).format(value);
    }
    function formatPercentage(value) {
      return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
    }
    function getGrowthIcon(value) {
      return value >= 0 ? Arrow_up : Arrow_down;
    }
    const maxRevenueValue = derived(() => Math.max(...data.revenueByMonth.map((d) => d.valor), 1));
    const maxInvoicesValue = derived(() => Math.max(...data.invoicesByMonth.map((d) => d.quantidade), 1));
    const maxForecastValue = derived(() => Math.max(...data.salesForecast.map((d) => d.valorPrevisto), 1));
    const SvelteComponent = derived(() => getGrowthIcon(data.performanceMetrics.growth.revenue));
    const SvelteComponent_1 = derived(() => getGrowthIcon(data.performanceMetrics.growth.invoices));
    const SvelteComponent_2 = derived(() => getGrowthIcon(data.performanceMetrics.growth.avgTicket));
    head("yvow2i", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>FACT FLEXI | Análises</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6">`);
    Page_header($$renderer2, {
      title: "Análises",
      description: "Insights detalhados e métricas de desempenho do seu negócio",
      icon: Chart_column
    });
    $$renderer2.push(`<!----> <div class="grid gap-6 md:grid-cols-3"><div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:shadow-xl"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div> <div class="relative"><div class="flex items-start justify-between"><div class="flex-1"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Receita do Mês</p> <div class="mt-2 flex items-baseline gap-2"><h3 class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(data.performanceMetrics.currentMonth.revenue))}</h3></div> <p class="mt-1 text-xs text-gray-600 dark:text-gray-500">Anterior: ${escape_html(formatCurrency(data.performanceMetrics.lastMonth.revenue))}</p> <div class="mt-3 flex items-center gap-2"><span${attr_class(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${data.performanceMetrics.growth.revenue > 0 ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"}`)}>`);
    if (SvelteComponent()) {
      $$renderer2.push("<!--[-->");
      SvelteComponent()($$renderer2, { class: "h-3 w-3" });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(` ${escape_html(formatPercentage(data.performanceMetrics.growth.revenue))}</span></div></div> <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20 transition-transform duration-300 group-hover:scale-110">`);
    Dollar_sign($$renderer2, { class: "h-6 w-6 text-green-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div></div> <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:shadow-xl"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div> <div class="relative"><div class="flex items-start justify-between"><div class="flex-1"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Faturas Emitidas</p> <div class="mt-2 flex items-baseline gap-2"><h3 class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(data.performanceMetrics.currentMonth.invoices)}</h3></div> <p class="mt-1 text-xs text-gray-600 dark:text-gray-500">Anterior: ${escape_html(data.performanceMetrics.lastMonth.invoices)}</p> <div class="mt-3 flex items-center gap-2"><span${attr_class(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${data.performanceMetrics.growth.invoices > 0 ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"}`)}>`);
    if (SvelteComponent_1()) {
      $$renderer2.push("<!--[-->");
      SvelteComponent_1()($$renderer2, { class: "h-3 w-3" });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(` ${escape_html(formatPercentage(data.performanceMetrics.growth.invoices))}</span></div></div> <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 transition-transform duration-300 group-hover:scale-110">`);
    File_text($$renderer2, { class: "h-6 w-6 text-blue-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div></div> <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:shadow-xl"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div> <div class="relative"><div class="flex items-start justify-between"><div class="flex-1"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Ticket Médio</p> <div class="mt-2 flex items-baseline gap-2"><h3 class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(data.performanceMetrics.currentMonth.avgTicket))}</h3></div> <p class="mt-1 text-xs text-gray-600 dark:text-gray-500">Anterior: ${escape_html(formatCurrency(data.performanceMetrics.lastMonth.avgTicket))}</p> <div class="mt-3 flex items-center gap-2"><span${attr_class(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${data.performanceMetrics.growth.avgTicket > 0 ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"}`)}>`);
    if (SvelteComponent_2()) {
      $$renderer2.push("<!--[-->");
      SvelteComponent_2()($$renderer2, { class: "h-3 w-3" });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(` ${escape_html(formatPercentage(data.performanceMetrics.growth.avgTicket))}</span></div></div> <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20 transition-transform duration-300 group-hover:scale-110">`);
    Activity($$renderer2, { class: "h-6 w-6 text-purple-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div></div></div> <div class="grid gap-6 lg:grid-cols-2"><div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-1 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tendência de Receita</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Últimos 12 meses</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">`);
    Trending_up($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(data.revenueByMonth);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { mes, valor } = each_array[$$index];
      const percentage = valor / maxRevenueValue() * 100;
      $$renderer2.push(`<div class="space-y-2"><div class="flex items-center justify-between text-sm"><span class="font-medium text-gray-700 dark:text-gray-300">${escape_html(mes)}</span> <span class="font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(valor))}</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-green-600 to-green-200 transition-all duration-500"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Volume de Faturas</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Últimos 12 meses</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">`);
    File_text($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-3"><!--[-->`);
    const each_array_1 = ensure_array_like(data.invoicesByMonth);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let { mes, quantidade } = each_array_1[$$index_1];
      const percentage = quantidade / maxInvoicesValue() * 100;
      $$renderer2.push(`<div class="space-y-2"><div class="flex items-center justify-between text-sm"><span class="font-medium text-gray-700 dark:text-gray-300">${escape_html(mes)}</span> <span class="font-bold text-gray-900 dark:text-white">${escape_html(quantidade)}</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-200 transition-all duration-500"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="grid gap-6 lg:grid-cols-2"><div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Análise de Clientes</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Segmentação e atividade</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">`);
    Users($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-6"><div><div class="mb-3 flex items-center justify-between"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total de Clientes</span> <span class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(data.clientAnalysis.total)}</span></div></div> <div><div class="mb-2 flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400">Clientes Ativos</span> <span class="font-semibold text-gray-900 dark:text-white">${escape_html(data.clientAnalysis.active)}</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"${attr_style(`width: ${stringify(data.clientAnalysis.active / data.clientAnalysis.total * 100)}%`)}></div></div> <p class="mt-1 text-xs text-gray-600 dark:text-gray-500">${escape_html((data.clientAnalysis.active / data.clientAnalysis.total * 100).toFixed(1))}% nos
						últimos 3 meses</p></div> <div><div class="mb-2 flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400">Clientes Inativos</span> <span class="font-semibold text-gray-900 dark:text-white">${escape_html(data.clientAnalysis.inactive)}</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"${attr_style(`width: ${stringify(data.clientAnalysis.inactive / data.clientAnalysis.total * 100)}%`)}></div></div></div> <div class="border-t border-gray-200 pt-4 dark:border-white/10"><div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400">Novos Clientes (30 dias)</span> `);
    Badge($$renderer2, {
      variant: "outline",
      class: "font-semibold",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->+${escape_html(data.clientAnalysis.new)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Métricas de Conversão</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Desempenho de vendas</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">`);
    Target($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-6"><div><div class="mb-2 flex items-center justify-between"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Taxa de Conversão</span> <span class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(data.conversionRate.rate)}%</span></div> <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"${attr_style(`width: ${stringify(data.conversionRate.rate)}%`)}></div></div> <p class="mt-1 text-xs text-gray-600 dark:text-gray-500">${escape_html(data.conversionRate.proformasConverted)} de ${escape_html(data.conversionRate.proformasIssued)} proformas
						convertidas</p></div> <div class="border-t border-gray-200 pt-4 dark:border-white/10"><h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">Análise de Pagamentos</h4> <div class="space-y-3"><div class="flex items-center justify-between"><div class="flex items-center gap-2">`);
    Circle_check_big($$renderer2, { class: "h-4 w-4 text-green-500" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-600 dark:text-gray-400">Pagas no Prazo</span></div> `);
    Badge($$renderer2, {
      variant: "default",
      class: "bg-green-500 hover:bg-green-600",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(data.paymentAnalysis.onTime)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="flex items-center justify-between"><div class="flex items-center gap-2">`);
    Circle_x($$renderer2, { class: "h-4 w-4 text-red-500" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-600 dark:text-gray-400">Vencidas</span></div> `);
    Badge($$renderer2, {
      variant: "destructive",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(data.paymentAnalysis.late)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="flex items-center justify-between"><div class="flex items-center gap-2">`);
    Circle_alert($$renderer2, { class: "h-4 w-4 text-yellow-500" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-600 dark:text-gray-400">Pendentes</span></div> `);
    Badge($$renderer2, {
      variant: "secondary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(data.paymentAnalysis.pending)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div> <div class="border-t border-gray-200 pt-4 dark:border-white/10"><div class="flex items-center gap-2">`);
    Clock($$renderer2, { class: "h-4 w-4 text-gray-500 dark:text-gray-400" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-600 dark:text-gray-400">Prazo médio de pagamento:</span> <span class="font-semibold text-gray-900 dark:text-white">${escape_html(data.paymentAnalysis.avgDaysToPayment)} dias</span></div></div></div></div></div> <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-white/5 dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Desempenho de Produtos</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Top 10 produtos por receita</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">`);
    Shopping_bag($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-white/10"><th class="pb-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Produto</th><th class="pb-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Quantidade</th><th class="pb-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Receita</th><th class="pb-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Margem Média</th></tr></thead><tbody>`);
    const each_array_2 = ensure_array_like(data.productPerformance);
    if (each_array_2.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let product = each_array_2[$$index_2];
        $$renderer2.push(`<tr class="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"><td class="py-3 text-sm font-medium text-gray-900 dark:text-white">${escape_html(product.nome)}</td><td class="py-3 text-right text-sm text-gray-700 dark:text-gray-300">${escape_html(product.quantidade)}</td><td class="py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">${escape_html(formatCurrency(product.receita))}</td><td class="py-3 text-right">`);
        Badge($$renderer2, {
          variant: "outline",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(product.margemMedia)}%`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></td></tr>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<tr><td colspan="4" class="py-8 text-center text-sm text-gray-500 dark:text-gray-500">Nenhum produto encontrado</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div class="rounded-2xl bg-gradient-to-br from-orange-50 to-purple-50 p-6 shadow-lg ring-1 ring-gray-200/50 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div><h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">`);
    Target($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----> Previsão de Vendas</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Projeção para os próximos 3 meses</p></div> <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">`);
    Trending_up($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-3"><!--[-->`);
    const each_array_3 = ensure_array_like(data.salesForecast);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let { mes, valorPrevisto } = each_array_3[$$index_3];
      const percentage = valorPrevisto / maxForecastValue() * 100;
      $$renderer2.push(`<div class="space-y-2"><div class="flex items-center justify-between text-sm"><span class="font-medium text-gray-700 dark:text-gray-300">${escape_html(mes)}</span> <span class="font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(valorPrevisto))}</span></div> <div class="h-3 overflow-hidden rounded-full bg-white/50 dark:bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-500"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 rounded-xl bg-white/50 p-4 dark:bg-white/5"><p class="text-sm text-gray-600 dark:text-gray-400"><strong class="text-gray-700 dark:text-gray-300">Nota:</strong> A previsão é baseada na média
				dos últimos 3 meses e na tendência de crescimento atual. Valores reais podem variar.</p></div></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BvRN76JZ.js.map
