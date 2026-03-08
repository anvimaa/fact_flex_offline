import { al as attributes, am as clsx, aq as bind_props } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';

function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      value = void 0,
      class: className = void 0,
      error: errorMessage = void 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<input${attributes(
      {
        class: clsx(cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", errorMessage && "border-red-500 focus-visible:ring-red-500", className)),
        value,
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/>`);
    bind_props($$props, { ref, value });
  });
}

export { Input as I };
//# sourceMappingURL=input-XVWEGj5m.js.map
