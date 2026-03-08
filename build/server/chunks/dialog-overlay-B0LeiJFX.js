import { _ as derived, aq as bind_props, al as attributes } from './index-DPRpZFUH.js';
import { a as useRefById, u as useId, b as box, m as mergeProps } from './use-id-BeJs9ypc.js';
import { C as Context } from './context-BAmjzoO_.js';
import { a as getDataOpenClosed, b as getAriaExpanded } from './attrs-mduo83PF.js';
import { S as SPACE, E as ENTER } from './noop-CfhljDhh.js';
import { P as Presence_layer } from './scroll-lock-DpPha3vp.js';

function createAttrs(variant) {
  return {
    content: `data-${variant}-content`,
    trigger: `data-${variant}-trigger`,
    overlay: `data-${variant}-overlay`,
    title: `data-${variant}-title`,
    description: `data-${variant}-description`,
    close: `data-${variant}-close`,
    cancel: `data-${variant}-cancel`,
    action: `data-${variant}-action`
  };
}
class DialogRootState {
  opts;
  triggerNode = null;
  contentNode = null;
  descriptionNode = null;
  contentId = void 0;
  titleId = void 0;
  triggerId = void 0;
  descriptionId = void 0;
  cancelNode = null;
  #attrs = derived(() => createAttrs(this.opts.variant.current));
  get attrs() {
    return this.#attrs();
  }
  set attrs($$value) {
    return this.#attrs($$value);
  }
  constructor(opts) {
    this.opts = opts;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    if (this.opts.open.current) return;
    this.opts.open.current = true;
  }
  handleClose() {
    if (!this.opts.open.current) return;
    this.opts.open.current = false;
  }
  #sharedProps = derived(() => ({ "data-state": getDataOpenClosed(this.opts.open.current) }));
  get sharedProps() {
    return this.#sharedProps();
  }
  set sharedProps($$value) {
    return this.#sharedProps($$value);
  }
}
class DialogTriggerState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      onRefChange: (node) => {
        this.root.triggerNode = node;
        this.root.triggerId = node?.id;
      }
    });
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button > 0) return;
    this.root.handleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.handleOpen();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "aria-controls": this.root.contentId,
    [this.root.attrs.trigger]: "",
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    disabled: this.opts.disabled.current ? true : void 0,
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogCloseState {
  opts;
  root;
  #attr = derived(() => this.root.attrs[this.opts.variant.current]);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({ ...opts, deps: () => this.root.opts.open.current });
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button > 0) return;
    this.root.handleClose();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.handleClose();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.#attr()]: "",
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    disabled: this.opts.disabled.current ? true : void 0,
    tabindex: 0,
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogTitleState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      onRefChange: (node) => {
        this.root.titleId = node?.id;
      },
      deps: () => this.root.opts.open.current
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "heading",
    "aria-level": this.opts.level.current,
    [this.root.attrs.title]: "",
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogDescriptionState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      deps: () => this.root.opts.open.current,
      onRefChange: (node) => {
        this.root.descriptionNode = node;
        this.root.descriptionId = node?.id;
      }
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.attrs.description]: "",
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogContentState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      deps: () => this.root.opts.open.current,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node?.id;
      }
    });
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
    "aria-modal": "true",
    "aria-describedby": this.root.descriptionId,
    "aria-labelledby": this.root.titleId,
    [this.root.attrs.content]: "",
    style: {
      pointerEvents: "auto",
      outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0
    },
    tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogOverlayState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({ ...opts, deps: () => this.root.opts.open.current });
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.attrs.overlay]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class AlertDialogCancelState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      ...opts,
      deps: () => this.root.opts.open.current,
      onRefChange: (node) => {
        this.root.cancelNode = node;
      }
    });
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button > 0) return;
    this.root.handleClose();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.handleClose();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.attrs.cancel]: "",
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    tabindex: 0,
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const DialogRootContext = new Context("Dialog.Root");
function useDialogRoot(props) {
  return DialogRootContext.set(new DialogRootState(props));
}
function useDialogTrigger(props) {
  return new DialogTriggerState(props, DialogRootContext.get());
}
function useDialogTitle(props) {
  return new DialogTitleState(props, DialogRootContext.get());
}
function useDialogContent(props) {
  return new DialogContentState(props, DialogRootContext.get());
}
function useDialogOverlay(props) {
  return new DialogOverlayState(props, DialogRootContext.get());
}
function useDialogDescription(props) {
  return new DialogDescriptionState(props, DialogRootContext.get());
}
function useDialogClose(props) {
  return new DialogCloseState(props, DialogRootContext.get());
}
function useAlertDialogCancel(props) {
  return new AlertDialogCancelState(props, DialogRootContext.get());
}
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount) {
    return open && trapFocus;
  }
  return present && trapFocus && open;
}
function Dialog_overlay($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      forceMount = false,
      child,
      children,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const overlayState = useDialogOverlay({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, overlayState.props));
    {
      let presence = function($$renderer3) {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, {
            props: mergeProps(mergedProps()),
            ...overlayState.snippetProps
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div${attributes({ ...mergeProps(mergedProps()) })}>`);
          children?.($$renderer3, overlayState.snippetProps);
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      Presence_layer($$renderer2, {
        id,
        present: overlayState.root.opts.open.current || forceMount,
        presence
      });
    }
    bind_props($$props, { ref });
  });
}

export { Dialog_overlay as D, useDialogContent as a, useDialogClose as b, useDialogTrigger as c, useDialogTitle as d, useDialogDescription as e, useAlertDialogCancel as f, shouldTrapFocus as s, useDialogRoot as u };
//# sourceMappingURL=dialog-overlay-B0LeiJFX.js.map
