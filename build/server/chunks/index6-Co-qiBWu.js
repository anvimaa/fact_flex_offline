import { aq as bind_props, ai as spread_props, _ as derived, al as attributes } from './index-DPRpZFUH.js';
import { h as cn } from './utils3-DjmiJAAD.js';
import { b as box, w as watch, u as useId, a as useRefById, m as mergeProps, e as executeCallbacks } from './use-id-BeJs9ypc.js';
import { n as noop, S as SPACE, E as ENTER, A as ARROW_DOWN, T as TAB, d as isHTMLElement, P as PAGE_UP, H as HOME, g as ARROW_UP, h as PAGE_DOWN, j as END, b as isElement, k as isElementOrSVGElement } from './noop-CfhljDhh.js';
import { F as Floating_layer, a as Floating_layer_anchor, P as Popper_layer_force_mount, b as Popper_layer, u as useDOMTypeahead, g as getFloatingContentCSSVars, M as Mounted, c as boxAutoReset } from './mounted-Bmfh9OVK.js';
import { F as FocusScopeContext, C as CustomEventDispatcher, a as afterTick, i as isTabbable, f as focusFirst, t as tabbable, g as getDocument, b as isFocusable, c as focusable } from './scroll-lock-DpPha3vp.js';
import { C as Context } from './context-BAmjzoO_.js';
import { u as useRovingFocus } from './use-roving-focus.svelte-j4gb8sNV.js';
import { a as getDataOpenClosed, g as getDataDisabled, b as getAriaExpanded, c as getAriaOrientation, d as getAriaDisabled } from './attrs-mduo83PF.js';
import { o as on } from './events-GtUqDgmb.js';

