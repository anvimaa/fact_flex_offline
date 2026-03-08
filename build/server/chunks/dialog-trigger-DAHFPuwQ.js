import { al as attributes, aq as bind_props, _ as derived } from './index-DPRpZFUH.js';
import { u as useId, b as box, m as mergeProps } from './use-id-BeJs9ypc.js';
import { c as useDialogTrigger, d as useDialogTitle } from './dialog-overlay-B0LeiJFX.js';

function Dialog_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      child,
      children,
      level = 2,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const titleState = useDialogTitle({
      id: box.with(() => id),
      level: box.with(() => level),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, titleState.props));
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
function Dialog_trigger($$renderer, $$props) {
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
    const triggerState = useDialogTrigger({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      disabled: box.with(() => Boolean(disabled))
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props));
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

export { Dialog_trigger as D, Dialog_title as a };
//# sourceMappingURL=dialog-trigger-DAHFPuwQ.js.map
