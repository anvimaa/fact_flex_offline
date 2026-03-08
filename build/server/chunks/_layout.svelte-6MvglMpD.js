import { e as escape_html } from './escaping-CqgfEcN3.js';
import { ai as spread_props, ax as store_get, ay as unsubscribe_stores, aq as bind_props, z as setContext, _ as derived, al as attributes, am as clsx, aB as stringify, aw as attr, az as attr_class, as as getContext, ah as sanitize_props, ap as slot, an as ensure_array_like } from './index-DPRpZFUH.js';
import { T as Toaster, e as derivedMode, f as toggleMode } from './Toaster-7LkCQXIZ.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { b as box, u as useId, m as mergeProps, a as useRefById, w as watch } from './use-id-BeJs9ypc.js';
import { P as Presence_layer, a as afterTick } from './scroll-lock-DpPha3vp.js';
import { C as Context } from './context-BAmjzoO_.js';
import { g as getDataDisabled, a as getDataOpenClosed, b as getAriaExpanded } from './attrs-mduo83PF.js';
import { i as isBrowser, n as noop, S as SPACE, E as ENTER, a as isFocusVisible, b as isElement } from './noop-CfhljDhh.js';
import { h as cn, C as Clock, I as Icon } from './utils3-DjmiJAAD.js';
import { R as Root$3, T as Trigger$2, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_item, u as useGraceArea } from './index6-Co-qiBWu.js';
import { F as Floating_layer, a as Floating_layer_anchor, P as Popper_layer_force_mount, b as Popper_layer, g as getFloatingContentCSSVars } from './mounted-Bmfh9OVK.js';
import { c as ce } from './index-r8oPdwp5.js';
import { B as Button } from './button-DjcfiVkK.js';
import { R as Root$2, S as Sheet_content } from './index7-DOCP8m-y.js';
import { C as Chevron_right } from './chevron-right-BAItaPVX.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { C as Chevrons_up_down } from './chevrons-up-down-CTdYsjBi.js';
import { L as Log_out } from './log-out-FXa2-WqQ.js';
import { S as Sparkles } from './sparkles-CciqIUXu.js';
import { a as authClient } from './auth-client-DRWmmDkL.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { D as Dropdown_menu_separator } from './dropdown-menu-separator-BmVC_xsa.js';
import { U as User } from './user-D18r-fvg.js';
import { S as Shopping_cart } from './shopping-cart-DlXvsSgE.js';
import { P as Package } from './package-BKsm9DRA.js';
import { C as ChevronRight } from './ChevronRight-C2c2Cx0G.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { o as onDestroy } from './index-server-CziyT60N.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { C as Circle_plus } from './circle-plus-B-WSFwuP.js';
import './index2-Cz2gv4fD.js';
import './events-GtUqDgmb.js';
import './public-B844qK3e.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './dialog-overlay-B0LeiJFX.js';
import './portal-ByHxxBCn.js';
import './dialog-content-d5prJdIN.js';
import './index-CQZxJQQs.js';

