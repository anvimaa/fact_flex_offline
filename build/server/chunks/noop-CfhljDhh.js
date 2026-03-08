const ALT = "Alt";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const BACKSPACE = "Backspace";
const CAPS_LOCK = "CapsLock";
const CONTROL = "Control";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const F1 = "F1";
const F10 = "F10";
const F11 = "F11";
const F12 = "F12";
const F2 = "F2";
const F3 = "F3";
const F4 = "F4";
const F5 = "F5";
const F6 = "F6";
const F7 = "F7";
const F8 = "F8";
const F9 = "F9";
const HOME = "Home";
const META = "Meta";
const PAGE_DOWN = "PageDown";
const PAGE_UP = "PageUp";
const SHIFT = "Shift";
const SPACE = " ";
const TAB = "Tab";
const isBrowser = typeof document !== "undefined";
const isIOS = getIsIOS();
function getIsIOS() {
  return isBrowser && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
  window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isElement(element) {
  return element instanceof Element;
}
function isElementOrSVGElement(element) {
  return element instanceof Element || element instanceof SVGElement;
}
function isFocusVisible(element) {
  return element.matches(":focus-visible");
}
function isNotNull(value) {
  return value !== null;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function isElementHidden(node, stopAt) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (stopAt !== void 0 && node === stopAt)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function noop() {
}

export { ARROW_DOWN as A, F10 as B, CAPS_LOCK as C, F11 as D, ENTER as E, F1 as F, F12 as G, HOME as H, BACKSPACE as I, isIOS as J, META as M, PAGE_UP as P, SPACE as S, TAB as T, isFocusVisible as a, isElement as b, isSelectableInput as c, isHTMLElement as d, isElementHidden as e, ESCAPE as f, ARROW_UP as g, PAGE_DOWN as h, isBrowser as i, END as j, isElementOrSVGElement as k, isNotNull as l, ARROW_RIGHT as m, noop as n, ARROW_LEFT as o, SHIFT as p, CONTROL as q, ALT as r, F2 as s, F3 as t, F4 as u, F5 as v, F6 as w, F7 as x, F8 as y, F9 as z };
//# sourceMappingURL=noop-CfhljDhh.js.map
