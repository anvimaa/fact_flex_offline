import { aq as bind_props, an as ensure_array_like, al as attributes, _ as derived } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { B as Button } from './button-DjcfiVkK.js';
import { w as watch, b as box, u as useId, m as mergeProps } from './use-id-BeJs9ypc.js';
import { n as noop } from './noop-CfhljDhh.js';
import { F as Floating_layer, a as Floating_layer_anchor } from './mounted-Bmfh9OVK.js';
import { u as useSelectRoot, S as Select_hidden_input, a as Select_content, f as Select_item, h as useSelectInput, i as useSelectComboTrigger } from './select-item-hENHecOH.js';
import { C as Chevrons_up_down } from './chevrons-up-down-CTdYsjBi.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function Combobox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onValueChange = noop,
      name = "",
      disabled = false,
      type,
      open = false,
      onOpenChange = noop,
      loop = false,
      scrollAlignment = "nearest",
      required = false,
      items = [],
      allowDeselect = true,
      children
    } = $$props;
    if (value === void 0) {
      const defaultValue = type === "single" ? "" : [];
      value = defaultValue;
    }
    watch.pre(() => value, () => {
      if (value !== void 0) return;
      value = type === "single" ? "" : [];
    });
    const rootState = useSelectRoot({
      type,
      value: box.with(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      disabled: box.with(() => disabled),
      required: box.with(() => required),
      open: box.with(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      loop: box.with(() => loop),
      scrollAlignment: box.with(() => scrollAlignment),
      name: box.with(() => name),
      isCombobox: true,
      items: box.with(() => items),
      allowDeselect: box.with(() => allowDeselect)
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Floating_layer($$renderer3, {
        children: ($$renderer4) => {
          children?.($$renderer4);
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> `);
      if (Array.isArray(rootState.opts.value.current)) {
        $$renderer3.push("<!--[-->");
        if (rootState.opts.value.current.length) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(rootState.opts.value.current);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let item = each_array[$$index];
            Select_hidden_input($$renderer3, { value: item });
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
        Select_hidden_input($$renderer3, {
          get value() {
            return rootState.opts.value.current;
          },
          set value($$value) {
            rootState.opts.value.current = $$value;
            $$settled = false;
          }
        });
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, open });
  });
}
function Combobox_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      child,
      defaultValue,
      clearOnDeselect = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const inputState = useSelectInput({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      clearOnDeselect: box.with(() => clearOnDeselect)
    });
    if (defaultValue) {
      inputState.root.inputValue = defaultValue;
    }
    const mergedProps = derived(() => mergeProps(restProps, inputState.props, { value: inputState.root.inputValue }));
    if (Floating_layer_anchor) {
      $$renderer2.push("<!--[-->");
      Floating_layer_anchor($$renderer2, {
        id,
        children: ($$renderer3) => {
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, { props: mergedProps() });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<input${attributes({ ...mergedProps() }, void 0, void 0, void 0, 4)}/>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    bind_props($$props, { ref });
  });
}
function Combobox_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      child,
      children,
      type = "button",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = useSelectComboTrigger({
      id: box.with(() => id),
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
function Combobox_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      items = [],
      value = void 0,
      placeholder = "Selecione um item...",
      emptyText = "Nenhum item encontrado.",
      createLabel = "Criar novo",
      className,
      onSelect,
      onCreate,
      filter
    } = $$props;
    let inputValue = "";
    let touchedInput = false;
    let open = false;
    let inputRef = null;
    const filteredItems = derived(() => {
      if (!inputValue && !touchedInput) return items;
      if (!inputValue) return items;
      if (value) {
        const selectedItem = items.find((i) => i.value === value);
        if (selectedItem && selectedItem.label === inputValue) {
          return items;
        }
      }
      const search = inputValue.toLowerCase();
      if (filter) {
        return items.filter((item) => filter(item, search));
      }
      return items.filter((item) => item.label.toLowerCase().includes(search));
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Combobox) {
        $$renderer3.push("<!--[-->");
        Combobox($$renderer3, {
          type: "single",
          onOpenChange: (isOpen) => {
            if (!isOpen) {
              if (value) {
                const selectedItem = items.find((i) => i.value === value);
                if (selectedItem) {
                  inputValue = selectedItem.label;
                  if (inputRef) inputRef.value = selectedItem.label;
                }
              } else {
                inputValue = "";
                if (inputRef) inputRef.value = "";
              }
              touchedInput = false;
            }
          },
          onValueChange: (val) => {
            if (val) {
              onSelect?.(val);
              open = false;
            }
          },
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="relative w-full">`);
            if (Combobox_input) {
              $$renderer4.push("<!--[-->");
              Combobox_input($$renderer4, {
                class: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
                placeholder,
                oninput: (e) => {
                  inputValue = e.currentTarget.value;
                  touchedInput = true;
                  if (!open) open = true;
                },
                onclick: () => {
                  if (!open) open = true;
                },
                get ref() {
                  return inputRef;
                },
                set ref($$value) {
                  inputRef = $$value;
                  $$settled = false;
                }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
            $$renderer4.push(` `);
            if (Combobox_trigger) {
              $$renderer4.push("<!--[-->");
              Combobox_trigger($$renderer4, {
                class: "absolute right-0 top-0 h-full px-2",
                children: ($$renderer5) => {
                  Chevrons_up_down($$renderer5, { class: "h-4 w-4 text-muted-foreground" });
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
            $$renderer4.push(`</div> `);
            if (Select_content) {
              $$renderer4.push("<!--[-->");
              Select_content($$renderer4, {
                class: "z-50 min-w-[var(--bits-combobox-anchor-width)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
                sideOffset: 8,
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="max-h-[300px] overflow-y-auto p-1">`);
                  if (onCreate) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="border-b p-1">`);
                    Button($$renderer5, {
                      variant: "ghost",
                      class: "w-full justify-start text-sm font-normal",
                      onclick: () => {
                        onCreate();
                        open = false;
                      },
                      children: ($$renderer6) => {
                        Plus($$renderer6, { class: "mr-2 h-4 w-4" });
                        $$renderer6.push(`<!----> ${escape_html(createLabel)}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> `);
                  if (filteredItems().length === 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="py-6 text-center text-sm text-muted-foreground">${escape_html(emptyText)}</div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`<!--[-->`);
                    const each_array = ensure_array_like(filteredItems());
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let item = each_array[$$index];
                      if (Select_item) {
                        $$renderer5.push("<!--[-->");
                        Select_item($$renderer5, {
                          class: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
                          value: item.value,
                          label: item.label,
                          children: ($$renderer6) => {
                            if (value === item.value) {
                              $$renderer6.push("<!--[-->");
                              $$renderer6.push(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">`);
                              Check($$renderer6, { class: "h-4 w-4" });
                              $$renderer6.push(`<!----></span>`);
                            } else {
                              $$renderer6.push("<!--[!-->");
                            }
                            $$renderer6.push(`<!--]--> ${escape_html(item.label)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
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
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value });
  });
}

export { Combobox_1 as C };
//# sourceMappingURL=combobox-BTJ3pIs7.js.map
