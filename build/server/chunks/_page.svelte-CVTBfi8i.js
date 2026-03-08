import { av as head, ac as noop } from './index-DPRpZFUH.js';
import './utils3-DjmiJAAD.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { w as writable } from './index2-Cz2gv4fD.js';
import './client-nuXUwqwr.js';
import './public-B844qK3e.js';
import './state.svelte-BwryGJJV.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './client2-CcJ2Tk7F.js';

const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
function linear(t) {
  return t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  return () => b;
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    target_value = new_value;
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = linear,
      interpolate = get_interpolator
    } = { ...defaults, ...opts };
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(
          /** @type {any} */
          value,
          new_value
        );
        if (typeof duration === "function")
          duration = duration(
            /** @type {any} */
            value,
            new_value
          );
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(
      /** @type {any} */
      target_value,
      /** @type {any} */
      value
    ), opts),
    subscribe: store.subscribe
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    tweened(0, { duration: 2e3, easing: cubicOut });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1t7mz5z", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>FACT FLEXI | Pagamentos Premium</title>`);
        });
      });
      $$renderer3.push(`<div class="relative min-h-screen overflow-hidden bg-slate-950 svelte-1t7mz5z"><div class="pointer-events-none fixed inset-0 z-0 svelte-1t7mz5z"><div class="absolute -left-40 -top-40 h-[500px] w-[500px] animate-blob rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 blur-3xl svelte-1t7mz5z"></div> <div class="animation-delay-2000 absolute -right-40 top-1/4 h-[600px] w-[600px] animate-blob rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl svelte-1t7mz5z"></div> <div class="animation-delay-4000 absolute -bottom-40 left-1/3 h-[500px] w-[500px] animate-blob rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-3xl svelte-1t7mz5z"></div> <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] svelte-1t7mz5z"></div> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.8)_70%)] svelte-1t7mz5z"></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="container relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-16 svelte-1t7mz5z">`);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="grid items-start gap-8 lg:grid-cols-12 svelte-1t7mz5z">`);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <footer class="mt-16 text-center svelte-1t7mz5z"><a href="/" class="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-slate-400 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:text-white hover:ring-white/20 svelte-1t7mz5z"><svg class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 svelte-1t7mz5z" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" class="svelte-1t7mz5z"></path></svg> Voltar ao Início</a> <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 svelte-1t7mz5z"><span class="svelte-1t7mz5z">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} FACT FLEXI</span> <span class="svelte-1t7mz5z">•</span> <a href="/termos" class="transition-colors hover:text-slate-400 svelte-1t7mz5z">Termos de Uso</a> <span class="svelte-1t7mz5z">•</span> <a href="/privacidade" class="transition-colors hover:text-slate-400 svelte-1t7mz5z">Privacidade</a> <span class="svelte-1t7mz5z">•</span> <a href="/suporte" class="transition-colors hover:text-slate-400 svelte-1t7mz5z">Suporte</a></div></footer></div></div>`);
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
//# sourceMappingURL=_page.svelte-CVTBfi8i.js.map
