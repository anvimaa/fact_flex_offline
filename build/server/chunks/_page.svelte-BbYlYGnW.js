import { av as head, an as ensure_array_like, az as attr_class, aB as stringify, aA as attr_style, ah as sanitize_props, ai as spread_props, ap as slot, aw as attr } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { L as Logo } from './Logo-SUsePnoR.js';
import { S as Sparkles } from './sparkles-CciqIUXu.js';
import { B as Building_2 } from './building-2-iv7t62nJ.js';
import { P as Phone, M as Map_pin } from './phone-DEnZw48I.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import { T as Trending_up } from './trending-up-suqfe4Iy.js';
import { S as Shield } from './shield-K6GxCAmv.js';
import { A as Arrow_right } from './arrow-right-DEHhXJ9q.js';
import { U as Upload } from './upload-DVPyzTWg.js';
import { M as Mail } from './mail-B-m3CooH.js';
import { G as Globe } from './globe-BbSquzP7.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { X } from './x-DpLJ1R1s.js';
import './events-GtUqDgmb.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './index2-Cz2gv4fD.js';
import './public-B844qK3e.js';

function Briefcase($$renderer, $$props) {
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
      { "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }
    ],
    [
      "rect",
      { "width": "20", "height": "14", "x": "2", "y": "6", "rx": "2" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "briefcase" },
    $$sanitized_props,
    {
      /**
       * @component @name Briefcase
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgMjBWNGEyIDIgMCAwIDAtMi0yaC00YTIgMiAwIDAgMC0yIDJ2MTYiIC8+CiAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiB4PSIyIiB5PSI2IiByeD0iMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/briefcase
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loading = false;
    let currentStep = 0;
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
        title: "Sobre o Negócio",
        description: "Conte-nos sobre sua empresa",
        icon: Sparkles
      },
      {
        title: "Informações",
        description: "Dados principais da empresa",
        icon: Building_2
      },
      {
        title: "Contato",
        description: "Como podemos te encontrar",
        icon: Phone
      },
      {
        title: "Localização",
        description: "Onde você está",
        icon: Map_pin
      }
    ];
    const businessTypes = [
      {
        value: "small",
        title: "Pequena Empresa",
        description: "Até 10 colaboradores",
        icon: Briefcase
      },
      {
        value: "medium",
        title: "Média Empresa",
        description: "11 a 50 colaboradores",
        icon: Building_2
      },
      {
        value: "large",
        title: "Grande Empresa",
        description: "Mais de 50 colaboradores",
        icon: Trending_up
      }
    ];
    const employeeCounts = [
      { value: "1-10", title: "1-10", description: "Equipe inicial" },
      {
        value: "11-50",
        title: "11-50",
        description: "Equipe em crescimento"
      },
      { value: "50+", title: "50+", description: "Grande equipe" }
    ];
    const goals = [
      {
        value: "organization",
        title: "Organizar Finanças",
        description: "Controle total das suas finanças",
        icon: Briefcase
      },
      {
        value: "growth",
        title: "Crescer o Negócio",
        description: "Expandir e escalar operações",
        icon: Trending_up
      },
      {
        value: "compliance",
        title: "Conformidade Fiscal",
        description: "Manter-se em dia com obrigações",
        icon: Shield
      }
    ];
    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep++;
      }
    }
    function previousStep() {
      if (currentStep > 0) {
        currentStep--;
      }
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
      head("1rlgy8s", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Criar Empresa - FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"><div class="container mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row"><aside class="w-full border-b bg-white/50 p-6 backdrop-blur-sm dark:bg-slate-900/50 lg:w-80 lg:border-b-0 lg:border-r lg:p-8"><div class="mb-8">`);
      Logo($$renderer3);
      $$renderer3.push(`<!----> <p class="mt-1 text-sm text-muted-foreground">Configure sua empresa</p></div> <nav class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(steps);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let step = each_array[index];
        const StepIcon = step.icon;
        $$renderer3.push(`<button type="button"${attr_class(`group flex w-full items-start gap-4 rounded-xl p-3 text-left transition-all duration-200 ${stringify(currentStep === index ? "bg-primary/10 shadow-sm" : "hover:bg-muted/50")}`)}><div${attr_class(`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${stringify(currentStep > index ? "bg-primary text-primary-foreground" : currentStep === index ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted text-muted-foreground")}`)}>`);
        if (currentStep > index) {
          $$renderer3.push("<!--[-->");
          Check($$renderer3, { class: "h-5 w-5" });
        } else {
          $$renderer3.push("<!--[!-->");
          if (StepIcon) {
            $$renderer3.push("<!--[-->");
            StepIcon($$renderer3, { class: "h-5 w-5" });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        }
        $$renderer3.push(`<!--]--></div> <div class="flex-1 pt-1"><p${attr_class(`font-medium transition-colors ${stringify(currentStep >= index ? "text-foreground" : "text-muted-foreground")}`)}>${escape_html(step.title)}</p> <p class="text-sm text-muted-foreground">${escape_html(step.description)}</p></div></button>`);
      }
      $$renderer3.push(`<!--]--></nav> <div class="mt-8 hidden lg:block"><div class="h-2 w-full overflow-hidden rounded-full bg-muted"><div class="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-500 ease-out"${attr_style(`width: ${stringify((currentStep + 1) / steps.length * 100)}%`)}></div></div> <p class="mt-2 text-sm text-muted-foreground">Passo ${escape_html(currentStep + 1)} de ${escape_html(steps.length)}</p></div></aside> <main class="flex-1 p-6 lg:p-12"><div class="mx-auto max-w-xl"><form class="space-y-8">`);
      if (currentStep === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-8 duration-500 animate-in fade-in slide-in-from-right-4"><div><h1 class="text-3xl font-bold tracking-tight">Vamos começar! 🚀</h1> <p class="mt-2 text-lg text-muted-foreground">Responda algumas perguntas para personalizarmos sua experiência</p></div> <div class="space-y-4">`);
        Label($$renderer3, {
          class: "text-base font-semibold",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Qual o porte do seu negócio?`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="grid gap-3"><!--[-->`);
        const each_array_1 = ensure_array_like(businessTypes);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let type = each_array_1[$$index_1];
          const TypeIcon = type.icon;
          $$renderer3.push(`<button type="button"${attr_class(`group flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md ${stringify(quizAnswers.businessType === type.value ? "border-primary bg-primary/5 shadow-md" : "border-border")}`)}><div${attr_class(`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${stringify(quizAnswers.businessType === type.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary")}`)}>`);
          if (TypeIcon) {
            $$renderer3.push("<!--[-->");
            TypeIcon($$renderer3, { class: "h-6 w-6" });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(`</div> <div class="flex-1"><p class="font-semibold">${escape_html(type.title)}</p> <p class="text-sm text-muted-foreground">${escape_html(type.description)}</p></div> `);
          if (quizAnswers.businessType === type.value) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">`);
            Check($$renderer3, { class: "h-4 w-4" });
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></button>`);
        }
        $$renderer3.push(`<!--]--></div></div> <div class="space-y-4">`);
        Label($$renderer3, {
          class: "text-base font-semibold",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Quantos colaboradores?`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="grid grid-cols-3 gap-3"><!--[-->`);
        const each_array_2 = ensure_array_like(employeeCounts);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let count = each_array_2[$$index_2];
          $$renderer3.push(`<button type="button"${attr_class(`rounded-xl border-2 p-4 text-center transition-all duration-200 hover:border-primary/50 hover:shadow-md ${stringify(quizAnswers.employeeCount === count.value ? "border-primary bg-primary/5 shadow-md" : "border-border")}`)}><p class="text-2xl font-bold text-primary">${escape_html(count.title)}</p> <p class="text-xs text-muted-foreground">${escape_html(count.description)}</p></button>`);
        }
        $$renderer3.push(`<!--]--></div></div> <div class="space-y-4">`);
        Label($$renderer3, {
          class: "text-base font-semibold",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Qual seu principal objetivo?`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="grid gap-3"><!--[-->`);
        const each_array_3 = ensure_array_like(goals);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let goal = each_array_3[$$index_3];
          const GoalIcon = goal.icon;
          $$renderer3.push(`<button type="button"${attr_class(`group flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md ${stringify(quizAnswers.mainGoal === goal.value ? "border-primary bg-primary/5 shadow-md" : "border-border")}`)}><div${attr_class(`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${stringify(quizAnswers.mainGoal === goal.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary")}`)}>`);
          if (GoalIcon) {
            $$renderer3.push("<!--[-->");
            GoalIcon($$renderer3, { class: "h-6 w-6" });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(`</div> <div class="flex-1"><p class="font-semibold">${escape_html(goal.title)}</p> <p class="text-sm text-muted-foreground">${escape_html(goal.description)}</p></div> `);
          if (quizAnswers.mainGoal === goal.value) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">`);
            Check($$renderer3, { class: "h-4 w-4" });
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></button>`);
        }
        $$renderer3.push(`<!--]--></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (currentStep === 1) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-8 duration-500 animate-in fade-in slide-in-from-right-4"><div><h1 class="text-3xl font-bold tracking-tight">Informações da Empresa</h1> <p class="mt-2 text-lg text-muted-foreground">Dados básicos para identificação</p></div> <div class="space-y-6"><div class="grid gap-6 sm:grid-cols-2"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "nome",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Nome da Empresa <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "nome",
          required: true,
          placeholder: "Ex: Empresa XYZ, Lda",
          class: "h-12",
          get value() {
            return formData.nome;
          },
          set value($$value) {
            formData.nome = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "nif",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->NIF <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "nif",
          required: true,
          placeholder: "Número de Identificação Fiscal",
          class: "h-12",
          get value() {
            return formData.nif;
          },
          set value($$value) {
            formData.nif = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$renderer3, {
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Logo da Empresa`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div${attr_class(`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${stringify("border-border hover:border-primary/50")}`)}>`);
        if (formData.logoPreview) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex items-center gap-6 p-6"><div class="relative"><img${attr("src", formData.logoPreview)} alt="Logo Preview" class="h-24 w-24 rounded-xl border bg-white object-contain p-2 shadow-sm"/> <button type="button" class="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110">`);
          X($$renderer3, { class: "h-4 w-4" });
          $$renderer3.push(`<!----></button></div> <div class="flex-1"><p class="font-medium">${escape_html(formData.logo?.name)}</p> <p class="text-sm text-muted-foreground">Logo carregada com sucesso</p></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="flex flex-col items-center gap-4 p-8"><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20">`);
          Upload($$renderer3, { class: "h-8 w-8 text-primary" });
          $$renderer3.push(`<!----></div> <div class="text-center"><p class="font-medium">Arraste sua logo aqui ou <label for="logo" class="cursor-pointer text-primary hover:underline">selecione um arquivo</label></p> <p class="mt-1 text-sm text-muted-foreground">PNG, JPG ou GIF até 5MB</p></div> `);
          Input($$renderer3, {
            id: "logo",
            type: "file",
            accept: "image/*",
            onchange: handleFileChange,
            class: "hidden"
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (currentStep === 2) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-8 duration-500 animate-in fade-in slide-in-from-right-4"><div><h1 class="text-3xl font-bold tracking-tight">Contato</h1> <p class="mt-2 text-lg text-muted-foreground">Como seus clientes podem te encontrar</p></div> <div class="space-y-6"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "telefone",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Telefone <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="relative">`);
        Phone($$renderer3, {
          class: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "telefone",
          type: "tel",
          required: true,
          placeholder: "+244 XXX XXX XXX",
          class: "h-12 pl-12",
          get value() {
            return formData.telefone;
          },
          set value($$value) {
            formData.telefone = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "email",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Email Empresarial <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="relative">`);
        Mail($$renderer3, {
          class: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "email",
          type: "email",
          required: true,
          placeholder: "contato@suaempresa.co.ao",
          class: "h-12 pl-12",
          get value() {
            return formData.email;
          },
          set value($$value) {
            formData.email = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "website",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Website`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="relative">`);
        Globe($$renderer3, {
          class: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "website",
          type: "url",
          placeholder: "https://www.suaempresa.co.ao",
          class: "h-12 pl-12",
          get value() {
            return formData.website;
          },
          set value($$value) {
            formData.website = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "codigoRecomendacao",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Código de recomendação (Opcional)`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="relative">`);
        Shield($$renderer3, {
          class: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "codigoRecomendacao",
          type: "text",
          placeholder: "Insira o código de recomendação se for o caso",
          class: "h-12 pl-12",
          get value() {
            return formData.codigoRecomendacao;
          },
          set value($$value) {
            formData.codigoRecomendacao = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (currentStep === 3) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-8 duration-500 animate-in fade-in slide-in-from-right-4"><div><h1 class="text-3xl font-bold tracking-tight">Localização</h1> <p class="mt-2 text-lg text-muted-foreground">Onde sua empresa está localizada</p></div> <div class="space-y-6"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "endereco",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Endereço <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="relative">`);
        Map_pin($$renderer3, { class: "absolute left-4 top-4 h-5 w-5 text-muted-foreground" });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "endereco",
          required: true,
          placeholder: "Rua, número, bairro...",
          class: "h-12 pl-12",
          get value() {
            return formData.endereco;
          },
          set value($$value) {
            formData.endereco = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="grid gap-6 sm:grid-cols-2"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "cidade",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cidade <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "cidade",
          required: true,
          placeholder: "Ex: Luanda",
          class: "h-12",
          get value() {
            return formData.cidade;
          },
          set value($$value) {
            formData.cidade = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "provincia",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Província <span class="text-destructive">*</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "provincia",
          required: true,
          placeholder: "Ex: Luanda",
          class: "h-12",
          get value() {
            return formData.provincia;
          },
          set value($$value) {
            formData.provincia = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "pais",
          class: "text-sm font-medium",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->País`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          id: "pais",
          readonly: true,
          class: "h-12 bg-muted/50",
          get value() {
            return formData.pais;
          },
          set value($$value) {
            formData.pais = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="rounded-2xl border bg-gradient-to-br from-primary/5 to-blue-500/5 p-6"><h3 class="font-semibold">Resumo da Empresa</h3> <div class="mt-4 grid gap-3 text-sm">`);
        if (formData.nome) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between"><span class="text-muted-foreground">Nome:</span> <span class="font-medium">${escape_html(formData.nome)}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (formData.nif) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between"><span class="text-muted-foreground">NIF:</span> <span class="font-medium">${escape_html(formData.nif)}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (formData.email) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between"><span class="text-muted-foreground">Email:</span> <span class="font-medium">${escape_html(formData.email)}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (formData.telefone) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between"><span class="text-muted-foreground">Telefone:</span> <span class="font-medium">${escape_html(formData.telefone)}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="flex items-center justify-between border-t pt-6">`);
      if (currentStep > 0) {
        $$renderer3.push("<!--[-->");
        Button($$renderer3, {
          type: "button",
          variant: "ghost",
          onclick: previousStep,
          class: "gap-2",
          children: ($$renderer4) => {
            Arrow_left($$renderer4, { class: "h-4 w-4" });
            $$renderer4.push(`<!----> Anterior`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (currentStep === steps.length - 1) {
        $$renderer3.push("<!--[-->");
        Button($$renderer3, {
          type: "submit",
          disabled: loading,
          class: "gap-2 bg-gradient-to-r from-primary to-blue-600 px-8 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40",
          children: ($$renderer4) => {
            if (loading) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div> Criando...`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`Criar Empresa `);
              Sparkles($$renderer4, { class: "h-4 w-4" });
              $$renderer4.push(`<!---->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        Button($$renderer3, {
          type: "button",
          onclick: nextStep,
          class: "gap-2 px-8",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Próximo `);
            Arrow_right($$renderer4, { class: "h-4 w-4" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer3.push(`<!--]--></div></form></div></main></div></div>`);
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
//# sourceMappingURL=_page.svelte-BbYlYGnW.js.map
