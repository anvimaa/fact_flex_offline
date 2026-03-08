import { ax as store_get, an as ensure_array_like, aw as attr, aB as stringify, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { p as page } from './stores-BBk2HDxH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { F as Filter } from './filter-D_JAT5I9.js';
import { S as Search } from './search-BCOKC9CO.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { C as Chevron_left } from './chevron-left-DOf1aQ1b.js';
import { C as Chevron_right } from './chevron-right-BAItaPVX.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './attrs-mduo83PF.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';
import './check-cM-2r8Wr.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let timeout;
    function handleSearch(event) {
      const target = event.target;
      clearTimeout(timeout);
      timeout = setTimeout(
        () => {
          updateFilter("search", target.value);
        },
        500
      );
    }
    function updateFilter(key, value) {
      const searchParams = new URLSearchParams(store_get($$store_subs ??= {}, "$page", page).url.searchParams);
      if (value && value !== "all") {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
      if (key !== "page") {
        searchParams.set("page", "1");
      }
      goto(`?${searchParams.toString()}`, {});
    }
    function getActionBadgeVariant(action) {
      const map = {
        CRIADO: "default",
        EMITIDO: "secondary",
        ENVIADO_AGT: "success",
        // Assuming you have a success variant or just use default specific styling
        VALIDADO_AGT: "success",
        ANULADO: "destructive",
        REJEITADO_AGT: "destructive"
      };
      return map[action] || "outline";
    }
    $$renderer2.push(`<div class="flex flex-col gap-6 p-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold tracking-tight">Log de Documentos</h1> <p class="text-muted-foreground">Histórico de ações e auditoria do sistema.</p></div></div> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "pb-4",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2 text-base font-medium",
              children: ($$renderer5) => {
                Filter($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> Filtros`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-4"><div class="space-y-2">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Pesquisar`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <div class="relative">`);
            Search($$renderer4, {
              class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              type: "search",
              placeholder: "Documento, descrição...",
              class: "pl-8",
              oninput: handleSearch,
              value: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("search") || ""
            });
            $$renderer4.push(`<!----></div></div> <div class="space-y-2">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Ação`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Combobox_1($$renderer4, {
              items: [
                { value: "all", label: "Todas as ações" },
                ...data.filters.actions.map((a) => ({ value: a, label: a }))
              ],
              value: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("acao") || "all",
              onSelect: (v) => updateFilter("acao", v),
              placeholder: "Selecione uma ação..."
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Usuário`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Combobox_1($$renderer4, {
              items: [
                { value: "all", label: "Todos os usuários" },
                ...data.filters.users.map((u) => ({ value: u.id, label: u.name }))
              ],
              value: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("usuarioId") || "all",
              onSelect: (v) => updateFilter("usuarioId", v),
              placeholder: "Selecione um usuário..."
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Data Início`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              type: "date",
              value: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("dataInicio") || "",
              onchange: (e) => updateFilter("dataInicio", e.currentTarget.value)
            });
            $$renderer4.push(`<!----></div></div>`);
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
        Card_content($$renderer3, {
          class: "p-0",
          children: ($$renderer4) => {
            Table($$renderer4, {
              children: ($$renderer5) => {
                Table_header($$renderer5, {
                  children: ($$renderer6) => {
                    Table_row($$renderer6, {
                      children: ($$renderer7) => {
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Data/Hora`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Documento`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Ação`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Descrição`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Usuário`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->IP`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Table_body($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!--[-->`);
                    const each_array = ensure_array_like(data.logs);
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let log = each_array[$$index];
                      Table_row($$renderer6, {
                        children: ($$renderer7) => {
                          Table_cell($$renderer7, {
                            class: "whitespace-nowrap font-medium",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(new Date(log.createdAt).toLocaleString("pt-AO"))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<div class="flex items-center gap-2">`);
                              File_text($$renderer8, { class: "h-4 w-4 text-muted-foreground" });
                              $$renderer8.push(`<!----> <a${attr("href", `/documentos/fiscais/${stringify(log.documento.id)}`)} class="font-medium text-primary hover:underline">${escape_html(log.documento.numero)}</a></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            children: ($$renderer8) => {
                              Badge($$renderer8, {
                                variant: getActionBadgeVariant(log.acao),
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(log.acao)}`);
                                },
                                $$slots: { default: true }
                              });
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "max-w-md truncate",
                            title: log.descricao,
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(log.descricao)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<div class="flex items-center gap-2"><div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">${escape_html(log.usuario.name.charAt(0).toUpperCase())}</div> <span class="text-sm">${escape_html(log.usuario.name)}</span></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "font-mono text-xs text-muted-foreground",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(log.ipAddress || "-")}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$renderer6.push(`<!--]--> `);
                    if (data.logs.length === 0) {
                      $$renderer6.push("<!--[-->");
                      Table_row($$renderer6, {
                        children: ($$renderer7) => {
                          Table_cell($$renderer7, {
                            colspan: 6,
                            class: "h-24 text-center",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->Nenhum registro encontrado.`);
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                    } else {
                      $$renderer6.push("<!--[!-->");
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="flex items-center justify-between"><p class="text-sm text-muted-foreground">Mostrando ${escape_html(data.pagination.limit * (data.pagination.page - 1) + 1)} a
			${escape_html(Math.min(data.pagination.limit * data.pagination.page, data.pagination.total))} de
			${escape_html(data.pagination.total)} registros</p> <div class="flex items-center gap-2">`);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      disabled: data.pagination.page <= 1,
      onclick: () => updateFilter("page", String(data.pagination.page - 1)),
      children: ($$renderer3) => {
        Chevron_left($$renderer3, { class: "h-4 w-4" });
        $$renderer3.push(`<!----> Anterior`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      disabled: data.pagination.page >= data.pagination.totalPages,
      onclick: () => updateFilter("page", String(data.pagination.page + 1)),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Próxima `);
        Chevron_right($$renderer3, { class: "h-4 w-4" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-dKyzbeCc.js.map
