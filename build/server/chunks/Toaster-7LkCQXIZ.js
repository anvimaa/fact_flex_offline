import { d as derived, w as writable, g as get } from './index2-Cz2gv4fD.js';
import { ah as sanitize_props, aj as rest_props, ak as fallback, ax as store_get, aw as attr, an as ensure_array_like, al as attributes, am as clsx, ay as unsubscribe_stores, aq as bind_props, az as attr_class, aA as attr_style, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { o as onDestroy } from './index-server-CziyT60N.js';
import { t as toastState, c as cn, u as useEffect } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css);
  const disable = () => document.head.appendChild(style);
  const enable = () => document.head.removeChild(style);
  if (typeof window.getComputedStyle !== "undefined") {
    disable();
    action();
    window.getComputedStyle(style).opacity;
    enable();
    return;
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    action();
    window.requestAnimationFrame(enable);
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 120);
  }, 120);
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {
  }
};
const isBrowser = typeof document !== "undefined";
const modes = ["dark", "light", "system"];
const modeStorageKey = writable("mode-watcher-mode");
const themeStorageKey = writable("mode-watcher-theme");
const userPrefersMode = createUserPrefersMode();
const systemPrefersMode = createSystemMode();
const themeColors = writable(void 0);
const theme = createCustomTheme();
const disableTransitions = writable(true);
const darkClassNames = writable([]);
const lightClassNames = writable([]);
const derivedMode = createDerivedMode();
createDerivedTheme();
function createUserPrefersMode() {
  const defaultValue = "system";
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getModeStorageKey());
  let value = isValidMode(initialValue) ? initialValue : defaultValue;
  function getModeStorageKey() {
    return get(modeStorageKey);
  }
  const { subscribe, set: _set } = writable(value, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (e.key !== getModeStorageKey())
        return;
      const newValue = e.newValue;
      if (isValidMode(newValue)) {
        _set(value = newValue);
      } else {
        _set(value = defaultValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getModeStorageKey(), value);
  }
  return {
    subscribe,
    set
  };
}
function createCustomTheme() {
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getThemeStorageKey());
  let value = initialValue === null || initialValue === void 0 ? "" : initialValue;
  function getThemeStorageKey() {
    return get(themeStorageKey);
  }
  const { subscribe, set: _set } = writable(value, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (e.key !== getThemeStorageKey())
        return;
      const newValue = e.newValue;
      if (newValue === null) {
        _set(value = "");
      } else {
        _set(value = newValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getThemeStorageKey(), value);
  }
  return {
    subscribe,
    set
  };
}
function createSystemMode() {
  const defaultValue = void 0;
  let track = true;
  const { subscribe, set } = writable(defaultValue, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set(mediaQueryState.matches ? "light" : "dark");
  }
  function tracking(active) {
    track = active;
  }
  return {
    subscribe,
    query,
    tracking
  };
}
function createDerivedMode() {
  const { subscribe } = derived([
    userPrefersMode,
    systemPrefersMode,
    themeColors,
    disableTransitions,
    darkClassNames,
    lightClassNames
  ], ([$userPrefersMode, $systemPrefersMode, $themeColors, $disableTransitions, $darkClassNames, $lightClassNames]) => {
    if (!isBrowser)
      return void 0;
    const derivedMode2 = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
    const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
    function update() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode2 === "light") {
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length)
          htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.light);
        }
      } else {
        if (sanitizedLightClassNames.length)
          htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.dark);
        }
      }
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
    }
    return derivedMode2;
  });
  return {
    subscribe
  };
}
function createDerivedTheme() {
  const { subscribe } = derived([theme, disableTransitions], ([$theme, $disableTransitions]) => {
    if (!isBrowser)
      return void 0;
    function update() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", $theme);
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
    }
    return $theme;
  });
  return {
    subscribe
  };
}
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
function toggleMode() {
  userPrefersMode.set(get(derivedMode) === "dark" ? "light" : "dark");
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode, themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "" }) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem("mode-watcher-mode") || defaultMode;
  const theme2 = localStorage.getItem("mode-watcher-theme") || defaultTheme;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2);
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2);
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2);
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2);
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme2) {
    rootEl.setAttribute("data-theme", theme2);
    localStorage.setItem("mode-watcher-theme", theme2);
  }
  localStorage.setItem("mode-watcher-mode", mode);
}
function Icon($$renderer, $$props) {
  let type = fallback($$props["type"], "success");
  if (type === "success") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`);
  } else if (type === "error") {
    $$renderer.push("<!--[1-->");
    $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`);
  } else if (type === "info") {
    $$renderer.push("<!--[2-->");
    $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`);
  } else if (type === "warning") {
    $$renderer.push("<!--[3-->");
    $$renderer.push(`<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { type });
}
function Loader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let visible = $$props["visible"];
    const bars = Array(12).fill(0);
    $$renderer2.push(`<div class="sonner-loading-wrapper"${attr("data-visible", visible)}><div class="sonner-spinner"><!--[-->`);
    const each_array = ensure_array_like(bars);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$renderer2.push(`<div class="sonner-loading-bar"></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { visible });
  });
}
function Toast($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isFront, isVisible, toastType, toastClass, toastDescriptionClass, heightIndex, coords, toastsHeightBefore, disabled, isPromiseLoadingOrInfiniteDuration;
    const TOAST_LIFETIME = 4e3;
    const GAP = 14;
    const TIME_BEFORE_UNMOUNT = 200;
    const defaultClasses = {
      toast: "",
      title: "",
      description: "",
      loader: "",
      closeButton: "",
      cancelButton: "",
      actionButton: "",
      action: "",
      warning: "",
      error: "",
      success: "",
      default: "",
      info: "",
      loading: ""
    };
    const { toasts, heights, removeHeight, remove } = toastState;
    let toast = $$props["toast"];
    let index = $$props["index"];
    let expanded = $$props["expanded"];
    let invert = $$props["invert"];
    let position = $$props["position"];
    let visibleToasts = $$props["visibleToasts"];
    let expandByDefault = $$props["expandByDefault"];
    let closeButton = $$props["closeButton"];
    let interacting = $$props["interacting"];
    let cancelButtonStyle = fallback($$props["cancelButtonStyle"], "");
    let actionButtonStyle = fallback($$props["actionButtonStyle"], "");
    let duration = fallback($$props["duration"], 4e3);
    let descriptionClass = fallback($$props["descriptionClass"], "");
    let classes = fallback($$props["classes"], () => ({}), true);
    let unstyled = fallback($$props["unstyled"], false);
    let mounted = false;
    let removed = false;
    let swiping = false;
    let swipeOut = false;
    let offsetBeforeRemove = 0;
    let initialHeight = 0;
    let offset = 0;
    let closeTimerStartTimeRef = 0;
    let lastCloseTimerStartTimeRef = 0;
    async function updateHeights() {
      {
        return;
      }
    }
    function deleteToast() {
      removed = true;
      offsetBeforeRemove = offset;
      removeHeight(toast.id);
      setTimeout(
        () => {
          remove(toast.id);
        },
        TIME_BEFORE_UNMOUNT
      );
    }
    let timeoutId;
    let remainingTime = toast.duration || duration || TOAST_LIFETIME;
    function pauseTimer() {
      if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
        const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef;
        remainingTime = remainingTime - elapsedTime;
      }
      lastCloseTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
    }
    function startTimer() {
      closeTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
      timeoutId = setTimeout(
        () => {
          toast.onAutoClose?.(toast);
          deleteToast();
        },
        remainingTime
      );
    }
    let effect;
    classes = { ...defaultClasses, ...classes };
    isFront = index === 0;
    isVisible = index + 1 <= visibleToasts;
    toast.title;
    toast.description;
    toastType = toast.type;
    toastClass = toast.class || "";
    toastDescriptionClass = toast.descriptionClass || "";
    heightIndex = store_get($$store_subs ??= {}, "$heights", heights).findIndex((height) => height.toastId === toast.id) || 0;
    coords = position.split("-");
    toastsHeightBefore = store_get($$store_subs ??= {}, "$heights", heights).reduce(
      (prev, curr, reducerIndex) => {
        if (reducerIndex >= heightIndex) return prev;
        return prev + curr.height;
      },
      0
    );
    invert = toast.invert || invert;
    disabled = toastType === "loading";
    offset = Math.round(heightIndex * GAP + toastsHeightBefore);
    updateHeights();
    if (toast.updated) {
      clearTimeout(timeoutId);
      remainingTime = toast.duration || duration || TOAST_LIFETIME;
      startTimer();
    }
    isPromiseLoadingOrInfiniteDuration = toast.promise && toastType === "loading" || toast.duration === Number.POSITIVE_INFINITY;
    effect = useEffect(() => {
      if (!isPromiseLoadingOrInfiniteDuration) {
        if (expanded || interacting) {
          pauseTimer();
        } else {
          startTimer();
        }
      }
      return () => clearTimeout(timeoutId);
    });
    store_get($$store_subs ??= {}, "$effect", effect);
    if (toast.delete) {
      deleteToast();
    }
    $$renderer2.push(`<li${attr(
      "aria-live",
      // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
      // Remove only if treshold is met
      // User is swiping in wrong direction so we disable swipe gesture
      // for the current pointer down interaction
      toast.important ? "assertive" : "polite"
    )} aria-atomic="true" role="status"${attr("tabindex", 0)}${attr_class(clsx(cn($$sanitized_props.class, toastClass, classes?.toast, toast?.classes?.toast, classes?.[toastType], toast?.classes?.[toastType])))} data-sonner-toast=""${attr("data-styled", !(toast.component || toast?.unstyled || unstyled))}${attr("data-mounted", mounted)}${attr("data-promise", Boolean(toast.promise))}${attr("data-removed", removed)}${attr("data-visible", isVisible)}${attr("data-y-position", coords[0])}${attr("data-x-position", coords[1])}${attr("data-index", index)}${attr("data-front", isFront)}${attr("data-swiping", swiping)}${attr("data-type", toastType)}${attr("data-invert", invert)}${attr("data-swipe-out", swipeOut)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted))}${attr_style(`${$$sanitized_props.style} ${toast.style}`, {
      "--index": index,
      "--toasts-before": index,
      "--z-index": store_get($$store_subs ??= {}, "$toasts", toasts).length - index,
      "--offset": `${removed ? offsetBeforeRemove : offset}px`,
      "--initial-height": `${initialHeight}px`
    })}>`);
    if (closeButton && !toast.component) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button aria-label="Close toast"${attr("data-disabled", disabled)} data-close-button=""${attr_class(clsx(cn(classes?.closeButton, toast?.classes?.closeButton)))}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (toast.component) {
      $$renderer2.push("<!--[-->");
      if (toast.component) {
        $$renderer2.push("<!--[-->");
        toast.component($$renderer2, spread_props([toast.componentProps]));
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
    } else {
      $$renderer2.push("<!--[!-->");
      if (toastType !== "default" || toast.icon || toast.promise) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div data-icon="">`);
        if ((toast.promise || toastType === "loading") && !toast.icon) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<!--[-->`);
          slot($$renderer2, $$props, "loading-icon", {}, null);
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (toast.icon) {
          $$renderer2.push("<!--[-->");
          if (toast.icon) {
            $$renderer2.push("<!--[-->");
            toast.icon($$renderer2, {});
            $$renderer2.push("<!--]-->");
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push("<!--]-->");
          }
        } else if (toastType === "success") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`<!--[-->`);
          slot($$renderer2, $$props, "success-icon", {}, null);
          $$renderer2.push(`<!--]-->`);
        } else if (toastType === "error") {
          $$renderer2.push("<!--[2-->");
          $$renderer2.push(`<!--[-->`);
          slot($$renderer2, $$props, "error-icon", {}, null);
          $$renderer2.push(`<!--]-->`);
        } else if (toastType === "warning") {
          $$renderer2.push("<!--[3-->");
          $$renderer2.push(`<!--[-->`);
          slot($$renderer2, $$props, "warning-icon", {}, null);
          $$renderer2.push(`<!--]-->`);
        } else if (toastType === "info") {
          $$renderer2.push("<!--[4-->");
          $$renderer2.push(`<!--[-->`);
          slot($$renderer2, $$props, "info-icon", {}, null);
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div data-content="">`);
      if (toast.title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div data-title=""${attr_class(clsx(cn(classes?.title, toast?.classes?.title)))}>`);
        if (typeof toast.title !== "string") {
          $$renderer2.push("<!--[-->");
          if (toast.title) {
            $$renderer2.push("<!--[-->");
            toast.title($$renderer2, spread_props([toast.componentProps]));
            $$renderer2.push("<!--]-->");
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push("<!--]-->");
          }
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${escape_html(toast.title)}`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (toast.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div data-description=""${attr_class(clsx(cn(descriptionClass, toastDescriptionClass, classes?.description, toast.classes?.description)))}>`);
        if (typeof toast.description !== "string") {
          $$renderer2.push("<!--[-->");
          if (toast.description) {
            $$renderer2.push("<!--[-->");
            toast.description($$renderer2, spread_props([toast.componentProps]));
            $$renderer2.push("<!--]-->");
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push("<!--]-->");
          }
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${escape_html(toast.description)}`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (toast.cancel) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button data-button="" data-cancel=""${attr_style(cancelButtonStyle)}${attr_class(clsx(cn(classes?.cancelButton, toast?.classes?.cancelButton)))}>${escape_html(toast.cancel.label)}</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (toast.action) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button data-button=""${attr_style(actionButtonStyle)}${attr_class(clsx(cn(classes?.actionButton, toast?.classes?.actionButton)))}>${escape_html(toast.action.label)}</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></li>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      toast,
      index,
      expanded,
      invert,
      position,
      visibleToasts,
      expandByDefault,
      closeButton,
      interacting,
      cancelButtonStyle,
      actionButtonStyle,
      duration,
      descriptionClass,
      classes,
      unstyled
    });
  });
}
function Toaster($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "invert",
    "theme",
    "position",
    "hotkey",
    "containerAriaLabel",
    "richColors",
    "expand",
    "duration",
    "visibleToasts",
    "closeButton",
    "toastOptions",
    "offset",
    "dir"
  ]);
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let possiblePositions, hotkeyLabel;
    const VISIBLE_TOASTS_AMOUNT = 3;
    const VIEWPORT_OFFSET = "32px";
    const TOAST_WIDTH = 356;
    const GAP = 14;
    const DARK = "dark";
    const LIGHT = "light";
    function getInitialTheme(t) {
      if (t !== "system") {
        return t;
      }
      if (typeof window !== "undefined") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return DARK;
        }
        return LIGHT;
      }
      return LIGHT;
    }
    function getDocumentDirection() {
      if (typeof window === "undefined") return "ltr";
      if (typeof document === "undefined") return "ltr";
      const dirAttribute = document.documentElement.getAttribute("dir");
      if (dirAttribute === "auto" || !dirAttribute) {
        return window.getComputedStyle(document.documentElement).direction;
      }
      return dirAttribute;
    }
    let invert = fallback($$props["invert"], false);
    let theme2 = fallback($$props["theme"], "light");
    let position = fallback($$props["position"], "bottom-right");
    let hotkey = fallback($$props["hotkey"], () => ["altKey", "KeyT"], true);
    let containerAriaLabel = fallback($$props["containerAriaLabel"], "Notifications");
    let richColors = fallback($$props["richColors"], false);
    let expand = fallback($$props["expand"], false);
    let duration = fallback($$props["duration"], 4e3);
    let visibleToasts = fallback($$props["visibleToasts"], VISIBLE_TOASTS_AMOUNT);
    let closeButton = fallback($$props["closeButton"], false);
    let toastOptions = fallback($$props["toastOptions"], () => ({}), true);
    let offset = fallback($$props["offset"], null);
    let dir = fallback($$props["dir"], getDocumentDirection, true);
    const { toasts, heights } = toastState;
    let expanded = false;
    let interacting = false;
    let actualTheme = getInitialTheme(theme2);
    onDestroy(() => {
    });
    possiblePositions = Array.from(new Set([
      position,
      ...store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => toast.position).map((toast) => toast.position)
    ].filter(Boolean)));
    hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    if (store_get($$store_subs ??= {}, "$toasts", toasts).length <= 1) {
      expanded = false;
    }
    {
      const toastsToDismiss = store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => toast.dismiss && !toast.delete);
      if (toastsToDismiss.length > 0) {
        const updatedToasts = store_get($$store_subs ??= {}, "$toasts", toasts).map((toast) => {
          const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);
          if (matchingToast) {
            return { ...toast, delete: true };
          }
          return toast;
        });
        toasts.set(updatedToasts);
      }
    }
    {
      if (theme2 !== "system") {
        actualTheme = theme2;
      }
      if (typeof window !== "undefined") {
        if (theme2 === "system") {
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            actualTheme = DARK;
          } else {
            actualTheme = LIGHT;
          }
        }
        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const changeHandler = ({ matches }) => {
          actualTheme = matches ? DARK : LIGHT;
        };
        if ("addEventListener" in mediaQueryList) {
          mediaQueryList.addEventListener("change", changeHandler);
        } else {
          mediaQueryList.addListener(changeHandler);
        }
      }
    }
    if (store_get($$store_subs ??= {}, "$toasts", toasts).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section${attr("aria-label", `${containerAriaLabel} ${hotkeyLabel}`)}${attr("tabindex", -1)} class="svelte-1nrb6xd"><!--[-->`);
      const each_array = ensure_array_like(possiblePositions);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let position2 = each_array[index];
        $$renderer2.push(`<ol${attributes(
          {
            tabindex: -1,
            class: clsx($$sanitized_props.class),
            "data-sonner-toaster": true,
            "data-theme": actualTheme,
            "data-rich-colors": richColors,
            dir: dir === "auto" ? getDocumentDirection() : dir,
            "data-y-position": position2.split("-")[0],
            "data-x-position": position2.split("-")[1],
            style: $$sanitized_props.style,
            ...$$restProps
          },
          "svelte-1nrb6xd",
          void 0,
          {
            "--front-toast-height": `${store_get($$store_subs ??= {}, "$heights", heights)[0]?.height}px`,
            "--offset": typeof offset === "number" ? `${offset}px` : offset || VIEWPORT_OFFSET,
            "--width": `${TOAST_WIDTH}px`,
            "--gap": `${GAP}px`
          }
        )}><!--[-->`);
        const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => !toast.position && index === 0 || toast.position === position2));
        for (let index2 = 0, $$length2 = each_array_1.length; index2 < $$length2; index2++) {
          let toast = each_array_1[index2];
          Toast($$renderer2, {
            index: index2,
            toast,
            invert,
            visibleToasts,
            closeButton,
            interacting,
            position: position2,
            expandByDefault: expand,
            expanded,
            actionButtonStyle: toastOptions?.actionButtonStyle || "",
            cancelButtonStyle: toastOptions?.cancelButtonStyle || "",
            class: toastOptions?.class || "",
            descriptionClass: toastOptions?.descriptionClass || "",
            classes: toastOptions.classes || {},
            duration: toastOptions?.duration ?? duration,
            unstyled: toastOptions.unstyled || false,
            $$slots: {
              "loading-icon": ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                slot($$renderer3, $$props, "loading-icon", {}, () => {
                  Loader($$renderer3, { visible: toast.type === "loading" });
                });
                $$renderer3.push(`<!--]-->`);
              },
              "success-icon": ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                slot($$renderer3, $$props, "success-icon", {}, () => {
                  Icon($$renderer3, { type: "success" });
                });
                $$renderer3.push(`<!--]-->`);
              },
              "error-icon": ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                slot($$renderer3, $$props, "error-icon", {}, () => {
                  Icon($$renderer3, { type: "error" });
                });
                $$renderer3.push(`<!--]-->`);
              },
              "warning-icon": ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                slot($$renderer3, $$props, "warning-icon", {}, () => {
                  Icon($$renderer3, { type: "warning" });
                });
                $$renderer3.push(`<!--]-->`);
              },
              "info-icon": ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                slot($$renderer3, $$props, "info-icon", {}, () => {
                  Icon($$renderer3, { type: "info" });
                });
                $$renderer3.push(`<!--]-->`);
              }
            }
          });
        }
        $$renderer2.push(`<!--]--></ol>`);
      }
      $$renderer2.push(`<!--]--></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      invert,
      theme: theme2,
      position,
      hotkey,
      containerAriaLabel,
      richColors,
      expand,
      duration,
      visibleToasts,
      closeButton,
      toastOptions,
      offset,
      dir
    });
  });
}

export { Toaster as T, darkClassNames as a, themeStorageKey as b, defineConfig as c, disableTransitions as d, derivedMode as e, toggleMode as f, lightClassNames as l, modeStorageKey as m, setInitialMode as s, themeColors as t };
//# sourceMappingURL=Toaster-7LkCQXIZ.js.map
