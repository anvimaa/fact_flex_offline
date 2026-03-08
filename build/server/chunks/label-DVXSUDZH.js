import { aq as bind_props, ai as spread_props, al as attributes, _ as derived } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { u as useId, b as box, m as mergeProps, a as useRefById } from './use-id-BeJs9ypc.js';

const ROOT_ATTR = "data-label-root";
class LabelRootState {
  opts;
  constructor(opts) {
    this.opts = opts;
    this.onmousedown = this.onmousedown.bind(this);
    useRefById(opts);
  }
  onmousedown(e) {
    if (e.detail > 1) e.preventDefault();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [ROOT_ATTR]: "",
    onmousedown: this.onmousedown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function setLabelRootState(props) {
  return new LabelRootState(props);
}
function Label$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      ref = null,
      for: forProp,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = setLabelRootState({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, rootState.props, { for: forProp }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<label${attributes({ ...mergedProps(), for: forProp })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></label>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Label($$renderer, $$props) {
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
      if (Label$1) {
        $$renderer3.push("<!--[-->");
        Label$1($$renderer3, spread_props([
          {
            class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
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

export { Label as L };
//# sourceMappingURL=label-DVXSUDZH.js.map
