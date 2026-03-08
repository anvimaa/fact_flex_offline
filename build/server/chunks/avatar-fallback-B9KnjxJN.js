import { aq as bind_props, ai as spread_props, al as attributes, _ as derived } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { u as useId, b as box, m as mergeProps, a as useRefById } from './use-id-BeJs9ypc.js';
import { C as Context } from './context-BAmjzoO_.js';

const AVATAR_ROOT_ATTR = "data-avatar-root";
const AVATAR_IMAGE_ATTR = "data-avatar-image";
const AVATAR_FALLBACK_ATTR = "data-avatar-fallback";
class AvatarRootState {
  opts;
  constructor(opts) {
    this.opts = opts;
    this.loadImage = this.loadImage.bind(this);
    useRefById(opts);
  }
  loadImage(src, crossorigin, referrerPolicy) {
    if (this.opts.loadingStatus.current === "loaded") return;
    let imageTimerId;
    const image = new Image();
    image.src = src;
    if (crossorigin !== void 0) image.crossOrigin = crossorigin;
    if (referrerPolicy) image.referrerPolicy = referrerPolicy;
    this.opts.loadingStatus.current = "loading";
    image.onload = () => {
      imageTimerId = window.setTimeout(
        () => {
          this.opts.loadingStatus.current = "loaded";
        },
        this.opts.delayMs.current
      );
    };
    image.onerror = () => {
      this.opts.loadingStatus.current = "error";
    };
    return () => {
      window.clearTimeout(imageTimerId);
    };
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [AVATAR_ROOT_ATTR]: "",
    "data-status": this.opts.loadingStatus.current
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class AvatarImageState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      display: this.root.opts.loadingStatus.current === "loaded" ? "block" : "none"
    },
    "data-status": this.root.opts.loadingStatus.current,
    [AVATAR_IMAGE_ATTR]: "",
    src: this.opts.src.current,
    crossorigin: this.opts.crossOrigin.current,
    referrerpolicy: this.opts.referrerPolicy.current
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class AvatarFallbackState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
  }
  #style = derived(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : void 0);
  get style() {
    return this.#style();
  }
  set style($$value) {
    return this.#style($$value);
  }
  #props = derived(() => ({
    style: this.style,
    "data-status": this.root.opts.loadingStatus.current,
    [AVATAR_FALLBACK_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const AvatarRootContext = new Context("Avatar.Root");
function useAvatarRoot(props) {
  return AvatarRootContext.set(new AvatarRootState(props));
}
function useAvatarImage(props) {
  return new AvatarImageState(props, AvatarRootContext.get());
}
function useAvatarFallback(props) {
  return new AvatarFallbackState(props, AvatarRootContext.get());
}
function Avatar$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      delayMs = 0,
      loadingStatus = "loading",
      onLoadingStatusChange,
      child,
      children,
      id = useId(),
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useAvatarRoot({
      delayMs: box.with(() => delayMs),
      loadingStatus: box.with(() => loadingStatus, (v) => {
        if (loadingStatus !== v) {
          loadingStatus = v;
          onLoadingStatusChange?.(v);
        }
      }),
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, rootState.props));
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
    bind_props($$props, { loadingStatus, ref });
  });
}
function Avatar_image$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      src,
      child,
      id = useId(),
      ref = null,
      crossorigin = void 0,
      referrerpolicy = void 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const imageState = useAvatarImage({
      src: box.with(() => src),
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      crossOrigin: box.with(() => crossorigin),
      referrerPolicy: box.with(() => referrerpolicy)
    });
    const mergedProps = derived(() => mergeProps(restProps, imageState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img${attributes({ ...mergedProps(), src })} onload="this.__e=event" onerror="this.__e=event"/>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Avatar_fallback$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const fallbackState = useAvatarFallback({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, fallbackState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></span>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Avatar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      ref = null,
      loadingStatus = "loading",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Avatar$1) {
        $$renderer3.push("<!--[-->");
        Avatar$1($$renderer3, spread_props([
          {
            class: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)
          },
          restProps,
          {
            get loadingStatus() {
              return loadingStatus;
            },
            set loadingStatus($$value) {
              loadingStatus = $$value;
              $$settled = false;
            },
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
    bind_props($$props, { ref, loadingStatus });
  });
}
function Avatar_image($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      src,
      alt,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Avatar_image$1) {
        $$renderer3.push("<!--[-->");
        Avatar_image$1($$renderer3, spread_props([
          {
            src,
            alt,
            class: cn("aspect-square h-full w-full", className)
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
function Avatar_fallback($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Avatar_fallback$1) {
        $$renderer3.push("<!--[-->");
        Avatar_fallback$1($$renderer3, spread_props([
          {
            class: cn("bg-muted flex h-full w-full items-center justify-center rounded-full", className)
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

export { Avatar as A, Avatar_image as a, Avatar_fallback as b };
//# sourceMappingURL=avatar-fallback-B9KnjxJN.js.map
