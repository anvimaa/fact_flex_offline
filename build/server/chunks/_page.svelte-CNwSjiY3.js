import { an as ensure_array_like, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { i as invalidateAll } from './client2-CcJ2Tk7F.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './context-BAmjzoO_.js';
import './attrs-mduo83PF.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './index2-Cz2gv4fD.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './dialog-description2-CD_E6-6J.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let payments = derived(() => data.payments);
    let selectedPayment = null;
    let rejectionReason = "";
    let loading = false;
    let dialogOpen = false;
    async function handleApprove(paymentId) {
      loading = true;
      try {
        const response = await fetch(`/api/admin/payments/${paymentId}/approve`, { method: "POST" });
        if (!response.ok) throw new Error("Falha ao aprovar pagamento");
        toast.success("Pagamento aprovado com sucesso!");
        invalidateAll();
      } catch (error) {
        toast.error("Erro ao aprovar pagamento");
      } finally {
        loading = false;
      }
    }
    function formatStatus(status) {
      const statusMap = {
        PENDING: "Pendente",
        APPROVED: "Aprovado",
        REJECTED: "Rejeitado"
      };
      return statusMap[status] || status;
    }
    function getStatusBadgeVariant(status) {
      const variantMap = {
        PENDING: "warning",
        APPROVED: "success",
        REJECTED: "destructive"
      };
      return variantMap[status] || "secondary";
    }
    function handleSelectPayment(payment) {
      selectedPayment = payment;
      rejectionReason = "";
      dialogOpen = true;
    }
    function closeDialog() {
      dialogOpen = false;
      selectedPayment = null;
      rejectionReason = "";
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="container mx-auto p-6">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center justify-between"><div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Gerenciar Pagamentos`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Valide os pagamentos pendentes dos usuários`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              Button($$renderer5, {
                variant: "outline",
                size: "sm",
                onclick: async () => {
                  invalidateAll();
                },
                disabled: loading,
                children: ($$renderer6) => {
                  $$renderer6.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg> Atualizar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              if (payments().length === 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex flex-col items-center justify-center py-12 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> <p class="text-xl font-medium">Nenhum pagamento encontrado</p> <p class="text-sm text-muted-foreground">Não há pagamentos para serem exibidos no momento.</p></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="space-y-4">`);
                Table($$renderer5, {
                  children: ($$renderer6) => {
                    Table_header($$renderer6, {
                      children: ($$renderer7) => {
                        Table_row($$renderer7, {
                          children: ($$renderer8) => {
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Usuário`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Valor`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Data`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Método`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Plano`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Tipo`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Status`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Comprovante`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_head($$renderer8, {
                              class: "text-right",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Ações`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Table_body($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!--[-->`);
                        const each_array = ensure_array_like(payments());
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let payment = each_array[$$index];
                          Table_row($$renderer7, {
                            children: ($$renderer8) => {
                              Table_cell($$renderer8, {
                                class: "font-medium",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(payment.subscription.user.name)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                class: "font-medium",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(formatCurrency(payment.amount))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(new Date(payment.paymentDate).toLocaleDateString("pt-BR"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(payment.paymentMethod === "DEPOSIT" ? "Depósito" : "Transferência")}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(payment.subscription.planType)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(payment.subscription.periodType)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  Badge($$renderer9, {
                                    variant: getStatusBadgeVariant(payment.status),
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->${escape_html(formatStatus(payment.status))}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  Button($$renderer9, {
                                    variant: "link",
                                    class: "p-0",
                                    onclick: () => window.open(payment.proofFile, "_blank"),
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->Ver comprovante`);
                                    },
                                    $$slots: { default: true }
                                  });
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                class: "text-right",
                                children: ($$renderer9) => {
                                  if (payment.status === "PENDING") {
                                    $$renderer9.push("<!--[-->");
                                    $$renderer9.push(`<div class="flex items-center justify-end space-x-2">`);
                                    Button($$renderer9, {
                                      variant: "default",
                                      size: "sm",
                                      disabled: loading,
                                      onclick: () => handleApprove(payment.id),
                                      children: ($$renderer10) => {
                                        if (loading) {
                                          $$renderer10.push("<!--[-->");
                                          $$renderer10.push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"></path></svg>`);
                                        } else {
                                          $$renderer10.push("<!--[!-->");
                                          $$renderer10.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
                                        }
                                        $$renderer10.push(`<!--]--> Aprovar`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer9.push(`<!----> `);
                                    Button($$renderer9, {
                                      variant: "destructive",
                                      size: "sm",
                                      onclick: () => handleSelectPayment(payment),
                                      children: ($$renderer10) => {
                                        $$renderer10.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Rejeitar`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer9.push(`<!----> `);
                                    Root($$renderer9, {
                                      get open() {
                                        return dialogOpen;
                                      },
                                      set open($$value) {
                                        dialogOpen = $$value;
                                        $$settled = false;
                                      },
                                      children: ($$renderer10) => {
                                        Dialog_content($$renderer10, {
                                          children: ($$renderer11) => {
                                            Dialog_header($$renderer11, {
                                              children: ($$renderer12) => {
                                                Dialog_title($$renderer12, {
                                                  children: ($$renderer13) => {
                                                    $$renderer13.push(`<!---->Rejeitar Pagamento`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer12.push(`<!----> `);
                                                Dialog_description($$renderer12, {
                                                  children: ($$renderer13) => {
                                                    $$renderer13.push(`<!---->Informe o motivo da rejeição do pagamento de ${escape_html(formatCurrency(selectedPayment?.amount))}`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer12.push(`<!---->`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer11.push(`<!----> <form class="space-y-4"><div class="space-y-2">`);
                                            Label($$renderer11, {
                                              for: "reason",
                                              children: ($$renderer12) => {
                                                $$renderer12.push(`<!---->Motivo da Rejeição`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer11.push(`<!----> `);
                                            Input($$renderer11, {
                                              id: "reason",
                                              placeholder: "Descreva o motivo da rejeição...",
                                              required: true,
                                              get value() {
                                                return rejectionReason;
                                              },
                                              set value($$value) {
                                                rejectionReason = $$value;
                                                $$settled = false;
                                              }
                                            });
                                            $$renderer11.push(`<!----></div> `);
                                            Dialog_footer($$renderer11, {
                                              children: ($$renderer12) => {
                                                Button($$renderer12, {
                                                  variant: "outline",
                                                  type: "button",
                                                  onclick: closeDialog,
                                                  children: ($$renderer13) => {
                                                    $$renderer13.push(`<!---->Cancelar`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer12.push(`<!----> `);
                                                Button($$renderer12, {
                                                  variant: "destructive",
                                                  type: "submit",
                                                  disabled: loading || !rejectionReason,
                                                  children: ($$renderer13) => {
                                                    if (loading) {
                                                      $$renderer13.push("<!--[-->");
                                                      $$renderer13.push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"></path></svg>`);
                                                    } else {
                                                      $$renderer13.push("<!--[!-->");
                                                      $$renderer13.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`);
                                                    }
                                                    $$renderer13.push(`<!--]--> Rejeitar`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer12.push(`<!---->`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer11.push(`<!----></form>`);
                                          },
                                          $$slots: { default: true }
                                        });
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer9.push(`<!----></div>`);
                                  } else {
                                    $$renderer9.push("<!--[!-->");
                                  }
                                  $$renderer9.push(`<!--]-->`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$renderer7.push(`<!--]-->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CNwSjiY3.js.map
