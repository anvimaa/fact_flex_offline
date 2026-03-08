import { al as attributes, am as clsx, aq as bind_props } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';

function Card_footer($$renderer, $$props) {
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
      class: clsx(cn("flex items-center p-6 pt-0", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}

export { Card_footer as C };
//# sourceMappingURL=card-footer-DiKIAxQs.js.map
