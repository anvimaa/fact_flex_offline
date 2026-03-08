import { av as head, aw as attr, an as ensure_array_like, aB as stringify, _ as derived, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Input } from './input-XVWEGj5m.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { P as Package } from './package-BKsm9DRA.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import './events-GtUqDgmb.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './index2-Cz2gv4fD.js';

function Truck($$renderer, $$props) {
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
      {
        "d": "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
      }
    ],
    ["path", { "d": "M15 18H9" }],
    [
      "path",
      {
        "d": "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
      }
    ],
    ["circle", { "cx": "17", "cy": "18", "r": "2" }],
    ["circle", { "cx": "7", "cy": "18", "r": "2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "truck" },
    $$sanitized_props,
    {
      /**
       * @component @name Truck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQgMThWNmEyIDIgMCAwIDAtMi0ySDRhMiAyIDAgMCAwLTIgMnYxMWExIDEgMCAwIDAgMSAxaDIiIC8+CiAgPHBhdGggZD0iTTE1IDE4SDkiIC8+CiAgPHBhdGggZD0iTTE5IDE4aDJhMSAxIDAgMCAwIDEtMXYtMy42NWExIDEgMCAwIDAtLjIyLS42MjRsLTMuNDgtNC4zNUExIDEgMCAwIDAgMTcuNTIgOEgxNCIgLz4KICA8Y2lyY2xlIGN4PSIxNyIgY3k9IjE4IiByPSIyIiAvPgogIDxjaXJjbGUgY3g9IjciIGN5PSIxOCIgcj0iMiIgLz4KPC9zdmc+) - https://lucide.dev/icons/truck
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
    let { data, form } = $$props;
    const clientes = derived(() => data.clientes);
    let clienteId = "";
    let localCarga = "";
    let localDescarga = "";
    let dataSaida = "";
    let dataChegadaPrevista = "";
    let transportadorNome = "";
    let transportadorNIF = "";
    let matriculaVeiculo = "";
    let observacao = "";
    let itens = [{ codigo: "", descricao: "", quantidade: 1, unidade: "UN" }];
    function adicionarItem() {
      itens.push({ codigo: "", descricao: "", quantidade: 1, unidade: "UN" });
      itens = itens;
    }
    function removerItem(index) {
      itens.splice(index, 1);
      itens = itens;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("rdn5zj", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Guias de Remessa | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-4xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        href: "/documentos/fiscais",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Nova Guia de Remessa</h1> <p class="text-muted-foreground">Emitir guia de transporte de mercadorias</p></div></div></div> <form method="POST" action="?/emitir"><input type="hidden" name="itens"${attr("value", JSON.stringify(itens))}/> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Destinatário`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "cliente",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cliente (Opcional)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "cliente",
                  name: "clienteId",
                  value: clienteId,
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Sem cliente cadastrado...`);
                  });
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(clientes());
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let cliente = each_array[$$index];
                    $$renderer6.option({ value: cliente.id }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(cliente.nome)}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Package($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Transporte`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "localCarga",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Local de Carga *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "localCarga",
                name: "localCarga",
                placeholder: "Ex: Armazém Central - Luanda",
                required: true,
                get value() {
                  return localCarga;
                },
                set value($$value) {
                  localCarga = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "localDescarga",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Local de Descarga *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "localDescarga",
                name: "localDescarga",
                placeholder: "Ex: Loja Filial - Benguela",
                required: true,
                get value() {
                  return localDescarga;
                },
                set value($$value) {
                  localDescarga = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "dataSaida",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Data de Saída *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "dataSaida",
                name: "dataSaida",
                type: "datetime-local",
                required: true,
                get value() {
                  return dataSaida;
                },
                set value($$value) {
                  dataSaida = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "dataChegada",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Data de Chegada Prevista`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "dataChegada",
                name: "dataChegadaPrevista",
                type: "datetime-local",
                get value() {
                  return dataChegadaPrevista;
                },
                set value($$value) {
                  dataChegadaPrevista = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Truck($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Transportador`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Informações do transportador (opcional)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-3"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "transportador",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Nome`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "transportador",
                name: "transportadorNome",
                placeholder: "Ex: Transportes ABC Lda",
                get value() {
                  return transportadorNome;
                },
                set value($$value) {
                  transportadorNome = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "nifTransportador",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->NIF`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "nifTransportador",
                name: "transportadorNIF",
                placeholder: "123456789",
                get value() {
                  return transportadorNIF;
                },
                set value($$value) {
                  transportadorNIF = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "matricula",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Matrícula do Veículo`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "matricula",
                name: "matriculaVeiculo",
                placeholder: "LD-12-34-AB",
                get value() {
                  return matriculaVeiculo;
                },
                set value($$value) {
                  matriculaVeiculo = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center justify-between"><div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Itens a Transportar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Mercadorias incluídas na guia (sem valores)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              Button($$renderer5, {
                type: "button",
                variant: "outline",
                size: "sm",
                onclick: adicionarItem,
                children: ($$renderer6) => {
                  Plus($$renderer6, { class: "mr-2 h-4 w-4" });
                  $$renderer6.push(`<!----> Adicionar Item`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<!--[-->`);
              const each_array_1 = ensure_array_like(itens);
              for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
                let item = each_array_1[index];
                $$renderer5.push(`<div class="rounded-lg border p-4"><div class="mb-4 flex items-center justify-between"><h4 class="font-medium">Item ${escape_html(index + 1)}</h4> `);
                if (itens.length > 1) {
                  $$renderer5.push("<!--[-->");
                  Button($$renderer5, {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onclick: () => removerItem(index),
                    children: ($$renderer6) => {
                      Trash_2($$renderer6, { class: "h-4 w-4 text-destructive" });
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div> <div class="grid gap-4 md:grid-cols-4"><div class="space-y-2">`);
                Label($$renderer5, {
                  for: `codigo-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Código *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `codigo-${stringify(index)}`,
                  placeholder: "PROD-001",
                  required: true,
                  get value() {
                    return item.codigo;
                  },
                  set value($$value) {
                    item.codigo = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="col-span-2 space-y-2">`);
                Label($$renderer5, {
                  for: `descricao-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Descrição *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `descricao-${stringify(index)}`,
                  placeholder: "Nome do produto",
                  required: true,
                  get value() {
                    return item.descricao;
                  },
                  set value($$value) {
                    item.descricao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: `quantidade-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Quantidade *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `quantidade-${stringify(index)}`,
                  type: "number",
                  min: "1",
                  step: "0.01",
                  required: true,
                  get value() {
                    return item.quantidade;
                  },
                  set value($$value) {
                    item.quantidade = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: `unidade-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Unidade`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `unidade-${stringify(index)}`,
                  placeholder: "UN",
                  get value() {
                    return item.unidade;
                  },
                  set value($$value) {
                    item.unidade = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div></div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Observações`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "observacao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Observações`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Textarea($$renderer5, {
                id: "observacao",
                name: "observacao",
                placeholder: "Informações adicionais sobre o transporte...",
                rows: 4,
                get value() {
                  return observacao;
                },
                set value($$value) {
                  observacao = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="flex justify-end gap-2">`);
      Button($$renderer3, {
        type: "button",
        variant: "outline",
        href: "/documentos/fiscais",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        disabled: !localCarga || !localDescarga || !dataSaida,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html("Emitir Guia de Remessa")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></form></div>`);
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
//# sourceMappingURL=_page.svelte-Uljg7i6_.js.map