function Bell($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
    ["path", { "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ];
  Icon($$renderer, spread_props([
    { name: "bell" },
    $$sanitized_props,
    {
      /**
       * @component @name Bell
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiA4YTYgNiAwIDAgMSAxMiAwYzAgNyAzIDkgMyA5SDNzMy0yIDMtOSIgLz4KICA8cGF0aCBkPSJNMTAuMyAyMWExLjk0IDEuOTQgMCAwIDAgMy40IDAiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/bell
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Bot($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 8V4H8" }],
    [
      "rect",
      { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }
    ],
    ["path", { "d": "M2 14h2" }],
    ["path", { "d": "M20 14h2" }],
    ["path", { "d": "M15 13v2" }],
    ["path", { "d": "M9 13v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "bot" },
    $$sanitized_props,
    {
      /**
       * @component @name Bot
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgOFY0SDgiIC8+CiAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiB4PSI0IiB5PSI4IiByeD0iMiIgLz4KICA8cGF0aCBkPSJNMiAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0xNSAxM3YyIiAvPgogIDxwYXRoIGQ9Ik05IDEzdjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/bot
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Chart_pie($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
      }
    ],
    ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-pie" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartPie
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTJjLjU1MiAwIDEuMDA1LS40NDkuOTUtLjk5OGExMCAxMCAwIDAgMC04Ljk1My04Ljk1MWMtLjU1LS4wNTUtLjk5OC4zOTgtLjk5OC45NXY4YTEgMSAwIDAgMCAxIDF6IiAvPgogIDxwYXRoIGQ9Ik0yMS4yMSAxNS44OUExMCAxMCAwIDEgMSA4IDIuODMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-pie
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Command($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "command" },
    $$sanitized_props,
    {
      /**
       * @component @name Command
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgNnYxMmEzIDMgMCAxIDAgMy0zSDZhMyAzIDAgMSAwIDMgM1Y2YTMgMyAwIDEgMC0zIDNoMTJhMyAzIDAgMSAwLTMtMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/command
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Gallery_vertical_end($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M7 2h10" }],
    ["path", { "d": "M5 6h14" }],
    [
      "rect",
      {
        "width": "18",
        "height": "12",
        "x": "3",
        "y": "10",
        "rx": "2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "gallery-vertical-end" },
    $$sanitized_props,
    {
      /**
       * @component @name GalleryVerticalEnd
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNyAyaDEwIiAvPgogIDxwYXRoIGQ9Ik01IDZoMTQiIC8+CiAgPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjEyIiB4PSIzIiB5PSIxMCIgcng9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/gallery-vertical-end
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Moon($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["path", { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]];
  Icon($$renderer, spread_props([
    { name: "moon" },
    $$sanitized_props,
    {
      /**
       * @component @name Moon
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM2E2IDYgMCAwIDAgOSA5IDkgOSAwIDEgMS05LTlaIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/moon
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Panel_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ],
    ["path", { "d": "M9 3v18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "panel-left" },
    $$sanitized_props,
    {
      /**
       * @component @name PanelLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik05IDN2MTgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/panel-left
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Settings_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M20 7h-9" }],
    ["path", { "d": "M14 17H5" }],
    ["circle", { "cx": "17", "cy": "17", "r": "3" }],
    ["circle", { "cx": "7", "cy": "7", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "settings-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Settings2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgN2gtOSIgLz4KICA8cGF0aCBkPSJNMTQgMTdINSIgLz4KICA8Y2lyY2xlIGN4PSIxNyIgY3k9IjE3IiByPSIzIiAvPgogIDxjaXJjbGUgY3g9IjciIGN5PSI3IiByPSIzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/settings-2
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sun($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sun" },
    $$sanitized_props,
    {
      /**
       * @component @name Sun
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiAvPgogIDxwYXRoIGQ9Ik0xMiAydjIiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0ibTQuOTMgNC45MyAxLjQxIDEuNDEiIC8+CiAgPHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJNMiAxMmgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxMmgyIiAvPgogIDxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJtMTkuMDcgNC45My0xLjQxIDEuNDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/sun
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sonner_1($$renderer, $$props) {
  var $$store_subs;
  let { $$slots, $$events, ...restProps } = $$props;
  Toaster($$renderer, spread_props([
    {
      theme: store_get($$store_subs ??= {}, "$mode", derivedMode),
      class: "toaster group",
      toastOptions: {
        classes: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }
    },
    restProps
  ]));
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
const COLLAPSIBLE_ROOT_ATTR = "data-collapsible-root";
const COLLAPSIBLE_CONTENT_ATTR = "data-collapsible-content";
const COLLAPSIBLE_TRIGGER_ATTR = "data-collapsible-trigger";
class CollapsibleRootState {
  opts;
  contentNode = null;
  constructor(opts) {
    this.opts = opts;
    this.toggleOpen = this.toggleOpen.bind(this);
    useRefById(opts);
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": getDataOpenClosed(this.opts.open.current),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    [COLLAPSIBLE_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleContentState {
  opts;
  root;
  #originalStyles;
  #isMountAnimationPrevented = false;
  #width = 0;
  #height = 0;
  #present = derived(() => this.opts.forceMount.current || this.root.opts.open.current);
  get present() {
    return this.#present();
  }
  set present($$value) {
    return this.#present($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.#isMountAnimationPrevented = root.opts.open.current;
    useRefById({
      ...opts,
      deps: () => this.present,
      onRefChange: (node) => {
        this.root.contentNode = node;
      }
    });
    watch([() => this.opts.ref.current, () => this.present], ([node]) => {
      if (!node) return;
      afterTick(() => {
        if (!this.opts.ref.current) return;
        this.#originalStyles = this.#originalStyles || {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName
        };
        node.style.transitionDuration = "0s";
        node.style.animationName = "none";
        const rect = node.getBoundingClientRect();
        this.#height = rect.height;
        this.#width = rect.width;
        if (!this.#isMountAnimationPrevented) {
          const { animationName, transitionDuration } = this.#originalStyles;
          node.style.transitionDuration = transitionDuration;
          node.style.animationName = animationName;
        }
      });
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
    style: {
      "--bits-collapsible-content-height": this.#height ? `${this.#height}px` : void 0,
      "--bits-collapsible-content-width": this.#width ? `${this.#width}px` : void 0
    },
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    [COLLAPSIBLE_CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleTriggerState {
  opts;
  root;
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById(opts);
  }
  onclick(e) {
    if (this.#isDisabled()) return;
    if (e.button !== 0) return e.preventDefault();
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.toggleOpen();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    type: "button",
    disabled: this.#isDisabled(),
    "aria-controls": this.root.contentNode?.id,
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    [COLLAPSIBLE_TRIGGER_ATTR]: "",
    //
    onclick: this.onclick,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const CollapsibleRootContext = new Context("Collapsible.Root");
function useCollapsibleRoot(props) {
  return CollapsibleRootContext.set(new CollapsibleRootState(props));
}
function useCollapsibleTrigger(props) {
  return new CollapsibleTriggerState(props, CollapsibleRootContext.get());
}
function useCollapsibleContent(props) {
  return new CollapsibleContentState(props, CollapsibleRootContext.get());
}
function Collapsible($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      ref = null,
      open = false,
      disabled = false,
      onOpenChange = noop,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useCollapsibleRoot({
      open: box.with(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      disabled: box.with(() => disabled),
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
    bind_props($$props, { ref, open });
  });
}
function Collapsible_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      child,
      ref = null,
      forceMount = false,
      children,
      id = useId(),
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useCollapsibleContent({
      id: box.with(() => id),
      forceMount: box.with(() => forceMount),
      ref: box.with(() => ref, (v) => ref = v)
    });
    {
      let presence = function($$renderer3, { present }) {
        const mergedProps = mergeProps(restProps, contentState.props, { hidden: forceMount ? void 0 : !present.current });
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { ...contentState.snippetProps, props: mergedProps });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div${attributes({ ...mergedProps })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      Presence_layer($$renderer2, {
        forceMount: true,
        present: contentState.present,
        id,
        presence
      });
    }
    bind_props($$props, { ref });
  });
}
function Collapsible_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      ref = null,
      id = useId(),
      disabled = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = useCollapsibleTrigger({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      disabled: box.with(() => disabled)
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
function useTimeoutFn(cb, interval, options = {}) {
  const { immediate = true } = options;
  const isPending = box(false);
  let timer;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.current = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.current = true;
    timer = setTimeout(
      () => {
        isPending.current = false;
        timer = null;
        cb(...args);
      },
      interval
    );
  }
  if (immediate) {
    isPending.current = true;
    if (isBrowser) start();
  }
  return { isPending: box.readonly(isPending), start, stop };
}
const TOOLTIP_CONTENT_ATTR = "data-tooltip-content";
const TOOLTIP_TRIGGER_ATTR = "data-tooltip-trigger";
class TooltipProviderState {
  opts;
  isOpenDelayed = true;
  isPointerInTransit = box(false);
  #timerFn;
  #openTooltip = null;
  constructor(opts) {
    this.opts = opts;
    this.#timerFn = useTimeoutFn(
      () => {
        this.isOpenDelayed = true;
      },
      this.opts.skipDelayDuration.current,
      { immediate: false }
    );
  }
  #startTimer = () => {
    const skipDuration = this.opts.skipDelayDuration.current;
    if (skipDuration === 0) {
      return;
    } else {
      this.#timerFn.start();
    }
  };
  #clearTimer = () => {
    this.#timerFn.stop();
  };
  onOpen = (tooltip) => {
    if (this.#openTooltip && this.#openTooltip !== tooltip) {
      this.#openTooltip.handleClose();
    }
    this.#clearTimer();
    this.isOpenDelayed = false;
    this.#openTooltip = tooltip;
  };
  onClose = (tooltip) => {
    if (this.#openTooltip === tooltip) {
      this.#openTooltip = null;
    }
    this.#startTimer();
  };
  isTooltipOpen = (tooltip) => {
    return this.#openTooltip === tooltip;
  };
}
class TooltipRootState {
  opts;
  provider;
  #delayDuration = derived(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
  get delayDuration() {
    return this.#delayDuration();
  }
  set delayDuration($$value) {
    return this.#delayDuration($$value);
  }
  #disableHoverableContent = derived(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
  get disableHoverableContent() {
    return this.#disableHoverableContent();
  }
  set disableHoverableContent($$value) {
    return this.#disableHoverableContent($$value);
  }
  #disableCloseOnTriggerClick = derived(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
  get disableCloseOnTriggerClick() {
    return this.#disableCloseOnTriggerClick();
  }
  set disableCloseOnTriggerClick($$value) {
    return this.#disableCloseOnTriggerClick($$value);
  }
  #disabled = derived(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
  get disabled() {
    return this.#disabled();
  }
  set disabled($$value) {
    return this.#disabled($$value);
  }
  #ignoreNonKeyboardFocus = derived(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
  get ignoreNonKeyboardFocus() {
    return this.#ignoreNonKeyboardFocus();
  }
  set ignoreNonKeyboardFocus($$value) {
    return this.#ignoreNonKeyboardFocus($$value);
  }
  contentNode = null;
  triggerNode = null;
  #wasOpenDelayed = false;
  #timerFn;
  #stateAttr = derived(() => {
    if (!this.opts.open.current) return "closed";
    return this.#wasOpenDelayed ? "delayed-open" : "instant-open";
  });
  get stateAttr() {
    return this.#stateAttr();
  }
  set stateAttr($$value) {
    return this.#stateAttr($$value);
  }
  constructor(opts, provider) {
    this.opts = opts;
    this.provider = provider;
    this.#timerFn = useTimeoutFn(
      () => {
        this.#wasOpenDelayed = true;
        this.opts.open.current = true;
      },
      this.delayDuration ?? 0,
      { immediate: false }
    );
    watch(() => this.delayDuration, () => {
      if (this.delayDuration === void 0) return;
      this.#timerFn = useTimeoutFn(
        () => {
          this.#wasOpenDelayed = true;
          this.opts.open.current = true;
        },
        this.delayDuration,
        { immediate: false }
      );
    });
    watch(() => this.opts.open.current, (isOpen) => {
      if (isOpen) {
        this.provider.onOpen(this);
      } else {
        this.provider.onClose(this);
      }
    });
  }
  handleOpen = () => {
    this.#timerFn.stop();
    this.#wasOpenDelayed = false;
    this.opts.open.current = true;
  };
  handleClose = () => {
    this.#timerFn.stop();
    this.opts.open.current = false;
  };
  #handleDelayedOpen = () => {
    this.#timerFn.stop();
    const shouldSkipDelay = !this.provider.isOpenDelayed;
    const delayDuration = this.delayDuration ?? 0;
    if (shouldSkipDelay || delayDuration === 0) {
      this.#wasOpenDelayed = delayDuration > 0 && shouldSkipDelay;
      this.opts.open.current = true;
    } else {
      this.#timerFn.start();
    }
  };
  onTriggerEnter = () => {
    this.#handleDelayedOpen();
  };
  onTriggerLeave = () => {
    if (this.disableHoverableContent) {
      this.handleClose();
    } else {
      this.#timerFn.stop();
    }
  };
}
class TooltipTriggerState {
  opts;
  root;
  #isPointerDown = box(false);
  #hasPointerMoveOpened = false;
  #isDisabled = derived(() => this.opts.disabled.current || this.root.disabled);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      onRefChange: (node) => {
        this.root.triggerNode = node;
      }
    });
  }
  handlePointerUp = () => {
    this.#isPointerDown.current = false;
  };
  #onpointerup = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = false;
  };
  #onpointerdown = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = true;
    document.addEventListener(
      "pointerup",
      () => {
        this.handlePointerUp();
      },
      { once: true }
    );
  };
  #onpointermove = (e) => {
    if (this.#isDisabled()) return;
    if (e.pointerType === "touch") return;
    if (this.#hasPointerMoveOpened) return;
    if (this.root.provider.isPointerInTransit.current) return;
    this.root.onTriggerEnter();
    this.#hasPointerMoveOpened = true;
  };
  #onpointerleave = () => {
    if (this.#isDisabled()) return;
    this.root.onTriggerLeave();
    this.#hasPointerMoveOpened = false;
  };
  #onfocus = (e) => {
    if (this.#isPointerDown.current || this.#isDisabled()) return;
    if (this.root.ignoreNonKeyboardFocus && !isFocusVisible(e.currentTarget)) return;
    this.root.handleOpen();
  };
  #onblur = () => {
    if (this.#isDisabled()) return;
    this.root.handleClose();
  };
  #onclick = () => {
    if (this.root.disableCloseOnTriggerClick || this.#isDisabled()) return;
    this.root.handleClose();
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-describedby": this.root.opts.open.current ? this.root.contentNode?.id : void 0,
    "data-state": this.root.stateAttr,
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "data-delay-duration": `${this.root.delayDuration}`,
    [TOOLTIP_TRIGGER_ATTR]: "",
    tabindex: this.#isDisabled() ? void 0 : 0,
    disabled: this.opts.disabled.current,
    onpointerup: this.#onpointerup,
    onpointerdown: this.#onpointerdown,
    onpointermove: this.#onpointermove,
    onpointerleave: this.#onpointerleave,
    onfocus: this.#onfocus,
    onblur: this.#onblur,
    onclick: this.#onclick
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TooltipContentState {
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById({
      ...opts,
      onRefChange: (node) => {
        this.root.contentNode = node;
      },
      deps: () => this.root.opts.open.current
    });
    useGraceArea({
      triggerNode: () => this.root.triggerNode,
      contentNode: () => this.root.contentNode,
      enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent,
      onPointerExit: () => {
        if (this.root.provider.isTooltipOpen(this.root)) {
          this.root.handleClose();
        }
      },
      setIsPointerInTransit: (value) => {
        this.root.provider.isPointerInTransit.current = value;
      },
      transitTimeout: this.root.provider.opts.skipDelayDuration.current
    });
  }
  onInteractOutside = (e) => {
    if (isElement(e.target) && this.root.triggerNode?.contains(e.target) && this.root.disableCloseOnTriggerClick) {
      e.preventDefault();
      return;
    }
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current?.(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onOpenAutoFocus = (e) => {
    e.preventDefault();
  };
  onCloseAutoFocus = (e) => {
    e.preventDefault();
  };
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": this.root.stateAttr,
    "data-disabled": getDataDisabled(this.root.disabled),
    style: { pointerEvents: "auto", outline: "none" },
    [TOOLTIP_CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown,
    onOpenAutoFocus: this.onOpenAutoFocus,
    onCloseAutoFocus: this.onCloseAutoFocus
  };
}
const TooltipProviderContext = new Context("Tooltip.Provider");
const TooltipRootContext = new Context("Tooltip.Root");
function useTooltipProvider(props) {
  return TooltipProviderContext.set(new TooltipProviderState(props));
}
function useTooltipRoot(props) {
  return TooltipRootContext.set(new TooltipRootState(props, TooltipProviderContext.get()));
}
function useTooltipTrigger(props) {
  return new TooltipTriggerState(props, TooltipRootContext.get());
}
function useTooltipContent(props) {
  return new TooltipContentState(props, TooltipRootContext.get());
}
function Tooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      disabled,
      delayDuration,
      disableCloseOnTriggerClick,
      disableHoverableContent,
      ignoreNonKeyboardFocus,
      children
    } = $$props;
    useTooltipRoot({
      open: box.with(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      delayDuration: box.with(() => delayDuration),
      disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
      disableHoverableContent: box.with(() => disableHoverableContent),
      ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
      disabled: box.with(() => disabled)
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
function Tooltip_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      ref = null,
      side = "top",
      sideOffset = 0,
      align = "center",
      avoidCollisions = true,
      arrowPadding = 0,
      sticky = "partial",
      hideWhenDetached = false,
      collisionPadding = 0,
      onInteractOutside = noop,
      onEscapeKeydown = noop,
      forceMount = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useTooltipContent({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      onInteractOutside: box.with(() => onInteractOutside),
      onEscapeKeydown: box.with(() => onEscapeKeydown)
    });
    const floatingProps = derived(() => ({
      side,
      sideOffset,
      align,
      avoidCollisions,
      arrowPadding,
      sticky,
      hideWhenDetached,
      collisionPadding
    }));
    const mergedProps = derived(() => mergeProps(restProps, floatingProps(), contentState.props));
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const mergedProps2 = mergeProps(props, { style: getFloatingContentCSSVars("tooltip") });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: mergedProps2,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...mergedProps2 })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
          mergedProps(),
          contentState.popperProps,
          {
            enabled: contentState.root.opts.open.current,
            id,
            trapFocus: false,
            loop: false,
            preventScroll: false,
            forceMount: true,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else if (!forceMount) {
      $$renderer2.push("<!--[1-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const mergedProps2 = mergeProps(props, { style: getFloatingContentCSSVars("tooltip") });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: mergedProps2,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...mergedProps2 })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer($$renderer2, spread_props([
          mergedProps(),
          contentState.popperProps,
          {
            present: contentState.root.opts.open.current,
            id,
            trapFocus: false,
            loop: false,
            preventScroll: false,
            forceMount: false,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tooltip_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      child,
      id = useId(),
      disabled = false,
      type = "button",
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = useTooltipTrigger({
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
function Tooltip_provider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      delayDuration = 700,
      disableCloseOnTriggerClick = false,
      disableHoverableContent = false,
      disabled = false,
      ignoreNonKeyboardFocus = false,
      skipDelayDuration = 300
    } = $$props;
    useTooltipProvider({
      delayDuration: box.with(() => delayDuration),
      disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
      disableHoverableContent: box.with(() => disableHoverableContent),
      disabled: box.with(() => disabled),
      ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
      skipDelayDuration: box.with(() => skipDelayDuration)
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
const Root$1 = Collapsible;
const Trigger$1 = Collapsible_trigger;
const Content = Collapsible_content;
class IsMobile {
  #current = false;
  constructor() {
  }
  get current() {
    return this.#current;
  }
}
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
class SidebarState {
  props;
  #open = derived(() => this.props.open());
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  openMobile = false;
  setOpen;
  #isMobile;
  #state = derived(() => this.open ? "expanded" : "collapsed");
  get state() {
    return this.#state();
  }
  set state($$value) {
    return this.#state($$value);
  }
  constructor(props) {
    this.setOpen = props.setOpen;
    this.#isMobile = new IsMobile();
    this.props = props;
  }
  // Convenience getter for checking if the sidebar is mobile
  // without this, we would need to use `sidebar.isMobile.current` everywhere
  get isMobile() {
    return this.#isMobile.current;
  }
  // Event handler to apply to the `<svelte:window>`
  handleShortcutKeydown = (e) => {
    if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.toggle();
    }
  };
  setOpenMobile = (value) => {
    this.openMobile = value;
  };
  toggle = () => {
    return this.#isMobile.current ? this.openMobile = !this.openMobile : this.setOpen(!this.open);
  };
}
const SYMBOL_KEY = "scn-sidebar";
function setSidebar(props) {
  return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}
function useSidebar() {
  return getContext(Symbol.for(SYMBOL_KEY));
}
function Sidebar_content($$renderer, $$props) {
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
      "data-sidebar": "content",
      class: clsx(cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_footer($$renderer, $$props) {
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
      "data-sidebar": "footer",
      class: clsx(cn("flex flex-col gap-2 p-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_group_label($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      children,
      child,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const mergedProps = derived(() => ({
      class: cn("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
      "data-sidebar": "group-label",
      ...restProps
    }));
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
function Sidebar_group($$renderer, $$props) {
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
      "data-sidebar": "group",
      class: clsx(cn("relative flex w-full min-w-0 flex-col p-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_header($$renderer, $$props) {
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
      "data-sidebar": "header",
      class: clsx(cn("flex flex-col gap-2 p-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_inset($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<main${attributes({
      class: clsx(cn("bg-background relative flex min-h-svh flex-1 flex-col", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></main>`);
    bind_props($$props, { ref });
  });
}
function Tooltip_content($$renderer, $$props) {
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
      if (Tooltip_content$1) {
        $$renderer3.push("<!--[-->");
        Tooltip_content$1($$renderer3, spread_props([
          {
            sideOffset,
            class: cn("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs", className)
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
const Root = Tooltip;
const Trigger = Tooltip_trigger;
const Provider = Tooltip_provider;
const sidebarMenuButtonVariants = ce({
  base: "peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Sidebar_menu_button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      child,
      variant = "default",
      size = "default",
      isActive = false,
      tooltipContent,
      tooltipContentProps,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sidebar = useSidebar();
    const buttonProps = derived(() => ({
      class: cn(sidebarMenuButtonVariants({ variant, size }), className),
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      ...restProps
    }));
    function Button2($$renderer3, { props }) {
      const mergedProps = mergeProps(buttonProps(), props);
      if (child) {
        $$renderer3.push("<!--[-->");
        child($$renderer3, { props: mergedProps });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<button${attributes({ ...mergedProps })}>`);
        children?.($$renderer3);
        $$renderer3.push(`<!----></button>`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    if (!tooltipContent) {
      $$renderer2.push("<!--[-->");
      Button2($$renderer2, {});
    } else {
      $$renderer2.push("<!--[!-->");
      if (Root) {
        $$renderer2.push("<!--[-->");
        Root($$renderer2, {
          children: ($$renderer3) => {
            {
              let child2 = function($$renderer4, { props }) {
                Button2($$renderer4, { props });
              };
              if (Trigger) {
                $$renderer3.push("<!--[-->");
                Trigger($$renderer3, { child: child2, $$slots: { child: true } });
                $$renderer3.push("<!--]-->");
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push("<!--]-->");
              }
            }
            $$renderer3.push(` `);
            if (Tooltip_content) {
              $$renderer3.push("<!--[-->");
              Tooltip_content($$renderer3, spread_props([
                {
                  side: "right",
                  align: "center",
                  hidden: sidebar.state !== "collapsed" || sidebar.isMobile,
                  children: tooltipContent
                },
                tooltipContentProps
              ]));
              $$renderer3.push("<!--]-->");
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push("<!--]-->");
            }
          },
          $$slots: { default: true }
        });
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Sidebar_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<li${attributes({
      "data-sidebar": "menu-item",
      class: clsx(cn("group/menu-item relative", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_menu_sub_button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      children,
      child,
      class: className,
      size = "md",
      isActive,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const mergedProps = derived(() => ({
      class: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      ...restProps
    }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Sidebar_menu_sub_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ref = null, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<li${attributes({ "data-sidebar": "menu-sub-item", ...restProps })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_menu_sub($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<ul${attributes({
      "data-sidebar": "menu-sub",
      class: clsx(cn("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></ul>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<ul${attributes({
      "data-sidebar": "menu",
      class: clsx(cn("flex w-full min-w-0 flex-col gap-1", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></ul>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_provider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      open = true,
      onOpenChange = () => {
      },
      controlledOpen = false,
      class: className,
      style,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    setSidebar({
      open: () => open,
      setOpen: (value) => {
        if (controlledOpen) {
          onOpenChange(value);
        } else {
          open = value;
          onOpenChange(value);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    });
    if (Provider) {
      $$renderer2.push("<!--[-->");
      Provider($$renderer2, {
        delayDuration: 0,
        children: ($$renderer3) => {
          $$renderer3.push(`<div${attributes({
            style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH)}; --sidebar-width-icon: ${stringify(SIDEBAR_WIDTH_ICON)}; ${stringify(style)}`,
            class: clsx(cn("group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full", className)),
            ...restProps
          })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></div>`);
        }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    bind_props($$props, { ref, open });
  });
}
function Sidebar_rail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    useSidebar();
    $$renderer2.push(`<button${attributes({
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabindex: -1,
      title: "Toggle Sidebar",
      class: clsx(cn("hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></button>`);
    bind_props($$props, { ref });
  });
}
function Sidebar_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sidebar = useSidebar();
    Button($$renderer2, spread_props([
      {
        type: "button",
        onclick: (e) => {
          onclick?.(e);
          sidebar.toggle();
        },
        "data-sidebar": "trigger",
        variant: "ghost",
        size: "icon",
        class: cn("h-7 w-7", className)
      },
      restProps,
      {
        children: ($$renderer3) => {
          Panel_left($$renderer3, {});
          $$renderer3.push(`<!----> <span class="sr-only">Toggle Sidebar</span>`);
        },
        $$slots: { default: true }
      }
    ]));
    bind_props($$props, { ref });
  });
}
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sidebar = useSidebar();
    if (collapsible === "none") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: clsx(cn("bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col", className)),
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else if (sidebar.isMobile) {
      $$renderer2.push("<!--[1-->");
      if (Root$2) {
        $$renderer2.push("<!--[-->");
        Root$2($$renderer2, spread_props([
          {
            controlledOpen: true,
            open: sidebar.openMobile,
            onOpenChange: sidebar.setOpenMobile
          },
          restProps,
          {
            children: ($$renderer3) => {
              if (Sheet_content) {
                $$renderer3.push("<!--[-->");
                Sheet_content($$renderer3, {
                  "data-sidebar": "sidebar",
                  "data-mobile": "true",
                  class: "bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden",
                  style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH_MOBILE)};`,
                  side,
                  children: ($$renderer4) => {
                    $$renderer4.push(`<div class="flex h-full w-full flex-col">`);
                    children?.($$renderer4);
                    $$renderer4.push(`<!----></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer3.push("<!--]-->");
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="text-sidebar-foreground group peer hidden md:block"${attr("data-state", sidebar.state)}${attr("data-collapsible", sidebar.state === "collapsed" ? collapsible : "")}${attr("data-variant", variant)}${attr("data-side", side)}><div${attr_class(clsx(cn("relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]")))}></div> <div${attributes({
        class: clsx(cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )),
        ...restProps
      })}><div data-sidebar="sidebar" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Nav_main($$renderer, $$props) {
  let {
    items
    // this should be `Component` after lucide-svelte updates types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = $$props;
  if (Sidebar_group) {
    $$renderer.push("<!--[-->");
    Sidebar_group($$renderer, {
      children: ($$renderer2) => {
        if (Sidebar_group_label) {
          $$renderer2.push("<!--[-->");
          Sidebar_group_label($$renderer2, {
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->Sistema`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
        $$renderer2.push(` `);
        if (Sidebar_menu) {
          $$renderer2.push("<!--[-->");
          Sidebar_menu($$renderer2, {
            children: ($$renderer3) => {
              $$renderer3.push(`<!--[-->`);
              const each_array = ensure_array_like(items);
              for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
                let mainItem = each_array[$$index_1];
                {
                  let child = function($$renderer4, { props }) {
                    if (Sidebar_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Sidebar_menu_item($$renderer4, spread_props([
                        props,
                        {
                          children: ($$renderer5) => {
                            {
                              let child2 = function($$renderer6, { props: props2 }) {
                                {
                                  let tooltipContent = function($$renderer7) {
                                    $$renderer7.push(`<!---->${escape_html(mainItem.title)}`);
                                  };
                                  if (Sidebar_menu_button) {
                                    $$renderer6.push("<!--[-->");
                                    Sidebar_menu_button($$renderer6, spread_props([
                                      props2,
                                      {
                                        tooltipContent,
                                        children: ($$renderer7) => {
                                          if (mainItem.icon) {
                                            $$renderer7.push("<!--[-->");
                                            if (mainItem.icon) {
                                              $$renderer7.push("<!--[-->");
                                              mainItem.icon($$renderer7, {});
                                              $$renderer7.push("<!--]-->");
                                            } else {
                                              $$renderer7.push("<!--[!-->");
                                              $$renderer7.push("<!--]-->");
                                            }
                                          } else {
                                            $$renderer7.push("<!--[!-->");
                                          }
                                          $$renderer7.push(`<!--]--> <span>${escape_html(mainItem.title)}</span> `);
                                          Chevron_right($$renderer7, {
                                            class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                          });
                                          $$renderer7.push(`<!---->`);
                                        },
                                        $$slots: { tooltipContent: true, default: true }
                                      }
                                    ]));
                                    $$renderer6.push("<!--]-->");
                                  } else {
                                    $$renderer6.push("<!--[!-->");
                                    $$renderer6.push("<!--]-->");
                                  }
                                }
                              };
                              if (Trigger$1) {
                                $$renderer5.push("<!--[-->");
                                Trigger$1($$renderer5, { child: child2, $$slots: { child: true } });
                                $$renderer5.push("<!--]-->");
                              } else {
                                $$renderer5.push("<!--[!-->");
                                $$renderer5.push("<!--]-->");
                              }
                            }
                            $$renderer5.push(` `);
                            if (Content) {
                              $$renderer5.push("<!--[-->");
                              Content($$renderer5, {
                                children: ($$renderer6) => {
                                  if (mainItem.items) {
                                    $$renderer6.push("<!--[-->");
                                    if (Sidebar_menu_sub) {
                                      $$renderer6.push("<!--[-->");
                                      Sidebar_menu_sub($$renderer6, {
                                        children: ($$renderer7) => {
                                          $$renderer7.push(`<!--[-->`);
                                          const each_array_1 = ensure_array_like(mainItem.items);
                                          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                            let subItem = each_array_1[$$index];
                                            if (Sidebar_menu_sub_item) {
                                              $$renderer7.push("<!--[-->");
                                              Sidebar_menu_sub_item($$renderer7, {
                                                children: ($$renderer8) => {
                                                  {
                                                    let child2 = function($$renderer9, { props: props2 }) {
                                                      $$renderer9.push(`<a${attributes({ href: subItem.url, ...props2 })}>`);
                                                      if (subItem.icon) {
                                                        $$renderer9.push("<!--[-->");
                                                        if (subItem.icon) {
                                                          $$renderer9.push("<!--[-->");
                                                          subItem.icon($$renderer9, {});
                                                          $$renderer9.push("<!--]-->");
                                                        } else {
                                                          $$renderer9.push("<!--[!-->");
                                                          $$renderer9.push("<!--]-->");
                                                        }
                                                      } else {
                                                        $$renderer9.push("<!--[!-->");
                                                      }
                                                      $$renderer9.push(`<!--]--> <span>${escape_html(subItem.title)}</span></a>`);
                                                    };
                                                    if (Sidebar_menu_sub_button) {
                                                      $$renderer8.push("<!--[-->");
                                                      Sidebar_menu_sub_button($$renderer8, { child: child2, $$slots: { child: true } });
                                                      $$renderer8.push("<!--]-->");
                                                    } else {
                                                      $$renderer8.push("<!--[!-->");
                                                      $$renderer8.push("<!--]-->");
                                                    }
                                                  }
                                                },
                                                $$slots: { default: true }
                                              });
                                              $$renderer7.push("<!--]-->");
                                            } else {
                                              $$renderer7.push("<!--[!-->");
                                              $$renderer7.push("<!--]-->");
                                            }
                                          }
                                          $$renderer7.push(`<!--]-->`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer6.push("<!--]-->");
                                    } else {
                                      $$renderer6.push("<!--[!-->");
                                      $$renderer6.push("<!--]-->");
                                    }
                                  } else {
                                    $$renderer6.push("<!--[!-->");
                                  }
                                  $$renderer6.push(`<!--]-->`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer5.push("<!--]-->");
                            } else {
                              $$renderer5.push("<!--[!-->");
                              $$renderer5.push("<!--]-->");
                            }
                          },
                          $$slots: { default: true }
                        }
                      ]));
                      $$renderer4.push("<!--]-->");
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push("<!--]-->");
                    }
                  };
                  if (Root$1) {
                    $$renderer3.push("<!--[-->");
                    Root$1($$renderer3, {
                      open: mainItem.isActive,
                      class: "group/collapsible",
                      child,
                      $$slots: { child: true }
                    });
                    $$renderer3.push("<!--]-->");
                  } else {
                    $$renderer3.push("<!--[!-->");
                    $$renderer3.push("<!--]-->");
                  }
                }
              }
              $$renderer3.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
      },
      $$slots: { default: true }
    });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
}
function Dropdown_menu_label($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      inset,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Theme_toggle($$renderer) {
  Button($$renderer, {
    onclick: toggleMode,
    variant: "outline",
    size: "icon",
    children: ($$renderer2) => {
      Sun($$renderer2, {
        class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      });
      $$renderer2.push(`<!----> `);
      Moon($$renderer2, {
        class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      });
      $$renderer2.push(`<!----> <span class="sr-only">Alternar tema</span>`);
    },
    $$slots: { default: true }
  });
}
function Nav_user($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const sidebar = useSidebar();
    const session = authClient.useSession();
    store_get($$store_subs ??= {}, "$session", session).data?.user;
    Sidebar_menu($$renderer2, {
      children: ($$renderer3) => {
        Sidebar_menu_item($$renderer3, {
          children: ($$renderer4) => {
            Root$3($$renderer4, {
              children: ($$renderer5) => {
                {
                  let child = function($$renderer6, { props }) {
                    Sidebar_menu_button($$renderer6, spread_props([
                      {
                        size: "lg",
                        class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      },
                      props,
                      {
                        children: ($$renderer7) => {
                          Avatar($$renderer7, {
                            class: "h-8 w-8 rounded-lg",
                            children: ($$renderer8) => {
                              Avatar_image($$renderer8, {
                                src: store_get($$store_subs ??= {}, "$session", session).data?.user?.image,
                                alt: store_get($$store_subs ??= {}, "$session", session).data?.user?.name
                              });
                              $$renderer8.push(`<!----> `);
                              Avatar_fallback($$renderer8, {
                                class: "rounded-lg",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.name?.charAt(0))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> <div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-semibold">${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.name)}</span> <span class="truncate text-xs">${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.email)}</span></div> `);
                          Chevrons_up_down($$renderer7, { class: "ml-auto size-4" });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      }
                    ]));
                  };
                  Trigger$2($$renderer5, { child, $$slots: { child: true } });
                }
                $$renderer5.push(`<!----> `);
                Dropdown_menu_content($$renderer5, {
                  class: "w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg",
                  side: sidebar.isMobile ? "bottom" : "right",
                  align: "end",
                  sideOffset: 4,
                  children: ($$renderer6) => {
                    Dropdown_menu_label($$renderer6, {
                      class: "p-0 font-normal",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">`);
                        Avatar($$renderer7, {
                          class: "h-8 w-8 rounded-lg",
                          children: ($$renderer8) => {
                            Avatar_image($$renderer8, {
                              src: store_get($$store_subs ??= {}, "$session", session).data?.user?.image,
                              alt: store_get($$store_subs ??= {}, "$session", session).data?.user?.name
                            });
                            $$renderer8.push(`<!----> `);
                            Avatar_fallback($$renderer8, {
                              class: "rounded-lg",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.name?.charAt(0))}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> <div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-semibold">${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.name)}</span> <span class="truncate text-xs">${escape_html(store_get($$store_subs ??= {}, "$session", session).data?.user?.email)}</span></div></div>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Dropdown_menu_separator($$renderer6, {});
                    $$renderer6.push(`<!----> `);
                    Group($$renderer6, {
                      children: ($$renderer7) => {
                        Dropdown_menu_item($$renderer7, {
                          onclick: () => goto(),
                          children: ($$renderer8) => {
                            Sparkles($$renderer8, {});
                            $$renderer8.push(`<!----> Atualizar Plano`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Dropdown_menu_separator($$renderer6, {});
                    $$renderer6.push(`<!----> `);
                    Group($$renderer6, {
                      children: ($$renderer7) => {
                        Dropdown_menu_item($$renderer7, {
                          onclick: () => goto(`/profile/${store_get($$store_subs ??= {}, "$session", session).data?.user?.id}`),
                          children: ($$renderer8) => {
                            User($$renderer8, {});
                            $$renderer8.push(`<!----> Conta`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Dropdown_menu_item($$renderer7, {
                          children: ($$renderer8) => {
                            Bell($$renderer8, {});
                            $$renderer8.push(`<!----> Notificações`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Dropdown_menu_separator($$renderer6, {});
                    $$renderer6.push(`<!----> `);
                    Dropdown_menu_item($$renderer6, {
                      onclick: async () => await authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            goto();
                          }
                        }
                      }),
                      children: ($$renderer7) => {
                        Log_out($$renderer7, {});
                        $$renderer7.push(`<!----> Sair`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Team_switcher($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { teams } = $$props;
    useSidebar();
    let activeTeam = teams[0];
    if (Sidebar_menu) {
      $$renderer2.push("<!--[-->");
      Sidebar_menu($$renderer2, {
        children: ($$renderer3) => {
          if (Sidebar_menu_item) {
            $$renderer3.push("<!--[-->");
            Sidebar_menu_item($$renderer3, {
              children: ($$renderer4) => {
                if (Root$3) {
                  $$renderer4.push("<!--[-->");
                  Root$3($$renderer4, {
                    children: ($$renderer5) => {
                      {
                        let child = function($$renderer6, { props }) {
                          if (Sidebar_menu_button) {
                            $$renderer6.push("<!--[-->");
                            Sidebar_menu_button($$renderer6, spread_props([
                              props,
                              {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">`);
                                  if (activeTeam.logo) {
                                    $$renderer7.push("<!--[-->");
                                    activeTeam.logo($$renderer7, { class: "size-4" });
                                    $$renderer7.push("<!--]-->");
                                  } else {
                                    $$renderer7.push("<!--[!-->");
                                    $$renderer7.push("<!--]-->");
                                  }
                                  $$renderer7.push(`</div> <div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-semibold">${escape_html(activeTeam.name)}</span> <span class="truncate text-xs">${escape_html(activeTeam.plan)}</span></div> `);
                                  Chevrons_up_down($$renderer7, { class: "ml-auto" });
                                  $$renderer7.push(`<!---->`);
                                },
                                $$slots: { default: true }
                              }
                            ]));
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
                        };
                        if (Trigger$2) {
                          $$renderer5.push("<!--[-->");
                          Trigger$2($$renderer5, { child, $$slots: { child: true } });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
const data = {
  teams: [
    {
      name: "FACT FLEXI",
      logo: Gallery_vertical_end,
      plan: "Facturação"
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Command,
      isActive: true,
      items: [
        { title: "Visão Geral", url: "/dashboard" },
        { title: "Análises", url: "/analises" },
        { title: "Relatórios", url: "/reports" }
      ]
    },
    {
      title: "Documentos",
      url: "#",
      icon: Chart_pie,
      items: [
        { title: "Todos", url: "/documentos/fiscais" },
        { title: "Séries", url: "/documentos/series" },
        {
          title: "Documentos Eletrónicos",
          url: "/documentos/eletronicos"
        },
        { title: "Relatórios", url: "/documentos/relatorios" },
        { title: "Factura", url: "/documentos/factura" },
        { title: "Pro-forma", url: "/documentos/pro-forma" },
        { title: "Recibos", url: "/documentos/recibos" },
        {
          title: "Nova Nota de Credito",
          url: "/documentos/notas-credito/nova"
        },
        {
          title: "Nova Nota de Débito",
          url: "/documentos/notas-debito/nova"
        },
        {
          title: "Nova Guia de Remessa",
          url: "/documentos/guias-remessa/nova"
        }
      ]
    },
    {
      title: "Vendas",
      url: "#",
      icon: Shopping_cart,
      items: [
        { title: "Nova Venda", url: "/venda/nova" },
        { title: "Listagem", url: "/venda" }
      ]
    },
    {
      title: "Estoque",
      url: "#",
      icon: Package,
      items: [
        { title: "Visualizar Estoque", url: "/estoque" },
        { title: "Entrada de Estoque", url: "/estoque/entrada" }
      ]
    },
    {
      title: "Cadastros",
      url: "#",
      icon: Bot,
      items: [
        { title: "Categorias", url: "/cadastros/categorias" },
        { title: "Clientes", url: "/cadastros/clientes" },
        { title: "Produtos", url: "/cadastros/produtos" },
        { title: "Fornecedores", url: "/cadastros/fornecedores" }
      ]
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings_2,
      items: [
        { title: "Usuarios", url: "/configuracoes/usuarios" },
        { title: "Empresa", url: "/configuracoes/empresa" },
        { title: "Taxas", url: "/cadastros/taxas" },
        { title: "SAF-T AO", url: "/configuracoes/saft" },
        {
          title: "Log de Documentos",
          url: "/configuracoes/log-documentos"
        }
      ]
    }
  ]
};
function App_sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      collapsible = "icon",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Sidebar) {
        $$renderer3.push("<!--[-->");
        Sidebar($$renderer3, spread_props([
          { collapsible },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              if (Sidebar_header) {
                $$renderer4.push("<!--[-->");
                Sidebar_header($$renderer4, {
                  children: ($$renderer5) => {
                    Team_switcher($$renderer5, { teams: data.teams });
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` `);
              if (Sidebar_content) {
                $$renderer4.push("<!--[-->");
                Sidebar_content($$renderer4, {
                  children: ($$renderer5) => {
                    Nav_main($$renderer5, { items: data.navMain });
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` `);
              if (Sidebar_footer) {
                $$renderer4.push("<!--[-->");
                Sidebar_footer($$renderer4, {
                  children: ($$renderer5) => {
                    Nav_user($$renderer5);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` `);
              if (Sidebar_rail) {
                $$renderer4.push("<!--[-->");
                Sidebar_rail($$renderer4, {});
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
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
function Breadcrumb($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = void 0,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<nav${attributes({
      class: clsx(className),
      "aria-label": "breadcrumb",
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></nav>`);
    bind_props($$props, { ref });
  });
}
function Breadcrumb_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<li${attributes({
      class: clsx(cn("inline-flex items-center gap-1.5", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
    bind_props($$props, { ref });
  });
}
function Breadcrumb_separator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<li${attributes({
      role: "presentation",
      "aria-hidden": "true",
      class: clsx(cn("[&>svg]:size-3.5", className)),
      ...restProps
    })}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      ChevronRight($$renderer2, {});
    }
    $$renderer2.push(`<!--]--></li>`);
    bind_props($$props, { ref });
  });
}
function Breadcrumb_link($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      href = void 0,
      child,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const attrs = derived(() => ({
      class: cn("hover:text-foreground transition-colors", className),
      href,
      ...restProps
    }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: attrs() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({ ...attrs() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Breadcrumb_list($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<ol${attributes({
      class: clsx(cn("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></ol>`);
    bind_props($$props, { ref });
  });
}
function Breadcrumb_page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<span${attributes({
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      class: clsx(cn("text-foreground font-normal", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></span>`);
    bind_props($$props, { ref });
  });
}
function Controlo_inatividade($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let contador;
    let timeoutAviso;
    let timeoutLogout;
    let contadorLogout;
    onDestroy(() => {
      clearInterval(contador);
      clearInterval(contadorLogout);
      clearTimeout(timeoutAviso);
      clearTimeout(timeoutLogout);
    });
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data: data2 } = $$props;
    Controlo_inatividade($$renderer2);
    $$renderer2.push(`<!----> `);
    Sonner_1($$renderer2, { position: "top-center" });
    $$renderer2.push(`<!----> `);
    if (Sidebar_provider) {
      $$renderer2.push("<!--[-->");
      Sidebar_provider($$renderer2, {
        children: ($$renderer3) => {
          App_sidebar($$renderer3, {});
          $$renderer3.push(`<!----> `);
          if (Sidebar_inset) {
            $$renderer3.push("<!--[-->");
            Sidebar_inset($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<header class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"><div class="flex items-center gap-2 px-4">`);
                if (Sidebar_trigger) {
                  $$renderer4.push("<!--[-->");
                  Sidebar_trigger($$renderer4, { class: "-ml-1" });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                Separator($$renderer4, { orientation: "vertical", class: "mr-2 h-4" });
                $$renderer4.push(`<!----> `);
                if (Breadcrumb) {
                  $$renderer4.push("<!--[-->");
                  Breadcrumb($$renderer4, {
                    children: ($$renderer5) => {
                      if (Breadcrumb_list) {
                        $$renderer5.push("<!--[-->");
                        Breadcrumb_list($$renderer5, {
                          children: ($$renderer6) => {
                            if (Breadcrumb_item) {
                              $$renderer6.push("<!--[-->");
                              Breadcrumb_item($$renderer6, {
                                class: "hidden md:block",
                                children: ($$renderer7) => {
                                  if (Breadcrumb_link) {
                                    $$renderer7.push("<!--[-->");
                                    Breadcrumb_link($$renderer7, {
                                      href: "/dashboard",
                                      children: ($$renderer8) => {
                                        $$renderer8.push(`<!---->${escape_html(data2.empresa?.nome)}`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer7.push("<!--]-->");
                                  } else {
                                    $$renderer7.push("<!--[!-->");
                                    $$renderer7.push("<!--]-->");
                                  }
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Breadcrumb_separator) {
                              $$renderer6.push("<!--[-->");
                              Breadcrumb_separator($$renderer6, { class: "hidden md:block" });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Breadcrumb_item) {
                              $$renderer6.push("<!--[-->");
                              Breadcrumb_item($$renderer6, {
                                children: ($$renderer7) => {
                                  if (Breadcrumb_page) {
                                    $$renderer7.push("<!--[-->");
                                    Breadcrumb_page($$renderer7, {
                                      children: ($$renderer8) => {
                                        $$renderer8.push(`<!---->${escape_html(data2.empresa?.nif)}`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer7.push("<!--]-->");
                                  } else {
                                    $$renderer7.push("<!--[!-->");
                                    $$renderer7.push("<!--]-->");
                                  }
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(`</div> <div class="mr-8 flex items-center gap-2">`);
                Button($$renderer4, {
                  href: "/venda/nova",
                  variant: "outline",
                  children: ($$renderer5) => {
                    Shopping_cart($$renderer5, {});
                    $$renderer5.push(`<!----> Nova Venda`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                Button($$renderer4, {
                  href: "/documentos/factura/nova",
                  variant: "outline",
                  children: ($$renderer5) => {
                    Circle_plus($$renderer5, {});
                    $$renderer5.push(`<!----> Nova Factura`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                Theme_toggle($$renderer4);
                $$renderer4.push(`<!----></div></header> <div class="flex flex-1 flex-col gap-4 p-4 pt-0">`);
                if (data2.isTrial) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-2 rounded-xl px-4 py-2 ring-1 bg-orange-50 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10">`);
                  Clock($$renderer4, { class: "h-4 w-4" });
                  $$renderer4.push(`<!----> <span class="text-sm font-medium">Modo de teste: ${escape_html(data2.trialDaysLeft)} dias restantes</span></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                children($$renderer4);
                $$renderer4.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-6MvglMpD.js.map
