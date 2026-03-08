import { c as createFetch } from './index-CQZxJQQs.js';
import { b as baseURL } from './utils3-DjmiJAAD.js';

let clean = Symbol('clean');

let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;

let atom = (initialValue) => {
  let listeners = [];
  let $atom = {
    get() {
      if (!$atom.lc) {
        $atom.listen(() => {})();
      }
      return $atom.value
    },
    lc: 0,
    listen(listener) {
      $atom.lc = listeners.push(listener);

      return () => {
        for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;) {
          if (listenerQueue[i] === listener) {
            listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
          } else {
            i += QUEUE_ITEMS_PER_LISTENER;
          }
        }

        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 1);
          if (!--$atom.lc) $atom.off();
        }
      }
    },
    notify(oldValue, changedKey) {
      let runListenerQueue = !listenerQueue.length;
      for (let listener of listeners) {
        listenerQueue.push(
          listener,
          $atom.value,
          oldValue,
          changedKey
        );
      }

      if (runListenerQueue) {
        for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) {
            listenerQueue[lqIndex](
              listenerQueue[lqIndex + 1],
              listenerQueue[lqIndex + 2],
              listenerQueue[lqIndex + 3]
            );
        }
        listenerQueue.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {},
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener) {
      let unbind = $atom.listen(listener);
      listener($atom.value);
      return unbind
    },
    value: initialValue
  };

  if (process.env.NODE_ENV !== 'production') {
    $atom[clean] = () => {
      listeners = [];
      $atom.lc = 0;
      $atom.off();
    };
  }

  return $atom
};

const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;

let on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore(eventProps => {
      // eslint-disable-next-line no-sequences
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  }
};

let STORE_UNMOUNT_DELAY = 1000;

let onMount = ($store, initialize) => {
  let listener = payload => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, runListeners => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args)
    };

    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };

    if (process.env.NODE_ENV !== 'production') {
      let originClean = $store[clean];
      $store[clean] = () => {
        for (let destroy of $store.events[UNMOUNT]) destroy();
        $store.events[UNMOUNT] = [];
        $store.active = false;
        originClean();
      };
    }

    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    }
  })
};

