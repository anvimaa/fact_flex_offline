import { ax as store_get, ay as unsubscribe_stores, av as head, _ as derived, aq as bind_props, aE as store_mutate, aw as attr, ah as sanitize_props, ai as spread_props, ap as slot, al as attributes, am as clsx } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import './zod-vsheQqNr.js';
import './utils-FiC4zhrQ.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { B as Button, b as buttonVariants } from './button-DjcfiVkK.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { C as Checkbox } from './checkbox-5hPZTOsI.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { f as formatCurrency, I as Icon, h as cn } from './utils3-DjmiJAAD.js';
import { R as Root$1, S as Select_trigger, a as Select_content, b as Select_item } from './index9-BnG82wbB.js';
import { b as box, u as useId, m as mergeProps } from './use-id-BeJs9ypc.js';
import { n as noop } from './noop-CfhljDhh.js';
import { u as useDialogRoot, a as useDialogContent, D as Dialog_overlay, s as shouldTrapFocus, f as useAlertDialogCancel } from './dialog-overlay-B0LeiJFX.js';
import { D as Dialog_trigger, a as Dialog_title } from './dialog-trigger-DAHFPuwQ.js';
import { t as taxExemptions } from './taxaExceptins-GD_SevWk.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { S as Save } from './save-mOlOBJLe.js';
import { P as Package } from './package-BKsm9DRA.js';
import { S as Sparkles } from './sparkles-CciqIUXu.js';
import { T as Tag } from './tag-Z83dV6tm.js';
import { L as List, S as Shield_check } from './shield-check-DGZWuC59.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { P as Portal } from './portal-ByHxxBCn.js';
import { P as Presence_layer, d as Focus_scope, a as afterTick, E as Escape_layer, D as Dismissible_layer, T as Text_selection_layer, S as Scroll_lock } from './scroll-lock-DpPha3vp.js';
import { D as Dialog_description } from './dialog-description2-CD_E6-6J.js';
import './index2-Cz2gv4fD.js';
import './stores-BBk2HDxH.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './index-server-CziyT60N.js';
import './app-L81mENw7.js';
import './parse-DXcVuhZ4.js';
import './index-BWA_9C9m.js';
import './types-C7xnNV5k.js';
import './index-r8oPdwp5.js';
import './attrs-mduo83PF.js';
import './check-cM-2r8Wr.js';
import './minus-D8RMQh55.js';
import './context-BAmjzoO_.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './select-item-hENHecOH.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';
import './public-B844qK3e.js';
import './chevron-down-DGXS3bh7.js';

