import { aq as bind_props, ai as spread_props, al as attributes, _ as derived } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { u as useId, b as box, m as mergeProps } from './use-id-BeJs9ypc.js';
import { b as useMenuSeparator } from './index6-Co-qiBWu.js';

function Menu_separator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      id = useId(),
      child,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const separatorState = useMenuSeparator({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, separatorState.props));
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
function Dropdown_menu_separator($$renderer, $$props) {
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
      if (Menu_separator) {
        $$renderer3.push("<!--[-->");
        Menu_separator($$renderer3, spread_props([
          { class: cn("bg-muted -mx-1 my-1 h-px", className) },
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

export { Dropdown_menu_separator as D };
//# sourceMappingURL=dropdown-menu-separator-BmVC_xsa.js.map
