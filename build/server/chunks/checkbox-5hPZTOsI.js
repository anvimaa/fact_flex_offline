import { aq as bind_props, ai as spread_props, al as attributes, _ as derived, aF as is_array, aG as get_prototype_of, aH as object_prototype } from './index-DPRpZFUH.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { M as Minus } from './minus-D8RMQh55.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { u as useId, w as watch, b as box, m as mergeProps, a as useRefById } from './use-id-BeJs9ypc.js';
import { C as Context } from './context-BAmjzoO_.js';
import { g as getDataDisabled, j as getAriaRequired, k as getAriaChecked } from './attrs-mduo83PF.js';
import { E as ENTER, S as SPACE } from './noop-CfhljDhh.js';
import { H as Hidden_input } from './hidden-input-sNTj1t7e.js';

const empty = [];
function snapshot(value, skip_warning = false, no_tojson = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element = value[i];
        if (i in value) {
          copy[i] = clone(element, cloned, path, paths, null, no_tojson);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key of Object.keys(value)) {
        copy[key] = clone(
          // @ts-expect-error
          value[key],
          cloned,
          path,
          paths,
          null,
          no_tojson
        );
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function" && !no_tojson) {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
const CHECKBOX_ROOT_ATTR = "data-checkbox-root";
class CheckboxRootState {
  opts;
  group;
  #trueName = derived(() => {
    if (this.group && this.group.opts.name.current) {
      return this.group.opts.name.current;
    } else {
      return this.opts.name.current;
    }
  });
  get trueName() {
    return this.#trueName();
  }
  set trueName($$value) {
    return this.#trueName($$value);
  }
  #trueRequired = derived(() => {
    if (this.group && this.group.opts.required.current) {
      return true;
    }
    return this.opts.required.current;
  });
  get trueRequired() {
    return this.#trueRequired();
  }
  set trueRequired($$value) {
    return this.#trueRequired($$value);
  }
  #trueDisabled = derived(() => {
    if (this.group && this.group.opts.disabled.current) {
      return true;
    }
    return this.opts.disabled.current;
  });
  get trueDisabled() {
    return this.#trueDisabled();
  }
  set trueDisabled($$value) {
    return this.#trueDisabled($$value);
  }
  constructor(opts, group = null) {
    this.opts = opts;
    this.group = group;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    useRefById(opts);
    watch.pre(
      [
        () => snapshot(this.group?.opts.value.current),
        () => this.opts.value.current
      ],
      ([groupValue, value]) => {
        if (!groupValue || !value) return;
        this.opts.checked.current = groupValue.includes(value);
      }
    );
    watch.pre(() => this.opts.checked.current, (checked) => {
      if (!this.group) return;
      if (checked) {
        this.group?.addValue(this.opts.value.current);
      } else {
        this.group?.removeValue(this.opts.value.current);
      }
    });
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === ENTER) e.preventDefault();
    if (e.key === SPACE) {
      e.preventDefault();
      this.#toggle();
    }
  }
  #toggle() {
    if (this.opts.indeterminate.current) {
      this.opts.indeterminate.current = false;
      this.opts.checked.current = true;
    } else {
      this.opts.checked.current = !this.opts.checked.current;
    }
  }
  onclick(_) {
    if (this.opts.disabled.current) return;
    this.#toggle();
  }
  #snippetProps = derived(() => ({
    checked: this.opts.checked.current,
    indeterminate: this.opts.indeterminate.current
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "checkbox",
    type: this.opts.type.current,
    disabled: this.trueDisabled,
    "aria-checked": getAriaChecked(this.opts.checked.current, this.opts.indeterminate.current),
    "aria-required": getAriaRequired(this.trueRequired),
    "data-disabled": getDataDisabled(this.trueDisabled),
    "data-state": getCheckboxDataState(this.opts.checked.current, this.opts.indeterminate.current),
    [CHECKBOX_ROOT_ATTR]: "",
    onclick: this.onclick,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CheckboxInputState {
  root;
  #trueChecked = derived(() => {
    if (this.root.group) {
      if (this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) {
        return true;
      }
      return false;
    }
    return this.root.opts.checked.current;
  });
  get trueChecked() {
    return this.#trueChecked();
  }
  set trueChecked($$value) {
    return this.#trueChecked($$value);
  }
  #shouldRender = derived(() => Boolean(this.root.trueName));
  get shouldRender() {
    return this.#shouldRender();
  }
  set shouldRender($$value) {
    return this.#shouldRender($$value);
  }
  constructor(root) {
    this.root = root;
  }
  #props = derived(() => ({
    type: "checkbox",
    checked: this.root.opts.checked.current === true,
    disabled: this.root.trueDisabled,
    required: this.root.trueRequired,
    name: this.root.trueName,
    value: this.root.opts.value.current
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function getCheckboxDataState(checked, indeterminate) {
  if (indeterminate) return "indeterminate";
  return checked ? "checked" : "unchecked";
}
const CheckboxGroupContext = new Context("Checkbox.Group");
const CheckboxRootContext = new Context("Checkbox.Root");
function useCheckboxRoot(props, group) {
  return CheckboxRootContext.set(new CheckboxRootState(props, group));
}
function useCheckboxInput() {
  return new CheckboxInputState(CheckboxRootContext.get());
}
function Checkbox_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const inputState = useCheckboxInput();
    if (inputState.shouldRender) {
      $$renderer2.push("<!--[-->");
      Hidden_input($$renderer2, spread_props([inputState.props]));
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Checkbox$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      checked = false,
      ref = null,
      onCheckedChange,
      children,
      disabled = false,
      required = false,
      name = void 0,
      value = "on",
      id = useId(),
      indeterminate = false,
      onIndeterminateChange,
      child,
      type = "button",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const group = CheckboxGroupContext.getOr(null);
    if (group && value) {
      if (group.opts.value.current.includes(value)) {
        checked = true;
      } else {
        checked = false;
      }
    }
    watch.pre(() => value, () => {
      if (group && value) {
        if (group.opts.value.current.includes(value)) {
          checked = true;
        } else {
          checked = false;
        }
      }
    });
    const rootState = useCheckboxRoot(
      {
        checked: box.with(() => checked, (v) => {
          checked = v;
          onCheckedChange?.(v);
        }),
        disabled: box.with(() => disabled ?? false),
        required: box.with(() => required),
        name: box.with(() => name),
        value: box.with(() => value),
        id: box.with(() => id),
        ref: box.with(() => ref, (v) => ref = v),
        indeterminate: box.with(() => indeterminate, (v) => {
          indeterminate = v;
          onIndeterminateChange?.(v);
        }),
        type: box.with(() => type)
      },
      group
    );
    const mergedProps = derived(() => mergeProps({ ...restProps }, rootState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps(), ...rootState.snippetProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2, rootState.snippetProps);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]--> `);
    Checkbox_input($$renderer2);
    $$renderer2.push(`<!---->`);
    bind_props($$props, { checked, ref, indeterminate });
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      checked = false,
      indeterminate = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let children = function($$renderer4, { checked: checked2, indeterminate: indeterminate2 }) {
          $$renderer4.push(`<span class="flex items-center justify-center text-current">`);
          if (indeterminate2) {
            $$renderer4.push("<!--[-->");
            Minus($$renderer4, { class: "size-4" });
          } else {
            $$renderer4.push("<!--[!-->");
            Check($$renderer4, { class: cn("size-4", !checked2 && "text-transparent") });
          }
          $$renderer4.push(`<!--]--></span>`);
        };
        if (Checkbox$1) {
          $$renderer3.push("<!--[-->");
          Checkbox$1($$renderer3, spread_props([
            {
              class: cn("border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50", className)
            },
            restProps,
            {
              get checked() {
                return checked;
              },
              set checked($$value) {
                checked = $$value;
                $$settled = false;
              },
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              get indeterminate() {
                return indeterminate;
              },
              set indeterminate($$value) {
                indeterminate = $$value;
                $$settled = false;
              },
              children,
              $$slots: { default: true }
            }
          ]));
          $$renderer3.push("<!--]-->");
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push("<!--]-->");
        }
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref, checked, indeterminate });
  });
}

export { Checkbox as C };
//# sourceMappingURL=checkbox-5hPZTOsI.js.map
