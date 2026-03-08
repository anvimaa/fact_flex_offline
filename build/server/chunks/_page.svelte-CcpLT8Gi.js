import { av as head, an as ensure_array_like, az as attr_class, am as clsx, aq as bind_props, ai as spread_props, aA as attr_style, al as attributes, _ as derived, ah as sanitize_props, ap as slot, aw as attr } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { h as cn, I as Icon } from './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { u as useId, b as box, m as mergeProps, a as useRefById, w as watch } from './use-id-BeJs9ypc.js';
import { C as Context } from './context-BAmjzoO_.js';
import { g as getDataDisabled, j as getAriaRequired, k as getAriaChecked } from './attrs-mduo83PF.js';
import { u as useRovingFocus } from './use-roving-focus.svelte-j4gb8sNV.js';
import { n as noop, S as SPACE } from './noop-CfhljDhh.js';
import { H as Hidden_input } from './hidden-input-sNTj1t7e.js';
import { U as Upload } from './upload-DVPyzTWg.js';
import { X } from './x-DpLJ1R1s.js';
import './events-GtUqDgmb.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';

function Circle($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["circle", { "cx": "12", "cy": "12", "r": "10" }]];
  Icon($$renderer, spread_props([
    { name: "circle" },
    $$sanitized_props,
    {
      /**
       * @component @name Circle
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/circle
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
const ROOT_ATTR = "data-progress-root";
class ProgressRootState {
  opts;
  constructor(opts) {
    this.opts = opts;
    useRefById(opts);
  }
  #props = derived(() => ({
    role: "progressbar",
    value: this.opts.value.current,
    "aria-valuemin": this.opts.min.current,
    "aria-valuemax": this.opts.max.current,
    "aria-valuenow": this.opts.value.current === null ? void 0 : this.opts.value.current,
    "data-value": this.opts.value.current === null ? void 0 : this.opts.value.current,
    "data-state": getProgressDataState(this.opts.value.current, this.opts.max.current),
    "data-max": this.opts.max.current,
    "data-min": this.opts.min.current,
    "data-indeterminate": this.opts.value.current === null ? "" : void 0,
    [ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function getProgressDataState(value, max) {
  if (value === null) return "indeterminate";
  return value === max ? "loaded" : "loading";
}
function useProgressRootState(props) {
  return new ProgressRootState(props);
}
function Progress$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      child,
      children,
      value = 0,
      max = 100,
      min = 0,
      id = useId(),
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useProgressRootState({
      value: box.with(() => value),
      max: box.with(() => max),
      min: box.with(() => min),
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
    bind_props($$props, { ref });
  });
}
const RADIO_GROUP_ROOT_ATTR = "data-radio-group-root";
const RADIO_GROUP_ITEM_ATTR = "data-radio-group-item";
class RadioGroupRootState {
  opts;
  rovingFocusGroup;
  #hasValue = derived(() => this.opts.value.current !== "");
  get hasValue() {
    return this.#hasValue();
  }
  set hasValue($$value) {
    return this.#hasValue($$value);
  }
  constructor(opts) {
    this.opts = opts;
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: this.opts.id,
      candidateAttr: RADIO_GROUP_ITEM_ATTR,
      loop: this.opts.loop,
      orientation: this.opts.orientation
    });
    useRefById({ id: this.opts.id, ref: this.opts.ref });
  }
  isChecked(value) {
    return this.opts.value.current === value;
  }
  setValue(value) {
    this.opts.value.current = value;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "radiogroup",
    "aria-required": getAriaRequired(this.opts.required.current),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    "data-orientation": this.opts.orientation.current,
    [RADIO_GROUP_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class RadioGroupItemState {
  opts;
  root;
  #checked = derived(() => this.root.opts.value.current === this.opts.value.current);
  get checked() {
    return this.#checked();
  }
  set checked($$value) {
    return this.#checked($$value);
  }
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  #isChecked = derived(() => this.root.isChecked(this.opts.value.current));
  #tabIndex = -1;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    useRefById(opts);
    if (this.opts.value.current === this.root.opts.value.current) {
      this.root.rovingFocusGroup.setCurrentTabStopId(this.opts.id.current);
      this.#tabIndex = 0;
    } else if (!this.root.opts.value.current) {
      this.#tabIndex = 0;
    }
    watch(
      [
        () => this.opts.value.current,
        () => this.root.opts.value.current
      ],
      () => {
        if (this.opts.value.current === this.root.opts.value.current) {
          this.root.rovingFocusGroup.setCurrentTabStopId(this.opts.id.current);
          this.#tabIndex = 0;
        }
      }
    );
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.onfocus = this.onfocus.bind(this);
  }
  onclick(_) {
    if (this.opts.disabled.current) return;
    this.root.setValue(this.opts.value.current);
  }
  onfocus(_) {
    if (!this.root.hasValue) return;
    this.root.setValue(this.opts.value.current);
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE) {
      e.preventDefault();
      this.root.setValue(this.opts.value.current);
      return;
    }
    this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e, true);
  }
  #snippetProps = derived(() => ({ checked: this.#isChecked() }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    disabled: this.#isDisabled() ? true : void 0,
    "data-value": this.opts.value.current,
    "data-orientation": this.root.opts.orientation.current,
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "data-state": this.#isChecked() ? "checked" : "unchecked",
    "aria-checked": getAriaChecked(this.#isChecked(), false),
    [RADIO_GROUP_ITEM_ATTR]: "",
    type: "button",
    role: "radio",
    tabindex: this.#tabIndex,
    onkeydown: this.onkeydown,
    onfocus: this.onfocus,
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class RadioGroupInputState {
  root;
  #shouldRender = derived(() => this.root.opts.name.current !== void 0);
  get shouldRender() {
    return this.#shouldRender();
  }
  set shouldRender($$value) {
    return this.#shouldRender($$value);
  }
  #props = derived(() => ({
    name: this.root.opts.name.current,
    value: this.root.opts.value.current,
    required: this.root.opts.required.current,
    disabled: this.root.opts.disabled.current
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  constructor(root) {
    this.root = root;
  }
}
const RadioGroupRootContext = new Context("RadioGroup.Root");
function useRadioGroupRoot(props) {
  return RadioGroupRootContext.set(new RadioGroupRootState(props));
}
function useRadioGroupItem(props) {
  return new RadioGroupItemState(props, RadioGroupRootContext.get());
}
function useRadioGroupInput() {
  return new RadioGroupInputState(RadioGroupRootContext.get());
}
function Radio_group_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const inputState = useRadioGroupInput();
    if (inputState.shouldRender) {
      $$renderer2.push("<!--[-->");
      Hidden_input($$renderer2, spread_props([inputState.props]));
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Radio_group$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      disabled = false,
      children,
      child,
      value = "",
      ref = null,
      orientation = "vertical",
      loop = true,
      name = void 0,
      required = false,
      id = useId(),
      onValueChange = noop,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useRadioGroupRoot({
      orientation: box.with(() => orientation),
      disabled: box.with(() => disabled),
      loop: box.with(() => loop),
      name: box.with(() => name),
      required: box.with(() => required),
      id: box.with(() => id),
      value: box.with(() => value, (v) => {
        if (v === value) return;
        value = v;
        onValueChange?.(v);
      }),
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
    $$renderer2.push(`<!--]--> `);
    Radio_group_input($$renderer2);
    $$renderer2.push(`<!---->`);
    bind_props($$props, { value, ref });
  });
}
function Radio_group_item$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      children,
      child,
      value,
      disabled = false,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemState = useRadioGroupItem({
      value: box.with(() => value),
      disabled: box.with(() => disabled ?? false),
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, itemState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps(), ...itemState.snippetProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2, itemState.snippetProps);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Progress($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      max = 100,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Progress$1) {
        $$renderer3.push("<!--[-->");
        Progress$1($$renderer3, spread_props([
          {
            value,
            class: cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)
          },
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
              $$renderer4.push(`<div class="bg-primary h-full w-full flex-1 transition-all"${attr_style(`transform: translateX(-${100 - 100 * (value ?? 0) / (max ?? 1)}%)`)}></div>`);
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
function Radio_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      value = void 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Radio_group$1) {
        $$renderer3.push("<!--[-->");
        Radio_group$1($$renderer3, spread_props([
          { class: cn("grid gap-2", className) },
          restProps,
          {
            get value() {
              return value;
            },
            set value($$value) {
              value = $$value;
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
    bind_props($$props, { ref, value, class: className });
  });
}
function Radio_group_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let children = function($$renderer4, { checked }) {
          $$renderer4.push(`<div class="flex items-center justify-center">`);
          if (checked) {
            $$renderer4.push("<!--[-->");
            Circle($$renderer4, { class: "fill-primary size-3.5" });
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></div>`);
        };
        if (Radio_group_item$1) {
          $$renderer3.push("<!--[-->");
          Radio_group_item$1($$renderer3, spread_props([
            {
              class: cn("border-primary text-primary focus-visible:ring-ring aspect-square size-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              children,
              $$slots: { default: true }
            }
          ]));
          $$renderer3.push("<!--]-->");
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push("<!--]-->");
        }
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loading = false;
    let currentStep = 0;
    let progress = 0;
    let isDragging = false;
    let quizAnswers = { businessType: "", employeeCount: "", mainGoal: "" };
    let formData = {
      nome: "",
      nif: "",
      telefone: "",
      email: "",
      endereco: "",
      cidade: "",
      provincia: "",
      pais: "Angola",
      website: "",
      logo: null,
      logoPreview: "",
      logoUrl: "",
      codigoRecomendacao: ""
    };
    const steps = [
      {
        title: "Quiz Inicial",
        description: "Algumas perguntas sobre seu negócio"
      },
      {
        title: "Informações Básicas",
        description: "Dados principais da empresa"
      },
      { title: "Contato", description: "Informações de contato" },
      { title: "Localização", description: "Endereço da empresa" }
    ];
    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateProgress();
      }
    }
    function previousStep() {
      if (currentStep > 0) {
        currentStep--;
        updateProgress();
      }
    }
    function updateProgress() {
      progress = currentStep / (steps.length - 1) * 100;
    }
    async function uploadImage(file) {
      try {
        const imageData = new FormData();
        imageData.append("file", file);
        loading = true;
        const response = await fetch("/api/upload", { method: "POST", body: imageData });
        if (!response.ok) {
          throw new Error("Falha ao fazer upload da imagem");
        }
        const data = await response.json();
        return data.url;
      } catch (error) {
        toast.error("Erro ao fazer upload da imagem. Por favor, tente novamente.");
        console.error("Error:", error);
        return null;
      } finally {
        loading = false;
      }
    }
    async function handleFile(file) {
      if (file.type.startsWith("image/")) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("A imagem deve ter no máximo 5MB");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.logoPreview = e.target?.result;
        };
        reader.readAsDataURL(file);
        const url = await uploadImage(file);
        if (url) {
          formData.logo = file;
          formData.logoUrl = url;
          toast.success("Logo enviada com sucesso!");
        }
      } else {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
      }
    }
    function handleFileChange(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        handleFile(input.files[0]);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("pt6ih8", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Criar Empresa - FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-2xl py-8">`);
      Card($$renderer3, {
        class: "p-6",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="mb-8 text-center"><h1 class="text-3xl font-bold">Criar sua Empresa</h1> <p class="mt-2 text-muted-foreground">${escape_html(steps[currentStep].description)}</p></div> <div class="mb-8">`);
          Progress($$renderer4, { value: progress, class: "w-full" });
          $$renderer4.push(`<!----> <div class="mt-2 flex justify-between text-sm text-muted-foreground"><!--[-->`);
          const each_array = ensure_array_like(steps);
          for (let index = 0, $$length = each_array.length; index < $$length; index++) {
            let step = each_array[index];
            $$renderer4.push(`<span${attr_class(clsx(currentStep >= index ? "font-medium text-primary" : ""))}>${escape_html(step.title)}</span>`);
          }
          $$renderer4.push(`<!--]--></div></div> <form class="space-y-6">`);
          if (currentStep === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="space-y-6"><div class="space-y-4">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Qual o tipo do seu negócio?`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Radio_group($$renderer4, {
              get value() {
                return quizAnswers.businessType;
              },
              set value($$value) {
                quizAnswers.businessType = $$value;
                $$settled = false;
              },
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "small", id: "small" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "small",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Pequena Empresa`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "medium", id: "medium" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "medium",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Média Empresa`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "large", id: "large" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "large",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Grande Empresa`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-4">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Quantos funcionários você tem?`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Radio_group($$renderer4, {
              get value() {
                return quizAnswers.employeeCount;
              },
              set value($$value) {
                quizAnswers.employeeCount = $$value;
                $$settled = false;
              },
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "1-10", id: "1-10" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "1-10",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->1-10`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "11-50", id: "11-50" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "11-50",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->11-50`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "50+", id: "50+" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "50+",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Mais de 50`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-4">`);
            Label($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Qual seu principal objetivo com o FACT FLEXI?`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Radio_group($$renderer4, {
              get value() {
                return quizAnswers.mainGoal;
              },
              set value($$value) {
                quizAnswers.mainGoal = $$value;
                $$settled = false;
              },
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "organization", id: "organization" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "organization",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Organizar Finanças`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "growth", id: "growth" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "growth",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Crescer o Negócio`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center space-x-2">`);
                Radio_group_item($$renderer5, { value: "compliance", id: "compliance" });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "compliance",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Conformidade Fiscal`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> `);
          if (currentStep === 1) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
            Label($$renderer4, {
              for: "nome",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Nome da Empresa *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "nome",
              required: true,
              placeholder: "Nome da sua empresa",
              get value() {
                return formData.nome;
              },
              set value($$value) {
                formData.nome = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              for: "nif",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->NIF *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "nif",
              required: true,
              placeholder: "Número de Identificação Fiscal",
              get value() {
                return formData.nif;
              },
              set value($$value) {
                formData.nif = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
            Label($$renderer4, {
              for: "logo",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Logo da Empresa`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <div${attr_class("rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ease-in-out", void 0, { "border-primary": isDragging })}>`);
            if (formData.logoPreview) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="flex flex-col items-center gap-4"><div class="relative"><img${attr("src", formData.logoPreview)} alt="Logo Preview" class="h-48 w-48 rounded-lg border bg-white object-contain p-2"/> <button type="button" class="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90">`);
              X($$renderer4, { class: "h-4 w-4" });
              $$renderer4.push(`<!----></button></div> <p class="text-sm text-muted-foreground">${escape_html(formData.logo?.name)}</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<div class="flex flex-col items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">`);
              Upload($$renderer4, { class: "h-6 w-6 text-primary" });
              $$renderer4.push(`<!----></div> <div class="text-center"><p class="text-sm font-medium">Arraste e solte sua logo aqui ou</p> <label for="logo" class="cursor-pointer text-sm text-primary hover:underline">selecione do computador</label></div> `);
              Input($$renderer4, {
                id: "logo",
                type: "file",
                accept: "image/*",
                onchange: handleFileChange,
                class: "hidden"
              });
              $$renderer4.push(`<!----> <p class="text-xs text-muted-foreground">Formatos aceitos: JPG, PNG, GIF (max 5MB)</p></div>`);
            }
            $$renderer4.push(`<!--]--></div></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> `);
          if (currentStep === 2) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
            Label($$renderer4, {
              for: "telefone",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Telefone *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "telefone",
              type: "tel",
              required: true,
              placeholder: "+244 XXX XXX XXX",
              get value() {
                return formData.telefone;
              },
              set value($$value) {
                formData.telefone = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              for: "email",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Email Empresarial *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "email",
              type: "email",
              required: true,
              placeholder: "empresa@exemplo.com",
              get value() {
                return formData.email;
              },
              set value($$value) {
                formData.email = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
            Label($$renderer4, {
              for: "website",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Website`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "website",
              type: "url",
              placeholder: "https://www.exemplo.com",
              get value() {
                return formData.website;
              },
              set value($$value) {
                formData.website = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
            Label($$renderer4, {
              for: "codigoRecomendacao",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Código de Parceiro (Opcional)`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "codigoRecomendacao",
              type: "text",
              placeholder: "Insira o código de recomendação se possuir",
              get value() {
                return formData.codigoRecomendacao;
              },
              set value($$value) {
                formData.codigoRecomendacao = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> `);
          if (currentStep === 3) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2 md:col-span-2">`);
            Label($$renderer4, {
              for: "endereco",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Endereço *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "endereco",
              required: true,
              placeholder: "Endereço completo",
              get value() {
                return formData.endereco;
              },
              set value($$value) {
                formData.endereco = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              for: "cidade",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Cidade *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "cidade",
              required: true,
              placeholder: "Sua cidade",
              get value() {
                return formData.cidade;
              },
              set value($$value) {
                formData.cidade = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              for: "provincia",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Província *`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "provincia",
              required: true,
              placeholder: "Sua província",
              get value() {
                return formData.provincia;
              },
              set value($$value) {
                formData.provincia = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="space-y-2">`);
            Label($$renderer4, {
              for: "pais",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->País`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Input($$renderer4, {
              id: "pais",
              readonly: true,
              get value() {
                return formData.pais;
              },
              set value($$value) {
                formData.pais = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <div class="flex justify-between gap-4">`);
          if (currentStep > 0) {
            $$renderer4.push("<!--[-->");
            Button($$renderer4, {
              type: "button",
              variant: "outline",
              onclick: previousStep,
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Anterior`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div></div>`);
          }
          $$renderer4.push(`<!--]--> `);
          if (currentStep === steps.length - 1) {
            $$renderer4.push("<!--[-->");
            Button($$renderer4, {
              type: "submit",
              disabled: loading,
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(loading ? "Criando..." : "Criar Empresa")}`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer4.push("<!--[!-->");
            Button($$renderer4, {
              type: "button",
              onclick: nextStep,
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Próximo`);
              },
              $$slots: { default: true }
            });
          }
          $$renderer4.push(`<!--]--></div></form>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CcpLT8Gi.js.map