var P=Object.create(null),g=e=>globalThis.process?.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?P:globalThis),d=new Proxy(P,{get(e,t){return g()[t]??P[t]},has(e,t){let r=g();return t in r||t in P},set(e,t,r){let i=g(true);return i[t]=r,true},deleteProperty(e,t){if(!t)return  false;let r=g(true);return delete r[t],true},ownKeys(){let e=g(true);return Object.keys(e)}});function $(e){return e?e!=="false":false}var k=typeof process<"u"&&process.env&&process.env.NODE_ENV||"";k==="test"||$(d.TEST);var A=class extends Error{constructor(t,r){super(t),this.name="BetterAuthError",this.message=t,this.cause=r,this.stack="";}};function j(e){try{return new URL(e).pathname!=="/"}catch{throw new A(`Invalid base URL: ${e}. Please provide a valid base URL.`)}}function T(e,t="/api/auth"){return j(e)?e:(t=t.startsWith("/")?t:`/${t}`,`${e}${t}`)}function B(e,t){return T(e,t);}var S={id:"redirect",name:"Redirect",hooks:{onSuccess(e){if(e.data?.url&&e.data?.redirect&&typeof window<"u"&&window.location&&window.location)try{window.location.href=e.data.url;}catch{}}}},w={id:"add-current-url",name:"Add current URL",hooks:{onRequest(e){if(typeof window<"u"&&window.location&&window.location)try{let t=new URL(e.url);t.searchParams.set("currentURL",window.location.href),e.url=t;}catch{}return e}}};var x=(e,t,r,i)=>{let o=atom({data:null,error:null,isPending:true,isRefetching:false}),f=()=>{let c=typeof i=="function"?i({data:o.get().data,error:o.get().error,isPending:o.get().isPending}):i;return r(t,{...c,async onSuccess(l){o.set({data:l.data,error:null,isPending:false,isRefetching:false}),await c?.onSuccess?.(l);},async onError(l){o.set({error:l.error,data:null,isPending:false,isRefetching:false}),await c?.onError?.(l);},async onRequest(l){let a=o.get();o.set({isPending:a.data===null,data:a.data,error:null,isRefetching:true}),await c?.onRequest?.(l);}})};e=Array.isArray(e)?e:[e];let u=false;for(let c of e)c.subscribe(()=>{u?f():onMount(o,()=>(f(),u=true,()=>{o.off(),c.off();}));});return o};function v(e){let t=atom(false);return {session:x(t,"/get-session",e,{method:"GET"}),$sessionSignal:t}}var L=e=>{let t="credentials"in Request.prototype,r=B(e?.baseURL),i=e?.plugins?.flatMap(n=>n.fetchPlugins).filter(n=>n!==void 0)||[],o=createFetch({baseURL:r,...t?{credentials:"include"}:{},method:"GET",...e?.fetchOptions,plugins:e?.disableDefaultFetchPlugins?[...e?.fetchOptions?.plugins||[],...i]:[S,w,...e?.fetchOptions?.plugins||[],...i]}),{$sessionSignal:f,session:u}=v(o),c=e?.plugins||[],l={},a={$sessionSignal:f,session:u},s={"/sign-out":"POST","/revoke-sessions":"POST","/revoke-other-sessions":"POST"},p=[{signal:"$sessionSignal",matcher(n){return n==="/sign-out"||n==="/update-user"||n.startsWith("/sign-in")||n.startsWith("/sign-up")}}];for(let n of c)n.getAtoms&&Object.assign(a,n.getAtoms?.(o)),n.pathMethods&&Object.assign(s,n.pathMethods),n.atomListeners&&p.push(...n.atomListeners);let h={notify:n=>{a[n].set(!a[n].get());},listen:(n,b)=>{a[n].subscribe(b);},atoms:a};for(let n of c)n.getActions&&Object.assign(l,n.getActions?.(o,h));return {pluginsActions:l,pluginsAtoms:a,pluginPathMethods:s,atomListeners:p,$fetch:o,$store:h}};function E(e){return e.charAt(0).toUpperCase()+e.slice(1)}function D(e,t,r){let i=t[e],{fetchOptions:o,query:f,...u}=r||{};return i||(o?.method?o.method:u&&Object.keys(u).length>0?"POST":"GET")}function C(e,t,r,i,o){function f(u=[]){return new Proxy(function(){},{get(c,l){let a=[...u,l],s=e;for(let p of a)if(s&&typeof s=="object"&&p in s)s=s[p];else {s=void 0;break}return typeof s=="function"?s:f(a)},apply:async(c,l,a)=>{let s="/"+u.map(R=>R.replace(/[A-Z]/g,y=>`-${y.toLowerCase()}`)).join("/"),p=a[0]||{},h=a[1]||{},{query:n,fetchOptions:b,..._}=p,m={...h,...b},U=D(s,r,p);return await t(s,{...m,body:U==="GET"?void 0:{..._,...m?.body||{}},query:n||m?.query,method:U,async onSuccess(R){await m?.onSuccess?.(R);let y=o?.find(I=>I.matcher(s));if(!y)return;let O=i[y.signal];if(!O)return;let F=O.get();setTimeout(()=>{O.set(!F);},10);}})}})}return f()}function me(e){let{pluginPathMethods:t,pluginsActions:r,pluginsAtoms:i,$fetch:o,atomListeners:f,$store:u}=L(e),c={};for(let[s,p]of Object.entries(i))c[`use${E(s)}`]=()=>p;let l={...r,...c,$fetch:o,$store:u};return C(l,o,t,i,f)}

const authClient = me({
  baseURL,
  plugins: [
    //adminClient()
  ]
});

export { authClient as a };
//# sourceMappingURL=auth-client-DRWmmDkL.js.map
