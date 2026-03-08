import { al as attributes, am as clsx, aq as bind_props } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';

function Card_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<p${attributes({
      class: clsx(cn("text-muted-foreground text-sm", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></p>`);
    bind_props($$props, { ref });
  });
}

export { Card_description as C };
//# sourceMappingURL=card-description-BQA4H5z9.js.map