const SELECTION_KEYS = [ENTER, SPACE];
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
function isMouseEvent(event) {
  return event.pointerType === "mouse";
}
function useGraceArea(opts) {
  const enabled = derived(() => opts.enabled());
  const isPointerInTransit = boxAutoReset(false, opts.transitTimeout ?? 300, (value) => {
    if (enabled()) {
      opts.setIsPointerInTransit?.(value);
    }
  });
  let pointerGraceArea = null;
  function handleRemoveGraceArea() {
    pointerGraceArea = null;
    isPointerInTransit.current = false;
  }
  function handleCreateGraceArea(e, hoverTarget) {
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget)) return;
    const exitPoint = { x: e.clientX, y: e.clientY };
    const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
    const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
    const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
    const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
    pointerGraceArea = graceArea;
    isPointerInTransit.current = true;
  }
  watch([opts.triggerNode, opts.contentNode, opts.enabled], ([triggerNode, contentNode, enabled2]) => {
    if (!triggerNode || !contentNode || !enabled2) return;
    const handleTriggerLeave = (e) => {
      handleCreateGraceArea(e, contentNode);
    };
    const handleContentLeave = (e) => {
      handleCreateGraceArea(e, triggerNode);
    };
    return executeCallbacks(on(triggerNode, "pointerleave", handleTriggerLeave), on(contentNode, "pointerleave", handleContentLeave));
  });
  watch(() => pointerGraceArea, () => {
    const handleTrackPointerGrace = (e) => {
      if (!pointerGraceArea) return;
      const target = e.target;
      if (!isElement(target)) return;
      const pointerPosition = { x: e.clientX, y: e.clientY };
      const hasEnteredTarget = opts.triggerNode()?.contains(target) || opts.contentNode()?.contains(target);
      const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
      if (hasEnteredTarget) {
        handleRemoveGraceArea();
      } else if (isPointerOutsideGraceArea) {
        handleRemoveGraceArea();
        opts.onPointerExit();
      }
    };
    return on(document, "pointermove", handleTrackPointerGrace);
  });
  return { isPointerInTransit };
}
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const tipPadding = padding * 1.5;
  switch (exitSide) {
    case "top":
      return [
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x, y: exitPoint.y - tipPadding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      ];
    case "bottom":
      return [
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x, y: exitPoint.y + tipPadding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      ];
    case "left":
      return [
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x - tipPadding, y: exitPoint.y },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      ];
    case "right":
      return [
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + tipPadding, y: exitPoint.y },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      ];
  }
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
  else return upperHull.concat(lowerHull);
}
function getTabbableOptions() {
  return {
    getShadowRoot: true,
    displayCheck: (
      // JSDOM does not support the `tabbable` library. To solve this we can
      // check if `ResizeObserver` is a real function (not polyfilled), which
      // determines if the current environment is JSDOM-like.
      typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
    )
  };
}
function getTabbableFrom(currentNode, direction) {
  if (!isTabbable(currentNode, getTabbableOptions())) {
    return getTabbableFromFocusable(currentNode, direction);
  }
  const allTabbable = tabbable(getDocument(currentNode).body, getTabbableOptions());
  if (direction === "prev")
    allTabbable.reverse();
  const activeIndex = allTabbable.indexOf(currentNode);
  if (activeIndex === -1)
    return document.body;
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getTabbableFromFocusable(currentNode, direction) {
  if (!isFocusable(currentNode, getTabbableOptions()))
    return document.body;
  const allFocusable = focusable(getDocument(currentNode).body, getTabbableOptions());
  if (direction === "prev")
    allFocusable.reverse();
  const activeIndex = allFocusable.indexOf(currentNode);
  if (activeIndex === -1)
    return document.body;
  const nextFocusableElements = allFocusable.slice(activeIndex + 1);
  return nextFocusableElements.find((node) => isTabbable(node, getTabbableOptions())) ?? document.body;
}
const MenuRootContext = new Context("Menu.Root");
const MenuMenuContext = new Context("Menu.Root | Menu.Sub");
const MenuContentContext = new Context("Menu.Content");
const MenuGroupContext = new Context("Menu.Group | Menu.RadioGroup");
const MenuOpenEvent = new CustomEventDispatcher("bitsmenuopen", { bubbles: false, cancelable: true });
class MenuRootState {
  opts;
  isUsingKeyboard = new IsUsingKeyboard();
  ignoreCloseAutoFocus = false;
  isPointerInTransit = false;
  constructor(opts) {
    this.opts = opts;
  }
  getAttr(name) {
    return `data-${this.opts.variant.current}-${name}`;
  }
}
class MenuMenuState {
  opts;
  root;
  parentMenu;
  contentId = box.with(() => "");
  contentNode = null;
  triggerNode = null;
  constructor(opts, root, parentMenu) {
    this.opts = opts;
    this.root = root;
    this.parentMenu = parentMenu;
    if (parentMenu) {
      watch(() => parentMenu.opts.open.current, () => {
        if (parentMenu.opts.open.current) return;
        this.opts.open.current = false;
      });
    }
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  onOpen() {
    this.opts.open.current = true;
  }
  onClose() {
    this.opts.open.current = false;
  }
}
class MenuContentState {
  opts;
  parentMenu;
  search = "";
  #timer = 0;
  #handleTypeaheadSearch;
  rovingFocusGroup;
  mounted = false;
  #isSub;
  constructor(opts, parentMenu) {
    this.opts = opts;
    this.parentMenu = parentMenu;
    parentMenu.contentId = opts.id;
    this.#isSub = opts.isSub ?? false;
    this.onkeydown = this.onkeydown.bind(this);
    this.onblur = this.onblur.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.handleInteractOutside = this.handleInteractOutside.bind(this);
    useRefById({
      ...opts,
      deps: () => this.parentMenu.opts.open.current,
      onRefChange: (node) => {
        if (this.parentMenu.contentNode !== node) {
          this.parentMenu.contentNode = node;
        }
      }
    });
    useGraceArea({
      contentNode: () => this.parentMenu.contentNode,
      triggerNode: () => this.parentMenu.triggerNode,
      enabled: () => this.parentMenu.opts.open.current && Boolean(this.parentMenu.triggerNode?.hasAttribute(this.parentMenu.root.getAttr("sub-trigger"))),
      onPointerExit: () => {
        this.parentMenu.opts.open.current = false;
      },
      setIsPointerInTransit: (value) => {
        this.parentMenu.root.isPointerInTransit = value;
      }
    });
    this.#handleTypeaheadSearch = useDOMTypeahead().handleTypeaheadSearch;
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: this.parentMenu.contentId,
      candidateAttr: this.parentMenu.root.getAttr("item"),
      loop: this.opts.loop,
      orientation: box.with(() => "vertical")
    });
    watch(() => this.parentMenu.contentNode, (contentNode) => {
      if (!contentNode) return;
      const handler = () => {
        afterTick(() => {
          if (!this.parentMenu.root.isUsingKeyboard.current) return;
          this.rovingFocusGroup.focusFirstCandidate();
        });
      };
      return MenuOpenEvent.listen(contentNode, handler);
    });
  }
  #getCandidateNodes() {
    const node = this.parentMenu.contentNode;
    if (!node) return [];
    const candidates = Array.from(node.querySelectorAll(`[${this.parentMenu.root.getAttr("item")}]:not([data-disabled])`));
    return candidates;
  }
  #isPointerMovingToSubmenu() {
    return this.parentMenu.root.isPointerInTransit;
  }
  onCloseAutoFocus = (e) => {
    this.opts.onCloseAutoFocus.current(e);
    if (e.defaultPrevented || this.#isSub) return;
    if (this.parentMenu.triggerNode && isTabbable(this.parentMenu.triggerNode)) {
      this.parentMenu.triggerNode.focus();
    }
  };
  handleTabKeyDown(e) {
    let rootMenu = this.parentMenu;
    while (rootMenu.parentMenu !== null) {
      rootMenu = rootMenu.parentMenu;
    }
    if (!rootMenu.triggerNode) {
      return;
    }
    e.preventDefault();
    const nodeToFocus = getTabbableFrom(rootMenu.triggerNode, e.shiftKey ? "prev" : "next");
    if (nodeToFocus) {
      this.parentMenu.root.ignoreCloseAutoFocus = true;
      rootMenu.onClose();
      afterTick(() => {
        nodeToFocus.focus();
        afterTick(() => {
          this.parentMenu.root.ignoreCloseAutoFocus = false;
        });
      });
    } else {
      document.body.focus();
    }
  }
  onkeydown(e) {
    if (e.defaultPrevented) return;
    if (e.key === TAB) {
      this.handleTabKeyDown(e);
      return;
    }
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(target) || !isHTMLElement(currentTarget)) return;
    const isKeydownInside = target.closest(`[${this.parentMenu.root.getAttr("content")}]`)?.id === this.parentMenu.contentId.current;
    const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
    const isCharacterKey = e.key.length === 1;
    const kbdFocusedEl = this.rovingFocusGroup.handleKeydown(target, e);
    if (kbdFocusedEl) return;
    if (e.code === "Space") return;
    const candidateNodes = this.#getCandidateNodes();
    if (isKeydownInside) {
      if (!isModifierKey && isCharacterKey) {
        this.#handleTypeaheadSearch(e.key, candidateNodes);
      }
    }
    if (e.target?.id !== this.parentMenu.contentId.current) return;
    if (!FIRST_LAST_KEYS.includes(e.key)) return;
    e.preventDefault();
    if (LAST_KEYS.includes(e.key)) {
      candidateNodes.reverse();
    }
    focusFirst(candidateNodes);
  }
  onblur(e) {
    if (!isElement(e.currentTarget)) return;
    if (!isElement(e.target)) return;
    if (!e.currentTarget.contains?.(e.target)) {
      window.clearTimeout(this.#timer);
      this.search = "";
    }
  }
  onfocus(_) {
    if (!this.parentMenu.root.isUsingKeyboard.current) return;
    afterTick(() => this.rovingFocusGroup.focusFirstCandidate());
  }
  onItemEnter() {
    return this.#isPointerMovingToSubmenu();
  }
  onItemLeave(e) {
    if (e.currentTarget.hasAttribute(this.parentMenu.root.getAttr("sub-trigger"))) return;
    if (this.#isPointerMovingToSubmenu() || this.parentMenu.root.isUsingKeyboard.current) return;
    const contentNode = this.parentMenu.contentNode;
    contentNode?.focus();
    this.rovingFocusGroup.setCurrentTabStopId("");
  }
  onTriggerLeave() {
    if (this.#isPointerMovingToSubmenu()) return true;
    return false;
  }
  onOpenAutoFocus = (e) => {
    if (e.defaultPrevented) return;
    e.preventDefault();
    const contentNode = this.parentMenu.contentNode;
    contentNode?.focus();
  };
  handleInteractOutside(e) {
    if (!isElementOrSVGElement(e.target)) return;
    const triggerId = this.parentMenu.triggerNode?.id;
    if (e.target.id === triggerId) {
      e.preventDefault();
      return;
    }
    if (e.target.closest(`#${triggerId}`)) {
      e.preventDefault();
    }
  }
  #snippetProps = derived(() => ({ open: this.parentMenu.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "menu",
    "aria-orientation": getAriaOrientation("vertical"),
    [this.parentMenu.root.getAttr("content")]: "",
    "data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
    onkeydown: this.onkeydown,
    onblur: this.onblur,
    onfocus: this.onfocus,
    dir: this.parentMenu.root.opts.dir.current,
    style: { pointerEvents: "auto" }
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
}
class MenuItemSharedState {
  opts;
  content;
  #isFocused = false;
  constructor(opts, content) {
    this.opts = opts;
    this.content = content;
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.onblur = this.onblur.bind(this);
    useRefById({ ...opts, deps: () => this.content.mounted });
  }
  onpointermove(e) {
    if (e.defaultPrevented) return;
    if (!isMouseEvent(e)) return;
    if (this.opts.disabled.current) {
      this.content.onItemLeave(e);
    } else {
      const defaultPrevented = this.content.onItemEnter();
      if (defaultPrevented) return;
      const item = e.currentTarget;
      if (!isHTMLElement(item)) return;
      item.focus();
    }
  }
  onpointerleave(e) {
    if (e.defaultPrevented) return;
    if (!isMouseEvent(e)) return;
    this.content.onItemLeave(e);
  }
  onfocus(e) {
    afterTick(() => {
      if (e.defaultPrevented || this.opts.disabled.current) return;
      this.#isFocused = true;
    });
  }
  onblur(e) {
    afterTick(() => {
      if (e.defaultPrevented) return;
      this.#isFocused = false;
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    role: "menuitem",
    "aria-disabled": getAriaDisabled(this.opts.disabled.current),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    "data-highlighted": this.#isFocused ? "" : void 0,
    [this.content.parentMenu.root.getAttr("item")]: "",
    //
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave,
    onfocus: this.onfocus,
    onblur: this.onblur
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuItemState {
  opts;
  item;
  #isPointerDown = false;
  root;
  constructor(opts, item) {
    this.opts = opts;
    this.item = item;
    this.root = item.content.parentMenu.root;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  #handleSelect() {
    if (this.item.opts.disabled.current) return;
    const selectEvent = new CustomEvent("menuitemselect", { bubbles: true, cancelable: true });
    this.opts.onSelect.current(selectEvent);
    afterTick(() => {
      if (selectEvent.defaultPrevented) {
        this.item.content.parentMenu.root.isUsingKeyboard.current = false;
        return;
      }
      if (this.opts.closeOnSelect.current) {
        this.item.content.parentMenu.root.opts.onClose();
      }
    });
  }
  onkeydown(e) {
    const isTypingAhead = this.item.content.search !== "";
    if (this.item.opts.disabled.current || isTypingAhead && e.key === SPACE) return;
    if (SELECTION_KEYS.includes(e.key)) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget.click();
      e.preventDefault();
    }
  }
  onclick(_) {
    if (this.item.opts.disabled.current) return;
    this.#handleSelect();
  }
  onpointerup(e) {
    if (e.defaultPrevented) return;
    if (!this.#isPointerDown) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget?.click();
    }
  }
  onpointerdown(_) {
    this.#isPointerDown = true;
  }
  #props = derived(() => mergeProps(this.item.props, {
    onclick: this.onclick,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuGroupState {
  opts;
  root;
  groupHeadingId = void 0;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(this.opts);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "group",
    "aria-labelledby": this.groupHeadingId,
    [this.root.getAttr("group")]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuSeparatorState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "group",
    [this.root.getAttr("separator")]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DropdownMenuTriggerState {
  opts;
  parentMenu;
  constructor(opts, parentMenu) {
    this.opts = opts;
    this.parentMenu = parentMenu;
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      ...opts,
      onRefChange: (ref) => {
        this.parentMenu.triggerNode = ref;
      }
    });
  }
  onpointerdown(e) {
    if (this.opts.disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    if (e.button === 0 && e.ctrlKey === false) {
      this.parentMenu.toggleOpen();
      if (!this.parentMenu.opts.open.current) e.preventDefault();
    }
  }
  onpointerup(e) {
    if (this.opts.disabled.current) return;
    if (e.pointerType === "touch") {
      e.preventDefault();
      this.parentMenu.toggleOpen();
    }
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      this.parentMenu.toggleOpen();
      e.preventDefault();
      return;
    }
    if (e.key === ARROW_DOWN) {
      this.parentMenu.onOpen();
      e.preventDefault();
    }
  }
  #ariaControls = derived(() => {
    if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
    return void 0;
  });
  #props = derived(() => ({
    id: this.opts.id.current,
    disabled: this.opts.disabled.current,
    "aria-haspopup": "menu",
    "aria-expanded": getAriaExpanded(this.parentMenu.opts.open.current),
    "aria-controls": this.#ariaControls(),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    "data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
    [this.parentMenu.root.getAttr("trigger")]: "",
    //
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function useMenuRoot(props) {
  const root = new MenuRootState(props);
  FocusScopeContext.set({
    get ignoreCloseAutoFocus() {
      return root.ignoreCloseAutoFocus;
    }
  });
  return MenuRootContext.set(root);
}
function useMenuMenu(root, props) {
  return MenuMenuContext.set(new MenuMenuState(props, root, null));
}
function useMenuDropdownTrigger(props) {
  return new DropdownMenuTriggerState(props, MenuMenuContext.get());
}
function useMenuContent(props) {
  return MenuContentContext.set(new MenuContentState(props, MenuMenuContext.get()));
}
function useMenuItem(props) {
  const item = new MenuItemSharedState(props, MenuContentContext.get());
  return new MenuItemState(props, item);
}
function useMenuGroup(props) {
  return MenuGroupContext.set(new MenuGroupState(props, MenuRootContext.get()));
}
function useMenuSeparator(props) {
  return new MenuSeparatorState(props, MenuRootContext.get());
}
function Menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      child,
      children,
      ref = null,
      id = useId(),
      disabled = false,
      onSelect = noop,
      closeOnSelect = true,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemState = useMenuItem({
      id: box.with(() => id),
      disabled: box.with(() => disabled),
      onSelect: box.with(() => onSelect),
      ref: box.with(() => ref, (v) => ref = v),
      closeOnSelect: box.with(() => closeOnSelect)
    });
    const mergedProps = derived(() => mergeProps(restProps, itemState.props));
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
function Menu_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      ref = null,
      id = useId(),
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const groupState = useMenuGroup({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, groupState.props));
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
function Menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      dir = "ltr",
      onOpenChange = noop,
      _internal_variant: variant = "dropdown-menu",
      children
    } = $$props;
    const root = useMenuRoot({
      variant: box.with(() => variant),
      dir: box.with(() => dir),
      onClose: () => {
        open = false;
        onOpenChange(false);
      }
    });
    useMenuMenu(root, {
      open: box.with(() => open, (v) => {
        open = v;
        onOpenChange(v);
      })
    });
    Floating_layer($$renderer2, {
      children: ($$renderer3) => {
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      }
    });
    bind_props($$props, { open });
  });
}
function Dropdown_menu_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      child,
      children,
      ref = null,
      loop = true,
      onInteractOutside = noop,
      onEscapeKeydown = noop,
      onCloseAutoFocus = noop,
      forceMount = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useMenuContent({
      id: box.with(() => id),
      loop: box.with(() => loop),
      ref: box.with(() => ref, (v) => ref = v),
      onCloseAutoFocus: box.with(() => onCloseAutoFocus)
    });
    const mergedProps = derived(() => mergeProps(restProps, contentState.props));
    function handleInteractOutside(e) {
      contentState.handleInteractOutside(e);
      if (e.defaultPrevented) return;
      onInteractOutside(e);
      if (e.defaultPrevented) return;
      contentState.parentMenu.onClose();
    }
    function handleEscapeKeydown(e) {
      onEscapeKeydown(e);
      if (e.defaultPrevented) return;
      contentState.parentMenu.onClose();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (forceMount) {
        $$renderer3.push("<!--[-->");
        {
          let popper = function($$renderer4, { props, wrapperProps }) {
            const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("dropdown-menu") });
            if (child) {
              $$renderer4.push("<!--[-->");
              child($$renderer4, {
                props: finalProps,
                wrapperProps,
                ...contentState.snippetProps
              });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
              children?.($$renderer4);
              $$renderer4.push(`<!----></div></div>`);
            }
            $$renderer4.push(`<!--]--> `);
            Mounted($$renderer4, {
              get mounted() {
                return contentState.mounted;
              },
              set mounted($$value) {
                contentState.mounted = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!---->`);
          };
          Popper_layer_force_mount($$renderer3, spread_props([
            mergedProps(),
            contentState.popperProps,
            {
              enabled: contentState.parentMenu.opts.open.current,
              onInteractOutside: handleInteractOutside,
              onEscapeKeydown: handleEscapeKeydown,
              trapFocus: true,
              loop,
              forceMount: true,
              id,
              popper,
              $$slots: { popper: true }
            }
          ]));
        }
      } else if (!forceMount) {
        $$renderer3.push("<!--[1-->");
        {
          let popper = function($$renderer4, { props, wrapperProps }) {
            const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("dropdown-menu") });
            if (child) {
              $$renderer4.push("<!--[-->");
              child($$renderer4, {
                props: finalProps,
                wrapperProps,
                ...contentState.snippetProps
              });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
              children?.($$renderer4);
              $$renderer4.push(`<!----></div></div>`);
            }
            $$renderer4.push(`<!--]--> `);
            Mounted($$renderer4, {
              get mounted() {
                return contentState.mounted;
              },
              set mounted($$value) {
                contentState.mounted = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!---->`);
          };
          Popper_layer($$renderer3, spread_props([
            mergedProps(),
            contentState.popperProps,
            {
              present: contentState.parentMenu.opts.open.current,
              onInteractOutside: handleInteractOutside,
              onEscapeKeydown: handleEscapeKeydown,
              trapFocus: true,
              loop,
              forceMount: false,
              id,
              popper,
              $$slots: { popper: true }
            }
          ]));
        }
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
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
function Menu_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      child,
      children,
      disabled = false,
      type = "button",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = useMenuDropdownTrigger({
      id: box.with(() => id),
      disabled: box.with(() => disabled ?? false),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
    Floating_layer_anchor($$renderer2, {
      id,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { props: mergedProps() });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<button${attributes({ ...mergedProps() })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></button>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    bind_props($$props, { ref });
  });
}
let isUsingKeyboard = false;
class IsUsingKeyboard {
  static _refs = 0;
  // Reference counting to avoid multiple listeners.
  static _cleanup;
  constructor() {
  }
  get current() {
    return isUsingKeyboard;
  }
  set current(value) {
    isUsingKeyboard = value;
  }
}
function Dropdown_menu_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      sideOffset = 4,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Dropdown_menu_content$1) {
        $$renderer3.push("<!--[-->");
        Dropdown_menu_content$1($$renderer3, spread_props([
          {
            sideOffset,
            class: cn("bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none", className)
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
function Dropdown_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      inset,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Menu_item) {
        $$renderer3.push("<!--[-->");
        Menu_item($$renderer3, spread_props([
          {
            class: cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className)
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
const Root = Menu;
const Trigger = Menu_trigger;
const Group = Menu_group;

export { Dropdown_menu_content as D, Group as G, Root as R, Trigger as T, Dropdown_menu_item as a, useMenuSeparator as b, useGraceArea as u };
//# sourceMappingURL=index6-Co-qiBWu.js.map
