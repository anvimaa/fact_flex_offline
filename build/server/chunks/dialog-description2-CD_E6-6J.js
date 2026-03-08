import { al as attributes, aq as bind_props, _ as derived } from './index-DPRpZFUH.js';
import { u as useId, b as box, m as mergeProps } from './use-id-BeJs9ypc.js';
import { e as useDialogDescription } from './dialog-overlay-B0LeiJFX.js';

function Dialog_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      children,
      child,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const descriptionState = useDialogDescription({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, descriptionState.props));
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

export { Dialog_description as D };
//# sourceMappingURL=dialog-description2-CD_E6-6J.js.map
