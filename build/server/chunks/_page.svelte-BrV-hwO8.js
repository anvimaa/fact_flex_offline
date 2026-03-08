import { av as head, az as attr_class, an as ensure_array_like, aB as stringify, aA as attr_style, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { k as Circle_check_big, T as Timer, f as formatCurrency, C as Clock, p as getRelativeDate, l as Circle_x } from './utils3-DjmiJAAD.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { L as List_sale_items } from './list-sale-items-BBciauIs.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { S as Shopping_cart } from './shopping-cart-DlXvsSgE.js';
import { U as User } from './user-D18r-fvg.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { E as Eye } from './eye-BbooT3RA.js';
import { P as Printer } from './printer-Byrp_rev.js';
import { F as Filter } from './filter-D_JAT5I9.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { T as Trending_up } from './trending-up-suqfe4Iy.js';
import { U as Users } from './users-CSW0O0kd.js';
import { C as Chevrons_left, a as Chevrons_right } from './chevrons-right-BqjeZ3X9.js';
import { C as Chevron_left } from './chevron-left-DOf1aQ1b.js';
import { C as Chevron_right } from './chevron-right-BAItaPVX.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';
import './events-GtUqDgmb.js';
import './table-row-B-9FJQyf.js';
import './package-BKsm9DRA.js';
import './percent-DRPkZNWp.js';
import './tag-Z83dV6tm.js';
import './credit-card-BMaAHNh2.js';

function List_sales($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      sales,
      status,
      title = "Vendas",
      description = "Registro de vendas realizadas no sistema"
    } = $$props;
    let hoveredIndex = null;
    let selectedSale = null;
    const getStatusConfig = (status2) => {
      switch (status2?.toLowerCase()) {
        case "finalizada":
          return {
            icon: Circle_check_big,
            bg: "bg-emerald-100 dark:bg-emerald-500/20",
            text: "text-emerald-600 dark:text-emerald-400",
            glow: "shadow-emerald-500/50",
            dot: "bg-emerald-500"
          };
        case "rascunho":
          return {
            icon: Timer,
            bg: "bg-amber-100 dark:bg-amber-500/20",
            text: "text-amber-600 dark:text-amber-400",
            glow: "shadow-amber-500/50",
            dot: "bg-amber-500"
          };
        default:
          return {
            icon: Circle_x,
            bg: "bg-gray-100 dark:bg-gray-500/20",
            text: "text-gray-600 dark:text-gray-400",
            glow: "shadow-gray-500/50",
            dot: "bg-gray-500"
          };
      }
    };
    const getStatusBadgeVariant = (status2) => {
      switch (status2?.toLowerCase()) {
        case "finalizada":
          return "default";
        case "rascunho":
          return "secondary";
        default:
          return "outline";
      }
    };
    const getStatusLabel = (status2) => {
      switch (status2?.toLowerCase()) {
        case "finalizada":
          return "Finalizada";
        case "rascunho":
          return "Rascunho";
        default:
          return status2;
      }
    };
    $$renderer2.push(`<div class="group/card rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl ring-1 ring-gray-200/50 transition-all duration-500 hover:shadow-2xl dark:from-white/5 dark:to-white/[0.02] dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div class="space-y-1"><h3 class="text-xl font-bold text-gray-900 dark:text-white">${escape_html(title)}</h3> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(description)}</p></div> <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-900/30 transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-xl dark:from-blue-500 dark:to-blue-700">`);
    Shopping_cart($$renderer2, {
      class: "h-6 w-6 transition-transform duration-300 group-hover/card:rotate-6"
    });
    $$renderer2.push(`<!----></div></div> <div class="mb-6 grid grid-cols-3 gap-3"><div class="rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 p-3 dark:from-white/10 dark:to-white/5"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 dark:bg-white/10">`);
    Shopping_cart($$renderer2, { class: "h-4 w-4 text-gray-600 dark:text-gray-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Total</div> <div class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(status.total)}</div></div></div></div> <div class="rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 dark:from-emerald-500/20 dark:to-emerald-500/10"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-200 dark:bg-emerald-500/30">`);
    Circle_check_big($$renderer2, { class: "h-4 w-4 text-emerald-600 dark:text-emerald-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-emerald-600 dark:text-emerald-400">Finalizada</div> <div class="text-lg font-bold text-emerald-700 dark:text-emerald-300">${escape_html(status.finalizada)}</div></div></div></div> <div class="rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 p-3 dark:from-amber-500/20 dark:to-amber-500/10"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-200 dark:bg-amber-500/30">`);
    Timer($$renderer2, { class: "h-4 w-4 text-amber-600 dark:text-amber-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-amber-600 dark:text-amber-400">FACTURADO</div> <div class="text-lg font-bold text-amber-700 dark:text-amber-300">${escape_html(status.rascunho)}</div></div></div></div></div> <div class="space-y-2">`);
    const each_array = ensure_array_like(sales);
    if (each_array.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let sale = each_array[index];
        const statusConfig = getStatusConfig(sale.status);
        const StatusIcon = statusConfig.icon;
        const isHovered = hoveredIndex === index;
        const isSelected = selectedSale === index;
        $$renderer2.push(`<div role="button" tabindex="0"${attr_class(`group/item relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${stringify(isSelected ? "bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-500/10" : isHovered ? "bg-gray-100 dark:bg-white/10" : "bg-gray-50/50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10")}`)}${attr_style(`animation: slideIn 0.4s ease-out ${stringify(index * 0.05)}s backwards;`)}><div class="p-4"><div class="flex items-center gap-4"><div${attr_class(`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${stringify(statusConfig.bg)} ${stringify(isHovered ? `shadow-lg ${statusConfig.glow} scale-110` : "")}`)}>`);
        if (StatusIcon) {
          $$renderer2.push("<!--[-->");
          StatusIcon($$renderer2, { class: `h-6 w-6 ${stringify(statusConfig.text)}` });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
        $$renderer2.push(`</div> <div class="min-w-0 flex-1"><div class="flex items-center justify-between gap-2"><div class="flex items-center gap-2"><span class="font-bold text-gray-900 dark:text-white">${escape_html(sale.codigo)}</span> `);
        Badge($$renderer2, {
          variant: getStatusBadgeVariant(sale.status),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(getStatusLabel(sale.status))}`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></div> <span class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(sale.total))}</span></div> <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center gap-1.5">`);
        User($$renderer2, { class: "h-3.5 w-3.5" });
        $$renderer2.push(`<!----> <span class="max-w-[150px] truncate">${escape_html(sale.cliente?.nome || "Cliente não informado")}</span></div> <div class="flex items-center gap-1.5">`);
        Calendar($$renderer2, { class: "h-3.5 w-3.5" });
        $$renderer2.push(`<!----> <span>${escape_html(new Date(sale.criadoEm).toLocaleDateString("pt-PT"))}</span></div> <div class="flex items-center gap-1.5 text-xs opacity-75">`);
        Clock($$renderer2, { class: "h-3 w-3" });
        $$renderer2.push(`<!----> <span>${escape_html(getRelativeDate(sale.criadoEm.toString()))}</span></div></div></div> <div${attr_class(`flex items-center gap-2 opacity-0 transition-all duration-300 ${stringify(isHovered || isSelected ? "opacity-100" : "")}`)}><button class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-all hover:scale-110 hover:bg-gray-300 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/20">`);
        Eye($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!----></button> <button class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-all hover:scale-110 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30">`);
        Printer($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!----></button></div></div></div> `);
        if (isSelected) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="border-t border-gray-200 bg-gray-100/50 px-4 py-3 dark:border-white/10 dark:bg-white/5" style="animation: expandIn 0.3s ease-out;"><div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4"><div><div class="text-xs text-gray-500 dark:text-gray-400">Código</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(sale.codigo)}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Cliente</div> <div class="truncate font-medium text-gray-900 dark:text-white">${escape_html(sale.cliente?.nome || "N/A")}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Data de Criação</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(new Date(sale.criadoEm).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            weekday: "long"
          }))}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Valor Total</div> <div${attr_class(`font-bold ${stringify(statusConfig.text)}`)}>${escape_html(formatCurrency(sale.total))}</div></div></div> <div class="mt-4">`);
          List_sale_items($$renderer2, { venda: sale });
          $$renderer2.push(`<!----></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div${attr_class(`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${stringify(statusConfig.dot)} ${stringify(isHovered || isSelected ? "opacity-100" : "opacity-0")}`)}></div> `);
        if (sale.status?.toLowerCase() === "rascunho") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="absolute right-3 top-3"><span class="relative flex h-2.5 w-2.5"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span> <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span></span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center py-16 text-center"><div class="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/10">`);
      Shopping_cart($$renderer2, { class: "h-10 w-10 text-gray-400" });
      $$renderer2.push(`<!----></div> <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Nenhuma venda encontrada</h4> <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">As vendas recentes aparecerão aqui</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    let filtroDataInicio = formatDate(new Date(currentYear, 0, 1));
    let filtroDataFim = formatDate(new Date(currentYear, 11, 31));
    let filtroEstado = "todos";
    const vendasFiltradas = derived(() => () => {
      return data.vendas.filter((venda) => {
        const dataInicio = filtroDataInicio ? new Date(new Date(filtroDataInicio).setHours(0, 0, 0, 0)) : /* @__PURE__ */ new Date(0);
        const dataFim = filtroDataFim ? new Date(new Date(filtroDataFim).setHours(23, 59, 59, 999)) : /* @__PURE__ */ new Date(864e13);
        const vendaData = new Date(venda.criadoEm);
        vendaData.setHours(0, 0, 0, 0);
        const matchEstado = filtroEstado === "todos";
        const matchData = vendaData >= dataInicio && vendaData <= dataFim;
        const matchCliente = true;
        return matchData && matchEstado && matchCliente;
      });
    });
    let paginacao = derived(() => ({
      currentPage: data.paginacao.currentPage,
      itemsPerPage: data.paginacao.itemsPerPage,
      totalItems: data.paginacao.totalItems,
      totalPages: data.paginacao.totalPages
    }));
    function irParaPagina(pagina) {
      if (pagina < 1 || pagina > paginacao().totalPages) return;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", pagina.toString());
      goto(`/venda?${searchParams.toString()}`);
    }
    let paginasVisiveis = derived(() => {
      const { currentPage, totalPages } = paginacao();
      const paginas = [];
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          paginas.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            paginas.push(i);
          }
          if (totalPages > 6) paginas.push(-1);
          paginas.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          paginas.push(1);
          if (totalPages > 6) paginas.push(-1);
          for (let i = totalPages - 4; i <= totalPages; i++) {
            paginas.push(i);
          }
        } else {
          paginas.push(1);
          if (currentPage > 3) paginas.push(-1);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            paginas.push(i);
          }
          if (currentPage < totalPages - 2) paginas.push(-2);
          paginas.push(totalPages);
        }
      }
      return paginas;
    });
    head("1nn1ys8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Vendas</title>`);
      });
    });
    $$renderer2.push(`<div class="w-full p-4"><div class="mb-6 flex items-center justify-between"><h1 class="text-2xl font-bold">Vendas</h1> <div class="flex gap-2"><button${attr_class(`btn relative ${stringify("btn-ghost")} transform transition-all duration-200 ease-out hover:scale-105`)}><div class="flex items-center">`);
    Filter($$renderer2, {
      class: `mr-2 h-5 w-5 ${stringify("")}`
    });
    $$renderer2.push(`<!----> <span>Filtros</span> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filtroDataInicio || filtroDataFim) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute -right-2 -top-2 h-3 w-3 animate-ping rounded-full bg-accent"></div> <div class="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-accent"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button> <a class="btn btn-primary transform transition-all duration-200 ease-out hover:scale-105" href="/venda/nova">`);
    Plus($$renderer2, { class: "mr-2 h-5 w-5" });
    $$renderer2.push(`<!----> Nova Venda</a></div></div> <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Total de Vendas`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Shopping_cart($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(data.estatisticas.total)}</div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Receita Total`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Dollar_sign($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(formatCurrency(data.estatisticas.receita))}</div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Finalizadas`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Trending_up($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(data.estatisticas.finalizada)}</div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Rascunhos`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Users($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(data.estatisticas.rascunho)}</div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    List_sales($$renderer2, {
      sales: vendasFiltradas()(),
      status: {
        total: data.estatisticas.total,
        finalizada: data.estatisticas.finalizada,
        rascunho: data.estatisticas.rascunho
      }
    });
    $$renderer2.push(`<!----> `);
    if (data.paginacao.totalPages > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-6 flex items-center justify-between rounded-lg bg-zinc-200 px-4 py-3 shadow-xl dark:bg-zinc-800/50"><div class="text-sm text-muted-foreground">Página ${escape_html(data.paginacao.currentPage)} de ${escape_html(data.paginacao.totalPages)}</div> <div class="flex items-center gap-1">`);
      Button($$renderer2, {
        variant: "outline",
        size: "sm",
        onclick: () => irParaPagina(1),
        disabled: data.paginacao.currentPage === 1,
        class: "h-8 w-8 p-0",
        children: ($$renderer3) => {
          Chevrons_left($$renderer3, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "outline",
        size: "sm",
        onclick: () => irParaPagina(data.paginacao.currentPage - 1),
        disabled: data.paginacao.currentPage === 1,
        class: "h-8 w-8 p-0",
        children: ($$renderer3) => {
          Chevron_left($$renderer3, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <!--[-->`);
      const each_array = ensure_array_like(paginasVisiveis());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pagina = each_array[$$index];
        if (pagina === -1 || pagina === -2) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">…</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          Button($$renderer2, {
            variant: pagina === data.paginacao.currentPage ? "default" : "outline",
            size: "sm",
            onclick: () => irParaPagina(pagina),
            class: "h-8 w-8 p-0",
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(pagina)}`);
            },
            $$slots: { default: true }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      Button($$renderer2, {
        variant: "outline",
        size: "sm",
        onclick: () => irParaPagina(data.paginacao.currentPage + 1),
        disabled: data.paginacao.currentPage === data.paginacao.totalPages,
        class: "h-8 w-8 p-0",
        children: ($$renderer3) => {
          Chevron_right($$renderer3, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "outline",
        size: "sm",
        onclick: () => irParaPagina(data.paginacao.totalPages),
        disabled: data.paginacao.currentPage === data.paginacao.totalPages,
        class: "h-8 w-8 p-0",
        children: ($$renderer3) => {
          Chevrons_right($$renderer3, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BrV-hwO8.js.map
