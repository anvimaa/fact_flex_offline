import { an as ensure_array_like, _ as derived, az as attr_class } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { C as Card } from './card-ChfkAej9.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let comissoes = derived(() => data.comissoes);
    let loading = false;
    async function handleAcao(id, action) {
      const confirmar = confirm(`Tem certeza que deseja ${action === "apurar" ? "apurar (confirmar saldo de comissão pendente)" : "registar como paga"} esta comissão?`);
      if (!confirmar) return;
      loading = true;
      try {
        const submitData = new FormData();
        submitData.append("id", id);
        const response = await fetch(`?/${action}`, { method: "POST", body: submitData });
        if (response.ok) {
          toast.success(`Comissão ${action === "apurar" ? "apurada" : "paga"} com sucesso!`);
          window.location.reload();
        } else {
          toast.error(`Falha ao ${action} comissão`);
        }
      } catch (error) {
        console.error(error);
        toast.error(`Erro ao ${action} comissão`);
      } finally {
        loading = false;
      }
    }
    $$renderer2.push(`<div class="container space-y-4 py-4"><div class="flex items-center justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Comissões</h2> <p class="text-muted-foreground">Registo e apuramento de comissões de parceiros.</p></div></div> <div class="rounded-md border">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Table($$renderer3, {
          children: ($$renderer4) => {
            Table_header($$renderer4, {
              children: ($$renderer5) => {
                Table_row($$renderer5, {
                  children: ($$renderer6) => {
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Parceiro`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Empresa`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Plano Pagamento`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Valor Pago`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Percentual`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Comissão`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Status`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_head($$renderer6, {
                      class: "text-right",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Ações`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Table_body($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!--[-->`);
                const each_array = ensure_array_like(comissoes());
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let comissao = each_array[$$index];
                  Table_row($$renderer5, {
                    children: ($$renderer6) => {
                      Table_cell($$renderer6, {
                        class: "font-medium",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(comissao.parceiro.nome)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(comissao.empresa.nome)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(comissao.plano)} (${escape_html(comissao.periodo)})`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(formatCurrency(comissao.valorPago))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(comissao.percentagemAplicada)}%`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        class: "font-bold text-primary",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(formatCurrency(comissao.valorComissao))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<span${attr_class(`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${comissao.status === "PENDENTE" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : comissao.status === "APURADA" ? "bg-blue-50 text-blue-700 ring-blue-600/20" : comissao.status === "PAGA" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`)}>${escape_html(comissao.status)}</span>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      Table_cell($$renderer6, {
                        class: "text-right",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<div class="flex justify-end gap-2">`);
                          if (comissao.status === "PENDENTE") {
                            $$renderer7.push("<!--[-->");
                            Button($$renderer7, {
                              variant: "outline",
                              size: "sm",
                              onclick: () => handleAcao(comissao.id, "apurar"),
                              disabled: loading,
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Apurar`);
                              },
                              $$slots: { default: true }
                            });
                          } else if (comissao.status === "APURADA") {
                            $$renderer7.push("<!--[1-->");
                            Button($$renderer7, {
                              variant: "default",
                              size: "sm",
                              onclick: () => handleAcao(comissao.id, "pagar"),
                              disabled: loading,
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Liquidar (Marcar Paga)`);
                              },
                              $$slots: { default: true }
                            });
                          } else {
                            $$renderer7.push("<!--[!-->");
                          }
                          $$renderer7.push(`<!--]--></div>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                }
                $$renderer5.push(`<!--]--> `);
                if (comissoes().length === 0) {
                  $$renderer5.push("<!--[-->");
                  Table_row($$renderer5, {
                    children: ($$renderer6) => {
                      Table_cell($$renderer6, {
                        colspan: 8,
                        class: "h-24 text-center",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->Nenhuma comissão encontrada.`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dm1lF6Ke.js.map
