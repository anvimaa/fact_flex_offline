import { ax as store_get, av as head, ay as unsubscribe_stores, al as attributes, aq as bind_props, _ as derived, ai as spread_props, aw as attr, an as ensure_array_like, az as attr_class, aB as stringify } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './zod-vsheQqNr.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import './utils-FiC4zhrQ.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { u as useId, b as box, m as mergeProps, S as SvelteMap, a as useRefById, w as watch } from './use-id-BeJs9ypc.js';
import { C as Context } from './context-BAmjzoO_.js';
import { e as getDataOrientation, g as getDataDisabled, c as getAriaOrientation, n as getHidden, l as getDisabled, o as getAriaSelected } from './attrs-mduo83PF.js';
import { u as useRovingFocus } from './use-roving-focus.svelte-j4gb8sNV.js';
import { n as noop, S as SPACE, E as ENTER } from './noop-CfhljDhh.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { f as format } from './format-C_T_FT1v.js';
import { d as differenceInDays } from './differenceInDays-DxuNzxW_.js';
import './index2-Cz2gv4fD.js';
import './events-GtUqDgmb.js';
import './index-BWA_9C9m.js';
import './parse-DXcVuhZ4.js';
import './types-C7xnNV5k.js';
import './stores-BBk2HDxH.js';
import './index-server-CziyT60N.js';
import './client2-CcJ2Tk7F.js';
import './app-L81mENw7.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';
import './differenceInCalendarDays-DtxpX8GL.js';