function Clipboard_list($$renderer, $$props) {
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
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      }
    ],
    ["path", { "d": "M12 11h4" }],
    ["path", { "d": "M12 16h4" }],
    ["path", { "d": "M8 11h.01" }],
    ["path", { "d": "M8 16h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "clipboard-list" },
    $$sanitized_props,
    {
      /**
       * @component @name ClipboardList
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI0IiB4PSI4IiB5PSIyIiByeD0iMSIgcnk9IjEiIC8+CiAgPHBhdGggZD0iTTE2IDRoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgyIiAvPgogIDxwYXRoIGQ9Ik0xMiAxMWg0IiAvPgogIDxwYXRoIGQ9Ik0xMiAxNmg0IiAvPgogIDxwYXRoIGQ9Ik04IDExaC4wMSIgLz4KICA8cGF0aCBkPSJNOCAxNmguMDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/clipboard-list
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
function Alert_dialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onOpenChange = noop, children } = $$props;
    useDialogRoot({
      variant: box.with(() => "alert-dialog"),
      open: box.with(() => open, (v) => {
        open = v;
        onOpenChange(v);
      })
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
    bind_props($$props, { open });
  });
}
function Alert_dialog_cancel$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      children,
      child,
      disabled = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const cancelState = useAlertDialogCancel({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      disabled: box.with(() => Boolean(disabled))
    });
    const mergedProps = derived(() => mergeProps(restProps, cancelState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      children,
      child,
      ref = null,
      forceMount = false,
      interactOutsideBehavior = "ignore",
      onCloseAutoFocus = noop,
      onEscapeKeydown = noop,
      onOpenAutoFocus = noop,
      onInteractOutside = noop,
      preventScroll = true,
      trapFocus = true,
      restoreScrollDelay = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useDialogContent({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, contentState.props));
    {
      let presence = function($$renderer3) {
        {
          let focusScope = function($$renderer4, { props: focusScopeProps }) {
            Escape_layer($$renderer4, spread_props([
              mergedProps(),
              {
                enabled: contentState.root.opts.open.current,
                onEscapeKeydown: (e) => {
                  onEscapeKeydown(e);
                  if (e.defaultPrevented) return;
                  contentState.root.handleClose();
                },
                children: ($$renderer5) => {
                  Dismissible_layer($$renderer5, spread_props([
                    mergedProps(),
                    {
                      enabled: contentState.root.opts.open.current,
                      interactOutsideBehavior,
                      onInteractOutside: (e) => {
                        onInteractOutside(e);
                        if (e.defaultPrevented) return;
                        contentState.root.handleClose();
                      },
                      children: ($$renderer6) => {
                        Text_selection_layer($$renderer6, spread_props([
                          mergedProps(),
                          {
                            enabled: contentState.root.opts.open.current,
                            children: ($$renderer7) => {
                              if (child) {
                                $$renderer7.push("<!--[-->");
                                if (contentState.root.opts.open.current) {
                                  $$renderer7.push("<!--[-->");
                                  Scroll_lock($$renderer7, { preventScroll, restoreScrollDelay });
                                } else {
                                  $$renderer7.push("<!--[!-->");
                                }
                                $$renderer7.push(`<!--]--> `);
                                child($$renderer7, {
                                  props: mergeProps(mergedProps(), focusScopeProps),
                                  ...contentState.snippetProps
                                });
                                $$renderer7.push(`<!---->`);
                              } else {
                                $$renderer7.push("<!--[!-->");
                                Scroll_lock($$renderer7, { preventScroll });
                                $$renderer7.push(`<!----> <div${attributes({ ...mergeProps(mergedProps(), focusScopeProps) })}>`);
                                children?.($$renderer7);
                                $$renderer7.push(`<!----></div>`);
                              }
                              $$renderer7.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          }
                        ]));
                      },
                      $$slots: { default: true }
                    }
                  ]));
                },
                $$slots: { default: true }
              }
            ]));
          };
          Focus_scope($$renderer3, {
            loop: true,
            trapFocus: shouldTrapFocus({
              forceMount,
              present: contentState.root.opts.open.current,
              trapFocus,
              open: contentState.root.opts.open.current
            }),
            id,
            onCloseAutoFocus: (e) => {
              onCloseAutoFocus(e);
              if (e.defaultPrevented) return;
              contentState.root.triggerNode?.focus();
            },
            onOpenAutoFocus: (e) => {
              onOpenAutoFocus(e);
              if (e.defaultPrevented) return;
              e.preventDefault();
              afterTick(() => {
                contentState.opts.ref.current?.focus();
              });
            },
            focusScope
          });
        }
      };
      Presence_layer($$renderer2, spread_props([
        mergedProps(),
        {
          forceMount,
          present: contentState.root.opts.open.current || forceMount,
          presence,
          $$slots: { presence: true }
        }
      ]));
    }
    bind_props($$props, { ref });
  });
}
function Alert_dialog_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      level = 3,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Dialog_title) {
        $$renderer3.push("<!--[-->");
        Dialog_title($$renderer3, spread_props([
          { class: cn("text-lg font-semibold", className), level },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_cancel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Alert_dialog_cancel$1) {
        $$renderer3.push("<!--[-->");
        Alert_dialog_cancel$1($$renderer3, spread_props([
          {
            class: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("flex flex-col space-y-2 text-center sm:text-left", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_overlay($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Dialog_overlay) {
        $$renderer3.push("<!--[-->");
        Dialog_overlay($$renderer3, spread_props([
          {
            class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      portalProps,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Portal) {
        $$renderer3.push("<!--[-->");
        Portal($$renderer3, spread_props([
          portalProps,
          {
            children: ($$renderer4) => {
              Alert_dialog_overlay($$renderer4, {});
              $$renderer4.push(`<!----> `);
              if (Alert_dialog_content$1) {
                $$renderer4.push("<!--[-->");
                Alert_dialog_content$1($$renderer4, spread_props([
                  {
                    class: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", className)
                  },
                  restProps,
                  {
                    get ref() {
                      return ref;
                    },
                    set ref($$value) {
                      ref = $$value;
                      $$settled = false;
                    }
                  }
                ]));
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Alert_dialog_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Dialog_description) {
        $$renderer3.push("<!--[-->");
        Dialog_description($$renderer3, spread_props([
          { class: cn("text-muted-foreground text-sm", className) },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
const Root = Alert_dialog;
const Trigger = Dialog_trigger;
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const isNew = derived(() => data.isNew), produto = derived(() => data.produto);
    const { form, errors, message, delayed } = superForm(data.form, {
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          toast.success(store_get($$store_subs ??= {}, "$message", message) || (isNew() ? "Produto criado!" : "Produto atualizado!"));
          goto();
        }
      }
    });
    const categoriasItems = derived(() => data.categorias.map((c) => ({ value: c.id, label: c.nome })));
    const fornecedoresItems = derived(() => data.fornecedores.map((f) => ({ value: f.id, label: f.nome })));
    const taxasItems = derived(() => data.taxas.map((t) => ({ value: t.id, label: `${t.descricao} (${t.valor}%)` })));
    const motivosIsencaoItems = taxExemptions.data.TaxExemptions.map((e) => ({
      value: e.TaxExemption.TaxExemptionCode,
      label: `${e.TaxExemption.TaxExemptionCode} - ${e.TaxExemption.TaxExemptionReason}`
    }));
    let isIsento = store_get($$store_subs ??= {}, "$form", form).isento === "on";
    let showDeleteDialog = false;
    function generateSKU() {
      const prefix = store_get($$store_subs ??= {}, "$form", form).tipo === "S" ? "SRV" : "PRD";
      const date = (/* @__PURE__ */ new Date()).toISOString().slice(2, 10).replace(/-/g, "");
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).codigo = `${prefix}-${date}-${random}`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("g9l6j9", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(isNew() ? "Novo Produto" : `Editar ${produto()?.descricao}`)} | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="flex flex-col gap-6 p-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "outline",
        size: "icon",
        href: "/cadastros/produtos",
        class: "rounded-full",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">${escape_html(isNew() ? "Novo Produto" : "Gestão de Produto")}</h1> <p class="text-muted-foreground">${escape_html(isNew() ? "Cadastre um novo item no catálogo" : `Editando detalhes de ${produto()?.descricao}`)}</p></div></div> <div class="flex items-center gap-3">`);
      if (!isNew()) {
        $$renderer3.push("<!--[-->");
        if (Root) {
          $$renderer3.push("<!--[-->");
          Root($$renderer3, {
            get open() {
              return showDeleteDialog;
            },
            set open($$value) {
              showDeleteDialog = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              if (Trigger) {
                $$renderer4.push("<!--[-->");
                Trigger($$renderer4, {
                  children: ($$renderer5) => {
                    Button($$renderer5, {
                      variant: "outline",
                      class: "text-destructive hover:bg-destructive/10",
                      children: ($$renderer6) => {
                        Trash_2($$renderer6, { class: "mr-2 h-4 w-4" });
                        $$renderer6.push(`<!----> Excluir`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` `);
              if (Alert_dialog_content) {
                $$renderer4.push("<!--[-->");
                Alert_dialog_content($$renderer4, {
                  children: ($$renderer5) => {
                    if (Alert_dialog_header) {
                      $$renderer5.push("<!--[-->");
                      Alert_dialog_header($$renderer5, {
                        children: ($$renderer6) => {
                          if (Alert_dialog_title) {
                            $$renderer6.push("<!--[-->");
                            Alert_dialog_title($$renderer6, {
                              children: ($$renderer7) => {
                                $$renderer7.push(`<!---->Confirmar Exclusão`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
                          $$renderer6.push(` `);
                          if (Alert_dialog_description) {
                            $$renderer6.push("<!--[-->");
                            Alert_dialog_description($$renderer6, {
                              children: ($$renderer7) => {
                                $$renderer7.push(`<!---->Deseja realmente excluir "${escape_html(produto()?.descricao)}"? Esta ação não pode ser desfeita.`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push("<!--]-->");
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push("<!--]-->");
                    }
                    $$renderer5.push(` `);
                    if (Alert_dialog_footer) {
                      $$renderer5.push("<!--[-->");
                      Alert_dialog_footer($$renderer5, {
                        children: ($$renderer6) => {
                          if (Alert_dialog_cancel) {
                            $$renderer6.push("<!--[-->");
                            Alert_dialog_cancel($$renderer6, {
                              children: ($$renderer7) => {
                                $$renderer7.push(`<!---->Cancelar`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
                          $$renderer6.push(` <form action="?/delete" method="POST">`);
                          Button($$renderer6, {
                            type: "submit",
                            variant: "destructive",
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->Confirmar Exclusão`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push(`<!----></form>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push("<!--]-->");
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push("<!--]-->");
                    }
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          });
          $$renderer3.push("<!--]-->");
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push("<!--]-->");
        }
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      Button($$renderer3, {
        variant: "outline",
        href: "/cadastros/produtos",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        form: "product-form",
        disabled: store_get($$store_subs ??= {}, "$delayed", delayed),
        class: "gap-2",
        children: ($$renderer4) => {
          if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            Save($$renderer4, { class: "h-4 w-4" });
          }
          $$renderer4.push(`<!--]--> ${escape_html(isNew() ? "Salvar Produto" : "Atualizar Dados")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
      Separator($$renderer3, {});
      $$renderer3.push(`<!----> <form id="product-form" method="POST" action="?/save" class="grid gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Package($$renderer5, { class: "h-5 w-5 text-blue-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Informações Básicas`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Detalhes essenciais do item`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "codigo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Código / SKU`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex gap-2">`);
              Input($$renderer5, {
                id: "codigo",
                name: "codigo",
                placeholder: "Ex: PROD-001",
                error: store_get($$store_subs ??= {}, "$errors", errors).codigo,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).codigo;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).codigo = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "button",
                variant: "secondary",
                size: "icon",
                onclick: generateSKU,
                title: "Gerar SKU",
                class: "shrink-0",
                children: ($$renderer6) => {
                  Sparkles($$renderer6, { class: "h-4 w-4" });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "tipo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tipo`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (Root$1) {
                $$renderer5.push("<!--[-->");
                Root$1($$renderer5, {
                  name: "tipo",
                  type: "single",
                  required: true,
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).tipo;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).tipo = $$value);
                    $$settled = false;
                  },
                  children: ($$renderer6) => {
                    if (Select_trigger) {
                      $$renderer6.push("<!--[-->");
                      Select_trigger($$renderer6, {
                        id: "tipo",
                        class: "w-full",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$form", form).tipo === "P" ? "Produto" : store_get($$store_subs ??= {}, "$form", form).tipo === "S" ? "Serviço" : "Selecione")}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push("<!--]-->");
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push("<!--]-->");
                    }
                    $$renderer6.push(` `);
                    if (Select_content) {
                      $$renderer6.push("<!--[-->");
                      Select_content($$renderer6, {
                        children: ($$renderer7) => {
                          if (Select_item) {
                            $$renderer7.push("<!--[-->");
                            Select_item($$renderer7, {
                              value: "P",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Produto`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push("<!--]-->");
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push("<!--]-->");
                          }
                          $$renderer7.push(` `);
                          if (Select_item) {
                            $$renderer7.push("<!--[-->");
                            Select_item($$renderer7, {
                              value: "S",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Serviço`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push("<!--]-->");
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push("<!--]-->");
                          }
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push("<!--]-->");
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push("<!--]-->");
                    }
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push("<!--]-->");
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push("<!--]-->");
              }
              $$renderer5.push(`</div></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "descricao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Descrição`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "descricao",
                name: "descricao",
                placeholder: "Nome para exibição",
                error: store_get($$store_subs ??= {}, "$errors", errors).descricao,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).descricao;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).descricao = $$value);
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
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Tag($$renderer5, { class: "h-5 w-5 text-green-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Precificação e Estoque`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Valores e inventário`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6 md:grid-cols-3",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "precoUnitario",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Preço Unitário`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "precoUnitario",
                name: "precoUnitario",
                type: "number",
                step: "0.01",
                error: store_get($$store_subs ??= {}, "$errors", errors).precoUnitario,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).precoUnitario;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).precoUnitario = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "quantidade",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Qtd. Estoque`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "quantidade",
                name: "quantidade",
                type: "number",
                error: store_get($$store_subs ??= {}, "$errors", errors).quantidade,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).quantidade;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).quantidade = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "desconto",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Desconto (%)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "desconto",
                name: "desconto",
                type: "number",
                step: "0.01",
                error: store_get($$store_subs ??= {}, "$errors", errors).desconto,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).desconto;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).desconto = $$value);
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
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              List($$renderer5, { class: "h-5 w-5 text-purple-500" });
              $$renderer5.push(`<!----> `);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Classificação`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6 md:grid-cols-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Categoria`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: categoriasItems(),
                className: "w-full",
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).categoriaId;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).categoriaId = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <input type="hidden" name="categoriaId"${attr("value", store_get($$store_subs ??= {}, "$form", form).categoriaId)}/></div> <div class="space-y-2">`);
              Label($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Fornecedor`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: fornecedoresItems(),
                className: "w-full",
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).fornecedorId;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).fornecedorId = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <input type="hidden" name="fornecedorId"${attr("value", store_get($$store_subs ??= {}, "$form", form).fornecedorId)}/></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-6">`);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Shield_check($$renderer5, { class: "h-5 w-5 text-orange-500" });
              $$renderer5.push(`<!----> `);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tributação`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center space-x-2 rounded-lg border border-orange-100 bg-orange-50/50 p-3 dark:border-orange-900/20 dark:bg-orange-900/10">`);
              Checkbox($$renderer5, {
                id: "isento",
                name: "isento",
                get checked() {
                  return isIsento;
                },
                set checked($$value) {
                  isIsento = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Label($$renderer5, {
                for: "isento",
                class: "text-xs font-medium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Item Isento de IVA/Taxa`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              if (isIsento) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Motivo de Isenção`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: motivosIsencaoItems,
                  className: "w-full",
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).motivoIsento;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).motivoIsento = $$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <input type="hidden" name="motivoIsento"${attr("value", store_get($$store_subs ??= {}, "$form", form).motivoIsento)}/></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Taxa de Imposto`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: taxasItems(),
                  className: "w-full",
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).taxaId;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).taxaId = $$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <input type="hidden" name="taxaId"${attr("value", store_get($$store_subs ??= {}, "$form", form).taxaId)}/></div>`);
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
      if (!isNew() && produto()) {
        $$renderer3.push("<!--[-->");
        Card($$renderer3, {
          class: "border-none bg-muted/30 shadow-none ring-1 ring-border/50",
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              class: "pb-2",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex items-center gap-2 text-muted-foreground">`);
                Clipboard_list($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> `);
                Card_title($$renderer5, {
                  class: "text-sm",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Histórico e Metadados`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_content($$renderer4, {
              class: "grid gap-3 text-xs",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex justify-between"><span class="text-muted-foreground">Criado em:</span> <span class="font-medium">${escape_html(new Date(produto().createdAt).toLocaleDateString())}</span></div> <div class="flex justify-between"><span class="text-muted-foreground">Valor em Estoque:</span> <span class="font-bold text-green-600 dark:text-green-400">${escape_html(formatCurrency(produto().precoUnitario * produto().quantidade))}</span></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></form></div>`);
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
//# sourceMappingURL=_page.svelte-CHf9IFiK.js.map