const TABS_ROOT_ATTR = "data-tabs-root";
const TABS_LIST_ATTR = "data-tabs-list";
const TABS_TRIGGER_ATTR = "data-tabs-trigger";
const TABS_CONTENT_ATTR = "data-tabs-content";
class TabsRootState {
  opts;
  rovingFocusGroup;
  triggerIds = [];
  // holds the trigger ID for each value to associate it with the content
  valueToTriggerId = new SvelteMap();
  // holds the content ID for each value to associate it with the trigger
  valueToContentId = new SvelteMap();
  constructor(opts) {
    this.opts = opts;
    useRefById(opts);
    this.rovingFocusGroup = useRovingFocus({
      candidateAttr: TABS_TRIGGER_ATTR,
      rootNodeId: this.opts.id,
      loop: this.opts.loop,
      orientation: this.opts.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.opts.value.current = v;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": getDataOrientation(this.opts.orientation.current),
    [TABS_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsListState {
  opts;
  root;
  #isDisabled = derived(() => this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tablist",
    "aria-orientation": getAriaOrientation(this.root.opts.orientation.current),
    "data-orientation": getDataOrientation(this.root.opts.orientation.current),
    [TABS_LIST_ATTR]: "",
    "data-disabled": getDataDisabled(this.#isDisabled())
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsTriggerState {
  opts;
  root;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  #tabIndex = 0;
  #ariaControls = derived(() => this.root.valueToContentId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
    watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
      return this.root.registerTrigger(id, value);
    });
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  #activate() {
    if (this.root.opts.value.current === this.opts.value.current) return;
    this.root.setValue(this.opts.value.current);
  }
  onfocus(_) {
    if (this.root.opts.activationMode.current !== "automatic" || this.#isDisabled()) return;
    this.#activate();
  }
  onclick(_) {
    if (this.#isDisabled()) return;
    this.#activate();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#activate();
      return;
    }
    this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tab",
    "data-state": getTabDataState(this.#isActive()),
    "data-value": this.opts.value.current,
    "data-orientation": getDataOrientation(this.root.opts.orientation.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "aria-selected": getAriaSelected(this.#isActive()),
    "aria-controls": this.#ariaControls(),
    [TABS_TRIGGER_ATTR]: "",
    disabled: getDisabled(this.#isDisabled()),
    tabindex: this.#tabIndex,
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsContentState {
  opts;
  root;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #ariaLabelledBy = derived(() => this.root.valueToTriggerId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
    watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
      return this.root.registerContent(id, value);
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tabpanel",
    hidden: getHidden(!this.#isActive()),
    tabindex: 0,
    "data-value": this.opts.value.current,
    "data-state": getTabDataState(this.#isActive()),
    "aria-labelledby": this.#ariaLabelledBy(),
    [TABS_CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const TabsRootContext = new Context("Tabs.Root");
function useTabsRoot(props) {
  return TabsRootContext.set(new TabsRootState(props));
}
function useTabsTrigger(props) {
  return new TabsTriggerState(props, TabsRootContext.get());
}
function useTabsList(props) {
  return new TabsListState(props, TabsRootContext.get());
}
function useTabsContent(props) {
  return new TabsContentState(props, TabsRootContext.get());
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      value = "",
      onValueChange = noop,
      orientation = "horizontal",
      loop = true,
      activationMode = "automatic",
      disabled = false,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useTabsRoot({
      id: box.with(() => id),
      value: box.with(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      orientation: box.with(() => orientation),
      loop: box.with(() => loop),
      activationMode: box.with(() => activationMode),
      disabled: box.with(() => disabled),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, rootState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref, value });
  });
}
function Tabs_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      ref = null,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useTabsContent({
      value: box.with(() => value),
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, contentState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tabs_list$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      child,
      children,
      id = useId(),
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listState = useTabsList({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, listState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tabs_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      child,
      children,
      disabled = false,
      id = useId(),
      type = "button",
      value,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = useTabsTrigger({
      id: box.with(() => id),
      disabled: box.with(() => disabled ?? false),
      value: box.with(() => value),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
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
function Tabs_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Tabs_content$1) {
        $$renderer3.push("<!--[-->");
        Tabs_content$1($$renderer3, spread_props([
          {
            class: cn("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className),
            value
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
function Tabs_list($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Tabs_list$1) {
        $$renderer3.push("<!--[-->");
        Tabs_list$1($$renderer3, spread_props([
          {
            class: cn("bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1", className)
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
function Tabs_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Tabs_trigger$1) {
        $$renderer3.push("<!--[-->");
        Tabs_trigger$1($$renderer3, spread_props([
          {
            class: cn("ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow", className),
            value
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
const Root = Tabs;
function Card_1($$renderer, $$props) {
  let { title, description, children } = $$props;
  if (Card) {
    $$renderer.push("<!--[-->");
    Card($$renderer, {
      children: ($$renderer2) => {
        if (Card_header) {
          $$renderer2.push("<!--[-->");
          Card_header($$renderer2, {
            children: ($$renderer3) => {
              if (Card_title) {
                $$renderer3.push("<!--[-->");
                Card_title($$renderer3, {
                  children: ($$renderer4) => {
                    $$renderer4.push(`<!---->${escape_html(title)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer3.push("<!--]-->");
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push("<!--]-->");
              }
              $$renderer3.push(` `);
              if (description) {
                $$renderer3.push("<!--[-->");
                if (Card_description) {
                  $$renderer3.push("<!--[-->");
                  Card_description($$renderer3, {
                    children: ($$renderer4) => {
                      $$renderer4.push(`<!---->${escape_html(description)}`);
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
              $$renderer3.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
        $$renderer2.push(` `);
        if (Card_content) {
          $$renderer2.push("<!--[-->");
          Card_content($$renderer2, {
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="space-y-4">`);
              children($$renderer3);
              $$renderer3.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
      },
      $$slots: { default: true }
    });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const { form, errors, constraints } = superForm(data.form);
    const {
      form: pemForm,
      errors: pemErrors
    } = superForm(data.pemForm, { id: "pem-form" });
    let subscriptions = derived(() => data.empresa?.subscriptions);
    let countries = [];
    let cities = [];
    store_get($$store_subs ??= {}, "$form", form).pais || "";
    let logoPreview = store_get($$store_subs ??= {}, "$form", form).logo || null;
    head("ikcwk4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Configurações - ${escape_html(store_get($$store_subs ??= {}, "$form", form).nome)}</title>`);
      });
    });
    $$renderer2.push(`<div class="container mx-auto max-w-6xl px-4 py-8"><div class="space-y-8">`);
    if (Root) {
      $$renderer2.push("<!--[-->");
      Root($$renderer2, {
        value: "empresa",
        class: "w-full",
        children: ($$renderer3) => {
          if (Tabs_list) {
            $$renderer3.push("<!--[-->");
            Tabs_list($$renderer3, {
              class: "grid w-full grid-cols-4",
              children: ($$renderer4) => {
                if (Tabs_trigger) {
                  $$renderer4.push("<!--[-->");
                  Tabs_trigger($$renderer4, {
                    value: "empresa",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Informações da Empresa`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Tabs_trigger) {
                  $$renderer4.push("<!--[-->");
                  Tabs_trigger($$renderer4, {
                    value: "usuarios",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Usuários`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Tabs_trigger) {
                  $$renderer4.push("<!--[-->");
                  Tabs_trigger($$renderer4, {
                    value: "plano",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Plano`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Tabs_trigger) {
                  $$renderer4.push("<!--[-->");
                  Tabs_trigger($$renderer4, {
                    value: "chaves-pem",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Chaves RSA`);
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
          $$renderer3.push(` `);
          if (Tabs_content) {
            $$renderer3.push("<!--[-->");
            Tabs_content($$renderer3, {
              value: "empresa",
              class: "mt-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="space-y-8"><form method="POST" action="?/update"><input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/> `);
                Card_1($$renderer4, {
                  title: "Informações Básicas",
                  description: "Informações básicas da empresa",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="grid gap-6 md:grid-cols-2"><div class="space-y-2"><label for="nome" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Nome da Empresa</label> <input type="text" id="nome" name="nome"${attr("value", store_get($$store_subs ??= {}, "$form", form).nome)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).nome) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).nome)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="space-y-2"><label for="nif" class="text-sm font-semibold text-gray-700 dark:text-gray-300">NIF</label> <input${attributes(
                      {
                        type: "text",
                        id: "nif",
                        name: "nif",
                        value: store_get($$store_subs ??= {}, "$form", form).nif,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).nif,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      "svelte-ikcwk4",
                      void 0,
                      void 0,
                      4
                    )}/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).nif) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).nif)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="space-y-2"><label for="email" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label> <input${attributes(
                      {
                        type: "email",
                        id: "email",
                        name: "email",
                        value: store_get($$store_subs ??= {}, "$form", form).email,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).email,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      "svelte-ikcwk4",
                      void 0,
                      void 0,
                      4
                    )}/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).email) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="space-y-2"><label for="telefone" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Telefone</label> <input${attributes(
                      {
                        type: "tel",
                        id: "telefone",
                        name: "telefone",
                        value: store_get($$store_subs ??= {}, "$form", form).telefone,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).telefone,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      "svelte-ikcwk4",
                      void 0,
                      void 0,
                      4
                    )}/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).telefone) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).telefone)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="space-y-2"><label for="website" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Website</label> <input${attributes(
                      {
                        type: "url",
                        id: "website",
                        name: "website",
                        value: store_get($$store_subs ??= {}, "$form", form).website,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).website,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      "svelte-ikcwk4",
                      void 0,
                      void 0,
                      4
                    )}/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).website) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).website)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div></div>`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Card_1($$renderer4, {
                  title: "Endereço",
                  description: "Endereço da empresa",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="grid gap-6 md:grid-cols-2"><div class="space-y-2"><label for="pais" class="text-sm font-semibold text-gray-700 dark:text-gray-300">País</label> `);
                    $$renderer5.select(
                      {
                        id: "pais",
                        name: "pais",
                        value: store_get($$store_subs ??= {}, "$form", form).pais,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).pais,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      ($$renderer6) => {
                        $$renderer6.option({ value: "" }, ($$renderer7) => {
                          $$renderer7.push(`Selecione um país`);
                        });
                        $$renderer6.push(`<!--[-->`);
                        const each_array = ensure_array_like(countries);
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let country = each_array[$$index];
                          $$renderer6.option({ value: country.name }, ($$renderer7) => {
                            $$renderer7.push(`${escape_html(country.name)}`);
                          });
                        }
                        $$renderer6.push(`<!--]-->`);
                      },
                      "svelte-ikcwk4"
                    );
                    $$renderer5.push(` `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).pais) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).pais)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="space-y-2"><label for="cidade" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Cidade</label> `);
                    $$renderer5.select(
                      {
                        id: "cidade",
                        name: "cidade",
                        value: store_get($$store_subs ??= {}, "$form", form).cidade,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).cidade,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      ($$renderer6) => {
                        $$renderer6.option({ value: "" }, ($$renderer7) => {
                          $$renderer7.push(`Selecione uma cidade`);
                        });
                        $$renderer6.push(`<!--[-->`);
                        const each_array_1 = ensure_array_like(cities);
                        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                          let city = each_array_1[$$index_1];
                          $$renderer6.option({ value: city }, ($$renderer7) => {
                            $$renderer7.push(`${escape_html(city)}`);
                          });
                        }
                        $$renderer6.push(`<!--]-->`);
                      },
                      "svelte-ikcwk4"
                    );
                    $$renderer5.push(` `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).cidade) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).cidade)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div class="col-span-2 space-y-2"><label for="endereco" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Endereço</label> <input${attributes(
                      {
                        type: "text",
                        id: "endereco",
                        name: "endereco",
                        value: store_get($$store_subs ??= {}, "$form", form).endereco,
                        ...store_get($$store_subs ??= {}, "$constraints", constraints).endereco,
                        class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      },
                      "svelte-ikcwk4",
                      void 0,
                      void 0,
                      4
                    )}/> `);
                    if (store_get($$store_subs ??= {}, "$errors", errors).endereco) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="mt-1 text-sm text-red-600">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).endereco)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div></div>`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Card_1($$renderer4, {
                  title: "Logo da Empresa",
                  description: "Atualize a logo da empresa",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="grid gap-8 md:grid-cols-2"><div class="flex items-center justify-center"><label for="logo-upload"${attr_class(`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${""}`, "svelte-ikcwk4")}><div class="flex flex-col items-center justify-center pb-6 pt-5">`);
                    {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push(`<svg class="mb-3 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">`);
                      {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<span class="font-semibold">Clique para fazer upload</span> ou arraste e
														solte`);
                      }
                      $$renderer5.push(`<!--]--></p> <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou JPEG (MAX. 5MB)</p>`);
                    }
                    $$renderer5.push(`<!--]--></div> <input id="logo-upload" type="file" accept="image/*" class="hidden"/></label></div> <div class="flex items-center justify-center">`);
                    if (logoPreview) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<div class="relative h-48 w-48 overflow-hidden rounded-lg"><img${attr("src", logoPreview)} alt="Logo Preview" class="h-full w-full object-contain"/> <button type="button" class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <input type="hidden" name="logo"${attr("value", store_get($$store_subs ??= {}, "$form", form).logo)}/>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push(`<div class="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"><p class="text-sm text-gray-500 dark:text-gray-400">Nenhum logo selecionado</p></div>`);
                    }
                    $$renderer5.push(`<!--]--></div></div>`);
                  }
                });
                $$renderer4.push(`<!----> <div class="mt-4 flex space-x-4"><button type="submit" class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Salvar</button></div></form></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` `);
          if (Tabs_content) {
            $$renderer3.push("<!--[-->");
            Tabs_content($$renderer3, {
              value: "usuarios",
              class: "mt-6",
              children: ($$renderer4) => {
                Card_1($$renderer4, {
                  title: "Usuários",
                  description: "Lista de usuários da empresa",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="space-y-4"><!--[-->`);
                    const each_array_2 = ensure_array_like(data.usuarios);
                    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                      let usuario = each_array_2[$$index_2];
                      $$renderer5.push(`<div class="flex items-center justify-between rounded-lg border p-4"><div class="flex items-center space-x-4">`);
                      Avatar($$renderer5, {
                        children: ($$renderer6) => {
                          Avatar_image($$renderer6, { src: usuario.image ?? "", alt: usuario.name ?? "" });
                          $$renderer6.push(`<!----> `);
                          Avatar_fallback($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->${escape_html(usuario.name?.[0] ?? "U")}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push(`<!----> <div><p class="font-medium">${escape_html(usuario.name)}</p> <p class="text-sm text-gray-500">${escape_html(usuario.email)}</p></div></div> <div class="flex items-center space-x-2 text-sm text-gray-500"><span>Criado em: ${escape_html(format(new Date(usuario.createdAt), "dd/MM/yyyy"))}</span> <div${attr_class(`h-2 w-2 rounded-full ${stringify(usuario.emailVerified ? "bg-green-500" : "bg-yellow-500")}`)}></div></div></div>`);
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  }
                });
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` `);
          if (Tabs_content) {
            $$renderer3.push("<!--[-->");
            Tabs_content($$renderer3, {
              value: "plano",
              class: "mt-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="space-y-6">`);
                Card_1($$renderer4, {
                  title: "Plano Atual",
                  description: "Informações sobre o plano atual da empresa",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="space-y-4"><div class="flex items-center justify-between"><div>`);
                    if (subscriptions()?.length === 0) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<h3 class="text-lg font-medium">Nenhum plano activo</h3>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push(`<h3 class="text-lg font-medium">Plano ${escape_html(subscriptions()?.[0]?.planType || "Gratuito")}</h3> <p class="text-sm text-muted-foreground">Estado: `);
                      Badge($$renderer5, {
                        variant: subscriptions()?.[0]?.status === "ACTIVE" ? "default" : "destructive",
                        children: ($$renderer6) => {
                          $$renderer6.push(`<!---->${escape_html(subscriptions()?.[0]?.status === "ACTIVE" ? "Ativo" : "Inativo")}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push(`<!----></p>`);
                    }
                    $$renderer5.push(`<!--]--></div> <a href="/planos" class="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">Alterar plano</a></div></div>`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Card_1($$renderer4, {
                  title: "Histórico de Subscrições",
                  description: "Histórico de todos os planos contratados",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="rounded-md border">`);
                    if (Table) {
                      $$renderer5.push("<!--[-->");
                      Table($$renderer5, {
                        children: ($$renderer6) => {
                          if (Table_header) {
                            $$renderer6.push("<!--[-->");
                            Table_header($$renderer6, {
                              children: ($$renderer7) => {
                                if (Table_row) {
                                  $$renderer7.push("<!--[-->");
                                  Table_row($$renderer7, {
                                    children: ($$renderer8) => {
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Plano`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                      $$renderer8.push(` `);
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Periodo`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                      $$renderer8.push(` `);
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Estado`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                      $$renderer8.push(` `);
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          class: "text-right",
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Início`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                      $$renderer8.push(` `);
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          class: "text-right",
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Término`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                      $$renderer8.push(` `);
                                      if (Table_head) {
                                        $$renderer8.push("<!--[-->");
                                        Table_head($$renderer8, {
                                          class: "text-right",
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!---->Dias Restantes`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
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
                          $$renderer6.push(` `);
                          if (Table_body) {
                            $$renderer6.push("<!--[-->");
                            Table_body($$renderer6, {
                              children: ($$renderer7) => {
                                if (subscriptions() && subscriptions().length > 0) {
                                  $$renderer7.push("<!--[-->");
                                  $$renderer7.push(`<!--[-->`);
                                  const each_array_3 = ensure_array_like(subscriptions());
                                  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                                    let subscription = each_array_3[$$index_3];
                                    const daysLeft = differenceInDays(new Date(subscription.endDate), /* @__PURE__ */ new Date());
                                    if (Table_row) {
                                      $$renderer7.push("<!--[-->");
                                      Table_row($$renderer7, {
                                        children: ($$renderer8) => {
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              class: "font-medium uppercase",
                                              children: ($$renderer9) => {
                                                $$renderer9.push(`<!---->${escape_html(subscription.planType)}`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                          $$renderer8.push(` `);
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              class: "font-medium uppercase",
                                              children: ($$renderer9) => {
                                                $$renderer9.push(`<!---->${escape_html(subscription.periodType)}`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                          $$renderer8.push(` `);
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              children: ($$renderer9) => {
                                                Badge($$renderer9, {
                                                  variant: subscription.status === "ACTIVE" ? "default" : "destructive",
                                                  children: ($$renderer10) => {
                                                    $$renderer10.push(`<!---->${escape_html(subscription.status === "ACTIVE" ? "Ativo" : "Inativo")}`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                          $$renderer8.push(` `);
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              class: "text-right",
                                              children: ($$renderer9) => {
                                                $$renderer9.push(`<!---->${escape_html(subscription.startDate?.toLocaleDateString("pt-BR") || "-")}`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                          $$renderer8.push(` `);
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              class: "text-right",
                                              children: ($$renderer9) => {
                                                $$renderer9.push(`<!---->${escape_html(subscription.endDate?.toLocaleDateString("pt-BR") || "-")}`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                          $$renderer8.push(` `);
                                          if (Table_cell) {
                                            $$renderer8.push("<!--[-->");
                                            Table_cell($$renderer8, {
                                              class: "text-right font-medium",
                                              children: ($$renderer9) => {
                                                $$renderer9.push(`<!---->${escape_html(daysLeft)} dia(s) restante(s)`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer8.push("<!--]-->");
                                          } else {
                                            $$renderer8.push("<!--[!-->");
                                            $$renderer8.push("<!--]-->");
                                          }
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer7.push("<!--]-->");
                                    } else {
                                      $$renderer7.push("<!--[!-->");
                                      $$renderer7.push("<!--]-->");
                                    }
                                  }
                                  $$renderer7.push(`<!--]-->`);
                                } else {
                                  $$renderer7.push("<!--[!-->");
                                  if (Table_row) {
                                    $$renderer7.push("<!--[-->");
                                    Table_row($$renderer7, {
                                      children: ($$renderer8) => {
                                        if (Table_cell) {
                                          $$renderer8.push("<!--[-->");
                                          Table_cell($$renderer8, {
                                            colspan: 6,
                                            class: "py-6 text-center text-muted-foreground",
                                            children: ($$renderer9) => {
                                              $$renderer9.push(`<!---->Nenhuma subscrição encontrada`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer8.push("<!--]-->");
                                        } else {
                                          $$renderer8.push("<!--[!-->");
                                          $$renderer8.push("<!--]-->");
                                        }
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer7.push("<!--]-->");
                                  } else {
                                    $$renderer7.push("<!--[!-->");
                                    $$renderer7.push("<!--]-->");
                                  }
                                }
                                $$renderer7.push(`<!--]-->`);
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
                    $$renderer5.push(`</div>`);
                  }
                });
                $$renderer4.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` `);
          if (Tabs_content) {
            $$renderer3.push("<!--[-->");
            Tabs_content($$renderer3, {
              value: "chaves-pem",
              class: "mt-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<form method="POST" action="?/updatePem" class="space-y-6"><input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$pemForm", pemForm).id)}/> <div class="grid md:grid-cols-2 gap-2">`);
                Card_1($$renderer4, {
                  title: "Chave Privada",
                  description: "Fornecida pelo portal da AGT. Mantenha-a sempre em segredo.",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="space-y-3"><div class="flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300"><svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path></svg> <span>Deve começar com <code class="font-mono font-semibold">-----BEGIN PRIVATE KEY-----</code> e terminar com <code class="font-mono font-semibold">-----END PRIVATE KEY-----</code>.</span></div> <div class="relative"><textarea id="privateKeyPem" name="privateKeyPem" rows="14" spellcheck="false" autocomplete="off"${attr_class(`block w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${stringify("text-security-disc")}`, "svelte-ikcwk4")} placeholder="-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----">`);
                    const $$body = escape_html(store_get($$store_subs ??= {}, "$pemForm", pemForm).privateKeyPem);
                    if ($$body) {
                      $$renderer5.push(`${$$body}`);
                    }
                    $$renderer5.push(`</textarea> <button type="button" class="absolute right-2 top-2 rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">${escape_html("Mostrar")}</button></div> `);
                    if (store_get($$store_subs ??= {}, "$pemErrors", pemErrors).privateKeyPem) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="text-sm text-red-600 dark:text-red-400">${escape_html(store_get($$store_subs ??= {}, "$pemErrors", pemErrors).privateKeyPem)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Card_1($$renderer4, {
                  title: "Chave Público",
                  description: "Fornecida pelo portal da AGT para verificação de assinaturas.",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="space-y-3"><div class="flex items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-300"><svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z"></path></svg> <span>Deve começar com <code class="font-mono font-semibold">-----BEGIN PUBLIC KEY-----</code> e terminar com <code class="font-mono font-semibold">-----END PUBLIC KEY-----</code>.</span></div> <div class="relative"><textarea id="publicKeyPem" name="publicKeyPem" rows="14" spellcheck="false" autocomplete="off"${attr_class(`block w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${stringify("text-security-disc")}`, "svelte-ikcwk4")} placeholder="-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----">`);
                    const $$body_1 = escape_html(store_get($$store_subs ??= {}, "$pemForm", pemForm).publicKeyPem);
                    if ($$body_1) {
                      $$renderer5.push(`${$$body_1}`);
                    }
                    $$renderer5.push(`</textarea> <button type="button" class="absolute right-2 top-2 rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">${escape_html("Mostrar")}</button></div> `);
                    if (store_get($$store_subs ??= {}, "$pemErrors", pemErrors).publicKeyPem) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<p class="text-sm text-red-600 dark:text-red-400">${escape_html(store_get($$store_subs ??= {}, "$pemErrors", pemErrors).publicKeyPem)}</p>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  }
                });
                $$renderer4.push(`<!----></div> <div class="mt-4 flex space-x-4"><button type="submit" class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Salvar Chaves</button></div></form>`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BporVV-5.js.map
