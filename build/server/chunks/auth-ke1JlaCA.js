import * as nc from 'node:crypto';
import nc__default, { KeyObject, createPrivateKey, createPublicKey, constants, createSecretKey, webcrypto as webcrypto$1 } from 'node:crypto';
import { Z as ZodError, o as objectType, e as enumType, s as stringType, b as booleanType, a as optionalType, n as numberType, r as recordType, d as anyType, f as dateType } from './types-C7xnNV5k.js';
import { b as betterFetch } from './index-CQZxJQQs.js';
import * as util from 'node:util';
import { promisify, formatWithOptions } from 'node:util';
import { sep } from 'node:path';
import g$1 from 'node:process';
import * as tty from 'node:tty';
import { Buffer as Buffer$1 } from 'node:buffer';
import { PrismaClient } from '@prisma/client';
import { G as GITHUB_CLIENT_SECRET, b as GITHUB_CLIENT_ID } from './private-BNWMvB1R.js';
import { P as PUBLIC_BETTER_AUTH_URL, a as PUBLIC_BREVO_API_KEY } from './public-B844qK3e.js';
import { a as apiExports } from './api-BO0T-px8.js';
import { b as baseURL } from './utils3-DjmiJAAD.js';

const subtle = nc__default.webcrypto?.subtle || {};
const getRandomValues = (array) => {
  return nc__default.webcrypto.getRandomValues(array);
};

const EmptyObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();

function createRouter$1() {
  const ctx = {
    root: { key: "" },
    static: new EmptyObject()
  };
  return ctx;
}

function splitPath(path) {
  return path.split("/").filter(Boolean);
}
function getMatchParams(segments, paramsMap) {
  const params = new EmptyObject();
  for (const [index, name] of paramsMap) {
    const segment = index < 0 ? segments.slice(-1 * index).join("/") : segments[index];
    if (typeof name === "string") {
      params[name] = segment;
    } else {
      const match = segment.match(name);
      if (match) {
        for (const key in match.groups) {
          params[key] = match.groups[key];
        }
      }
    }
  }
  return params;
}

function addRoute(ctx, method = "", path, data) {
  const segments = splitPath(path);
  let node = ctx.root;
  let _unnamedParamIndex = 0;
  const paramsMap = [];
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment.startsWith("**")) {
      if (!node.wildcard) {
        node.wildcard = { key: "**" };
      }
      node = node.wildcard;
      paramsMap.push([
        -i,
        segment.split(":")[1] || "_",
        segment.length === 2
      ]);
      break;
    }
    if (segment === "*" || segment.includes(":")) {
      if (!node.param) {
        node.param = { key: "*" };
      }
      node = node.param;
      const isOptional = segment === "*";
      paramsMap.push([
        i,
        isOptional ? `_${_unnamedParamIndex++}` : _getParamMatcher(segment),
        isOptional
      ]);
      continue;
    }
    const child = node.static?.[segment];
    if (child) {
      node = child;
    } else {
      const staticNode = { key: segment };
      if (!node.static) {
        node.static = new EmptyObject();
      }
      node.static[segment] = staticNode;
      node = staticNode;
    }
  }
  const hasParams = paramsMap.length > 0;
  if (!node.methods) {
    node.methods = new EmptyObject();
  }
  if (!node.methods[method]) {
    node.methods[method] = [];
  }
  node.methods[method].push({
    data: data || null,
    paramsMap: hasParams ? paramsMap : void 0
  });
  if (!hasParams) {
    ctx.static[path] = node;
  }
}
function _getParamMatcher(segment) {
  if (!segment.includes(":", 1)) {
    return segment.slice(1);
  }
  const regex = segment.replace(/:(\w+)/g, (_, id) => `(?<${id}>\\w+)`);
  return new RegExp(`^${regex}$`);
}

function findRoute(ctx, method = "", path, opts) {
  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }
  const staticNode = ctx.static[path];
  if (staticNode && staticNode.methods) {
    const staticMatch = staticNode.methods[method] || staticNode.methods[""];
    if (staticMatch !== void 0) {
      return staticMatch[0];
    }
  }
  const segments = splitPath(path);
  const match = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
  if (match === void 0) {
    return;
  }
  return {
    data: match.data,
    params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
  };
}
function _lookupTree(ctx, node, method, segments, index) {
  if (index === segments.length) {
    if (node.methods) {
      const match = node.methods[method] || node.methods[""];
      if (match) {
        return match;
      }
    }
    if (node.param && node.param.methods) {
      const match = node.param.methods[method] || node.param.methods[""];
      if (match) {
        const pMap = match[0].paramsMap;
        if (pMap?.[pMap?.length - 1]?.[2]) {
          return match;
        }
      }
    }
    if (node.wildcard && node.wildcard.methods) {
      const match = node.wildcard.methods[method] || node.wildcard.methods[""];
      if (match) {
        const pMap = match[0].paramsMap;
        if (pMap?.[pMap?.length - 1]?.[2]) {
          return match;
        }
      }
    }
    return void 0;
  }
  const segment = segments[index];
  if (node.static) {
    const staticChild = node.static[segment];
    if (staticChild) {
      const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
      if (match) {
        return match;
      }
    }
  }
  if (node.param) {
    const match = _lookupTree(ctx, node.param, method, segments, index + 1);
    if (match) {
      return match;
    }
  }
  if (node.wildcard && node.wildcard.methods) {
    return node.wildcard.methods[method] || node.wildcard.methods[""];
  }
  return;
}

function findAllRoutes(ctx, method = "", path, opts) {
  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }
  const segments = splitPath(path);
  const matches = _findAll(ctx, ctx.root, method, segments, 0);
  return matches.map((m) => {
    return {
      data: m.data,
      params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
    };
  });
}
function _findAll(ctx, node, method, segments, index, matches = []) {
  const segment = segments[index];
  if (node.wildcard && node.wildcard.methods) {
    const match = node.wildcard.methods[method] || node.wildcard.methods[""];
    if (match) {
      matches.push(...match);
    }
  }
  if (node.param) {
    _findAll(ctx, node.param, method, segments, index + 1, matches);
    if (index === segments.length && node.param.methods) {
      const match = node.param.methods[method] || node.param.methods[""];
      if (match) {
        matches.push(...match);
      }
    }
  }
  const staticChild = node.static?.[segment];
  if (staticChild) {
    _findAll(ctx, staticChild, method, segments, index + 1, matches);
  }
  if (index === segments.length && node.methods) {
    const match = node.methods[method] || node.methods[""];
    if (match) {
      matches.push(...match);
    }
  }
  return matches;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/error.ts
var APIError = class extends Error {
  constructor(status, body, headers) {
    super(`API Error: ${status} ${body?.message ?? ""}`, {
      cause: body
    });
    __publicField(this, "status");
    __publicField(this, "headers");
    __publicField(this, "body");
    this.status = status;
    this.body = body ?? {};
    this.stack = "";
    this.headers = headers ?? new Headers();
    if (!this.headers.has("Content-Type")) {
      this.headers.set("Content-Type", "application/json");
    }
    this.name = "BetterCallAPIError";
  }
};

// src/helper.ts
var json = (body, option) => {
  return {
    response: {
      body: option?.body ?? body,
      status: option?.status ?? 200,
      statusText: option?.statusText ?? "OK",
      headers: option?.headers
    },
    body,
    _flag: "json"
  };
};
var algorithm = { name: "HMAC", hash: "SHA-256" };
var getCryptoKey = async (secret) => {
  const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
  return await subtle.importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var makeSignature = async (value, secret) => {
  const key = await getCryptoKey(secret);
  const signature = await subtle.sign(algorithm.name, key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
var verifySignature = async (base64Signature, value, secret) => {
  try {
    const signatureBinStr = atob(base64Signature);
    const signature = new Uint8Array(signatureBinStr.length);
    for (let i = 0, len = signatureBinStr.length; i < len; i++) {
      signature[i] = signatureBinStr.charCodeAt(i);
    }
    return await subtle.verify(algorithm, secret, signature, new TextEncoder().encode(value));
  } catch (e) {
    return false;
  }
};
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse$1 = (cookie, name) => {
  const pairs = cookie.trim().split(";");
  return pairs.reduce((parsedCookie, pairStr) => {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      return parsedCookie;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      return parsedCookie;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = decodeURIComponent(cookieValue);
    }
    return parsedCookie;
  }, {});
};
var parseSigned = async (cookie, secret, name) => {
  const parsedCookie = {};
  const secretKey = await getCryptoKey(secret);
  for (const [key, value] of Object.entries(parse$1(cookie, name))) {
    const signatureStartPos = value.lastIndexOf(".");
    if (signatureStartPos < 1) {
      continue;
    }
    const signedValue = value.substring(0, signatureStartPos);
    const signature = value.substring(signatureStartPos + 1);
    if (signature.length !== 44 || !signature.endsWith("=")) {
      continue;
    }
    const isVerified = await verifySignature(signature, signedValue, secretKey);
    parsedCookie[key] = isVerified ? signedValue : false;
  }
  return parsedCookie;
};
var _serialize = (name, value, opt = {}) => {
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    opt.secure = true;
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      opt.secure = true;
    }
    if (opt.path !== "/") {
      opt.path = "/";
    }
    if (opt.domain) {
      opt.domain = void 0;
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
};
var serialize = (name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
};
var serializeSigned = async (name, value, secret, opt = {}) => {
  const signature = await makeSignature(value, secret);
  value = `${value}.${signature}`;
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
};

// src/cookie-utils.ts
var getCookie = (cookie, key, prefix) => {
  if (!cookie) {
    return void 0;
  }
  let finalKey = key;
  if (prefix) {
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    } else {
      return void 0;
    }
  }
  const obj = parse$1(cookie, finalKey);
  return obj[finalKey];
};
var setCookie = (header, name, value, opt) => {
  const existingCookies = header.get("Set-Cookie");
  if (existingCookies) {
    const cookies = existingCookies.split(", ");
    const updatedCookies = cookies.filter((cookie2) => !cookie2.startsWith(`${name}=`));
    header.delete("Set-Cookie");
    updatedCookies.forEach((cookie2) => header.append("Set-Cookie", cookie2));
  }
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  header.append("Set-Cookie", cookie);
};
var setSignedCookie = async (header, name, value, secret, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = await serializeSigned("__Secure-" + name, value, secret, {
      path: "/",
      ...opt,
      secure: true
    });
  } else if (opt?.prefix === "host") {
    cookie = await serializeSigned("__Host-" + name, value, secret, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = await serializeSigned(name, value, secret, { path: "/", ...opt });
  }
  header.append("Set-Cookie", cookie);
};
var getSignedCookie = async (header, secret, key, prefix) => {
  const cookie = header.get("cookie");
  if (!cookie) {
    return void 0;
  }
  let finalKey = key;
  if (prefix) {
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
  }
  const obj = await parseSigned(cookie, secret, finalKey);
  return obj[finalKey];
};

// src/endpoint.ts
function createEndpointCreator(opts) {
  return (path, options, handler) => {
    return createEndpoint(
      path,
      {
        ...options,
        use: [...options?.use || [], ...opts?.use || []]
      },
      handler
    );
  };
}
function createEndpoint(path, options, handler) {
  let responseHeader = new Headers();
  const handle = async (...ctx) => {
    let internalCtx = {
      setHeader(key, value) {
        responseHeader.set(key, value);
      },
      setCookie(key, value, options2) {
        setCookie(responseHeader, key, value, options2);
      },
      getCookie(key, prefix) {
        const header = ctx[0]?.headers;
        const cookieH = header?.get("cookie");
        const cookie = getCookie(cookieH || "", key, prefix);
        return cookie;
      },
      getSignedCookie(key, secret, prefix) {
        const header = ctx[0]?.headers;
        if (!header) {
          throw new TypeError("Headers are required");
        }
        const cookie = getSignedCookie(header, secret, key, prefix);
        return cookie;
      },
      async setSignedCookie(key, value, secret, options2) {
        await setSignedCookie(responseHeader, key, value, secret, options2);
      },
      redirect(url) {
        responseHeader.set("Location", url);
        return new APIError("FOUND");
      },
      json,
      context: ctx[0]?.context || {},
      _flag: ctx[0]?.asResponse ? "router" : ctx[0]?._flag,
      responseHeader,
      path,
      ...ctx[0] || {}
    };
    if (options.use?.length) {
      let middlewareContexts = {};
      let middlewareBody = {};
      for (const middleware of options.use) {
        if (typeof middleware !== "function") {
          console.warn("Middleware is not a function", {
            middleware
          });
          continue;
        }
        const res = await middleware(internalCtx);
        if (res) {
          const body = res.options?.body ? res.options.body.parse(internalCtx.body) : void 0;
          middlewareContexts = {
            ...middlewareContexts,
            ...res
          };
          middlewareBody = {
            ...middlewareBody,
            ...body
          };
        }
      }
      internalCtx = {
        ...internalCtx,
        body: {
          ...middlewareBody,
          ...internalCtx.body
        },
        context: {
          ...internalCtx.context || {},
          ...middlewareContexts
        }
      };
    }
    try {
      const body = options.body ? options.body.parse(internalCtx.body) : internalCtx.body;
      internalCtx = {
        ...internalCtx,
        body: body ? {
          ...body,
          ...internalCtx.body
        } : internalCtx.body
      };
      internalCtx.query = options.query ? options.query.parse(internalCtx.query) : internalCtx.query;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new APIError("BAD_REQUEST", {
          message: e.message,
          details: e.errors
        });
      }
      throw e;
    }
    if (options.requireHeaders && !internalCtx.headers) {
      throw new APIError("BAD_REQUEST", {
        message: "Headers are required"
      });
    }
    if (options.requireRequest && !internalCtx.request) {
      throw new APIError("BAD_REQUEST", {
        message: "Request is required"
      });
    }
    try {
      let res = await handler(internalCtx);
      let actualResponse = res;
      if (res && typeof res === "object" && "_flag" in res) {
        if (res._flag === "json" && internalCtx._flag === "router") {
          const h = res.response.headers;
          Object.keys(h || {}).forEach((key) => {
            responseHeader.set(key, h[key]);
          });
          responseHeader.set("Content-Type", "application/json");
          actualResponse = new Response(JSON.stringify(res.response.body), {
            status: res.response.status ?? 200,
            statusText: res.response.statusText,
            headers: responseHeader
          });
        } else {
          actualResponse = res.body;
        }
      }
      responseHeader = new Headers();
      return actualResponse;
    } catch (e) {
      if (e instanceof APIError) {
        responseHeader.set("Content-Type", "application/json");
        e.headers = responseHeader;
        responseHeader = new Headers();
        throw e;
      }
      throw e;
    }
  };
  handle.path = path;
  handle.options = options;
  handle.method = options.method;
  handle.headers = responseHeader;
  return handle;
}

// src/utils.ts
async function getBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!request.body) {
    return void 0;
  }
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value.toString();
    });
    return result;
  }
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  if (contentType.includes("text/plain")) {
    return await request.text();
  }
  if (contentType.includes("application/octet-stream")) {
    return await request.arrayBuffer();
  }
  if (contentType.includes("application/pdf") || contentType.includes("image/") || contentType.includes("video/")) {
    const blob = await request.blob();
    return blob;
  }
  if (contentType.includes("application/stream") || request.body instanceof ReadableStream) {
    return request.body;
  }
  return await request.text();
}
function shouldSerialize(body) {
  return typeof body === "object" && body !== null && !(body instanceof Blob) && !(body instanceof FormData);
}
var statusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  "I'M_A_TEAPOT": 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

// src/router.ts
var createRouter = (endpoints, config) => {
  const _endpoints = Object.values(endpoints);
  const router = createRouter$1();
  for (const endpoint of _endpoints) {
    if (endpoint.options.metadata?.SERVER_ONLY) continue;
    if (Array.isArray(endpoint.options?.method)) {
      for (const method of endpoint.options.method) {
        addRoute(router, method, endpoint.path, endpoint);
      }
    } else {
      addRoute(router, endpoint.options.method, endpoint.path, endpoint);
    }
  }
  const middlewareRouter = createRouter$1();
  for (const route of config?.routerMiddleware || []) {
    addRoute(middlewareRouter, "*", route.path, route.middleware);
  }
  const handler = async (request) => {
    const url = new URL(request.url);
    let path = url.pathname;
    if (config?.basePath) {
      path = path.split(config.basePath)[1];
    }
    if (!path?.length) {
      config?.onError?.(new APIError("NOT_FOUND"));
      console.warn(
        `[better-call]: Make sure the URL has the basePath (${config?.basePath}).`
      );
      return new Response(null, {
        status: 404,
        statusText: "Not Found"
      });
    }
    const method = request.method;
    const route = findRoute(router, method, path);
    const handler2 = route?.data;
    const body = await getBody(request);
    const headers = request.headers;
    const query = Object.fromEntries(url.searchParams);
    const routerMiddleware = findAllRoutes(middlewareRouter, "*", path);
    if (!handler2) {
      return new Response(null, {
        status: 404,
        statusText: "Not Found"
      });
    }
    try {
      let middlewareContext = {};
      if (routerMiddleware?.length) {
        for (const route2 of routerMiddleware) {
          const middleware = route2.data;
          const res = await middleware({
            path,
            method,
            headers,
            params: route2?.params,
            request,
            body,
            query,
            context: {
              ...config?.extraContext
            }
          });
          if (res instanceof Response) {
            return res;
          }
          if (res?._flag === "json") {
            return new Response(JSON.stringify(res), {
              headers: res.headers
            });
          }
          if (res) {
            middlewareContext = {
              ...res,
              ...middlewareContext
            };
          }
        }
      }
      const handlerRes = await handler2({
        path,
        method,
        headers,
        params: route?.params,
        request,
        body,
        query,
        _flag: "router",
        context: {
          ...middlewareContext,
          ...config?.extraContext
        }
      });
      if (handlerRes instanceof Response) {
        return handlerRes;
      }
      const resBody = shouldSerialize(handlerRes) ? JSON.stringify(handlerRes) : handlerRes;
      return new Response(resBody, {
        headers: handler2.headers
      });
    } catch (e) {
      if (config?.onError) {
        const onErrorRes = await config.onError(e);
        if (onErrorRes instanceof Response) {
          return onErrorRes;
        }
      }
      if (e instanceof APIError) {
        return new Response(e.body ? JSON.stringify(e.body) : null, {
          status: statusCode[e.status],
          statusText: e.status,
          headers: e.headers
        });
      }
      if (config?.throwError) {
        throw e;
      }
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  };
  return {
    handler: async (request) => {
      const onReq = await config?.onRequest?.(request);
      if (onReq instanceof Response) {
        return onReq;
      }
      const req = onReq instanceof Request ? onReq : request;
      const res = await handler(req);
      const onRes = await config?.onResponse?.(res);
      if (onRes instanceof Response) {
        return onRes;
      }
      return res;
    },
    endpoints
  };
};

// src/middleware.ts
function createMiddleware(optionsOrHandler, handler) {
  if (typeof optionsOrHandler === "function") {
    return createEndpoint(
      "*",
      {
        method: "*"
      },
      optionsOrHandler
    );
  }
  {
    throw new Error("Middleware handler is required");
  }
}
var createMiddlewareCreator = (opts) => {
  function fn(optionsOrHandler, handler) {
    if (typeof optionsOrHandler === "function") {
      return createEndpoint(
        "*",
        {
          method: "*"
        },
        optionsOrHandler
      );
    }
    if (!handler) {
      throw new Error("Middleware handler is required");
    }
    const endpoint = createEndpoint(
      "*",
      {
        ...optionsOrHandler,
        method: "*"
      },
      handler
    );
    return endpoint;
  }
  return fn;
};

class TimeSpan {
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }
    value;
    unit;
    milliseconds() {
        if (this.unit === "ms") {
            return this.value;
        }
        if (this.unit === "s") {
            return this.value * 1000;
        }
        if (this.unit === "m") {
            return this.value * 1000 * 60;
        }
        if (this.unit === "h") {
            return this.value * 1000 * 60 * 60;
        }
        if (this.unit === "d") {
            return this.value * 1000 * 60 * 60 * 24;
        }
        return this.value * 1000 * 60 * 60 * 24 * 7;
    }
    seconds() {
        return this.milliseconds() / 1000;
    }
    transform(x) {
        return new TimeSpan(Math.round(this.milliseconds() * x), "ms");
    }
}
function isWithinExpirationDate(date) {
    return Date.now() < date.getTime();
}

const hexAlphabet = "0123456789abcdef";
const hexDecodeMap = new Map([
    ["0", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["A", 10],
    ["B", 11],
    ["C", 12],
    ["D", 13],
    ["E", 14],
    ["F", 15],
    ["a", 10],
    ["b", 11],
    ["c", 12],
    ["d", 13],
    ["e", 14],
    ["f", 15]
]);
function encodeHex(data) {
    const bytes = new Uint8Array(data);
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
        const key1 = bytes[i] >> 4;
        result += hexAlphabet[key1];
        const key2 = bytes[i] & 0x0f;
        result += hexAlphabet[key2];
    }
    return result;
}
function decodeHex(data) {
    const chunkCount = Math.ceil(data.length / 2);
    const result = new Uint8Array(chunkCount);
    for (let i = 0; i < chunkCount; i++) {
        let buffer = 0;
        const encoded1 = data[i * 2];
        const value1 = hexDecodeMap.get(encoded1) ?? null;
        if (value1 === null) {
            throw new Error(`Invalid character: ${encoded1}`);
        }
        buffer += value1 << 4;
        const encoded2 = data[i * 2 + 1];
        if (encoded2 === undefined) {
            throw new Error("Invalid data");
        }
        const value2 = hexDecodeMap.get(encoded2) ?? null;
        if (value2 === null) {
            throw new Error(`Invalid character: ${encoded1}`);
        }
        buffer += value2;
        result[i] = buffer;
    }
    return result;
}

class Base32Encoding {
    alphabet;
    padding;
    decodeMap = new Map();
    constructor(alphabet, options) {
        if (alphabet.length !== 32) {
            throw new Error("Invalid alphabet");
        }
        this.alphabet = alphabet;
        this.padding = options?.padding ?? "=";
        if (this.alphabet.includes(this.padding) || this.padding.length !== 1) {
            throw new Error("Invalid padding");
        }
        for (let i = 0; i < alphabet.length; i++) {
            this.decodeMap.set(alphabet[i], i);
        }
    }
    encode(data, options) {
        let result = "";
        let buffer = 0;
        let shift = 0;
        for (let i = 0; i < data.length; i++) {
            buffer = (buffer << 8) | data[i];
            shift += 8;
            while (shift >= 5) {
                shift -= 5;
                result += this.alphabet[(buffer >> shift) & 0x1f];
            }
        }
        if (shift > 0) {
            result += this.alphabet[(buffer << (5 - shift)) & 0x1f];
        }
        const includePadding = options?.includePadding ?? true;
        if (includePadding) {
            const padCount = (8 - (result.length % 8)) % 8;
            for (let i = 0; i < padCount; i++) {
                result += "=";
            }
        }
        return result;
    }
    decode(data, options) {
        const strict = options?.strict ?? true;
        const chunkCount = Math.ceil(data.length / 8);
        const result = [];
        for (let i = 0; i < chunkCount; i++) {
            let padCount = 0;
            const chunks = [];
            for (let j = 0; j < 8; j++) {
                const encoded = data[i * 8 + j];
                if (encoded === "=") {
                    if (i + 1 !== chunkCount) {
                        throw new Error(`Invalid character: ${encoded}`);
                    }
                    padCount += 1;
                    continue;
                }
                if (encoded === undefined) {
                    if (strict) {
                        throw new Error("Invalid data");
                    }
                    padCount += 1;
                    continue;
                }
                const value = this.decodeMap.get(encoded) ?? null;
                if (value === null) {
                    throw new Error(`Invalid character: ${encoded}`);
                }
                chunks.push(value);
            }
            if (padCount === 8 || padCount === 7 || padCount === 5 || padCount === 2) {
                throw new Error("Invalid padding");
            }
            const byte1 = (chunks[0] << 3) + (chunks[1] >> 2);
            result.push(byte1);
            if (padCount < 6) {
                const byte2 = ((chunks[1] & 0x03) << 6) + (chunks[2] << 1) + (chunks[3] >> 4);
                result.push(byte2);
            }
            if (padCount < 4) {
                const byte3 = ((chunks[3] & 0xff) << 4) + (chunks[4] >> 1);
                result.push(byte3);
            }
            if (padCount < 3) {
                const byte4 = ((chunks[4] & 0x01) << 7) + (chunks[5] << 2) + (chunks[6] >> 3);
                result.push(byte4);
            }
            if (padCount < 1) {
                const byte5 = ((chunks[6] & 0x07) << 5) + chunks[7];
                result.push(byte5);
            }
        }
        return Uint8Array.from(result);
    }
}
new Base32Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
new Base32Encoding("0123456789ABCDEFGHIJKLMNOPQRSTUV");

class Base64Encoding {
    alphabet;
    padding;
    decodeMap = new Map();
    constructor(alphabet, options) {
        if (alphabet.length !== 64) {
            throw new Error("Invalid alphabet");
        }
        this.alphabet = alphabet;
        this.padding = options?.padding ?? "=";
        if (this.alphabet.includes(this.padding) || this.padding.length !== 1) {
            throw new Error("Invalid padding");
        }
        for (let i = 0; i < alphabet.length; i++) {
            this.decodeMap.set(alphabet[i], i);
        }
    }
    encode(data, options) {
        let result = "";
        let buffer = 0;
        let shift = 0;
        for (let i = 0; i < data.length; i++) {
            buffer = (buffer << 8) | data[i];
            shift += 8;
            while (shift >= 6) {
                shift += -6;
                result += this.alphabet[(buffer >> shift) & 0x3f];
            }
        }
        if (shift > 0) {
            result += this.alphabet[(buffer << (6 - shift)) & 0x3f];
        }
        const includePadding = options?.includePadding ?? true;
        if (includePadding) {
            const padCount = (4 - (result.length % 4)) % 4;
            for (let i = 0; i < padCount; i++) {
                result += "=";
            }
        }
        return result;
    }
    decode(data, options) {
        const strict = options?.strict ?? true;
        const chunkCount = Math.ceil(data.length / 4);
        const result = [];
        for (let i = 0; i < chunkCount; i++) {
            let padCount = 0;
            let buffer = 0;
            for (let j = 0; j < 4; j++) {
                const encoded = data[i * 4 + j];
                if (encoded === "=") {
                    if (i + 1 !== chunkCount) {
                        throw new Error(`Invalid character: ${encoded}`);
                    }
                    padCount += 1;
                    continue;
                }
                if (encoded === undefined) {
                    if (strict) {
                        throw new Error("Invalid data");
                    }
                    padCount += 1;
                    continue;
                }
                const value = this.decodeMap.get(encoded) ?? null;
                if (value === null) {
                    throw new Error(`Invalid character: ${encoded}`);
                }
                buffer += value << (6 * (3 - j));
            }
            result.push((buffer >> 16) & 0xff);
            if (padCount < 2) {
                result.push((buffer >> 8) & 0xff);
            }
            if (padCount < 1) {
                result.push(buffer & 0xff);
            }
        }
        return Uint8Array.from(result);
    }
}
new Base64Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
const base64url = new Base64Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");

class ECDSA {
    hash;
    curve;
    constructor(hash, curve) {
        this.hash = hash;
        this.curve = curve;
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "ECDSA",
            namedCurve: this.curve
        }, false, ["sign"]);
        const signature = await crypto.subtle.sign({
            name: "ECDSA",
            hash: this.hash
        }, cryptoKey, data);
        return signature;
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "ECDSA",
            namedCurve: this.curve
        }, false, ["verify"]);
        return await crypto.subtle.verify({
            name: "ECDSA",
            hash: this.hash
        }, cryptoKey, signature, data);
    }
    async generateKeyPair() {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "ECDSA",
            namedCurve: this.curve
        }, true, ["sign"]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}

let HMAC$1 = class HMAC {
    hash;
    constructor(hash) {
        this.hash = hash;
    }
    async verify(key, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("raw", key, {
            name: "HMAC",
            hash: this.hash
        }, false, ["verify"]);
        return await crypto.subtle.verify("HMAC", cryptoKey, signature, data);
    }
    async sign(key, data) {
        const cryptoKey = await crypto.subtle.importKey("raw", key, {
            name: "HMAC",
            hash: this.hash
        }, false, ["sign"]);
        const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
        return signature;
    }
    async generateKey() {
        const cryptoKey = await crypto.subtle.generateKey({
            name: "HMAC",
            hash: this.hash
        }, true, ["sign"]);
        const key = await crypto.subtle.exportKey("raw", cryptoKey);
        return key;
    }
};

class RSASSAPKCS1v1_5 {
    hash;
    constructor(hash) {
        this.hash = hash;
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash
        }, false, ["verify"]);
        return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", cryptoKey, signature, data);
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash
        }, false, ["sign"]);
        const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, data);
        return signature;
    }
    async generateKeyPair(modulusLength) {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash,
            modulusLength: modulusLength ?? 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01])
        }, true, ["sign"]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}
class RSASSAPSS {
    hash;
    saltLength;
    constructor(hash) {
        this.hash = hash;
        if (hash === "SHA-1") {
            this.saltLength = 20;
        }
        else if (hash === "SHA-256") {
            this.saltLength = 32;
        }
        else if (hash === "SHA-384") {
            this.saltLength = 48;
        }
        else {
            this.saltLength = 64;
        }
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "RSA-PSS",
            hash: this.hash
        }, false, ["verify"]);
        return await crypto.subtle.verify({
            name: "RSA-PSS",
            saltLength: this.saltLength
        }, cryptoKey, signature, data);
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "RSA-PSS",
            hash: this.hash
        }, false, ["sign"]);
        const signature = await crypto.subtle.sign({
            name: "RSA-PSS",
            saltLength: this.saltLength
        }, cryptoKey, data);
        return signature;
    }
    async generateKeyPair(modulusLength) {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "RSA-PSS",
            hash: this.hash,
            modulusLength: modulusLength ?? 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01])
        }, true, ["sign"]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}

async function sha256$1(data) {
    return await crypto.subtle.digest("SHA-256", data);
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers) {
        buf.set(buffer, i);
        i += buffer.length;
    }
    return buf;
}

function normalize(input) {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
    }
    return encoded;
}
const decode$1 = (input) => new Uint8Array(Buffer$1.from(normalize(input), 'base64url'));

class JOSEError extends Error {
    static code = 'ERR_JOSE_GENERIC';
    code = 'ERR_JOSE_GENERIC';
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class JWTClaimValidationFailed extends JOSEError {
    static code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message, { cause: { claim, reason, payload } });
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JWTExpired extends JOSEError {
    static code = 'ERR_JWT_EXPIRED';
    code = 'ERR_JWT_EXPIRED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message, { cause: { claim, reason, payload } });
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    static code = 'ERR_JOSE_ALG_NOT_ALLOWED';
    code = 'ERR_JOSE_ALG_NOT_ALLOWED';
}
class JOSENotSupported extends JOSEError {
    static code = 'ERR_JOSE_NOT_SUPPORTED';
    code = 'ERR_JOSE_NOT_SUPPORTED';
}
class JWSInvalid extends JOSEError {
    static code = 'ERR_JWS_INVALID';
    code = 'ERR_JWS_INVALID';
}
class JWTInvalid extends JOSEError {
    static code = 'ERR_JWT_INVALID';
    code = 'ERR_JWT_INVALID';
}
class JWSSignatureVerificationFailed extends JOSEError {
    static code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    constructor(message = 'signature verification failed', options) {
        super(message, options);
    }
}

var isKeyObject = (obj) => util.types.isKeyObject(obj);

const webcrypto = nc.webcrypto;
const isCryptoKey = (key) => util.types.isCryptoKey(key);

function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve$1(alg) {
    switch (alg) {
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
        default:
            throw new Error('unreachable');
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512': {
            if (!isAlgorithm(key.algorithm, 'HMAC'))
                throw unusable('HMAC');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'RS256':
        case 'RS384':
        case 'RS512': {
            if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5'))
                throw unusable('RSASSA-PKCS1-v1_5');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'PS256':
        case 'PS384':
        case 'PS512': {
            if (!isAlgorithm(key.algorithm, 'RSA-PSS'))
                throw unusable('RSA-PSS');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'EdDSA': {
            if (key.algorithm.name !== 'Ed25519' && key.algorithm.name !== 'Ed448') {
                throw unusable('Ed25519 or Ed448');
            }
            break;
        }
        case 'Ed25519': {
            if (!isAlgorithm(key.algorithm, 'Ed25519'))
                throw unusable('Ed25519');
            break;
        }
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            if (!isAlgorithm(key.algorithm, 'ECDSA'))
                throw unusable('ECDSA');
            const expected = getNamedCurve$1(alg);
            const actual = key.algorithm.namedCurve;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.namedCurve');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}

function message(msg, actual, ...types) {
    types = types.filter(Boolean);
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    }
    else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    }
    else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    }
    else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    }
    else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor?.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
}
var invalidKeyInput = (actual, ...types) => {
    return message('Key must be ', actual, ...types);
};
function withAlg(alg, actual, ...types) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}

var isKeyLike = (key) => isKeyObject(key) || isCryptoKey(key);
const types = ['KeyObject'];
if (globalThis.CryptoKey || webcrypto?.CryptoKey) {
    types.push('CryptoKey');
}

const isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};

function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject$1(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

function isJWK(key) {
    return isObject$1(key) && typeof key.kty === 'string';
}
function isPrivateJWK(key) {
    return key.kty !== 'oct' && typeof key.d === 'string';
}
function isPublicJWK(key) {
    return key.kty !== 'oct' && typeof key.d === 'undefined';
}
function isSecretJWK(key) {
    return isJWK(key) && key.kty === 'oct' && typeof key.k === 'string';
}

const namedCurveToJOSE = (namedCurve) => {
    switch (namedCurve) {
        case 'prime256v1':
            return 'P-256';
        case 'secp384r1':
            return 'P-384';
        case 'secp521r1':
            return 'P-521';
        case 'secp256k1':
            return 'secp256k1';
        default:
            throw new JOSENotSupported('Unsupported key curve for this operation');
    }
};
const getNamedCurve = (kee, raw) => {
    let key;
    if (isCryptoKey(kee)) {
        key = KeyObject.from(kee);
    }
    else if (isKeyObject(kee)) {
        key = kee;
    }
    else if (isJWK(kee)) {
        return kee.crv;
    }
    else {
        throw new TypeError(invalidKeyInput(kee, ...types));
    }
    if (key.type === 'secret') {
        throw new TypeError('only "private" or "public" type keys can be used for this operation');
    }
    switch (key.asymmetricKeyType) {
        case 'ed25519':
        case 'ed448':
            return `Ed${key.asymmetricKeyType.slice(2)}`;
        case 'x25519':
        case 'x448':
            return `X${key.asymmetricKeyType.slice(1)}`;
        case 'ec': {
            const namedCurve = key.asymmetricKeyDetails.namedCurve;
            return namedCurveToJOSE(namedCurve);
        }
        default:
            throw new TypeError('Invalid asymmetric key type for this operation');
    }
};

var checkKeyLength = (key, alg) => {
    let modulusLength;
    try {
        if (key instanceof KeyObject) {
            modulusLength = key.asymmetricKeyDetails?.modulusLength;
        }
        else {
            modulusLength = Buffer.from(key.n, 'base64url').byteLength << 3;
        }
    }
    catch { }
    if (typeof modulusLength !== 'number' || modulusLength < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
};

const parse = (key) => {
    if (key.d) {
        return createPrivateKey({ format: 'jwk', key });
    }
    return createPublicKey({ format: 'jwk', key });
};

async function importJWK(jwk, alg) {
    if (!isObject$1(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg ||= jwk.alg;
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            return decode$1(jwk.k);
        case 'RSA':
            if ('oth' in jwk && jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return parse({ ...jwk, alg });
        default:
            throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

const tag = (key) => key?.[Symbol.toStringTag];
const jwkMatchesOp = (alg, key, usage) => {
    if (key.use !== undefined && key.use !== 'sig') {
        throw new TypeError('Invalid key for this operation, when present its use must be sig');
    }
    if (key.key_ops !== undefined && key.key_ops.includes?.(usage) !== true) {
        throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
    }
    if (key.alg !== undefined && key.alg !== alg) {
        throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
    }
    return true;
};
const symmetricTypeCheck = (alg, key, usage, allowJwk) => {
    if (key instanceof Uint8Array)
        return;
    if (allowJwk && isJWK(key)) {
        if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
        throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
    }
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, ...types, 'Uint8Array', allowJwk ? 'JSON Web Key' : null));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
    if (allowJwk && isJWK(key)) {
        switch (usage) {
            case 'sign':
                if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
                    return;
                throw new TypeError(`JSON Web Key for this operation be a private JWK`);
            case 'verify':
                if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
                    return;
                throw new TypeError(`JSON Web Key for this operation be a public JWK`);
        }
    }
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, ...types, allowJwk ? 'JSON Web Key' : null));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
function checkKeyType(allowJwk, alg, key, usage) {
    const symmetric = alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(alg, key, usage, allowJwk);
    }
    else {
        asymmetricTypeCheck(alg, key, usage, allowJwk);
    }
}
checkKeyType.bind(undefined, false);
const checkKeyTypeWithJwk = checkKeyType.bind(undefined, true);

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader?.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}

const validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};

function dsaDigest(alg) {
    switch (alg) {
        case 'PS256':
        case 'RS256':
        case 'ES256':
        case 'ES256K':
            return 'sha256';
        case 'PS384':
        case 'RS384':
        case 'ES384':
            return 'sha384';
        case 'PS512':
        case 'RS512':
        case 'ES512':
            return 'sha512';
        case 'Ed25519':
        case 'EdDSA':
            return undefined;
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

const ecCurveAlgMap = new Map([
    ['ES256', 'P-256'],
    ['ES256K', 'secp256k1'],
    ['ES384', 'P-384'],
    ['ES512', 'P-521'],
]);
function keyForCrypto(alg, key) {
    let asymmetricKeyType;
    let asymmetricKeyDetails;
    let isJWK;
    if (key instanceof KeyObject) {
        asymmetricKeyType = key.asymmetricKeyType;
        asymmetricKeyDetails = key.asymmetricKeyDetails;
    }
    else {
        isJWK = true;
        switch (key.kty) {
            case 'RSA':
                asymmetricKeyType = 'rsa';
                break;
            case 'EC':
                asymmetricKeyType = 'ec';
                break;
            case 'OKP': {
                if (key.crv === 'Ed25519') {
                    asymmetricKeyType = 'ed25519';
                    break;
                }
                if (key.crv === 'Ed448') {
                    asymmetricKeyType = 'ed448';
                    break;
                }
                throw new TypeError('Invalid key for this operation, its crv must be Ed25519 or Ed448');
            }
            default:
                throw new TypeError('Invalid key for this operation, its kty must be RSA, OKP, or EC');
        }
    }
    let options;
    switch (alg) {
        case 'Ed25519':
            if (asymmetricKeyType !== 'ed25519') {
                throw new TypeError(`Invalid key for this operation, its asymmetricKeyType must be ed25519`);
            }
            break;
        case 'EdDSA':
            if (!['ed25519', 'ed448'].includes(asymmetricKeyType)) {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448');
            }
            break;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            if (asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
            }
            checkKeyLength(key, alg);
            break;
        case 'PS256':
        case 'PS384':
        case 'PS512':
            if (asymmetricKeyType === 'rsa-pss') {
                const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = asymmetricKeyDetails;
                const length = parseInt(alg.slice(-3), 10);
                if (hashAlgorithm !== undefined &&
                    (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
                }
                if (saltLength !== undefined && saltLength > length >> 3) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
                }
            }
            else if (asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss');
            }
            checkKeyLength(key, alg);
            options = {
                padding: constants.RSA_PKCS1_PSS_PADDING,
                saltLength: constants.RSA_PSS_SALTLEN_DIGEST,
            };
            break;
        case 'ES256':
        case 'ES256K':
        case 'ES384':
        case 'ES512': {
            if (asymmetricKeyType !== 'ec') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ec');
            }
            const actual = getNamedCurve(key);
            const expected = ecCurveAlgMap.get(alg);
            if (actual !== expected) {
                throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
            }
            options = { dsaEncoding: 'ieee-p1363' };
            break;
        }
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    if (isJWK) {
        return { format: 'jwk', key, ...options };
    }
    return options ? { ...options, key } : key;
}

function hmacDigest(alg) {
    switch (alg) {
        case 'HS256':
            return 'sha256';
        case 'HS384':
            return 'sha384';
        case 'HS512':
            return 'sha512';
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

function getSignVerifyKey(alg, key, usage) {
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError(invalidKeyInput(key, ...types));
        }
        return createSecretKey(key);
    }
    if (key instanceof KeyObject) {
        return key;
    }
    if (isCryptoKey(key)) {
        checkSigCryptoKey(key, alg, usage);
        return KeyObject.from(key);
    }
    if (isJWK(key)) {
        if (alg.startsWith('HS')) {
            return createSecretKey(Buffer.from(key.k, 'base64url'));
        }
        return key;
    }
    throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array', 'JSON Web Key'));
}

const oneShotSign = promisify(nc.sign);
const sign = async (alg, key, data) => {
    const k = getSignVerifyKey(alg, key, 'sign');
    if (alg.startsWith('HS')) {
        const hmac = nc.createHmac(hmacDigest(alg), k);
        hmac.update(data);
        return hmac.digest();
    }
    return oneShotSign(dsaDigest(alg), data, keyForCrypto(alg, k));
};

const oneShotVerify = promisify(nc.verify);
const verify = async (alg, key, signature, data) => {
    const k = getSignVerifyKey(alg, key, 'verify');
    if (alg.startsWith('HS')) {
        const expected = await sign(alg, k, data);
        const actual = signature;
        try {
            return nc.timingSafeEqual(actual, expected);
        }
        catch {
            return false;
        }
    }
    const algorithm = dsaDigest(alg);
    const keyInput = keyForCrypto(alg, k);
    try {
        return await oneShotVerify(algorithm, data, keyInput, signature);
    }
    catch {
        return false;
    }
};

async function flattenedVerify(jws, key, options) {
    if (!isObject$1(jws)) {
        throw new JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
        throw new JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
        throw new JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
        throw new JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !isObject$1(jws.header)) {
        throw new JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
        try {
            const protectedHeader = decode$1(jws.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        }
        catch {
            throw new JWSInvalid('JWS Protected Header is invalid');
        }
    }
    if (!isDisjoint(parsedProt, jws.header)) {
        throw new JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header,
    };
    const extensions = validateCrit(JWSInvalid, new Map([['b64', true]]), options?.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
        b64 = parsedProt.b64;
        if (typeof b64 !== 'boolean') {
            throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validateAlgorithms('algorithms', options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== 'string') {
            throw new JWSInvalid('JWS Payload must be a string');
        }
    }
    else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
        throw new JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jws);
        resolvedKey = true;
        checkKeyTypeWithJwk(alg, key, 'verify');
        if (isJWK(key)) {
            key = await importJWK(key, alg);
        }
    }
    else {
        checkKeyTypeWithJwk(alg, key, 'verify');
    }
    const data = concat(encoder.encode(jws.protected ?? ''), encoder.encode('.'), typeof jws.payload === 'string' ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
        signature = decode$1(jws.signature);
    }
    catch {
        throw new JWSInvalid('Failed to base64url decode the signature');
    }
    const verified = await verify(alg, key, signature, data);
    if (!verified) {
        throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        try {
            payload = decode$1(jws.payload);
        }
        catch {
            throw new JWSInvalid('Failed to base64url decode the payload');
        }
    }
    else if (typeof jws.payload === 'string') {
        payload = encoder.encode(jws.payload);
    }
    else {
        payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}

async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
        throw new JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.');
    if (length !== 3) {
        throw new JWSInvalid('Invalid Compact JWS');
    }
    const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}

var epoch = (date) => Math.floor(date.getTime() / 1000);

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs = (str) => {
    const matched = REGEX.exec(str);
    if (!matched || (matched[4] && matched[1])) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            numericDate = Math.round(value);
            break;
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            numericDate = Math.round(value * minute);
            break;
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            numericDate = Math.round(value * hour);
            break;
        case 'day':
        case 'days':
        case 'd':
            numericDate = Math.round(value * day);
            break;
        case 'week':
        case 'weeks':
        case 'w':
            numericDate = Math.round(value * week);
            break;
        default:
            numericDate = Math.round(value * year);
            break;
    }
    if (matched[1] === '-' || matched[4] === 'ago') {
        return -numericDate;
    }
    return numericDate;
};

const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
var jwtPayload = (protectedHeader, encodedPayload, options = {}) => {
    let payload;
    try {
        payload = JSON.parse(decoder.decode(encodedPayload));
    }
    catch {
    }
    if (!isObject$1(payload)) {
        throw new JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, 'typ', 'check_failed');
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [...requiredClaims];
    if (maxTokenAge !== undefined)
        presenceCheck.push('iat');
    if (audience !== undefined)
        presenceCheck.push('aud');
    if (subject !== undefined)
        presenceCheck.push('sub');
    if (issuer !== undefined)
        presenceCheck.push('iss');
    for (const claim of new Set(presenceCheck.reverse())) {
        if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, 'missing');
        }
    }
    if (issuer &&
        !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, 'iss', 'check_failed');
    }
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, 'sub', 'check_failed');
    }
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = secs(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== 'number') {
        throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, 'iat', 'invalid');
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', payload, 'exp', 'check_failed');
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === 'number' ? maxTokenAge : secs(maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, 'iat', 'check_failed');
        }
    }
    return payload;
};

async function jwtVerify(jwt, key, options) {
    const verified = await compactVerify(jwt, key, options);
    if (verified.protectedHeader.crit?.includes('b64') && verified.protectedHeader.b64 === false) {
        throw new JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = jwtPayload(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}

const decode = decode$1;

function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === 'string') {
        const parts = token.split('.');
        if (parts.length === 3 || parts.length === 5) {
            [protectedB64u] = parts;
        }
    }
    else if (typeof token === 'object' && token) {
        if ('protected' in token) {
            protectedB64u = token.protected;
        }
        else {
            throw new TypeError('Token does not contain a Protected Header');
        }
    }
    try {
        if (typeof protectedB64u !== 'string' || !protectedB64u) {
            throw new Error();
        }
        const result = JSON.parse(decoder.decode(decode(protectedB64u)));
        if (!isObject$1(result)) {
            throw new Error();
        }
        return result;
    }
    catch {
        throw new TypeError('Invalid Token or Protected Header formatting');
    }
}

async function createJWT(algorithm, key, payloadClaims, options) {
    const header = {
        alg: algorithm,
        typ: "JWT",
        ...options?.headers
    };
    const payload = {
        ...payloadClaims
    };
    if (options?.audiences !== undefined) {
        payload.aud = options.audiences;
    }
    if (options?.subject !== undefined) {
        payload.sub = options.subject;
    }
    if (options?.issuer !== undefined) {
        payload.iss = options.issuer;
    }
    if (options?.jwtId !== undefined) {
        payload.jti = options.jwtId;
    }
    if (options?.expiresIn !== undefined) {
        payload.exp = Math.floor(Date.now() / 1000) + options.expiresIn.seconds();
    }
    if (options?.notBefore !== undefined) {
        payload.nbf = Math.floor(options.notBefore.getTime() / 1000);
    }
    {
        payload.iat = Math.floor(Date.now() / 1000);
    }
    const textEncoder = new TextEncoder();
    const headerPart = base64url.encode(textEncoder.encode(JSON.stringify(header)), {
        includePadding: false
    });
    const payloadPart = base64url.encode(textEncoder.encode(JSON.stringify(payload)), {
        includePadding: false
    });
    const data = textEncoder.encode([headerPart, payloadPart].join("."));
    const signature = await getAlgorithm(algorithm).sign(key, data);
    const signaturePart = base64url.encode(new Uint8Array(signature), {
        includePadding: false
    });
    const value = [headerPart, payloadPart, signaturePart].join(".");
    return value;
}
async function validateJWT(algorithm, key, jwt) {
    const parsedJWT = parseJWT(jwt);
    if (!parsedJWT) {
        throw new Error("Invalid JWT");
    }
    if (parsedJWT.algorithm !== algorithm) {
        throw new Error("Invalid algorithm");
    }
    if (parsedJWT.expiresAt && !isWithinExpirationDate(parsedJWT.expiresAt)) {
        throw new Error("Expired JWT");
    }
    if (parsedJWT.notBefore && Date.now() < parsedJWT.notBefore.getTime()) {
        throw new Error("Inactive JWT");
    }
    const signature = base64url.decode(parsedJWT.parts[2], {
        strict: false
    });
    const data = new TextEncoder().encode(parsedJWT.parts[0] + "." + parsedJWT.parts[1]);
    const validSignature = await getAlgorithm(parsedJWT.algorithm).verify(key, signature, data);
    if (!validSignature) {
        throw new Error("Invalid signature");
    }
    return parsedJWT;
}
function getJWTParts(jwt) {
    const jwtParts = jwt.split(".");
    if (jwtParts.length !== 3) {
        return null;
    }
    return jwtParts;
}
function parseJWT(jwt) {
    const jwtParts = getJWTParts(jwt);
    if (!jwtParts) {
        return null;
    }
    const textDecoder = new TextDecoder();
    const rawHeader = base64url.decode(jwtParts[0], {
        strict: false
    });
    const rawPayload = base64url.decode(jwtParts[1], {
        strict: false
    });
    const header = JSON.parse(textDecoder.decode(rawHeader));
    if (typeof header !== "object" || header === null) {
        return null;
    }
    if (!("alg" in header) || !isValidAlgorithm(header.alg)) {
        return null;
    }
    if ("typ" in header && header.typ !== "JWT") {
        return null;
    }
    const payload = JSON.parse(textDecoder.decode(rawPayload));
    if (typeof payload !== "object" || payload === null) {
        return null;
    }
    const properties = {
        algorithm: header.alg,
        expiresAt: null,
        subject: null,
        issuedAt: null,
        issuer: null,
        jwtId: null,
        audiences: null,
        notBefore: null
    };
    if ("exp" in payload) {
        if (typeof payload.exp !== "number") {
            return null;
        }
        properties.expiresAt = new Date(payload.exp * 1000);
    }
    if ("iss" in payload) {
        if (typeof payload.iss !== "string") {
            return null;
        }
        properties.issuer = payload.iss;
    }
    if ("sub" in payload) {
        if (typeof payload.sub !== "string") {
            return null;
        }
        properties.subject = payload.sub;
    }
    if ("aud" in payload) {
        if (!Array.isArray(payload.aud)) {
            if (typeof payload.aud !== "string") {
                return null;
            }
            properties.audiences = [payload.aud];
        }
        else {
            for (const item of payload.aud) {
                if (typeof item !== "string") {
                    return null;
                }
            }
            properties.audiences = payload.aud;
        }
    }
    if ("nbf" in payload) {
        if (typeof payload.nbf !== "number") {
            return null;
        }
        properties.notBefore = new Date(payload.nbf * 1000);
    }
    if ("iat" in payload) {
        if (typeof payload.iat !== "number") {
            return null;
        }
        properties.issuedAt = new Date(payload.iat * 1000);
    }
    if ("jti" in payload) {
        if (typeof payload.jti !== "string") {
            return null;
        }
        properties.jwtId = payload.jti;
    }
    return {
        value: jwt,
        header: {
            ...header,
            typ: "JWT",
            alg: header.alg
        },
        payload: {
            ...payload
        },
        parts: jwtParts,
        ...properties
    };
}
function getAlgorithm(algorithm) {
    if (algorithm === "ES256" || algorithm === "ES384" || algorithm === "ES512") {
        return new ECDSA(ecdsaDictionary[algorithm].hash, ecdsaDictionary[algorithm].curve);
    }
    if (algorithm === "HS256" || algorithm === "HS384" || algorithm === "HS512") {
        return new HMAC$1(hmacDictionary[algorithm]);
    }
    if (algorithm === "RS256" || algorithm === "RS384" || algorithm === "RS512") {
        return new RSASSAPKCS1v1_5(rsassapkcs1v1_5Dictionary[algorithm]);
    }
    if (algorithm === "PS256" || algorithm === "PS384" || algorithm === "PS512") {
        return new RSASSAPSS(rsassapssDictionary[algorithm]);
    }
    throw new TypeError("Invalid algorithm");
}
function isValidAlgorithm(maybeValidAlgorithm) {
    if (typeof maybeValidAlgorithm !== "string")
        return false;
    return [
        "HS256",
        "HS384",
        "HS512",
        "RS256",
        "RS384",
        "RS512",
        "ES256",
        "ES384",
        "ES512",
        "PS256",
        "PS384",
        "PS512"
    ].includes(maybeValidAlgorithm);
}
const ecdsaDictionary = {
    ES256: {
        hash: "SHA-256",
        curve: "P-256"
    },
    ES384: {
        hash: "SHA-384",
        curve: "P-384"
    },
    ES512: {
        hash: "SHA-512",
        curve: "P-521"
    }
};
const hmacDictionary = {
    HS256: "SHA-256",
    HS384: "SHA-384",
    HS512: "SHA-512"
};
const rsassapkcs1v1_5Dictionary = {
    RS256: "SHA-256",
    RS384: "SHA-384",
    RS512: "SHA-512"
};
const rsassapssDictionary = {
    PS256: "SHA-256",
    PS384: "SHA-384",
    PS512: "SHA-512"
};

function generateCodeVerifier() {
    const randomValues = new Uint8Array(32);
    crypto.getRandomValues(randomValues);
    return base64url.encode(randomValues, {
        includePadding: false
    });
}
function generateState() {
    const randomValues = new Uint8Array(32);
    crypto.getRandomValues(randomValues);
    return base64url.encode(randomValues, {
        includePadding: false
    });
}

const LogLevels = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
};
const LogTypes = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: LogLevels.fatal
  },
  error: {
    level: LogLevels.error
  },
  // Level 1
  warn: {
    level: LogLevels.warn
  },
  // Level 2
  log: {
    level: LogLevels.log
  },
  // Level 3
  info: {
    level: LogLevels.info
  },
  success: {
    level: LogLevels.success
  },
  fail: {
    level: LogLevels.fail
  },
  ready: {
    level: LogLevels.info
  },
  start: {
    level: LogLevels.info
  },
  box: {
    level: LogLevels.info
  },
  // Level 4
  debug: {
    level: LogLevels.debug
  },
  // Level 5
  trace: {
    level: LogLevels.trace
  },
  // Verbose
  verbose: {
    level: LogLevels.verbose
  }
};

function isPlainObject$1(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu$1(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$1(defaults)) {
    return _defu$1(baseObject, {}, namespace);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu$1(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString());
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu$1(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu$1(p, c, ""), {})
  );
}
const defu$1 = createDefu$1();

function isPlainObject$2(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj(arg) {
  if (!isPlainObject$2(arg)) {
    return false;
  }
  if (!arg.message && !arg.args) {
    return false;
  }
  if (arg.stack) {
    return false;
  }
  return true;
}

let paused = false;
const queue = [];
class Consola {
  options;
  _lastLog;
  _mockFn;
  /**
   * Creates an instance of Consola with specified options or defaults.
   *
   * @param {Partial<ConsolaOptions>} [options={}] - Configuration options for the Consola instance.
   */
  constructor(options = {}) {
    const types = options.types || LogTypes;
    this.options = defu$1(
      {
        ...options,
        defaults: { ...options.defaults },
        level: _normalizeLogLevel(options.level, types),
        reporters: [...options.reporters || []]
      },
      {
        types: LogTypes,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: true,
          colors: false,
          compact: true
        }
      }
    );
    for (const type in types) {
      const defaults = {
        type,
        ...this.options.defaults,
        ...types[type]
      };
      this[type] = this._wrapLogFn(defaults);
      this[type].raw = this._wrapLogFn(
        defaults,
        true
      );
    }
    if (this.options.mockFn) {
      this.mockTypes();
    }
    this._lastLog = {};
  }
  /**
   * Gets the current log level of the Consola instance.
   *
   * @returns {number} The current log level.
   */
  get level() {
    return this.options.level;
  }
  /**
   * Sets the minimum log level that will be output by the instance.
   *
   * @param {number} level - The new log level to set.
   */
  set level(level) {
    this.options.level = _normalizeLogLevel(
      level,
      this.options.types,
      this.options.level
    );
  }
  /**
   * Displays a prompt to the user and returns the response.
   * Throw an error if `prompt` is not supported by the current configuration.
   *
   * @template T
   * @param {string} message - The message to display in the prompt.
   * @param {T} [opts] - Optional options for the prompt. See {@link PromptOptions}.
   * @returns {promise<T>} A promise that infer with the prompt options. See {@link PromptOptions}.
   */
  prompt(message, opts) {
    if (!this.options.prompt) {
      throw new Error("prompt is not supported!");
    }
    return this.options.prompt(message, opts);
  }
  /**
   * Creates a new instance of Consola, inheriting options from the current instance, with possible overrides.
   *
   * @param {Partial<ConsolaOptions>} options - Optional overrides for the new instance. See {@link ConsolaOptions}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  create(options) {
    const instance = new Consola({
      ...this.options,
      ...options
    });
    if (this._mockFn) {
      instance.mockTypes(this._mockFn);
    }
    return instance;
  }
  /**
   * Creates a new Consola instance with the specified default log object properties.
   *
   * @param {InputLogObject} defaults - Default properties to include in any log from the new instance. See {@link InputLogObject}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withDefaults(defaults) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...defaults
      }
    });
  }
  /**
   * Creates a new Consola instance with a specified tag, which will be included in every log.
   *
   * @param {string} tag - The tag to include in each log of the new instance.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withTag(tag) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag
    });
  }
  /**
   * Adds a custom reporter to the Consola instance.
   * Reporters will be called for each log message, depending on their implementation and log level.
   *
   * @param {ConsolaReporter} reporter - The reporter to add. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  addReporter(reporter) {
    this.options.reporters.push(reporter);
    return this;
  }
  /**
   * Removes a custom reporter from the Consola instance.
   * If no reporter is specified, all reporters will be removed.
   *
   * @param {ConsolaReporter} reporter - The reporter to remove. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  removeReporter(reporter) {
    if (reporter) {
      const i = this.options.reporters.indexOf(reporter);
      if (i !== -1) {
        return this.options.reporters.splice(i, 1);
      }
    } else {
      this.options.reporters.splice(0);
    }
    return this;
  }
  /**
   * Replaces all reporters of the Consola instance with the specified array of reporters.
   *
   * @param {ConsolaReporter[]} reporters - The new reporters to set. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  setReporters(reporters) {
    this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
    return this;
  }
  wrapAll() {
    this.wrapConsole();
    this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole();
    this.restoreStd();
  }
  /**
   * Overrides console methods with Consola logging methods for consistent logging.
   */
  wrapConsole() {
    for (const type in this.options.types) {
      if (!console["__" + type]) {
        console["__" + type] = console[type];
      }
      console[type] = this[type].raw;
    }
  }
  /**
   * Restores the original console methods, removing Consola overrides.
   */
  restoreConsole() {
    for (const type in this.options.types) {
      if (console["__" + type]) {
        console[type] = console["__" + type];
        delete console["__" + type];
      }
    }
  }
  /**
   * Overrides standard output and error streams to redirect them through Consola.
   */
  wrapStd() {
    this._wrapStream(this.options.stdout, "log");
    this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(stream, type) {
    if (!stream) {
      return;
    }
    if (!stream.__write) {
      stream.__write = stream.write;
    }
    stream.write = (data) => {
      this[type].raw(String(data).trim());
    };
  }
  /**
   * Restores the original standard output and error streams, removing the Consola redirection.
   */
  restoreStd() {
    this._restoreStream(this.options.stdout);
    this._restoreStream(this.options.stderr);
  }
  _restoreStream(stream) {
    if (!stream) {
      return;
    }
    if (stream.__write) {
      stream.write = stream.__write;
      delete stream.__write;
    }
  }
  /**
   * Pauses logging, queues incoming logs until resumed.
   */
  pauseLogs() {
    paused = true;
  }
  /**
   * Resumes logging, processing any queued logs.
   */
  resumeLogs() {
    paused = false;
    const _queue = queue.splice(0);
    for (const item of _queue) {
      item[0]._logFn(item[1], item[2]);
    }
  }
  /**
   * Replaces logging methods with mocks if a mock function is provided.
   *
   * @param {ConsolaOptions["mockFn"]} mockFn - The function to use for mocking logging methods. See {@link ConsolaOptions["mockFn"]}.
   */
  mockTypes(mockFn) {
    const _mockFn = mockFn || this.options.mockFn;
    this._mockFn = _mockFn;
    if (typeof _mockFn !== "function") {
      return;
    }
    for (const type in this.options.types) {
      this[type] = _mockFn(type, this.options.types[type]) || this[type];
      this[type].raw = this[type];
    }
  }
  _wrapLogFn(defaults, isRaw) {
    return (...args) => {
      if (paused) {
        queue.push([this, defaults, args, isRaw]);
        return;
      }
      return this._logFn(defaults, args, isRaw);
    };
  }
  _logFn(defaults, args, isRaw) {
    if ((defaults.level || 0) > this.level) {
      return false;
    }
    const logObj = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...defaults,
      level: _normalizeLogLevel(defaults.level, this.options.types)
    };
    if (!isRaw && args.length === 1 && isLogObj(args[0])) {
      Object.assign(logObj, args[0]);
    } else {
      logObj.args = [...args];
    }
    if (logObj.message) {
      logObj.args.unshift(logObj.message);
      delete logObj.message;
    }
    if (logObj.additional) {
      if (!Array.isArray(logObj.additional)) {
        logObj.additional = logObj.additional.split("\n");
      }
      logObj.args.push("\n" + logObj.additional.join("\n"));
      delete logObj.additional;
    }
    logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
    logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
    const resolveLog = (newLog = false) => {
      const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && repeated > 0) {
        const args2 = [...this._lastLog.object.args];
        if (repeated > 1) {
          args2.push(`(repeated ${repeated} times)`);
        }
        this._log({ ...this._lastLog.object, args: args2 });
        this._lastLog.count = 1;
      }
      if (newLog) {
        this._lastLog.object = logObj;
        this._log(logObj);
      }
    };
    clearTimeout(this._lastLog.timeout);
    const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
    this._lastLog.time = logObj.date;
    if (diffTime < this.options.throttle) {
      try {
        const serializedLog = JSON.stringify([
          logObj.type,
          logObj.tag,
          logObj.args
        ]);
        const isSameLog = this._lastLog.serialized === serializedLog;
        this._lastLog.serialized = serializedLog;
        if (isSameLog) {
          this._lastLog.count = (this._lastLog.count || 0) + 1;
          if (this._lastLog.count > this.options.throttleMin) {
            this._lastLog.timeout = setTimeout(
              resolveLog,
              this.options.throttle
            );
            return;
          }
        }
      } catch {
      }
    }
    resolveLog(true);
  }
  _log(logObj) {
    for (const reporter of this.options.reporters) {
      reporter.log(logObj, {
        options: this.options
      });
    }
  }
}
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel;
  }
  if (typeof input === "number") {
    return input;
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level;
  }
  return defaultLevel;
}
Consola.prototype.add = Consola.prototype.addReporter;
Consola.prototype.remove = Consola.prototype.removeReporter;
Consola.prototype.clear = Consola.prototype.removeReporter;
Consola.prototype.withScope = Consola.prototype.withTag;
Consola.prototype.mock = Consola.prototype.mockTypes;
Consola.prototype.pause = Consola.prototype.pauseLogs;
Consola.prototype.resume = Consola.prototype.resumeLogs;
function createConsola$1(options = {}) {
  return new Consola(options);
}

function parseStack(stack, message) {
  const cwd = process.cwd() + sep;
  const lines = stack.split("\n").splice(message.split("\n").length).map((l) => l.trim().replace("file://", "").replace(cwd, ""));
  return lines;
}

function writeStream(data, stream) {
  const write = stream.__write || stream.write;
  return write.call(stream, data);
}

const bracket = (x) => x ? `[${x}]` : "";
class BasicReporter {
  formatStack(stack, message, opts) {
    const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
    return indent + parseStack(stack, message).join(`
${indent}`);
  }
  formatError(err, opts) {
    const message = err.message ?? formatWithOptions(opts, err);
    const stack = err.stack ? this.formatStack(err.stack, message, opts) : "";
    const level = opts?.errorLevel || 0;
    const causedPrefix = level > 0 ? `${"  ".repeat(level)}[cause]: ` : "";
    const causedError = err.cause ? "\n\n" + this.formatError(err.cause, { ...opts, errorLevel: level + 1 }) : "";
    return causedPrefix + message + "\n" + stack + causedError;
  }
  formatArgs(args, opts) {
    const _args = args.map((arg) => {
      if (arg && typeof arg.stack === "string") {
        return this.formatError(arg, opts);
      }
      return arg;
    });
    return formatWithOptions(opts, ..._args);
  }
  formatDate(date, opts) {
    return opts.date ? date.toLocaleTimeString() : "";
  }
  filterAndJoin(arr) {
    return arr.filter(Boolean).join(" ");
  }
  formatLogObj(logObj, opts) {
    const message = this.formatArgs(logObj.args, opts);
    if (logObj.type === "box") {
      return "\n" + [
        bracket(logObj.tag),
        logObj.title && logObj.title,
        ...message.split("\n")
      ].filter(Boolean).map((l) => " > " + l).join("\n") + "\n";
    }
    return this.filterAndJoin([
      bracket(logObj.type),
      bracket(logObj.tag),
      message
    ]);
  }
  log(logObj, ctx) {
    const line = this.formatLogObj(logObj, {
      columns: ctx.options.stdout.columns || 0,
      ...ctx.options.formatOptions
    });
    return writeStream(
      line + "\n",
      logObj.level < 2 ? ctx.options.stderr || process.stderr : ctx.options.stdout || process.stdout
    );
  }
}

const {
  env = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
const isForced = "FORCE_COLOR" in env || argv.includes("--color");
const isWindows = platform === "win32";
const isDumbTerminal = env.TERM === "dumb";
const isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
const isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
function replaceClose(index, string, close, replace, head = string.slice(0, Math.max(0, index)) + replace, tail = string.slice(Math.max(0, index + close.length)), next = tail.indexOf(close)) {
  return head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
}
function clearBleed(index, string, open, close, replace) {
  return index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
}
function filterEmpty(open, close, replace = open, at = open.length + 1) {
  return (string) => string || !(string === "" || string === void 0) ? clearBleed(
    ("" + string).indexOf(close, at),
    string,
    open,
    close,
    replace
  ) : "";
}
function init(open, close, replace) {
  return filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
}
const colorDefs = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
function createColors(useColor = isColorSupported) {
  return useColor ? colorDefs : Object.fromEntries(Object.keys(colorDefs).map((key) => [key, String]));
}
const colors = createColors();
function getColor$1(color, fallback = "reset") {
  return colors[color] || colors[fallback];
}

const ansiRegex$1 = [
  String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`,
  String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))`
].join("|");
function stripAnsi$1(text) {
  return text.replace(new RegExp(ansiRegex$1, "g"), "");
}

const boxStylePresets = {
  solid: {
    tl: "\u250C",
    tr: "\u2510",
    bl: "\u2514",
    br: "\u2518",
    h: "\u2500",
    v: "\u2502"
  },
  double: {
    tl: "\u2554",
    tr: "\u2557",
    bl: "\u255A",
    br: "\u255D",
    h: "\u2550",
    v: "\u2551"
  },
  doubleSingle: {
    tl: "\u2553",
    tr: "\u2556",
    bl: "\u2559",
    br: "\u255C",
    h: "\u2500",
    v: "\u2551"
  },
  doubleSingleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2551"
  },
  singleThick: {
    tl: "\u250F",
    tr: "\u2513",
    bl: "\u2517",
    br: "\u251B",
    h: "\u2501",
    v: "\u2503"
  },
  singleDouble: {
    tl: "\u2552",
    tr: "\u2555",
    bl: "\u2558",
    br: "\u255B",
    h: "\u2550",
    v: "\u2502"
  },
  singleDoubleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2550",
    v: "\u2502"
  },
  rounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2502"
  }
};
const defaultStyle = {
  borderColor: "white",
  borderStyle: "rounded",
  valign: "center",
  padding: 2,
  marginLeft: 1,
  marginTop: 1,
  marginBottom: 1
};
function box(text, _opts = {}) {
  const opts = {
    ..._opts,
    style: {
      ...defaultStyle,
      ..._opts.style
    }
  };
  const textLines = text.split("\n");
  const boxLines = [];
  const _color = getColor$1(opts.style.borderColor);
  const borderStyle = {
    ...typeof opts.style.borderStyle === "string" ? boxStylePresets[opts.style.borderStyle] || boxStylePresets.solid : opts.style.borderStyle
  };
  if (_color) {
    for (const key in borderStyle) {
      borderStyle[key] = _color(
        borderStyle[key]
      );
    }
  }
  const paddingOffset = opts.style.padding % 2 === 0 ? opts.style.padding : opts.style.padding + 1;
  const height = textLines.length + paddingOffset;
  const width = Math.max(
    ...textLines.map((line) => stripAnsi$1(line).length),
    opts.title ? stripAnsi$1(opts.title).length : 0
  ) + paddingOffset;
  const widthOffset = width + paddingOffset;
  const leftSpace = opts.style.marginLeft > 0 ? " ".repeat(opts.style.marginLeft) : "";
  if (opts.style.marginTop > 0) {
    boxLines.push("".repeat(opts.style.marginTop));
  }
  if (opts.title) {
    const title = _color ? _color(opts.title) : opts.title;
    const left = borderStyle.h.repeat(
      Math.floor((width - stripAnsi$1(opts.title).length) / 2)
    );
    const right = borderStyle.h.repeat(
      width - stripAnsi$1(opts.title).length - stripAnsi$1(left).length + paddingOffset
    );
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${left}${title}${right}${borderStyle.tr}`
    );
  } else {
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${borderStyle.h.repeat(widthOffset)}${borderStyle.tr}`
    );
  }
  const valignOffset = opts.style.valign === "center" ? Math.floor((height - textLines.length) / 2) : opts.style.valign === "top" ? height - textLines.length - paddingOffset : height - textLines.length;
  for (let i = 0; i < height; i++) {
    if (i < valignOffset || i >= valignOffset + textLines.length) {
      boxLines.push(
        `${leftSpace}${borderStyle.v}${" ".repeat(widthOffset)}${borderStyle.v}`
      );
    } else {
      const line = textLines[i - valignOffset];
      const left = " ".repeat(paddingOffset);
      const right = " ".repeat(width - stripAnsi$1(line).length);
      boxLines.push(
        `${leftSpace}${borderStyle.v}${left}${line}${right}${borderStyle.v}`
      );
    }
  }
  boxLines.push(
    `${leftSpace}${borderStyle.bl}${borderStyle.h.repeat(widthOffset)}${borderStyle.br}`
  );
  if (opts.style.marginBottom > 0) {
    boxLines.push("".repeat(opts.style.marginBottom));
  }
  return boxLines.join("\n");
}

const r=Object.create(null),i=e=>globalThis.process?.env||import.meta.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&process.env.NODE_ENV||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b$1(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b$1();l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T$1=n(o.CI)||l.ci!==false,a=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY),g=n(o.DEBUG),R$1=t==="test"||n(o.TEST);n(o.MINIMAL)||T$1||R$1||!a;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(a||A)&&o.TERM!=="dumb"||T$1);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),_$1={versions:{}};new Proxy(y,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _$1)return _$1[s]}});const c=globalThis.process?.release?.name==="node",O$1=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D$1=!!globalThis.Deno,L$1=!!globalThis.fastly,S$1=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N$1=globalThis.navigator?.userAgent==="Cloudflare-Workers",F$2=[[S$1,"netlify"],[u,"edge-light"],[N$1,"workerd"],[L$1,"fastly"],[D$1,"deno"],[O$1,"bun"],[c,"node"]];function G$1(){const e=F$2.find(s=>s[0]);if(e)return {name:e[1]}}const P$2=G$1();P$2?.name||"";

function ansiRegex({onlyFirst = false} = {}) {
	// Valid string terminator sequences are BEL, ESC\, and 0x9c
	const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
	const pattern = [
		`[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

const regex = ansiRegex();

function stripAnsi(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	// Even though the regex is global, we don't need to reset the `.lastIndex`
	// because unlike `.exec()` and `.test()`, `.replace()` does it automatically
	// and doing it manually has a performance penalty.
	return string.replace(regex, '');
}

// Generated code.

function isAmbiguous(x) {
	return x === 0xA1
		|| x === 0xA4
		|| x === 0xA7
		|| x === 0xA8
		|| x === 0xAA
		|| x === 0xAD
		|| x === 0xAE
		|| x >= 0xB0 && x <= 0xB4
		|| x >= 0xB6 && x <= 0xBA
		|| x >= 0xBC && x <= 0xBF
		|| x === 0xC6
		|| x === 0xD0
		|| x === 0xD7
		|| x === 0xD8
		|| x >= 0xDE && x <= 0xE1
		|| x === 0xE6
		|| x >= 0xE8 && x <= 0xEA
		|| x === 0xEC
		|| x === 0xED
		|| x === 0xF0
		|| x === 0xF2
		|| x === 0xF3
		|| x >= 0xF7 && x <= 0xFA
		|| x === 0xFC
		|| x === 0xFE
		|| x === 0x101
		|| x === 0x111
		|| x === 0x113
		|| x === 0x11B
		|| x === 0x126
		|| x === 0x127
		|| x === 0x12B
		|| x >= 0x131 && x <= 0x133
		|| x === 0x138
		|| x >= 0x13F && x <= 0x142
		|| x === 0x144
		|| x >= 0x148 && x <= 0x14B
		|| x === 0x14D
		|| x === 0x152
		|| x === 0x153
		|| x === 0x166
		|| x === 0x167
		|| x === 0x16B
		|| x === 0x1CE
		|| x === 0x1D0
		|| x === 0x1D2
		|| x === 0x1D4
		|| x === 0x1D6
		|| x === 0x1D8
		|| x === 0x1DA
		|| x === 0x1DC
		|| x === 0x251
		|| x === 0x261
		|| x === 0x2C4
		|| x === 0x2C7
		|| x >= 0x2C9 && x <= 0x2CB
		|| x === 0x2CD
		|| x === 0x2D0
		|| x >= 0x2D8 && x <= 0x2DB
		|| x === 0x2DD
		|| x === 0x2DF
		|| x >= 0x300 && x <= 0x36F
		|| x >= 0x391 && x <= 0x3A1
		|| x >= 0x3A3 && x <= 0x3A9
		|| x >= 0x3B1 && x <= 0x3C1
		|| x >= 0x3C3 && x <= 0x3C9
		|| x === 0x401
		|| x >= 0x410 && x <= 0x44F
		|| x === 0x451
		|| x === 0x2010
		|| x >= 0x2013 && x <= 0x2016
		|| x === 0x2018
		|| x === 0x2019
		|| x === 0x201C
		|| x === 0x201D
		|| x >= 0x2020 && x <= 0x2022
		|| x >= 0x2024 && x <= 0x2027
		|| x === 0x2030
		|| x === 0x2032
		|| x === 0x2033
		|| x === 0x2035
		|| x === 0x203B
		|| x === 0x203E
		|| x === 0x2074
		|| x === 0x207F
		|| x >= 0x2081 && x <= 0x2084
		|| x === 0x20AC
		|| x === 0x2103
		|| x === 0x2105
		|| x === 0x2109
		|| x === 0x2113
		|| x === 0x2116
		|| x === 0x2121
		|| x === 0x2122
		|| x === 0x2126
		|| x === 0x212B
		|| x === 0x2153
		|| x === 0x2154
		|| x >= 0x215B && x <= 0x215E
		|| x >= 0x2160 && x <= 0x216B
		|| x >= 0x2170 && x <= 0x2179
		|| x === 0x2189
		|| x >= 0x2190 && x <= 0x2199
		|| x === 0x21B8
		|| x === 0x21B9
		|| x === 0x21D2
		|| x === 0x21D4
		|| x === 0x21E7
		|| x === 0x2200
		|| x === 0x2202
		|| x === 0x2203
		|| x === 0x2207
		|| x === 0x2208
		|| x === 0x220B
		|| x === 0x220F
		|| x === 0x2211
		|| x === 0x2215
		|| x === 0x221A
		|| x >= 0x221D && x <= 0x2220
		|| x === 0x2223
		|| x === 0x2225
		|| x >= 0x2227 && x <= 0x222C
		|| x === 0x222E
		|| x >= 0x2234 && x <= 0x2237
		|| x === 0x223C
		|| x === 0x223D
		|| x === 0x2248
		|| x === 0x224C
		|| x === 0x2252
		|| x === 0x2260
		|| x === 0x2261
		|| x >= 0x2264 && x <= 0x2267
		|| x === 0x226A
		|| x === 0x226B
		|| x === 0x226E
		|| x === 0x226F
		|| x === 0x2282
		|| x === 0x2283
		|| x === 0x2286
		|| x === 0x2287
		|| x === 0x2295
		|| x === 0x2299
		|| x === 0x22A5
		|| x === 0x22BF
		|| x === 0x2312
		|| x >= 0x2460 && x <= 0x24E9
		|| x >= 0x24EB && x <= 0x254B
		|| x >= 0x2550 && x <= 0x2573
		|| x >= 0x2580 && x <= 0x258F
		|| x >= 0x2592 && x <= 0x2595
		|| x === 0x25A0
		|| x === 0x25A1
		|| x >= 0x25A3 && x <= 0x25A9
		|| x === 0x25B2
		|| x === 0x25B3
		|| x === 0x25B6
		|| x === 0x25B7
		|| x === 0x25BC
		|| x === 0x25BD
		|| x === 0x25C0
		|| x === 0x25C1
		|| x >= 0x25C6 && x <= 0x25C8
		|| x === 0x25CB
		|| x >= 0x25CE && x <= 0x25D1
		|| x >= 0x25E2 && x <= 0x25E5
		|| x === 0x25EF
		|| x === 0x2605
		|| x === 0x2606
		|| x === 0x2609
		|| x === 0x260E
		|| x === 0x260F
		|| x === 0x261C
		|| x === 0x261E
		|| x === 0x2640
		|| x === 0x2642
		|| x === 0x2660
		|| x === 0x2661
		|| x >= 0x2663 && x <= 0x2665
		|| x >= 0x2667 && x <= 0x266A
		|| x === 0x266C
		|| x === 0x266D
		|| x === 0x266F
		|| x === 0x269E
		|| x === 0x269F
		|| x === 0x26BF
		|| x >= 0x26C6 && x <= 0x26CD
		|| x >= 0x26CF && x <= 0x26D3
		|| x >= 0x26D5 && x <= 0x26E1
		|| x === 0x26E3
		|| x === 0x26E8
		|| x === 0x26E9
		|| x >= 0x26EB && x <= 0x26F1
		|| x === 0x26F4
		|| x >= 0x26F6 && x <= 0x26F9
		|| x === 0x26FB
		|| x === 0x26FC
		|| x === 0x26FE
		|| x === 0x26FF
		|| x === 0x273D
		|| x >= 0x2776 && x <= 0x277F
		|| x >= 0x2B56 && x <= 0x2B59
		|| x >= 0x3248 && x <= 0x324F
		|| x >= 0xE000 && x <= 0xF8FF
		|| x >= 0xFE00 && x <= 0xFE0F
		|| x === 0xFFFD
		|| x >= 0x1F100 && x <= 0x1F10A
		|| x >= 0x1F110 && x <= 0x1F12D
		|| x >= 0x1F130 && x <= 0x1F169
		|| x >= 0x1F170 && x <= 0x1F18D
		|| x === 0x1F18F
		|| x === 0x1F190
		|| x >= 0x1F19B && x <= 0x1F1AC
		|| x >= 0xE0100 && x <= 0xE01EF
		|| x >= 0xF0000 && x <= 0xFFFFD
		|| x >= 0x100000 && x <= 0x10FFFD;
}

function isFullWidth(x) {
	return x === 0x3000
		|| x >= 0xFF01 && x <= 0xFF60
		|| x >= 0xFFE0 && x <= 0xFFE6;
}

function isWide(x) {
	return x >= 0x1100 && x <= 0x115F
		|| x === 0x231A
		|| x === 0x231B
		|| x === 0x2329
		|| x === 0x232A
		|| x >= 0x23E9 && x <= 0x23EC
		|| x === 0x23F0
		|| x === 0x23F3
		|| x === 0x25FD
		|| x === 0x25FE
		|| x === 0x2614
		|| x === 0x2615
		|| x >= 0x2630 && x <= 0x2637
		|| x >= 0x2648 && x <= 0x2653
		|| x === 0x267F
		|| x >= 0x268A && x <= 0x268F
		|| x === 0x2693
		|| x === 0x26A1
		|| x === 0x26AA
		|| x === 0x26AB
		|| x === 0x26BD
		|| x === 0x26BE
		|| x === 0x26C4
		|| x === 0x26C5
		|| x === 0x26CE
		|| x === 0x26D4
		|| x === 0x26EA
		|| x === 0x26F2
		|| x === 0x26F3
		|| x === 0x26F5
		|| x === 0x26FA
		|| x === 0x26FD
		|| x === 0x2705
		|| x === 0x270A
		|| x === 0x270B
		|| x === 0x2728
		|| x === 0x274C
		|| x === 0x274E
		|| x >= 0x2753 && x <= 0x2755
		|| x === 0x2757
		|| x >= 0x2795 && x <= 0x2797
		|| x === 0x27B0
		|| x === 0x27BF
		|| x === 0x2B1B
		|| x === 0x2B1C
		|| x === 0x2B50
		|| x === 0x2B55
		|| x >= 0x2E80 && x <= 0x2E99
		|| x >= 0x2E9B && x <= 0x2EF3
		|| x >= 0x2F00 && x <= 0x2FD5
		|| x >= 0x2FF0 && x <= 0x2FFF
		|| x >= 0x3001 && x <= 0x303E
		|| x >= 0x3041 && x <= 0x3096
		|| x >= 0x3099 && x <= 0x30FF
		|| x >= 0x3105 && x <= 0x312F
		|| x >= 0x3131 && x <= 0x318E
		|| x >= 0x3190 && x <= 0x31E5
		|| x >= 0x31EF && x <= 0x321E
		|| x >= 0x3220 && x <= 0x3247
		|| x >= 0x3250 && x <= 0xA48C
		|| x >= 0xA490 && x <= 0xA4C6
		|| x >= 0xA960 && x <= 0xA97C
		|| x >= 0xAC00 && x <= 0xD7A3
		|| x >= 0xF900 && x <= 0xFAFF
		|| x >= 0xFE10 && x <= 0xFE19
		|| x >= 0xFE30 && x <= 0xFE52
		|| x >= 0xFE54 && x <= 0xFE66
		|| x >= 0xFE68 && x <= 0xFE6B
		|| x >= 0x16FE0 && x <= 0x16FE4
		|| x === 0x16FF0
		|| x === 0x16FF1
		|| x >= 0x17000 && x <= 0x187F7
		|| x >= 0x18800 && x <= 0x18CD5
		|| x >= 0x18CFF && x <= 0x18D08
		|| x >= 0x1AFF0 && x <= 0x1AFF3
		|| x >= 0x1AFF5 && x <= 0x1AFFB
		|| x === 0x1AFFD
		|| x === 0x1AFFE
		|| x >= 0x1B000 && x <= 0x1B122
		|| x === 0x1B132
		|| x >= 0x1B150 && x <= 0x1B152
		|| x === 0x1B155
		|| x >= 0x1B164 && x <= 0x1B167
		|| x >= 0x1B170 && x <= 0x1B2FB
		|| x >= 0x1D300 && x <= 0x1D356
		|| x >= 0x1D360 && x <= 0x1D376
		|| x === 0x1F004
		|| x === 0x1F0CF
		|| x === 0x1F18E
		|| x >= 0x1F191 && x <= 0x1F19A
		|| x >= 0x1F200 && x <= 0x1F202
		|| x >= 0x1F210 && x <= 0x1F23B
		|| x >= 0x1F240 && x <= 0x1F248
		|| x === 0x1F250
		|| x === 0x1F251
		|| x >= 0x1F260 && x <= 0x1F265
		|| x >= 0x1F300 && x <= 0x1F320
		|| x >= 0x1F32D && x <= 0x1F335
		|| x >= 0x1F337 && x <= 0x1F37C
		|| x >= 0x1F37E && x <= 0x1F393
		|| x >= 0x1F3A0 && x <= 0x1F3CA
		|| x >= 0x1F3CF && x <= 0x1F3D3
		|| x >= 0x1F3E0 && x <= 0x1F3F0
		|| x === 0x1F3F4
		|| x >= 0x1F3F8 && x <= 0x1F43E
		|| x === 0x1F440
		|| x >= 0x1F442 && x <= 0x1F4FC
		|| x >= 0x1F4FF && x <= 0x1F53D
		|| x >= 0x1F54B && x <= 0x1F54E
		|| x >= 0x1F550 && x <= 0x1F567
		|| x === 0x1F57A
		|| x === 0x1F595
		|| x === 0x1F596
		|| x === 0x1F5A4
		|| x >= 0x1F5FB && x <= 0x1F64F
		|| x >= 0x1F680 && x <= 0x1F6C5
		|| x === 0x1F6CC
		|| x >= 0x1F6D0 && x <= 0x1F6D2
		|| x >= 0x1F6D5 && x <= 0x1F6D7
		|| x >= 0x1F6DC && x <= 0x1F6DF
		|| x === 0x1F6EB
		|| x === 0x1F6EC
		|| x >= 0x1F6F4 && x <= 0x1F6FC
		|| x >= 0x1F7E0 && x <= 0x1F7EB
		|| x === 0x1F7F0
		|| x >= 0x1F90C && x <= 0x1F93A
		|| x >= 0x1F93C && x <= 0x1F945
		|| x >= 0x1F947 && x <= 0x1F9FF
		|| x >= 0x1FA70 && x <= 0x1FA7C
		|| x >= 0x1FA80 && x <= 0x1FA89
		|| x >= 0x1FA8F && x <= 0x1FAC6
		|| x >= 0x1FACE && x <= 0x1FADC
		|| x >= 0x1FADF && x <= 0x1FAE9
		|| x >= 0x1FAF0 && x <= 0x1FAF8
		|| x >= 0x20000 && x <= 0x2FFFD
		|| x >= 0x30000 && x <= 0x3FFFD;
}

function validate(codePoint) {
	if (!Number.isSafeInteger(codePoint)) {
		throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
	}
}

function eastAsianWidth(codePoint, {ambiguousAsWide = false} = {}) {
	validate(codePoint);

	if (
		isFullWidth(codePoint)
		|| isWide(codePoint)
		|| (ambiguousAsWide && isAmbiguous(codePoint))
	) {
		return 2;
	}

	return 1;
}

const emojiRegex = () => {
	// https://mths.be/emoji
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

const segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter() : { segment: (str) => str.split('') };

const defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;

function stringWidth$1(string, options = {}) {
	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	const {
		ambiguousIsNarrow = true,
		countAnsiEscapeCodes = false,
	} = options;

	if (!countAnsiEscapeCodes) {
		string = stripAnsi(string);
	}

	if (string.length === 0) {
		return 0;
	}

	let width = 0;
	const eastAsianWidthOptions = {ambiguousAsWide: !ambiguousIsNarrow};

	for (const {segment: character} of segmenter.segment(string)) {
		const codePoint = character.codePointAt(0);

		// Ignore control characters
		if (codePoint <= 0x1F || (codePoint >= 0x7F && codePoint <= 0x9F)) {
			continue;
		}

		// Ignore zero-width characters
		if (
			(codePoint >= 0x20_0B && codePoint <= 0x20_0F) // Zero-width space, non-joiner, joiner, left-to-right mark, right-to-left mark
			|| codePoint === 0xFE_FF // Zero-width no-break space
		) {
			continue;
		}

		// Ignore combining characters
		if (
			(codePoint >= 0x3_00 && codePoint <= 0x3_6F) // Combining diacritical marks
			|| (codePoint >= 0x1A_B0 && codePoint <= 0x1A_FF) // Combining diacritical marks extended
			|| (codePoint >= 0x1D_C0 && codePoint <= 0x1D_FF) // Combining diacritical marks supplement
			|| (codePoint >= 0x20_D0 && codePoint <= 0x20_FF) // Combining diacritical marks for symbols
			|| (codePoint >= 0xFE_20 && codePoint <= 0xFE_2F) // Combining half marks
		) {
			continue;
		}

		// Ignore surrogate pairs
		if (codePoint >= 0xD8_00 && codePoint <= 0xDF_FF) {
			continue;
		}

		// Ignore variation selectors
		if (codePoint >= 0xFE_00 && codePoint <= 0xFE_0F) {
			continue;
		}

		// This covers some of the above cases, but we still keep them for performance reasons.
		if (defaultIgnorableCodePointRegex.test(character)) {
			continue;
		}

		// TODO: Use `/\p{RGI_Emoji}/v` when targeting Node.js 20.
		if (emojiRegex().test(character)) {
			width += 2;
			continue;
		}

		width += eastAsianWidth(codePoint, eastAsianWidthOptions);
	}

	return width;
}

function isUnicodeSupported() {
	const {env} = g$1;
	const {TERM, TERM_PROGRAM} = env;

	if (g$1.platform !== 'win32') {
		return TERM !== 'linux'; // Linux console (kernel)
	}

	return Boolean(env.WT_SESSION) // Windows Terminal
		|| Boolean(env.TERMINUS_SUBLIME) // Terminus (<0.2.27)
		|| env.ConEmuTask === '{cmd::Cmder}' // ConEmu and cmder
		|| TERM_PROGRAM === 'Terminus-Sublime'
		|| TERM_PROGRAM === 'vscode'
		|| TERM === 'xterm-256color'
		|| TERM === 'alacritty'
		|| TERM === 'rxvt-unicode'
		|| TERM === 'rxvt-unicode-256color'
		|| env.TERMINAL_EMULATOR === 'JetBrains-JediTerm';
}

const TYPE_COLOR_MAP = {
  info: "cyan",
  fail: "red",
  success: "green",
  ready: "green",
  start: "magenta"
};
const LEVEL_COLOR_MAP = {
  0: "red",
  1: "yellow"
};
const unicode = isUnicodeSupported();
const s = (c, fallback) => unicode ? c : fallback;
const TYPE_ICONS = {
  error: s("\u2716", "\xD7"),
  fatal: s("\u2716", "\xD7"),
  ready: s("\u2714", "\u221A"),
  warn: s("\u26A0", "\u203C"),
  info: s("\u2139", "i"),
  success: s("\u2714", "\u221A"),
  debug: s("\u2699", "D"),
  trace: s("\u2192", "\u2192"),
  fail: s("\u2716", "\xD7"),
  start: s("\u25D0", "o"),
  log: ""
};
function stringWidth(str) {
  const hasICU = typeof Intl === "object";
  if (!hasICU || !Intl.Segmenter) {
    return stripAnsi$1(str).length;
  }
  return stringWidth$1(str);
}
class FancyReporter extends BasicReporter {
  formatStack(stack, message, opts) {
    const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
    return `
${indent}` + parseStack(stack, message).map(
      (line) => "  " + line.replace(/^at +/, (m) => colors.gray(m)).replace(/\((.+)\)/, (_, m) => `(${colors.cyan(m)})`)
    ).join(`
${indent}`);
  }
  formatType(logObj, isBadge, opts) {
    const typeColor = TYPE_COLOR_MAP[logObj.type] || LEVEL_COLOR_MAP[logObj.level] || "gray";
    if (isBadge) {
      return getBgColor(typeColor)(
        colors.black(` ${logObj.type.toUpperCase()} `)
      );
    }
    const _type = typeof TYPE_ICONS[logObj.type] === "string" ? TYPE_ICONS[logObj.type] : logObj.icon || logObj.type;
    return _type ? getColor(typeColor)(_type) : "";
  }
  formatLogObj(logObj, opts) {
    const [message, ...additional] = this.formatArgs(logObj.args, opts).split(
      "\n"
    );
    if (logObj.type === "box") {
      return box(
        characterFormat(
          message + (additional.length > 0 ? "\n" + additional.join("\n") : "")
        ),
        {
          title: logObj.title ? characterFormat(logObj.title) : void 0,
          style: logObj.style
        }
      );
    }
    const date = this.formatDate(logObj.date, opts);
    const coloredDate = date && colors.gray(date);
    const isBadge = logObj.badge ?? logObj.level < 2;
    const type = this.formatType(logObj, isBadge, opts);
    const tag = logObj.tag ? colors.gray(logObj.tag) : "";
    let line;
    const left = this.filterAndJoin([type, characterFormat(message)]);
    const right = this.filterAndJoin(opts.columns ? [tag, coloredDate] : [tag]);
    const space = (opts.columns || 0) - stringWidth(left) - stringWidth(right) - 2;
    line = space > 0 && (opts.columns || 0) >= 80 ? left + " ".repeat(space) + right : (right ? `${colors.gray(`[${right}]`)} ` : "") + left;
    line += characterFormat(
      additional.length > 0 ? "\n" + additional.join("\n") : ""
    );
    if (logObj.type === "trace") {
      const _err = new Error("Trace: " + logObj.message);
      line += this.formatStack(_err.stack || "", _err.message);
    }
    return isBadge ? "\n" + line + "\n" : line;
  }
}
function characterFormat(str) {
  return str.replace(/`([^`]+)`/gm, (_, m) => colors.cyan(m)).replace(/\s+_([^_]+)_\s+/gm, (_, m) => ` ${colors.underline(m)} `);
}
function getColor(color = "white") {
  return colors[color] || colors.white;
}
function getBgColor(color = "bgWhite") {
  return colors[`bg${color[0].toUpperCase()}${color.slice(1)}`] || colors.bgWhite;
}

function createConsola(options = {}) {
  let level = _getDefaultLogLevel();
  if (process.env.CONSOLA_LEVEL) {
    level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
  }
  const consola2 = createConsola$1({
    level,
    defaults: { level },
    stdout: process.stdout,
    stderr: process.stderr,
    prompt: (...args) => import('./prompt-CdOf32mU.js').then((m) => m.prompt(...args)),
    reporters: options.reporters || [
      options.fancy ?? !(T$1 || R$1) ? new FancyReporter() : new BasicReporter()
    ],
    ...options
  });
  return consola2;
}
function _getDefaultLogLevel() {
  if (g) {
    return LogLevels.debug;
  }
  if (R$1) {
    return LogLevels.warn;
  }
  return LogLevels.info;
}
createConsola();

const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    webcrypto$1.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    webcrypto$1.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function nanoid(size = 21) {
  fillPool((size |= 0));
  let id = '';
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
function isBytes(a) {
    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
}
/** Asserts something is positive integer. */
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error('positive integer expected, got ' + n);
}
/** Asserts something is Uint8Array. */
function abytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
/** Asserts something is hash */
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
/** Asserts output is properly-sized byte array */
function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
/** Cast u8 / u16 / u32 to u32. */
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/** Zeroize a byte array. Warning: JS provides no guarantees. */
function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
    }
}
/** Create DataView of an array for easy byte-level manipulation. */
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/** The rotate right (circular right shift) operation for uint32 */
function rotr(word, shift) {
    return (word << (32 - shift)) | (word >>> shift);
}
/** The rotate left (circular left shift) operation for uint32 */
function rotl(word, shift) {
    return (word << shift) | ((word >>> (32 - shift)) >>> 0);
}
/** Is current platform little-endian? Most are. Big-Endian platform: IBM */
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44)();
/** The byte swap operation for uint32 */
function byteSwap(word) {
    return (((word << 24) & 0xff000000) |
        ((word << 8) & 0xff0000) |
        ((word >>> 8) & 0xff00) |
        ((word >>> 24) & 0xff));
}
/** In place byte swap for Uint32Array */
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE
    ? (u) => u
    : byteSwap32;
/**
 * There is no setImmediate in browser and setTimeout is slow.
 * Call of async fn will return Promise, which will be fullfiled only on
 * next scheduler queue processing step and this is exactly what we need.
 */
const nextTick = async () => { };
/** Returns control to thread each 'tick' ms to avoid blocking. */
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for (let i = 0; i < iters; i++) {
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
            continue;
        await nextTick();
        ts += diff;
    }
}
/**
 * Converts string to bytes using UTF8 encoding.
 * @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    abytes(data);
    return data;
}
/**
 * Helper for KDFs: consumes uint8array or string.
 * When string is passed, does utf8 decoding, using TextDecoder.
 */
function kdfInputToBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && {}.toString.call(opts) !== '[object Object]')
        throw new Error('options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
/** For runtime check if class implements interface */
class Hash {
}
/** Wraps hash function, creating an interface on top of it */
function createHasher(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}

/**
 * HMAC: RFC2104 message authentication code.
 * @module
 */
class HMAC extends Hash {
    constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        ahash(hash);
        const key = toBytes(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function')
            throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        clean(pad);
    }
    update(buf) {
        aexists(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        aexists(this);
        abytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 * @example
 * import { hmac } from '@noble/hashes/hmac';
 * import { sha256 } from '@noble/hashes/sha2';
 * const mac1 = hmac(sha256, 'key', 'message');
 */
const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

/**
 * PBKDF (RFC 2898). Can be used to create a key from password and salt.
 * @module
 */
// Common prologue and epilogue for sync/async functions
function pbkdf2Init(hash, _password, _salt, _opts) {
    ahash(hash);
    const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
    const { c, dkLen, asyncTick } = opts;
    anumber(c);
    anumber(dkLen);
    anumber(asyncTick);
    if (c < 1)
        throw new Error('iterations (c) should be >= 1');
    const password = kdfInputToBytes(_password);
    const salt = kdfInputToBytes(_salt);
    // DK = PBKDF2(PRF, Password, Salt, c, dkLen);
    const DK = new Uint8Array(dkLen);
    // U1 = PRF(Password, Salt + INT_32_BE(i))
    const PRF = hmac.create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW)
        prfW.destroy();
    clean(u);
    return DK;
}
/**
 * PBKDF2-HMAC: RFC 2898 key derivation function
 * @param hash - hash function that would be used e.g. sha256
 * @param password - password from which a derived key is generated
 * @param salt - cryptographic salt
 * @param opts - {c, dkLen} where c is work factor and dkLen is output message size
 * @example
 * const key = pbkdf2(sha256, 'password', 'salt', { dkLen: 32, c: Math.pow(2, 18) });
 */
function pbkdf2(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW; // Working copy
    const arr = new Uint8Array(4);
    const view = createView(arr);
    const u = new Uint8Array(PRF.outputLen);
    // DK = T1 + T2 + ⋯ + Tdklen/hlen
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
        // Ti = F(Password, Salt, c, i)
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
        // U1 = PRF(Password, Salt + INT_32_BE(i))
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        for (let ui = 1; ui < c; ui++) {
            // Uc = PRF(Password, Uc−1)
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++)
                Ti[i] ^= u[i];
        }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}

/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */
/** Polyfill for Safari 14. https://caniuse.com/mdn-javascript_builtins_dataview_setbiguint64 */
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
/** Choice: a ? b : c */
function Chi(a, b, c) {
    return (a & b) ^ (~a & c);
}
/** Majority function, true if any two inputs is true. */
function Maj(a, b, c) {
    return (a & b) ^ (a & c) ^ (b & c);
}
/**
 * Merkle-Damgard hash construction base class.
 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
 */
class HashMD extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
    }
    update(data) {
        aexists(this);
        data = toBytes(data);
        abytes(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = createView(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        aexists(this);
        aoutput(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        clean(this.buffer.subarray(pos));
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
}
/**
 * Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
 * Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
 */
/** Initial SHA256 state. Bits 0..32 of frac part of sqrt of primes 2..19 */
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
]);

/**
 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
 * [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
 * @module
 */
/**
 * Round constants:
 * First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
 */
// prettier-ignore
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
/** Reusable temporary buffer. "W" comes straight from spec. */
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD {
    constructor(outputLen = 32) {
        super(64, outputLen, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ (W15 >>> 3);
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = (sigma0 + Maj(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        clean(SHA256_W);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        clean(this.buffer);
    }
}
/**
 * SHA2-256 hash function from RFC 4634.
 *
 * It is the fastest JS hash, even faster than Blake3.
 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
 */
const sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

/**
 * RFC 7914 Scrypt KDF. Can be used to create a key from password and salt.
 * @module
 */
// The main Scrypt loop: uses Salsa extensively.
// Six versions of the function were tried, this is the fastest one.
// prettier-ignore
function XorAndSalsa(prev, pi, input, ii, out, oi) {
    // Based on https://cr.yp.to/salsa20.html
    // Xor blocks
    let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    // Save state to temporary variables (salsa)
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    // Main loop (salsa)
    for (let i = 0; i < 8; i += 2) {
        x04 ^= rotl(x00 + x12 | 0, 7);
        x08 ^= rotl(x04 + x00 | 0, 9);
        x12 ^= rotl(x08 + x04 | 0, 13);
        x00 ^= rotl(x12 + x08 | 0, 18);
        x09 ^= rotl(x05 + x01 | 0, 7);
        x13 ^= rotl(x09 + x05 | 0, 9);
        x01 ^= rotl(x13 + x09 | 0, 13);
        x05 ^= rotl(x01 + x13 | 0, 18);
        x14 ^= rotl(x10 + x06 | 0, 7);
        x02 ^= rotl(x14 + x10 | 0, 9);
        x06 ^= rotl(x02 + x14 | 0, 13);
        x10 ^= rotl(x06 + x02 | 0, 18);
        x03 ^= rotl(x15 + x11 | 0, 7);
        x07 ^= rotl(x03 + x15 | 0, 9);
        x11 ^= rotl(x07 + x03 | 0, 13);
        x15 ^= rotl(x11 + x07 | 0, 18);
        x01 ^= rotl(x00 + x03 | 0, 7);
        x02 ^= rotl(x01 + x00 | 0, 9);
        x03 ^= rotl(x02 + x01 | 0, 13);
        x00 ^= rotl(x03 + x02 | 0, 18);
        x06 ^= rotl(x05 + x04 | 0, 7);
        x07 ^= rotl(x06 + x05 | 0, 9);
        x04 ^= rotl(x07 + x06 | 0, 13);
        x05 ^= rotl(x04 + x07 | 0, 18);
        x11 ^= rotl(x10 + x09 | 0, 7);
        x08 ^= rotl(x11 + x10 | 0, 9);
        x09 ^= rotl(x08 + x11 | 0, 13);
        x10 ^= rotl(x09 + x08 | 0, 18);
        x12 ^= rotl(x15 + x14 | 0, 7);
        x13 ^= rotl(x12 + x15 | 0, 9);
        x14 ^= rotl(x13 + x12 | 0, 13);
        x15 ^= rotl(x14 + x13 | 0, 18);
    }
    // Write output (salsa)
    out[oi++] = (y00 + x00) | 0;
    out[oi++] = (y01 + x01) | 0;
    out[oi++] = (y02 + x02) | 0;
    out[oi++] = (y03 + x03) | 0;
    out[oi++] = (y04 + x04) | 0;
    out[oi++] = (y05 + x05) | 0;
    out[oi++] = (y06 + x06) | 0;
    out[oi++] = (y07 + x07) | 0;
    out[oi++] = (y08 + x08) | 0;
    out[oi++] = (y09 + x09) | 0;
    out[oi++] = (y10 + x10) | 0;
    out[oi++] = (y11 + x11) | 0;
    out[oi++] = (y12 + x12) | 0;
    out[oi++] = (y13 + x13) | 0;
    out[oi++] = (y14 + x14) | 0;
    out[oi++] = (y15 + x15) | 0;
}
function BlockMix(input, ii, out, oi, r) {
    // The block B is r 128-byte chunks (which is equivalent of 2r 64-byte chunks)
    let head = oi + 0;
    let tail = oi + 16 * r;
    for (let i = 0; i < 16; i++)
        out[tail + i] = input[ii + (2 * r - 1) * 16 + i]; // X ← B[2r−1]
    for (let i = 0; i < r; i++, head += 16, ii += 16) {
        // We write odd & even Yi at same time. Even: 0bXXXXX0 Odd:  0bXXXXX1
        XorAndSalsa(out, tail, input, ii, out, head); // head[i] = Salsa(blockIn[2*i] ^ tail[i-1])
        if (i > 0)
            tail += 16; // First iteration overwrites tmp value in tail
        XorAndSalsa(out, head, input, (ii += 16), out, tail); // tail[i] = Salsa(blockIn[2*i+1] ^ head[i])
    }
}
// Common prologue and epilogue for sync/async functions
function scryptInit(password, salt, _opts) {
    // Maxmem - 1GB+1KB by default
    const opts = checkOpts({
        dkLen: 32,
        asyncTick: 10,
        maxmem: 1024 ** 3 + 1024,
    }, _opts);
    const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
    anumber(N);
    anumber(r);
    anumber(p);
    anumber(dkLen);
    anumber(asyncTick);
    anumber(maxmem);
    if (onProgress !== undefined && typeof onProgress !== 'function')
        throw new Error('progressCb should be function');
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    // Max N is 2^32 (Integrify is 32-bit). Real limit is 2^22: JS engines Uint8Array limit is 4GB in 2024.
    // Spec check `N >= 2^(blockSize / 8)` is not done for compat with popular libs,
    // which used incorrect r: 1, p: 8. Also, the check seems to be a spec error:
    // https://www.rfc-editor.org/errata_search.php?rfc=7914
    const pow32 = Math.pow(2, 32);
    if (N <= 1 || (N & (N - 1)) !== 0 || N > pow32) {
        throw new Error('Scrypt: N must be larger than 1, a power of 2, and less than 2^32');
    }
    if (p < 0 || p > ((pow32 - 1) * 32) / blockSize) {
        throw new Error('Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)');
    }
    if (dkLen < 0 || dkLen > (pow32 - 1) * 32) {
        throw new Error('Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32');
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
        throw new Error('Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of ' + maxmem);
    }
    // [B0...Bp−1] ← PBKDF2HMAC-SHA256(Passphrase, Salt, 1, blockSize*ParallelizationFactor)
    // Since it has only one iteration there is no reason to use async variant
    const B = pbkdf2(sha256, password, salt, { c: 1, dkLen: blockSize * p });
    const B32 = u32(B);
    // Re-used between parallel iterations. Array(iterations) of B
    const V = u32(new Uint8Array(blockSize * N));
    const tmp = u32(new Uint8Array(blockSize));
    let blockMixCb = () => { };
    if (onProgress) {
        const totalBlockMix = 2 * N * p;
        // Invoke callback if progress changes from 10.01 to 10.02
        // Allows to draw smooth progress bar on up to 8K screen
        const callbackPer = Math.max(Math.floor(totalBlockMix / 10000), 1);
        let blockMixCnt = 0;
        blockMixCb = () => {
            blockMixCnt++;
            if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix))
                onProgress(blockMixCnt / totalBlockMix);
        };
    }
    return { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick };
}
function scryptOutput(password, dkLen, B, V, tmp) {
    const res = pbkdf2(sha256, password, B, { c: 1, dkLen });
    clean(B, V, tmp);
    return res;
}
/**
 * Scrypt KDF from RFC 7914. Async version.
 * @example
 * await scryptAsync('password', 'salt', { N: 2**18, r: 8, p: 1, dkLen: 32 });
 */
async function scryptAsync(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
    swap32IfBE(B32);
    for (let pi = 0; pi < p; pi++) {
        const Pi = blockSize32 * pi;
        for (let i = 0; i < blockSize32; i++)
            V[i] = B32[Pi + i]; // V[0] = B[i]
        let pos = 0;
        await asyncLoop(N - 1, asyncTick, () => {
            BlockMix(V, pos, V, (pos += blockSize32), r); // V[i] = BlockMix(V[i-1]);
            blockMixCb();
        });
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        blockMixCb();
        await asyncLoop(N, asyncTick, () => {
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for (let k = 0; k < blockSize32; k++)
                tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            blockMixCb();
        });
    }
    swap32IfBE(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
}

/// <reference types="./object-utils.d.ts" />
function isUndefined(obj) {
    return typeof obj === 'undefined' || obj === undefined;
}
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
function isNull(obj) {
    return obj === null;
}
function isDate(obj) {
    return obj instanceof Date;
}
function isBigInt(obj) {
    return typeof obj === 'bigint';
}
// Don't change the returnd type to `obj is Buffer` to not create a
// hard dependency to node.
function isBuffer(obj) {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(obj);
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function freeze(obj) {
    return Object.freeze(obj);
}
function asArray(arg) {
    if (isReadonlyArray(arg)) {
        return arg;
    }
    else {
        return [arg];
    }
}
function isReadonlyArray(arg) {
    return Array.isArray(arg);
}
function noop(obj) {
    return obj;
}

/// <reference types="./alter-table-node.d.ts" />
/**
 * @internal
 */
const AlterTableNode = freeze({
    is(node) {
        return node.kind === 'AlterTableNode';
    },
    create(table) {
        return freeze({
            kind: 'AlterTableNode',
            table,
        });
    },
    cloneWithTableProps(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumnAlteration(node, columnAlteration) {
        return freeze({
            ...node,
            columnAlterations: node.columnAlterations
                ? [...node.columnAlterations, columnAlteration]
                : [columnAlteration],
        });
    },
});

/// <reference types="./identifier-node.d.ts" />
/**
 * @internal
 */
const IdentifierNode = freeze({
    is(node) {
        return node.kind === 'IdentifierNode';
    },
    create(name) {
        return freeze({
            kind: 'IdentifierNode',
            name,
        });
    },
});

/// <reference types="./create-index-node.d.ts" />
/**
 * @internal
 */
const CreateIndexNode = freeze({
    is(node) {
        return node.kind === 'CreateIndexNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateIndexNode',
            name: IdentifierNode.create(name),
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumns(node, columns) {
        return freeze({
            ...node,
            columns: [...(node.columns || []), ...columns],
        });
    },
});

/// <reference types="./create-schema-node.d.ts" />
/**
 * @internal
 */
const CreateSchemaNode = freeze({
    is(node) {
        return node.kind === 'CreateSchemaNode';
    },
    create(schema, params) {
        return freeze({
            kind: 'CreateSchemaNode',
            schema: IdentifierNode.create(schema),
            ...params,
        });
    },
    cloneWith(createSchema, params) {
        return freeze({
            ...createSchema,
            ...params,
        });
    },
});

/// <reference types="./create-table-node.d.ts" />
const ON_COMMIT_ACTIONS = ['preserve rows', 'delete rows', 'drop'];
/**
 * @internal
 */
const CreateTableNode = freeze({
    is(node) {
        return node.kind === 'CreateTableNode';
    },
    create(table) {
        return freeze({
            kind: 'CreateTableNode',
            table,
            columns: freeze([]),
        });
    },
    cloneWithColumn(createTable, column) {
        return freeze({
            ...createTable,
            columns: freeze([...createTable.columns, column]),
        });
    },
    cloneWithConstraint(createTable, constraint) {
        return freeze({
            ...createTable,
            constraints: createTable.constraints
                ? freeze([...createTable.constraints, constraint])
                : freeze([constraint]),
        });
    },
    cloneWithFrontModifier(createTable, modifier) {
        return freeze({
            ...createTable,
            frontModifiers: createTable.frontModifiers
                ? freeze([...createTable.frontModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWithEndModifier(createTable, modifier) {
        return freeze({
            ...createTable,
            endModifiers: createTable.endModifiers
                ? freeze([...createTable.endModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWith(createTable, params) {
        return freeze({
            ...createTable,
            ...params,
        });
    },
});

/// <reference types="./schemable-identifier-node.d.ts" />
/**
 * @internal
 */
const SchemableIdentifierNode = freeze({
    is(node) {
        return node.kind === 'SchemableIdentifierNode';
    },
    create(identifier) {
        return freeze({
            kind: 'SchemableIdentifierNode',
            identifier: IdentifierNode.create(identifier),
        });
    },
    createWithSchema(schema, identifier) {
        return freeze({
            kind: 'SchemableIdentifierNode',
            schema: IdentifierNode.create(schema),
            identifier: IdentifierNode.create(identifier),
        });
    },
});

/// <reference types="./drop-index-node.d.ts" />
/**
 * @internal
 */
const DropIndexNode = freeze({
    is(node) {
        return node.kind === 'DropIndexNode';
    },
    create(name, params) {
        return freeze({
            kind: 'DropIndexNode',
            name: SchemableIdentifierNode.create(name),
            ...params,
        });
    },
    cloneWith(dropIndex, props) {
        return freeze({
            ...dropIndex,
            ...props,
        });
    },
});

/// <reference types="./drop-schema-node.d.ts" />
/**
 * @internal
 */
const DropSchemaNode = freeze({
    is(node) {
        return node.kind === 'DropSchemaNode';
    },
    create(schema, params) {
        return freeze({
            kind: 'DropSchemaNode',
            schema: IdentifierNode.create(schema),
            ...params,
        });
    },
    cloneWith(dropSchema, params) {
        return freeze({
            ...dropSchema,
            ...params,
        });
    },
});

/// <reference types="./drop-table-node.d.ts" />
/**
 * @internal
 */
const DropTableNode = freeze({
    is(node) {
        return node.kind === 'DropTableNode';
    },
    create(table, params) {
        return freeze({
            kind: 'DropTableNode',
            table,
            ...params,
        });
    },
    cloneWith(dropIndex, params) {
        return freeze({
            ...dropIndex,
            ...params,
        });
    },
});

/// <reference types="./alias-node.d.ts" />
/**
 * @internal
 */
const AliasNode = freeze({
    is(node) {
        return node.kind === 'AliasNode';
    },
    create(node, alias) {
        return freeze({
            kind: 'AliasNode',
            node,
            alias,
        });
    },
});

/// <reference types="./table-node.d.ts" />
/**
 * @internal
 */
const TableNode = freeze({
    is(node) {
        return node.kind === 'TableNode';
    },
    create(table) {
        return freeze({
            kind: 'TableNode',
            table: SchemableIdentifierNode.create(table),
        });
    },
    createWithSchema(schema, table) {
        return freeze({
            kind: 'TableNode',
            table: SchemableIdentifierNode.createWithSchema(schema, table),
        });
    },
});

/// <reference types="./operation-node-source.d.ts" />
function isOperationNodeSource(obj) {
    return isObject(obj) && isFunction(obj.toOperationNode);
}

/// <reference types="./expression.d.ts" />
function isExpression(obj) {
    return isObject(obj) && 'expressionType' in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
    return (isObject(obj) &&
        'expression' in obj &&
        isString(obj.alias) &&
        isOperationNodeSource(obj));
}

/// <reference types="./select-modifier-node.d.ts" />
/**
 * @internal
 */
const SelectModifierNode = freeze({
    is(node) {
        return node.kind === 'SelectModifierNode';
    },
    create(modifier, of) {
        return freeze({
            kind: 'SelectModifierNode',
            modifier,
            of,
        });
    },
    createWithExpression(modifier) {
        return freeze({
            kind: 'SelectModifierNode',
            rawModifier: modifier,
        });
    },
});

/// <reference types="./and-node.d.ts" />
/**
 * @internal
 */
const AndNode = freeze({
    is(node) {
        return node.kind === 'AndNode';
    },
    create(left, right) {
        return freeze({
            kind: 'AndNode',
            left,
            right,
        });
    },
});

/// <reference types="./or-node.d.ts" />
/**
 * @internal
 */
const OrNode = freeze({
    is(node) {
        return node.kind === 'OrNode';
    },
    create(left, right) {
        return freeze({
            kind: 'OrNode',
            left,
            right,
        });
    },
});

/// <reference types="./on-node.d.ts" />
/**
 * @internal
 */
const OnNode = freeze({
    is(node) {
        return node.kind === 'OnNode';
    },
    create(filter) {
        return freeze({
            kind: 'OnNode',
            on: filter,
        });
    },
    cloneWithOperation(onNode, operator, operation) {
        return freeze({
            ...onNode,
            on: operator === 'And'
                ? AndNode.create(onNode.on, operation)
                : OrNode.create(onNode.on, operation),
        });
    },
});

/// <reference types="./join-node.d.ts" />
/**
 * @internal
 */
const JoinNode = freeze({
    is(node) {
        return node.kind === 'JoinNode';
    },
    create(joinType, table) {
        return freeze({
            kind: 'JoinNode',
            joinType,
            table,
            on: undefined,
        });
    },
    createWithOn(joinType, table, on) {
        return freeze({
            kind: 'JoinNode',
            joinType,
            table,
            on: OnNode.create(on),
        });
    },
    cloneWithOn(joinNode, operation) {
        return freeze({
            ...joinNode,
            on: joinNode.on
                ? OnNode.cloneWithOperation(joinNode.on, 'And', operation)
                : OnNode.create(operation),
        });
    },
});

/// <reference types="./binary-operation-node.d.ts" />
/**
 * @internal
 */
const BinaryOperationNode = freeze({
    is(node) {
        return node.kind === 'BinaryOperationNode';
    },
    create(leftOperand, operator, rightOperand) {
        return freeze({
            kind: 'BinaryOperationNode',
            leftOperand,
            operator,
            rightOperand,
        });
    },
});

/// <reference types="./operator-node.d.ts" />
const COMPARISON_OPERATORS = [
    '=',
    '==',
    '!=',
    '<>',
    '>',
    '>=',
    '<',
    '<=',
    'in',
    'not in',
    'is',
    'is not',
    'like',
    'not like',
    'match',
    'ilike',
    'not ilike',
    '@>',
    '<@',
    '^@',
    '&&',
    '?',
    '?&',
    '?|',
    '!<',
    '!>',
    '<=>',
    '!~',
    '~',
    '~*',
    '!~*',
    '@@',
    '@@@',
    '!!',
    '<->',
    'regexp',
    'is distinct from',
    'is not distinct from',
];
const ARITHMETIC_OPERATORS = [
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '&',
    '|',
    '#',
    '<<',
    '>>',
];
const JSON_OPERATORS = ['->', '->>'];
const BINARY_OPERATORS = [
    ...COMPARISON_OPERATORS,
    ...ARITHMETIC_OPERATORS,
    '&&',
    '||',
];
const UNARY_FILTER_OPERATORS = ['exists', 'not exists'];
const UNARY_OPERATORS = ['not', '-', ...UNARY_FILTER_OPERATORS];
const OPERATORS = [
    ...BINARY_OPERATORS,
    ...JSON_OPERATORS,
    ...UNARY_OPERATORS,
    'between',
    'between symmetric',
];
/**
 * @internal
 */
const OperatorNode = freeze({
    is(node) {
        return node.kind === 'OperatorNode';
    },
    create(operator) {
        return freeze({
            kind: 'OperatorNode',
            operator,
        });
    },
});
function isJSONOperator(op) {
    return isString(op) && JSON_OPERATORS.includes(op);
}

/// <reference types="./column-node.d.ts" />
/**
 * @internal
 */
const ColumnNode = freeze({
    is(node) {
        return node.kind === 'ColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'ColumnNode',
            column: IdentifierNode.create(column),
        });
    },
});

/// <reference types="./select-all-node.d.ts" />
/**
 * @internal
 */
const SelectAllNode = freeze({
    is(node) {
        return node.kind === 'SelectAllNode';
    },
    create() {
        return freeze({
            kind: 'SelectAllNode',
        });
    },
});

/// <reference types="./reference-node.d.ts" />
/**
 * @internal
 */
const ReferenceNode = freeze({
    is(node) {
        return node.kind === 'ReferenceNode';
    },
    create(column, table) {
        return freeze({
            kind: 'ReferenceNode',
            table,
            column,
        });
    },
    createSelectAll(table) {
        return freeze({
            kind: 'ReferenceNode',
            table,
            column: SelectAllNode.create(),
        });
    },
});

/// <reference types="./dynamic-reference-builder.d.ts" />
class DynamicReferenceBuilder {
    #dynamicReference;
    get dynamicReference() {
        return this.#dynamicReference;
    }
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */
    get refType() {
        return undefined;
    }
    constructor(reference) {
        this.#dynamicReference = reference;
    }
    toOperationNode() {
        return parseSimpleReferenceExpression(this.#dynamicReference);
    }
}
function isDynamicReferenceBuilder(obj) {
    return (isObject(obj) &&
        isOperationNodeSource(obj) &&
        isString(obj.dynamicReference));
}

/// <reference types="./order-by-item-node.d.ts" />
/**
 * @internal
 */
const OrderByItemNode = freeze({
    is(node) {
        return node.kind === 'OrderByItemNode';
    },
    create(orderBy, direction) {
        return freeze({
            kind: 'OrderByItemNode',
            orderBy,
            direction,
        });
    },
});

/// <reference types="./raw-node.d.ts" />
/**
 * @internal
 */
const RawNode = freeze({
    is(node) {
        return node.kind === 'RawNode';
    },
    create(sqlFragments, parameters) {
        return freeze({
            kind: 'RawNode',
            sqlFragments: freeze(sqlFragments),
            parameters: freeze(parameters),
        });
    },
    createWithSql(sql) {
        return RawNode.create([sql], []);
    },
    createWithChild(child) {
        return RawNode.create(['', ''], [child]);
    },
    createWithChildren(children) {
        return RawNode.create(new Array(children.length + 1).fill(''), children);
    },
});

/// <reference types="./order-by-parser.d.ts" />
function isOrderByDirection(thing) {
    return thing === 'asc' || thing === 'desc';
}
function parseOrderBy(args) {
    if (args.length === 2) {
        return [parseOrderByItem(args[0], args[1])];
    }
    if (args.length === 1) {
        const [orderBy] = args;
        if (Array.isArray(orderBy)) {
            return orderBy.map((item) => parseOrderByItem(item));
        }
        return [parseOrderByItem(orderBy)];
    }
    throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(ref, direction) {
    const parsedRef = parseOrderByExpression(ref);
    if (OrderByItemNode.is(parsedRef)) {
        if (direction) {
            throw new Error('Cannot specify direction twice!');
        }
        return parsedRef;
    }
    return OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
    if (isExpressionOrFactory(expr)) {
        return parseExpression(expr);
    }
    if (isDynamicReferenceBuilder(expr)) {
        return expr.toOperationNode();
    }
    const [ref, direction] = expr.split(' ');
    if (direction) {
        if (!isOrderByDirection(direction)) {
            throw new Error(`Invalid order by direction: ${direction}`);
        }
        return OrderByItemNode.create(parseStringReference(ref), parseOrderByDirectionExpression(direction));
    }
    return parseStringReference(expr);
}
function parseOrderByDirectionExpression(expr) {
    if (!expr) {
        return undefined;
    }
    if (expr === 'asc' || expr === 'desc') {
        return RawNode.createWithSql(expr);
    }
    return expr.toOperationNode();
}

/// <reference types="./json-reference-node.d.ts" />
/**
 * @internal
 */
const JSONReferenceNode = freeze({
    is(node) {
        return node.kind === 'JSONReferenceNode';
    },
    create(reference, traversal) {
        return freeze({
            kind: 'JSONReferenceNode',
            reference,
            traversal,
        });
    },
    cloneWithTraversal(node, traversal) {
        return freeze({
            ...node,
            traversal,
        });
    },
});

/// <reference types="./json-operator-chain-node.d.ts" />
/**
 * @internal
 */
const JSONOperatorChainNode = freeze({
    is(node) {
        return node.kind === 'JSONOperatorChainNode';
    },
    create(operator) {
        return freeze({
            kind: 'JSONOperatorChainNode',
            operator,
            values: freeze([]),
        });
    },
    cloneWithValue(node, value) {
        return freeze({
            ...node,
            values: freeze([...node.values, value]),
        });
    },
});

/// <reference types="./json-path-node.d.ts" />
/**
 * @internal
 */
const JSONPathNode = freeze({
    is(node) {
        return node.kind === 'JSONPathNode';
    },
    create(inOperator) {
        return freeze({
            kind: 'JSONPathNode',
            inOperator,
            pathLegs: freeze([]),
        });
    },
    cloneWithLeg(jsonPathNode, pathLeg) {
        return freeze({
            ...jsonPathNode,
            pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg]),
        });
    },
});

/// <reference types="./reference-parser.d.ts" />
function parseSimpleReferenceExpression(exp) {
    if (isString(exp)) {
        return parseStringReference(exp);
    }
    return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
        return arg.map((it) => parseReferenceExpression(it));
    }
    else {
        return [parseReferenceExpression(arg)];
    }
}
function parseReferenceExpression(exp) {
    if (isExpressionOrFactory(exp)) {
        return parseExpression(exp);
    }
    return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
    const referenceNode = parseStringReference(ref);
    if (isJSONOperator(op)) {
        return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
    }
    const opWithoutLastChar = op.slice(0, -1);
    if (isJSONOperator(opWithoutLastChar)) {
        return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
    }
    throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
    const COLUMN_SEPARATOR = '.';
    if (!ref.includes(COLUMN_SEPARATOR)) {
        return ReferenceNode.create(ColumnNode.create(ref));
    }
    const parts = ref.split(COLUMN_SEPARATOR).map(trim$2);
    if (parts.length === 3) {
        return parseStringReferenceWithTableAndSchema(parts);
    }
    if (parts.length === 2) {
        return parseStringReferenceWithTable(parts);
    }
    throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
    const ALIAS_SEPARATOR = ' as ';
    if (ref.includes(ALIAS_SEPARATOR)) {
        const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim$2);
        return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
    }
    else {
        return parseStringReference(ref);
    }
}
function parseColumnName(column) {
    return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
    const ORDER_SEPARATOR = ' ';
    if (column.includes(ORDER_SEPARATOR)) {
        const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim$2);
        if (!isOrderByDirection(order)) {
            throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
        }
        return parseOrderBy([columnName, order])[0];
    }
    else {
        return parseColumnName(column);
    }
}
function parseStringReferenceWithTableAndSchema(parts) {
    const [schema, table, column] = parts;
    return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
    const [table, column] = parts;
    return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim$2(str) {
    return str.trim();
}

/// <reference types="./primitive-value-list-node.d.ts" />
/**
 * @internal
 */
const PrimitiveValueListNode = freeze({
    is(node) {
        return node.kind === 'PrimitiveValueListNode';
    },
    create(values) {
        return freeze({
            kind: 'PrimitiveValueListNode',
            values: freeze([...values]),
        });
    },
});

/// <reference types="./value-list-node.d.ts" />
/**
 * @internal
 */
const ValueListNode = freeze({
    is(node) {
        return node.kind === 'ValueListNode';
    },
    create(values) {
        return freeze({
            kind: 'ValueListNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./value-node.d.ts" />
/**
 * @internal
 */
const ValueNode = freeze({
    is(node) {
        return node.kind === 'ValueNode';
    },
    create(value) {
        return freeze({
            kind: 'ValueNode',
            value,
        });
    },
    createImmediate(value) {
        return freeze({
            kind: 'ValueNode',
            value,
            immediate: true,
        });
    },
});

/// <reference types="./value-parser.d.ts" />
function parseValueExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
        return parseValueExpressionList(arg);
    }
    return parseValueExpression(arg);
}
function parseValueExpression(exp) {
    if (isExpressionOrFactory(exp)) {
        return parseExpression(exp);
    }
    return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
    return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
    if (!isSafeImmediateValue(value)) {
        throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
    }
    return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
    if (arg.some(isExpressionOrFactory)) {
        return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(arg);
}

/// <reference types="./parens-node.d.ts" />
/**
 * @internal
 */
const ParensNode = freeze({
    is(node) {
        return node.kind === 'ParensNode';
    },
    create(node) {
        return freeze({
            kind: 'ParensNode',
            node,
        });
    },
});

/// <reference types="./binary-operation-parser.d.ts" />
function parseValueBinaryOperationOrExpression(args) {
    if (args.length === 3) {
        return parseValueBinaryOperation(args[0], args[1], args[2]);
    }
    else if (args.length === 1) {
        return parseValueExpression(args[0]);
    }
    throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
    if (isIsOperator(operator) && needsIsOperator(right)) {
        return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
    }
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
    return parseFilterList(Object.entries(obj)
        .filter(([, v]) => !isUndefined(v))
        .map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? 'is' : '=', v)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
    const combine = combinator === 'and' ? AndNode.create : OrNode.create;
    if (list.length === 0) {
        return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create('='), ValueNode.createImmediate(combinator === 'and' ? 1 : 0));
    }
    let node = toOperationNode(list[0]);
    for (let i = 1; i < list.length; ++i) {
        node = combine(node, toOperationNode(list[i]));
    }
    if (list.length > 1 && withParens) {
        return ParensNode.create(node);
    }
    return node;
}
function isIsOperator(operator) {
    return operator === 'is' || operator === 'is not';
}
function needsIsOperator(value) {
    return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
    if (isString(operator) && OPERATORS.includes(operator)) {
        return OperatorNode.create(operator);
    }
    if (isOperationNodeSource(operator)) {
        return operator.toOperationNode();
    }
    throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
    return isOperationNodeSource(nodeOrSource)
        ? nodeOrSource.toOperationNode()
        : nodeOrSource;
}

/// <reference types="./order-by-node.d.ts" />
/**
 * @internal
 */
const OrderByNode = freeze({
    is(node) {
        return node.kind === 'OrderByNode';
    },
    create(items) {
        return freeze({
            kind: 'OrderByNode',
            items: freeze([...items]),
        });
    },
    cloneWithItems(orderBy, items) {
        return freeze({
            ...orderBy,
            items: freeze([...orderBy.items, ...items]),
        });
    },
});

/// <reference types="./partition-by-node.d.ts" />
/**
 * @internal
 */
const PartitionByNode = freeze({
    is(node) {
        return node.kind === 'PartitionByNode';
    },
    create(items) {
        return freeze({
            kind: 'PartitionByNode',
            items: freeze(items),
        });
    },
    cloneWithItems(partitionBy, items) {
        return freeze({
            ...partitionBy,
            items: freeze([...partitionBy.items, ...items]),
        });
    },
});

/// <reference types="./over-node.d.ts" />
/**
 * @internal
 */
const OverNode = freeze({
    is(node) {
        return node.kind === 'OverNode';
    },
    create() {
        return freeze({
            kind: 'OverNode',
        });
    },
    cloneWithOrderByItems(overNode, items) {
        return freeze({
            ...overNode,
            orderBy: overNode.orderBy
                ? OrderByNode.cloneWithItems(overNode.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithPartitionByItems(overNode, items) {
        return freeze({
            ...overNode,
            partitionBy: overNode.partitionBy
                ? PartitionByNode.cloneWithItems(overNode.partitionBy, items)
                : PartitionByNode.create(items),
        });
    },
});

/// <reference types="./from-node.d.ts" />
/**
 * @internal
 */
const FromNode = freeze({
    is(node) {
        return node.kind === 'FromNode';
    },
    create(froms) {
        return freeze({
            kind: 'FromNode',
            froms: freeze(froms),
        });
    },
    cloneWithFroms(from, froms) {
        return freeze({
            ...from,
            froms: freeze([...from.froms, ...froms]),
        });
    },
});

/// <reference types="./group-by-node.d.ts" />
/**
 * @internal
 */
const GroupByNode = freeze({
    is(node) {
        return node.kind === 'GroupByNode';
    },
    create(items) {
        return freeze({
            kind: 'GroupByNode',
            items: freeze(items),
        });
    },
    cloneWithItems(groupBy, items) {
        return freeze({
            ...groupBy,
            items: freeze([...groupBy.items, ...items]),
        });
    },
});

/// <reference types="./having-node.d.ts" />
/**
 * @internal
 */
const HavingNode = freeze({
    is(node) {
        return node.kind === 'HavingNode';
    },
    create(filter) {
        return freeze({
            kind: 'HavingNode',
            having: filter,
        });
    },
    cloneWithOperation(havingNode, operator, operation) {
        return freeze({
            ...havingNode,
            having: operator === 'And'
                ? AndNode.create(havingNode.having, operation)
                : OrNode.create(havingNode.having, operation),
        });
    },
});

/// <reference types="./select-query-node.d.ts" />
/**
 * @internal
 */
const SelectQueryNode = freeze({
    is(node) {
        return node.kind === 'SelectQueryNode';
    },
    create(withNode) {
        return freeze({
            kind: 'SelectQueryNode',
            ...(withNode && { with: withNode }),
        });
    },
    createFrom(fromItems, withNode) {
        return freeze({
            kind: 'SelectQueryNode',
            from: FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithSelections(select, selections) {
        return freeze({
            ...select,
            selections: select.selections
                ? freeze([...select.selections, ...selections])
                : freeze(selections),
        });
    },
    cloneWithDistinctOn(select, expressions) {
        return freeze({
            ...select,
            distinctOn: select.distinctOn
                ? freeze([...select.distinctOn, ...expressions])
                : freeze(expressions),
        });
    },
    cloneWithFrontModifier(select, modifier) {
        return freeze({
            ...select,
            frontModifiers: select.frontModifiers
                ? freeze([...select.frontModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWithOrderByItems(selectNode, items) {
        return freeze({
            ...selectNode,
            orderBy: selectNode.orderBy
                ? OrderByNode.cloneWithItems(selectNode.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithGroupByItems(selectNode, items) {
        return freeze({
            ...selectNode,
            groupBy: selectNode.groupBy
                ? GroupByNode.cloneWithItems(selectNode.groupBy, items)
                : GroupByNode.create(items),
        });
    },
    cloneWithLimit(selectNode, limit) {
        return freeze({
            ...selectNode,
            limit,
        });
    },
    cloneWithOffset(selectNode, offset) {
        return freeze({
            ...selectNode,
            offset,
        });
    },
    cloneWithFetch(selectNode, fetch) {
        return freeze({
            ...selectNode,
            fetch,
        });
    },
    cloneWithHaving(selectNode, operation) {
        return freeze({
            ...selectNode,
            having: selectNode.having
                ? HavingNode.cloneWithOperation(selectNode.having, 'And', operation)
                : HavingNode.create(operation),
        });
    },
    cloneWithSetOperations(selectNode, setOperations) {
        return freeze({
            ...selectNode,
            setOperations: selectNode.setOperations
                ? freeze([...selectNode.setOperations, ...setOperations])
                : freeze([...setOperations]),
        });
    },
    cloneWithoutSelections(select) {
        return freeze({
            ...select,
            selections: [],
        });
    },
    cloneWithoutLimit(select) {
        return freeze({
            ...select,
            limit: undefined,
        });
    },
    cloneWithoutOffset(select) {
        return freeze({
            ...select,
            offset: undefined,
        });
    },
    cloneWithoutOrderBy(select) {
        return freeze({
            ...select,
            orderBy: undefined,
        });
    },
    cloneWithoutGroupBy(select) {
        return freeze({
            ...select,
            groupBy: undefined,
        });
    },
});

/// <reference types="./prevent-await.d.ts" />
function preventAwait(clazz, message) {
    Object.defineProperties(clazz.prototype, {
        then: {
            enumerable: false,
            value: () => {
                throw new Error(message);
            },
        },
    });
}

/// <reference types="./join-builder.d.ts" />
class JoinBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    on(...args) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs, op, rhs) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    /**
     * Adds `on true`.
     */
    onTrue() {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, RawNode.createWithSql('true')),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.joinNode;
    }
}
preventAwait(JoinBuilder, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");

/// <reference types="./partition-by-item-node.d.ts" />
/**
 * @internal
 */
const PartitionByItemNode = freeze({
    is(node) {
        return node.kind === 'PartitionByItemNode';
    },
    create(partitionBy) {
        return freeze({
            kind: 'PartitionByItemNode',
            partitionBy,
        });
    },
});

/// <reference types="./partition-by-parser.d.ts" />
function parsePartitionBy(partitionBy) {
    return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}

/// <reference types="./over-builder.d.ts" />
class OverBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds an order by clause item inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
     * from "person"
     * ```
     */
    orderBy(orderBy, direction) {
        return new OverBuilder({
            overNode: OverNode.cloneWithOrderByItems(this.#props.overNode, parseOrderBy([orderBy, direction])),
        });
    }
    partitionBy(partitionBy) {
        return new OverBuilder({
            overNode: OverNode.cloneWithPartitionByItems(this.#props.overNode, parsePartitionBy(partitionBy)),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.overNode;
    }
}
preventAwait(OverBuilder, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");

/// <reference types="./selection-node.d.ts" />
/**
 * @internal
 */
const SelectionNode = freeze({
    is(node) {
        return node.kind === 'SelectionNode';
    },
    create(selection) {
        return freeze({
            kind: 'SelectionNode',
            selection: selection,
        });
    },
    createSelectAll() {
        return freeze({
            kind: 'SelectionNode',
            selection: SelectAllNode.create(),
        });
    },
    createSelectAllFromTable(table) {
        return freeze({
            kind: 'SelectionNode',
            selection: ReferenceNode.createSelectAll(table),
        });
    },
});

/// <reference types="./select-parser.d.ts" />
function parseSelectArg(selection) {
    if (isFunction(selection)) {
        return parseSelectArg(selection(expressionBuilder()));
    }
    else if (isReadonlyArray(selection)) {
        return selection.map((it) => parseSelectExpression(it));
    }
    else {
        return [parseSelectExpression(selection)];
    }
}
function parseSelectExpression(selection) {
    if (isString(selection)) {
        return SelectionNode.create(parseAliasedStringReference(selection));
    }
    else if (isDynamicReferenceBuilder(selection)) {
        return SelectionNode.create(selection.toOperationNode());
    }
    else {
        return SelectionNode.create(parseAliasedExpression(selection));
    }
}
function parseSelectAll(table) {
    if (!table) {
        return [SelectionNode.createSelectAll()];
    }
    else if (Array.isArray(table)) {
        return table.map(parseSelectAllArg);
    }
    else {
        return [parseSelectAllArg(table)];
    }
}
function parseSelectAllArg(table) {
    if (isString(table)) {
        return SelectionNode.createSelectAllFromTable(parseTable(table));
    }
    throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}

/// <reference types="./values-node.d.ts" />
/**
 * @internal
 */
const ValuesNode = freeze({
    is(node) {
        return node.kind === 'ValuesNode';
    },
    create(values) {
        return freeze({
            kind: 'ValuesNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./default-insert-value-node.d.ts" />
/**
 * @internal
 */
const DefaultInsertValueNode = freeze({
    is(node) {
        return node.kind === 'DefaultInsertValueNode';
    },
    create() {
        return freeze({
            kind: 'DefaultInsertValueNode',
        });
    },
});

/// <reference types="./insert-values-parser.d.ts" />
function parseInsertExpression(arg) {
    const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
    const list = isReadonlyArray(objectOrList)
        ? objectOrList
        : freeze([objectOrList]);
    return parseInsertColumnsAndValues(list);
}
function parseInsertColumnsAndValues(rows) {
    const columns = parseColumnNamesAndIndexes(rows);
    return [
        freeze([...columns.keys()].map(ColumnNode.create)),
        ValuesNode.create(rows.map((row) => parseRowValues(row, columns))),
    ];
}
function parseColumnNamesAndIndexes(rows) {
    const columns = new Map();
    for (const row of rows) {
        const cols = Object.keys(row);
        for (const col of cols) {
            if (!columns.has(col) && row[col] !== undefined) {
                columns.set(col, columns.size);
            }
        }
    }
    return columns;
}
function parseRowValues(row, columns) {
    const rowColumns = Object.keys(row);
    const rowValues = Array.from({
        length: columns.size,
    });
    let hasUndefinedOrComplexColumns = false;
    let indexedRowColumns = rowColumns.length;
    for (const col of rowColumns) {
        const columnIdx = columns.get(col);
        if (isUndefined(columnIdx)) {
            indexedRowColumns--;
            continue;
        }
        const value = row[col];
        if (isUndefined(value) || isExpressionOrFactory(value)) {
            hasUndefinedOrComplexColumns = true;
        }
        rowValues[columnIdx] = value;
    }
    const hasMissingColumns = indexedRowColumns < columns.size;
    if (hasMissingColumns || hasUndefinedOrComplexColumns) {
        const defaultValue = DefaultInsertValueNode.create();
        return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(rowValues);
}

/// <reference types="./insert-query-node.d.ts" />
/**
 * @internal
 */
const InsertQueryNode = freeze({
    is(node) {
        return node.kind === 'InsertQueryNode';
    },
    create(into, withNode, replace) {
        return freeze({
            kind: 'InsertQueryNode',
            into,
            ...(withNode && { with: withNode }),
            replace,
        });
    },
    createWithoutInto() {
        return freeze({
            kind: 'InsertQueryNode',
        });
    },
    cloneWith(insertQuery, props) {
        return freeze({
            ...insertQuery,
            ...props,
        });
    },
});

/// <reference types="./update-query-node.d.ts" />
/**
 * @internal
 */
const UpdateQueryNode = freeze({
    is(node) {
        return node.kind === 'UpdateQueryNode';
    },
    create(table, withNode) {
        return freeze({
            kind: 'UpdateQueryNode',
            table,
            ...(withNode && { with: withNode }),
        });
    },
    createWithoutTable() {
        return freeze({
            kind: 'UpdateQueryNode',
        });
    },
    cloneWithFromItems(updateQuery, fromItems) {
        return freeze({
            ...updateQuery,
            from: updateQuery.from
                ? FromNode.cloneWithFroms(updateQuery.from, fromItems)
                : FromNode.create(fromItems),
        });
    },
    cloneWithUpdates(updateQuery, updates) {
        return freeze({
            ...updateQuery,
            updates: updateQuery.updates
                ? freeze([...updateQuery.updates, ...updates])
                : updates,
        });
    },
    cloneWithLimit(updateQuery, limit) {
        return freeze({
            ...updateQuery,
            limit,
        });
    },
});

/// <reference types="./using-node.d.ts" />
/**
 * @internal
 */
const UsingNode = freeze({
    is(node) {
        return node.kind === 'UsingNode';
    },
    create(tables) {
        return freeze({
            kind: 'UsingNode',
            tables: freeze(tables),
        });
    },
    cloneWithTables(using, tables) {
        return freeze({
            ...using,
            tables: freeze([...using.tables, ...tables]),
        });
    },
});

/// <reference types="./delete-query-node.d.ts" />
/**
 * @internal
 */
const DeleteQueryNode = freeze({
    is(node) {
        return node.kind === 'DeleteQueryNode';
    },
    create(fromItems, withNode) {
        return freeze({
            kind: 'DeleteQueryNode',
            from: FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithOrderByItems(deleteNode, items) {
        return freeze({
            ...deleteNode,
            orderBy: deleteNode.orderBy
                ? OrderByNode.cloneWithItems(deleteNode.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithoutOrderBy(deleteNode) {
        return freeze({
            ...deleteNode,
            orderBy: undefined,
        });
    },
    cloneWithLimit(deleteNode, limit) {
        return freeze({
            ...deleteNode,
            limit,
        });
    },
    cloneWithoutLimit(deleteNode) {
        return freeze({
            ...deleteNode,
            limit: undefined,
        });
    },
    cloneWithUsing(deleteNode, tables) {
        return freeze({
            ...deleteNode,
            using: deleteNode.using !== undefined
                ? UsingNode.cloneWithTables(deleteNode.using, tables)
                : UsingNode.create(tables),
        });
    },
});

/// <reference types="./where-node.d.ts" />
/**
 * @internal
 */
const WhereNode = freeze({
    is(node) {
        return node.kind === 'WhereNode';
    },
    create(filter) {
        return freeze({
            kind: 'WhereNode',
            where: filter,
        });
    },
    cloneWithOperation(whereNode, operator, operation) {
        return freeze({
            ...whereNode,
            where: operator === 'And'
                ? AndNode.create(whereNode.where, operation)
                : OrNode.create(whereNode.where, operation),
        });
    },
});

/// <reference types="./returning-node.d.ts" />
/**
 * @internal
 */
const ReturningNode = freeze({
    is(node) {
        return node.kind === 'ReturningNode';
    },
    create(selections) {
        return freeze({
            kind: 'ReturningNode',
            selections: freeze(selections),
        });
    },
    cloneWithSelections(returning, selections) {
        return freeze({
            ...returning,
            selections: returning.selections
                ? freeze([...returning.selections, ...selections])
                : freeze(selections),
        });
    },
});

/// <reference types="./explain-node.d.ts" />
/**
 * @internal
 */
const ExplainNode = freeze({
    is(node) {
        return node.kind === 'ExplainNode';
    },
    create(format, options) {
        return freeze({
            kind: 'ExplainNode',
            format,
            options,
        });
    },
});

/// <reference types="./when-node.d.ts" />
/**
 * @internal
 */
const WhenNode = freeze({
    is(node) {
        return node.kind === 'WhenNode';
    },
    create(condition) {
        return freeze({
            kind: 'WhenNode',
            condition,
        });
    },
    cloneWithResult(whenNode, result) {
        return freeze({
            ...whenNode,
            result,
        });
    },
});

/// <reference types="./merge-query-node.d.ts" />
/**
 * @internal
 */
const MergeQueryNode = freeze({
    is(node) {
        return node.kind === 'MergeQueryNode';
    },
    create(into, withNode) {
        return freeze({
            kind: 'MergeQueryNode',
            into,
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithUsing(mergeNode, using) {
        return freeze({
            ...mergeNode,
            using,
        });
    },
    cloneWithWhen(mergeNode, when) {
        return freeze({
            ...mergeNode,
            whens: mergeNode.whens
                ? freeze([...mergeNode.whens, when])
                : freeze([when]),
        });
    },
    cloneWithThen(mergeNode, then) {
        return freeze({
            ...mergeNode,
            whens: mergeNode.whens
                ? freeze([
                    ...mergeNode.whens.slice(0, -1),
                    WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then),
                ])
                : undefined,
        });
    },
});

/// <reference types="./output-node.d.ts" />
/**
 * @internal
 */
const OutputNode = freeze({
    is(node) {
        return node.kind === 'OutputNode';
    },
    create(selections) {
        return freeze({
            kind: 'OutputNode',
            selections: freeze(selections),
        });
    },
    cloneWithSelections(output, selections) {
        return freeze({
            ...output,
            selections: output.selections
                ? freeze([...output.selections, ...selections])
                : freeze(selections),
        });
    },
});

/// <reference types="./query-node.d.ts" />
/**
 * @internal
 */
const QueryNode = freeze({
    is(node) {
        return (SelectQueryNode.is(node) ||
            InsertQueryNode.is(node) ||
            UpdateQueryNode.is(node) ||
            DeleteQueryNode.is(node) ||
            MergeQueryNode.is(node));
    },
    cloneWithEndModifier(node, modifier) {
        return freeze({
            ...node,
            endModifiers: node.endModifiers
                ? freeze([...node.endModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWithWhere(node, operation) {
        return freeze({
            ...node,
            where: node.where
                ? WhereNode.cloneWithOperation(node.where, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithJoin(node, join) {
        return freeze({
            ...node,
            joins: node.joins ? freeze([...node.joins, join]) : freeze([join]),
        });
    },
    cloneWithReturning(node, selections) {
        return freeze({
            ...node,
            returning: node.returning
                ? ReturningNode.cloneWithSelections(node.returning, selections)
                : ReturningNode.create(selections),
        });
    },
    cloneWithoutReturning(node) {
        return freeze({
            ...node,
            returning: undefined,
        });
    },
    cloneWithoutWhere(node) {
        return freeze({
            ...node,
            where: undefined,
        });
    },
    cloneWithExplain(node, format, options) {
        return freeze({
            ...node,
            explain: ExplainNode.create(format, options?.toOperationNode()),
        });
    },
    cloneWithTop(node, top) {
        return freeze({
            ...node,
            top,
        });
    },
    cloneWithOutput(node, selections) {
        return freeze({
            ...node,
            output: node.output
                ? OutputNode.cloneWithSelections(node.output, selections)
                : OutputNode.create(selections),
        });
    },
});

/// <reference types="./column-update-node.d.ts" />
/**
 * @internal
 */
const ColumnUpdateNode = freeze({
    is(node) {
        return node.kind === 'ColumnUpdateNode';
    },
    create(column, value) {
        return freeze({
            kind: 'ColumnUpdateNode',
            column,
            value,
        });
    },
});

/// <reference types="./update-set-parser.d.ts" />
function parseUpdate(...args) {
    if (args.length === 2) {
        return [
            ColumnUpdateNode.create(parseReferenceExpression(args[0]), parseValueExpression(args[1])),
        ];
    }
    return parseUpdateObjectExpression(args[0]);
}
function parseUpdateObjectExpression(update) {
    const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
    return Object.entries(updateObj)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
        return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
    });
}

/// <reference types="./on-duplicate-key-node.d.ts" />
/**
 * @internal
 */
const OnDuplicateKeyNode = freeze({
    is(node) {
        return node.kind === 'OnDuplicateKeyNode';
    },
    create(updates) {
        return freeze({
            kind: 'OnDuplicateKeyNode',
            updates,
        });
    },
});

/// <reference types="./insert-result.d.ts" />
/**
 * The result of an insert query.
 *
 * If the table has an auto incrementing primary key {@link insertId} will hold
 * the generated id on dialects that support it. For example PostgreSQL doesn't
 * return the id by default and {@link insertId} is undefined. On PostgreSQL you
 * need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
 * to get out the inserted id.
 *
 * {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
 * On MySQL, updated rows are counted twice when using `on duplicate key update`.
 *
 * ### Examples
 *
 * ```ts
 * import type { NewPerson } from 'type-editor' // imaginary module
 *
 * async function insertPerson(person: NewPerson) {
 *   const result = await db
 *     .insertInto('person')
 *     .values(person)
 *     .executeTakeFirstOrThrow()
 *
 *   console.log(result.insertId) // relevant on MySQL
 *   console.log(result.numInsertedOrUpdatedRows) // always relevant
 * }
 * ```
 */
class InsertResult {
    /**
     * The auto incrementing primary key of the inserted row.
     *
     * This property can be undefined when the query contains an `on conflict`
     * clause that makes the query succeed even when nothing gets inserted.
     *
     * This property is always undefined on dialects like PostgreSQL that
     * don't return the inserted id by default. On those dialects you need
     * to use the {@link ReturningInterface.returning | returning} method.
     */
    insertId;
    /**
     * Affected rows count.
     */
    numInsertedOrUpdatedRows;
    constructor(insertId, numInsertedOrUpdatedRows) {
        this.insertId = insertId;
        this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
    }
}

/// <reference types="./no-result-error.d.ts" />
class NoResultError extends Error {
    /**
     * The operation node tree of the query that was executed.
     */
    node;
    constructor(node) {
        super('no result');
        this.node = node;
    }
}
function isNoResultErrorConstructor(fn) {
    return Object.prototype.hasOwnProperty.call(fn, 'prototype');
}

/// <reference types="./on-conflict-node.d.ts" />
/**
 * @internal
 */
const OnConflictNode = freeze({
    is(node) {
        return node.kind === 'OnConflictNode';
    },
    create() {
        return freeze({
            kind: 'OnConflictNode',
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithIndexWhere(node, operation) {
        return freeze({
            ...node,
            indexWhere: node.indexWhere
                ? WhereNode.cloneWithOperation(node.indexWhere, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithIndexOrWhere(node, operation) {
        return freeze({
            ...node,
            indexWhere: node.indexWhere
                ? WhereNode.cloneWithOperation(node.indexWhere, 'Or', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithUpdateWhere(node, operation) {
        return freeze({
            ...node,
            updateWhere: node.updateWhere
                ? WhereNode.cloneWithOperation(node.updateWhere, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithUpdateOrWhere(node, operation) {
        return freeze({
            ...node,
            updateWhere: node.updateWhere
                ? WhereNode.cloneWithOperation(node.updateWhere, 'Or', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithoutIndexWhere(node) {
        return freeze({
            ...node,
            indexWhere: undefined,
        });
    },
    cloneWithoutUpdateWhere(node) {
        return freeze({
            ...node,
            updateWhere: undefined,
        });
    },
});

/// <reference types="./on-conflict-builder.d.ts" />
class OnConflictBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column) {
        const columnNode = ColumnNode.create(column);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? freeze([...this.#props.onConflictNode.columns, columnNode])
                    : freeze([columnNode]),
            }),
        });
    }
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns) {
        const columnNodes = columns.map(ColumnNode.create);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? freeze([...this.#props.onConflictNode.columns, ...columnNodes])
                    : freeze(columnNodes),
            }),
        });
    }
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                constraint: IdentifierNode.create(constraintName),
            }),
        });
    }
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                indexExpression: expression.toOperationNode(),
            }),
        });
    }
    where(...args) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id") do nothing
     * ```
     */
    doNothing() {
        return new OnConflictDoNothingBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                doNothing: true,
            }),
        });
    }
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet({ first_name })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function upsertPerson(person: NewPerson): Promise<void> {
     *   await db.insertInto('person')
     *     .values(person)
     *     .onConflict((oc) => oc
     *       .column('id')
     *       .doUpdateSet((eb) => ({
     *         first_name: eb.ref('excluded.first_name'),
     *         last_name: eb.ref('excluded.last_name')
     *       })
     *     )
     *   )
     *   .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * values ($1, $2)
     * on conflict ("id")
     * do update set
     *  "first_name" = excluded."first_name",
     *  "last_name" = excluded."last_name"
     * ```
     */
    doUpdateSet(update) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                updates: parseUpdateObjectExpression(update),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
}
preventAwait(OnConflictBuilder, "don't await OnConflictBuilder instances.");
class OnConflictDoNothingBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
preventAwait(OnConflictDoNothingBuilder, "don't await OnConflictDoNothingBuilder instances.");
class OnConflictUpdateBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs, op, rhs) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
preventAwait(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");

/// <reference types="./top-node.d.ts" />
/**
 * @internal
 */
const TopNode = freeze({
    is(node) {
        return node.kind === 'TopNode';
    },
    create(expression, modifiers) {
        return freeze({
            kind: 'TopNode',
            expression,
            modifiers,
        });
    },
});

/// <reference types="./top-parser.d.ts" />
function parseTop(expression, modifiers) {
    if (!isNumber(expression) && !isBigInt(expression)) {
        throw new Error(`Invalid top expression: ${expression}`);
    }
    if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) {
        throw new Error(`Invalid top modifiers: ${modifiers}`);
    }
    return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
    return (modifiers === 'percent' ||
        modifiers === 'with ties' ||
        modifiers === 'percent with ties');
}

/// <reference types="./insert-query-builder.d.ts" />
class InsertQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to insert. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * You must provide all fields you haven't explicitly marked as nullable
     * or optional using {@link Generated} or {@link ColumnType}.
     *
     * The return value of an `insert` query is an instance of {@link InsertResult}. The
     * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
     * key if the database returned one.
     *
     * On PostgreSQL and some other dialects, you need to call `returning` to get
     * something out of the query.
     *
     * Also see the {@link expression} method for inserting the result of a select
     * query or any other expression.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Single row", 10) -->
     *
     * Insert a single row:
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40
     *   })
     *   .executeTakeFirst()
     *
     * // `insertId` is only available on dialects that
     * // automatically return the id of the inserted row
     * // such as MySQL and SQLite. On PostgreSQL, for example,
     * // you need to add a `returning` clause to the query to
     * // get anything out. See the "returning data" example.
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
     * ```
     *
     * <!-- siteExample("insert", "Multiple rows", 20) -->
     *
     * On dialects that support it (for example PostgreSQL) you can insert multiple
     * rows by providing an array. Note that the return value is once again very
     * dialect-specific. Some databases may only return the id of the *last* inserted
     * row and some return nothing at all unless you call `returning`.
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values([{
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   }, {
     *     first_name: 'Arnold',
     *     last_name: 'Schwarzenegger',
     *     age: 70,
     *   }])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
     * ```
     *
     * <!-- siteExample("insert", "Returning data", 30) -->
     *
     * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
     * the inserted row's columns (or any other expression) as the return value. `returning`
     * works just like `select`. Refer to `select` method's examples and documentation for
     * more info.
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   })
     *   .returning(['id', 'first_name as name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
     * ```
     *
     * <!-- siteExample("insert", "Complex values", 40) -->
     *
     * In addition to primitives, the values can also be arbitrary expressions.
     * You can build the expressions by using a callback and calling the methods
     * on the expression builder passed to it:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const ani = "Ani"
     * const ston = "ston"
     *
     * const result = await db
     *   .insertInto('person')
     *   .values(({ ref, selectFrom, fn }) => ({
     *     first_name: 'Jennifer',
     *     last_name: sql<string>`concat(${ani}, ${ston})`,
     *     middle_name: ref('first_name'),
     *     age: selectFrom('person')
     *       .select(fn.avg<number>('age').as('avg_age')),
     *   }))
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" (
     *   "first_name",
     *   "last_name",
     *   "middle_name",
     *   "age"
     * )
     * values (
     *   $1,
     *   concat($2, $3),
     *   "first_name",
     *   (select avg("age") as "avg_age" from "person")
     * )
     * ```
     *
     * You can also use the callback version of subqueries or raw expressions:
     *
     * ```ts
     * await db.with('jennifer', (db) => db
     *   .selectFrom('person')
     *   .where('first_name', '=', 'Jennifer')
     *   .select(['id', 'first_name', 'gender'])
     *   .limit(1)
     * ).insertInto('pet').values((eb) => ({
     *   owner_id: eb.selectFrom('jennifer').select('id'),
     *   name: eb.selectFrom('jennifer').select('first_name'),
     *   species: 'cat',
     * }))
     * .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * with "jennifer" as (
     *   select "id", "first_name", "gender"
     *   from "person"
     *   where "first_name" = $1
     *   limit $2
     * )
     * insert into "pet" ("owner_id", "name", "species")
     * values (
     *  (select "id" from "jennifer"),
     *  (select "first_name" from "jennifer"),
     *  $3
     * )
     * ```
     */
    values(insert) {
        const [columns, values] = parseInsertExpression(insert);
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                columns,
                values,
            }),
        });
    }
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    columns(columns) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                columns: freeze(columns.map(ColumnNode.create)),
            }),
        });
    }
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Insert subquery", 50) -->
     *
     * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
     * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
     * remember. The reasons for this design stem from implementation difficulties.
     *
     * ```ts
     * const result = await db.insertInto('person')
     *   .columns(['first_name', 'last_name', 'age'])
     *   .expression((eb) => eb
     *     .selectFrom('pet')
     *     .select((eb) => [
     *       'pet.name',
     *       eb.val('Petson').as('last_name'),
     *       eb.lit(7).as('age'),
     *     ])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age")
     * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
     * ```
     */
    expression(expression) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                values: parseExpression(expression),
            }),
        });
    }
    /**
     * Creates an `insert into "person" default values` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .defaultValues()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" default values
     * ```
     */
    defaultValues() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                defaultValues: true,
            }),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` ("first_name", "last_name", "gender")
     * values (?, ?, ?) -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * This is only supported on some dialects like MySQL. On most dialects you should
     * use the {@link onConflict} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    ignore() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                ignore: true,
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Insert the first 5 rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(5)
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     *
     * Insert the first 50 percent of rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(50, 'percent')
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     */
    top(expression, modifiers) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $4
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql<string>`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict (lower(name))
     * do update set "species" = $4
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * where "excluded"."name" != $5
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("id", "first_name", "last_name", "gender")
     * values ($1, $2, $3, $4)
     * on conflict ("id")
     * do update set
     *  "first_name" = "excluded"."first_name",
     *  "last_name" = "excluded"."last_name"
     * ```
     */
    onConflict(callback) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                onConflict: callback(new OnConflictBuilder({
                    onConflictNode: OnConflictNode.create(),
                })).toOperationNode(),
            }),
        });
    }
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
     * values (?, ?, ?, ?)
     * on duplicate key update `updated_at` = ?
     * ```
     */
    onDuplicateKeyUpdate(update) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateObjectExpression(update)),
            }),
        });
    }
    returning(selection) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll()),
        });
    }
    output(args) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
     *   .returning(['first_name'])
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
     * ```
     */
    clearReturning() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.insertInto('person')
     *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function insertPerson(values: NewPerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new InsertQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `InsertQueryBuilder` with a new output type.
     */
    $castTo() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link values} input
     * when using {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
     *
     * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
     *   return await db
     *     .with('new_person', (qb) => qb
     *       .insertInto('person')
     *       .values(person)
     *       .returning('id')
     *       .$assertType<{ id: number }>()
     *     )
     *     .with('new_pet', (qb) => qb
     *       .insertInto('pet')
     *       .values((eb) => ({
     *         owner_id: eb.selectFrom('new_person').select('id'),
     *         ...pet
     *       }))
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['new_person', 'new_pet'])
     *     .selectAll()
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     */
    $assertType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new InsertQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [
            new InsertResult(result.insertId, 
            // TODO: remove numUpdatedOrDeletedRows.
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows),
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}
preventAwait(InsertQueryBuilder, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

/// <reference types="./delete-result.d.ts" />
class DeleteResult {
    numDeletedRows;
    constructor(numDeletedRows) {
        this.numDeletedRows = numDeletedRows;
    }
}

/// <reference types="./limit-node.d.ts" />
/**
 * @internal
 */
const LimitNode = freeze({
    is(node) {
        return node.kind === 'LimitNode';
    },
    create(limit) {
        return freeze({
            kind: 'LimitNode',
            limit,
        });
    },
});

/// <reference types="./delete-query-builder.d.ts" />
class DeleteQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    /**
     * Changes a `delete from` query into a `delete top from` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Delete the first 5 rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(5)
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(5) from "person" where "age" > @1
     * ```
     *
     * Delete the first 50% of rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(50, 'percent')
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(50) percent from "person" where "age" > @1
     * ```
     */
    top(expression, modifiers) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    using(tables) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithUsing(this.#props.queryNode, parseTableExpressionOrList(tables)),
        });
    }
    innerJoin(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('InnerJoin', args)),
        });
    }
    leftJoin(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('LeftJoin', args)),
        });
    }
    rightJoin(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('RightJoin', args)),
        });
    }
    fullJoin(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('FullJoin', args)),
        });
    }
    returning(selection) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max"
     * ```
     */
    clearReturning() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Clears the `limit` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .limit(5)
     *   .clearLimit()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max" returning *
     * ```
     */
    clearLimit() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithoutLimit(this.#props.queryNode),
        });
    }
    /**
     * Clears the `order by` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .orderBy('id')
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max" returning *
     * ```
     */
    clearOrderBy() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithoutOrderBy(this.#props.queryNode),
        });
    }
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
     * multiple times.
     *
     * The first argument is the expression to order by and the second is the
     * order (`asc` or `desc`).
     *
     * An `order by` clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * See {@link SelectQueryBuilder.orderBy} for more examples.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet`
     * order by `created_at`
     * limit ?
     * ```
     */
    orderBy(orderBy, direction) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy([orderBy, direction])),
        });
    }
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet` order by `created_at` limit ?
     * ```
     */
    limit(limit) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.deleteFrom('person')
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.deleteFrom('person')
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new DeleteQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `DeleteQueryBuilder` with a new output type.
     */
    $castTo() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { Species } from 'type-editor' // imaginary module
     *
     * async function deletePersonAndPets(personId: number) {
     *   return await db
     *     .with('deleted_person', (qb) => qb
     *        .deleteFrom('person')
     *        .where('id', '=', personId)
     *        .returning('first_name')
     *        .$assertType<{ first_name: string }>()
     *     )
     *     .with('deleted_pets', (qb) => qb
     *       .deleteFrom('pet')
     *       .where('owner_id', '=', personId)
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['deleted_person', 'deleted_pets'])
     *     .selectAll()
     *     .execute()
     * }
     * ```
     */
    $assertType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new DeleteQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [
            new DeleteResult(
            // TODO: remove numUpdatedOrDeletedRows.
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)),
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}
preventAwait(DeleteQueryBuilder, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

/// <reference types="./update-result.d.ts" />
class UpdateResult {
    /**
     * The number of rows the update query updated (even if not changed).
     */
    numUpdatedRows;
    /**
     * The number of rows the update query changed.
     *
     * This is **optional** and only supported in dialects such as MySQL.
     * You would probably use {@link numUpdatedRows} in most cases.
     */
    numChangedRows;
    constructor(numUpdatedRows, numChangedRows) {
        this.numUpdatedRows = numUpdatedRows;
        this.numChangedRows = numChangedRows;
    }
}

/// <reference types="./update-query-builder.d.ts" />
class UpdateQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    /**
     * Changes an `update` query into a `update top` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Update the first row:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(1)
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(1) "person" set "first_name" = @1 where "age" > @2
     * ```
     *
     * Update the 50% first rows:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(50, 'percent')
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(50) percent "person" set "first_name" = @1 where "age" > @2
     * ```
     */
    top(expression, modifiers) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    from(from) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithFromItems(this.#props.queryNode, parseTableExpressionOrList(from)),
        });
    }
    innerJoin(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('InnerJoin', args)),
        });
    }
    leftJoin(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('LeftJoin', args)),
        });
    }
    rightJoin(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('RightJoin', args)),
        });
    }
    fullJoin(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('FullJoin', args)),
        });
    }
    /**
     * Adds a limit clause to the update query for supported databases, such as MySQL.
     *
     * ### Examples
     *
     * Update the first 2 rows in the 'person' table:
     *
     * ```ts
     * await db
     *   .updateTable('person')
     *   .set({ first_name: 'Foo' })
     *   .limit(2)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person` set `first_name` = ? limit ?
     * ```
     */
    limit(limit) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    set(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithUpdates(this.#props.queryNode, parseUpdate(...args)),
        });
    }
    returning(selection) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.updateTable('person')
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql.raw('-- This is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person`
     * set `age` = 39
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .returningAll()
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .clearReturning()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * update "person" set "age" = 39 where "first_name" = "John"
     * ```
     */
    clearReturning() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * const values = {
     *   first_name: 'John',
     * } satisfies PersonUpdate
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new UpdateQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `UpdateQueryBuilder` with a new output type.
     */
    $castTo() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link set} input
     * when using {@link where} and/or {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
     *
     * const person = {
     *   id: 1,
     *   gender: 'other',
     * } satisfies PersonUpdate
     *
     * const pet = {
     *   name: 'Fluffy',
     * } satisfies PetUpdate
     *
     * const result = await db
     *   .with('updated_person', (qb) => qb
     *     .updateTable('person')
     *     .set(person)
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('updated_pet', (qb) => qb
     *     .updateTable('pet')
     *     .set(pet)
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['updated_person', 'updated_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new UpdateQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [
            new UpdateResult(
            // TODO: remove numUpdatedOrDeletedRows.
            // TODO: https://github.com/kysely-org/kysely/pull/431#discussion_r1172330899
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0), result.numChangedRows),
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}
preventAwait(UpdateQueryBuilder, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

/// <reference types="./common-table-expression-name-node.d.ts" />
/**
 * @internal
 */
const CommonTableExpressionNameNode = freeze({
    is(node) {
        return node.kind === 'CommonTableExpressionNameNode';
    },
    create(tableName, columnNames) {
        return freeze({
            kind: 'CommonTableExpressionNameNode',
            table: TableNode.create(tableName),
            columns: columnNames
                ? freeze(columnNames.map(ColumnNode.create))
                : undefined,
        });
    },
});

/// <reference types="./common-table-expression-node.d.ts" />
/**
 * @internal
 */
const CommonTableExpressionNode = freeze({
    is(node) {
        return node.kind === 'CommonTableExpressionNode';
    },
    create(name, expression) {
        return freeze({
            kind: 'CommonTableExpressionNode',
            name,
            expression,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./cte-builder.d.ts" />
class CTEBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Makes the common table expression materialized.
     */
    materialized() {
        return new CTEBuilder({
            ...this.#props,
            node: CommonTableExpressionNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    /**
     * Makes the common table expression not materialized.
     */
    notMaterialized() {
        return new CTEBuilder({
            ...this.#props,
            node: CommonTableExpressionNode.cloneWith(this.#props.node, {
                materialized: false,
            }),
        });
    }
    toOperationNode() {
        return this.#props.node;
    }
}
preventAwait(CTEBuilder, "don't await CTEBuilder instances. They are never executed directly and are always just a part of a query.");

/// <reference types="./with-parser.d.ts" />
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
    const expressionNode = expression(createQueryCreator()).toOperationNode();
    if (isFunction(nameOrBuilderCallback)) {
        return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
    }
    return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
    return (name) => {
        return new CTEBuilder({
            node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode),
        });
    };
}
function parseCommonTableExpressionName(name) {
    if (name.includes('(')) {
        const parts = name.split(/[\(\)]/);
        const table = parts[0];
        const columns = parts[1].split(',').map((it) => it.trim());
        return CommonTableExpressionNameNode.create(table, columns);
    }
    else {
        return CommonTableExpressionNameNode.create(name);
    }
}

/// <reference types="./with-node.d.ts" />
/**
 * @internal
 */
const WithNode = freeze({
    is(node) {
        return node.kind === 'WithNode';
    },
    create(expression, params) {
        return freeze({
            kind: 'WithNode',
            expressions: freeze([expression]),
            ...params,
        });
    },
    cloneWithExpression(withNode, expression) {
        return freeze({
            ...withNode,
            expressions: freeze([...withNode.expressions, expression]),
        });
    },
});

/// <reference types="./random-string.d.ts" />
const CHARS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];
function randomString(length) {
    let chars = '';
    for (let i = 0; i < length; ++i) {
        chars += randomChar();
    }
    return chars;
}
function randomChar() {
    return CHARS[~~(Math.random() * CHARS.length)];
}

/// <reference types="./query-id.d.ts" />
function createQueryId() {
    return new LazyQueryId();
}
class LazyQueryId {
    #queryId;
    get queryId() {
        if (this.#queryId === undefined) {
            this.#queryId = randomString(8);
        }
        return this.#queryId;
    }
}

/// <reference types="./require-all-props.d.ts" />
/**
 * Helper function to check listed properties according to given type. Check if all properties has been used when object is initialised.
 *
 * Example use:
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 *
 * // propB has to be mentioned even it is optional. It still should be initialized with undefined.
 * const a: SomeType = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 *
 * // checked type is implicit for variable.
 * const b = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 * ```
 *
 * Wrong use of this helper:
 *
 * 1. Omit checked type - all checked properties will be expect as of type never
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * // const z: SomeType = requireAllProps({ propC: "no type will work" }); // Property 'propA' is missing in type '{ propC: string; }' but required in type 'SomeType'.
 * ```
 *
 * 2. Apply to spreaded object - there is no way how to check in compile time if spreaded object contains all properties
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * const y: SomeType = { propA: "" }; // valid object according to SomeType declaration
 * // const x = requireAllProps<SomeType>({ ...y }); // Argument of type '{ propA: string; propB?: number; }' is not assignable to parameter of type 'AllProps<SomeType>'.
 * ```
 *
 * @param obj object to check if all properties has been used
 * @returns untouched obj parameter is returned
 */
function requireAllProps(obj) {
    return obj;
}

/// <reference types="./operation-node-transformer.d.ts" />
/**
 * Transforms an operation node tree into another one.
 *
 * Kysely queries are expressed internally as a tree of objects (operation nodes).
 * `OperationNodeTransformer` takes such a tree as its input and returns a
 * transformed deep copy of it. By default the `OperationNodeTransformer`
 * does nothing. You need to override one or more methods to make it do
 * something.
 *
 * There's a method for each node type. For example if you'd like to convert
 * each identifier (table name, column name, alias etc.) from camelCase to
 * snake_case, you'd do something like this:
 *
 * ```ts
 * import { type IdentifierNode, OperationNodeTransformer } from 'kysely'
 * import snakeCase from 'lodash/snakeCase'
 *
 * class CamelCaseTransformer extends OperationNodeTransformer {
 *   override transformIdentifier(node: IdentifierNode): IdentifierNode {
 *     node = super.transformIdentifier(node)
 *
 *     return {
 *       ...node,
 *       name: snakeCase(node.name),
 *     }
 *   }
 * }
 *
 * const transformer = new CamelCaseTransformer()
 *
 * const query = db.selectFrom('person').select(['first_name', 'last_name'])
 *
 * const tree = transformer.transformNode(query.toOperationNode())
 * ```
 */
class OperationNodeTransformer {
    nodeStack = [];
    #transformers = freeze({
        AliasNode: this.transformAlias.bind(this),
        ColumnNode: this.transformColumn.bind(this),
        IdentifierNode: this.transformIdentifier.bind(this),
        SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
        RawNode: this.transformRaw.bind(this),
        ReferenceNode: this.transformReference.bind(this),
        SelectQueryNode: this.transformSelectQuery.bind(this),
        SelectionNode: this.transformSelection.bind(this),
        TableNode: this.transformTable.bind(this),
        FromNode: this.transformFrom.bind(this),
        SelectAllNode: this.transformSelectAll.bind(this),
        AndNode: this.transformAnd.bind(this),
        OrNode: this.transformOr.bind(this),
        ValueNode: this.transformValue.bind(this),
        ValueListNode: this.transformValueList.bind(this),
        PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
        ParensNode: this.transformParens.bind(this),
        JoinNode: this.transformJoin.bind(this),
        OperatorNode: this.transformOperator.bind(this),
        WhereNode: this.transformWhere.bind(this),
        InsertQueryNode: this.transformInsertQuery.bind(this),
        DeleteQueryNode: this.transformDeleteQuery.bind(this),
        ReturningNode: this.transformReturning.bind(this),
        CreateTableNode: this.transformCreateTable.bind(this),
        AddColumnNode: this.transformAddColumn.bind(this),
        ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
        DropTableNode: this.transformDropTable.bind(this),
        DataTypeNode: this.transformDataType.bind(this),
        OrderByNode: this.transformOrderBy.bind(this),
        OrderByItemNode: this.transformOrderByItem.bind(this),
        GroupByNode: this.transformGroupBy.bind(this),
        GroupByItemNode: this.transformGroupByItem.bind(this),
        UpdateQueryNode: this.transformUpdateQuery.bind(this),
        ColumnUpdateNode: this.transformColumnUpdate.bind(this),
        LimitNode: this.transformLimit.bind(this),
        OffsetNode: this.transformOffset.bind(this),
        OnConflictNode: this.transformOnConflict.bind(this),
        OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
        CreateIndexNode: this.transformCreateIndex.bind(this),
        DropIndexNode: this.transformDropIndex.bind(this),
        ListNode: this.transformList.bind(this),
        PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
        ReferencesNode: this.transformReferences.bind(this),
        CheckConstraintNode: this.transformCheckConstraint.bind(this),
        WithNode: this.transformWith.bind(this),
        CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
        HavingNode: this.transformHaving.bind(this),
        CreateSchemaNode: this.transformCreateSchema.bind(this),
        DropSchemaNode: this.transformDropSchema.bind(this),
        AlterTableNode: this.transformAlterTable.bind(this),
        DropColumnNode: this.transformDropColumn.bind(this),
        RenameColumnNode: this.transformRenameColumn.bind(this),
        AlterColumnNode: this.transformAlterColumn.bind(this),
        ModifyColumnNode: this.transformModifyColumn.bind(this),
        AddConstraintNode: this.transformAddConstraint.bind(this),
        DropConstraintNode: this.transformDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
        CreateViewNode: this.transformCreateView.bind(this),
        DropViewNode: this.transformDropView.bind(this),
        GeneratedNode: this.transformGenerated.bind(this),
        DefaultValueNode: this.transformDefaultValue.bind(this),
        OnNode: this.transformOn.bind(this),
        ValuesNode: this.transformValues.bind(this),
        SelectModifierNode: this.transformSelectModifier.bind(this),
        CreateTypeNode: this.transformCreateType.bind(this),
        DropTypeNode: this.transformDropType.bind(this),
        ExplainNode: this.transformExplain.bind(this),
        DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.transformAggregateFunction.bind(this),
        OverNode: this.transformOver.bind(this),
        PartitionByNode: this.transformPartitionBy.bind(this),
        PartitionByItemNode: this.transformPartitionByItem.bind(this),
        SetOperationNode: this.transformSetOperation.bind(this),
        BinaryOperationNode: this.transformBinaryOperation.bind(this),
        UnaryOperationNode: this.transformUnaryOperation.bind(this),
        UsingNode: this.transformUsing.bind(this),
        FunctionNode: this.transformFunction.bind(this),
        CaseNode: this.transformCase.bind(this),
        WhenNode: this.transformWhen.bind(this),
        JSONReferenceNode: this.transformJSONReference.bind(this),
        JSONPathNode: this.transformJSONPath.bind(this),
        JSONPathLegNode: this.transformJSONPathLeg.bind(this),
        JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
        TupleNode: this.transformTuple.bind(this),
        MergeQueryNode: this.transformMergeQuery.bind(this),
        MatchedNode: this.transformMatched.bind(this),
        AddIndexNode: this.transformAddIndex.bind(this),
        CastNode: this.transformCast.bind(this),
        FetchNode: this.transformFetch.bind(this),
        TopNode: this.transformTop.bind(this),
        OutputNode: this.transformOutput.bind(this),
    });
    transformNode(node) {
        if (!node) {
            return node;
        }
        this.nodeStack.push(node);
        const out = this.transformNodeImpl(node);
        this.nodeStack.pop();
        return freeze(out);
    }
    transformNodeImpl(node) {
        return this.#transformers[node.kind](node);
    }
    transformNodeList(list) {
        if (!list) {
            return list;
        }
        return freeze(list.map((node) => this.transformNode(node)));
    }
    transformSelectQuery(node) {
        return requireAllProps({
            kind: 'SelectQueryNode',
            from: this.transformNode(node.from),
            selections: this.transformNodeList(node.selections),
            distinctOn: this.transformNodeList(node.distinctOn),
            joins: this.transformNodeList(node.joins),
            groupBy: this.transformNode(node.groupBy),
            orderBy: this.transformNode(node.orderBy),
            where: this.transformNode(node.where),
            frontModifiers: this.transformNodeList(node.frontModifiers),
            endModifiers: this.transformNodeList(node.endModifiers),
            limit: this.transformNode(node.limit),
            offset: this.transformNode(node.offset),
            with: this.transformNode(node.with),
            having: this.transformNode(node.having),
            explain: this.transformNode(node.explain),
            setOperations: this.transformNodeList(node.setOperations),
            fetch: this.transformNode(node.fetch),
            top: this.transformNode(node.top),
        });
    }
    transformSelection(node) {
        return requireAllProps({
            kind: 'SelectionNode',
            selection: this.transformNode(node.selection),
        });
    }
    transformColumn(node) {
        return requireAllProps({
            kind: 'ColumnNode',
            column: this.transformNode(node.column),
        });
    }
    transformAlias(node) {
        return requireAllProps({
            kind: 'AliasNode',
            node: this.transformNode(node.node),
            alias: this.transformNode(node.alias),
        });
    }
    transformTable(node) {
        return requireAllProps({
            kind: 'TableNode',
            table: this.transformNode(node.table),
        });
    }
    transformFrom(node) {
        return requireAllProps({
            kind: 'FromNode',
            froms: this.transformNodeList(node.froms),
        });
    }
    transformReference(node) {
        return requireAllProps({
            kind: 'ReferenceNode',
            column: this.transformNode(node.column),
            table: this.transformNode(node.table),
        });
    }
    transformAnd(node) {
        return requireAllProps({
            kind: 'AndNode',
            left: this.transformNode(node.left),
            right: this.transformNode(node.right),
        });
    }
    transformOr(node) {
        return requireAllProps({
            kind: 'OrNode',
            left: this.transformNode(node.left),
            right: this.transformNode(node.right),
        });
    }
    transformValueList(node) {
        return requireAllProps({
            kind: 'ValueListNode',
            values: this.transformNodeList(node.values),
        });
    }
    transformParens(node) {
        return requireAllProps({
            kind: 'ParensNode',
            node: this.transformNode(node.node),
        });
    }
    transformJoin(node) {
        return requireAllProps({
            kind: 'JoinNode',
            joinType: node.joinType,
            table: this.transformNode(node.table),
            on: this.transformNode(node.on),
        });
    }
    transformRaw(node) {
        return requireAllProps({
            kind: 'RawNode',
            sqlFragments: freeze([...node.sqlFragments]),
            parameters: this.transformNodeList(node.parameters),
        });
    }
    transformWhere(node) {
        return requireAllProps({
            kind: 'WhereNode',
            where: this.transformNode(node.where),
        });
    }
    transformInsertQuery(node) {
        return requireAllProps({
            kind: 'InsertQueryNode',
            into: this.transformNode(node.into),
            columns: this.transformNodeList(node.columns),
            values: this.transformNode(node.values),
            returning: this.transformNode(node.returning),
            onConflict: this.transformNode(node.onConflict),
            onDuplicateKey: this.transformNode(node.onDuplicateKey),
            endModifiers: this.transformNodeList(node.endModifiers),
            with: this.transformNode(node.with),
            ignore: node.ignore,
            replace: node.replace,
            explain: this.transformNode(node.explain),
            defaultValues: node.defaultValues,
            top: this.transformNode(node.top),
            output: this.transformNode(node.output),
        });
    }
    transformValues(node) {
        return requireAllProps({
            kind: 'ValuesNode',
            values: this.transformNodeList(node.values),
        });
    }
    transformDeleteQuery(node) {
        return requireAllProps({
            kind: 'DeleteQueryNode',
            from: this.transformNode(node.from),
            using: this.transformNode(node.using),
            joins: this.transformNodeList(node.joins),
            where: this.transformNode(node.where),
            returning: this.transformNode(node.returning),
            endModifiers: this.transformNodeList(node.endModifiers),
            with: this.transformNode(node.with),
            orderBy: this.transformNode(node.orderBy),
            limit: this.transformNode(node.limit),
            explain: this.transformNode(node.explain),
            top: this.transformNode(node.top),
            output: this.transformNode(node.output),
        });
    }
    transformReturning(node) {
        return requireAllProps({
            kind: 'ReturningNode',
            selections: this.transformNodeList(node.selections),
        });
    }
    transformCreateTable(node) {
        return requireAllProps({
            kind: 'CreateTableNode',
            table: this.transformNode(node.table),
            columns: this.transformNodeList(node.columns),
            constraints: this.transformNodeList(node.constraints),
            temporary: node.temporary,
            ifNotExists: node.ifNotExists,
            onCommit: node.onCommit,
            frontModifiers: this.transformNodeList(node.frontModifiers),
            endModifiers: this.transformNodeList(node.endModifiers),
            selectQuery: this.transformNode(node.selectQuery),
        });
    }
    transformColumnDefinition(node) {
        return requireAllProps({
            kind: 'ColumnDefinitionNode',
            column: this.transformNode(node.column),
            dataType: this.transformNode(node.dataType),
            references: this.transformNode(node.references),
            primaryKey: node.primaryKey,
            autoIncrement: node.autoIncrement,
            unique: node.unique,
            notNull: node.notNull,
            unsigned: node.unsigned,
            defaultTo: this.transformNode(node.defaultTo),
            check: this.transformNode(node.check),
            generated: this.transformNode(node.generated),
            frontModifiers: this.transformNodeList(node.frontModifiers),
            endModifiers: this.transformNodeList(node.endModifiers),
            nullsNotDistinct: node.nullsNotDistinct,
            identity: node.identity,
            ifNotExists: node.ifNotExists,
        });
    }
    transformAddColumn(node) {
        return requireAllProps({
            kind: 'AddColumnNode',
            column: this.transformNode(node.column),
        });
    }
    transformDropTable(node) {
        return requireAllProps({
            kind: 'DropTableNode',
            table: this.transformNode(node.table),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformOrderBy(node) {
        return requireAllProps({
            kind: 'OrderByNode',
            items: this.transformNodeList(node.items),
        });
    }
    transformOrderByItem(node) {
        return requireAllProps({
            kind: 'OrderByItemNode',
            orderBy: this.transformNode(node.orderBy),
            direction: this.transformNode(node.direction),
        });
    }
    transformGroupBy(node) {
        return requireAllProps({
            kind: 'GroupByNode',
            items: this.transformNodeList(node.items),
        });
    }
    transformGroupByItem(node) {
        return requireAllProps({
            kind: 'GroupByItemNode',
            groupBy: this.transformNode(node.groupBy),
        });
    }
    transformUpdateQuery(node) {
        return requireAllProps({
            kind: 'UpdateQueryNode',
            table: this.transformNode(node.table),
            from: this.transformNode(node.from),
            joins: this.transformNodeList(node.joins),
            where: this.transformNode(node.where),
            updates: this.transformNodeList(node.updates),
            returning: this.transformNode(node.returning),
            endModifiers: this.transformNodeList(node.endModifiers),
            with: this.transformNode(node.with),
            explain: this.transformNode(node.explain),
            limit: this.transformNode(node.limit),
            top: this.transformNode(node.top),
            output: this.transformNode(node.output),
        });
    }
    transformColumnUpdate(node) {
        return requireAllProps({
            kind: 'ColumnUpdateNode',
            column: this.transformNode(node.column),
            value: this.transformNode(node.value),
        });
    }
    transformLimit(node) {
        return requireAllProps({
            kind: 'LimitNode',
            limit: this.transformNode(node.limit),
        });
    }
    transformOffset(node) {
        return requireAllProps({
            kind: 'OffsetNode',
            offset: this.transformNode(node.offset),
        });
    }
    transformOnConflict(node) {
        return requireAllProps({
            kind: 'OnConflictNode',
            columns: this.transformNodeList(node.columns),
            constraint: this.transformNode(node.constraint),
            indexExpression: this.transformNode(node.indexExpression),
            indexWhere: this.transformNode(node.indexWhere),
            updates: this.transformNodeList(node.updates),
            updateWhere: this.transformNode(node.updateWhere),
            doNothing: node.doNothing,
        });
    }
    transformOnDuplicateKey(node) {
        return requireAllProps({
            kind: 'OnDuplicateKeyNode',
            updates: this.transformNodeList(node.updates),
        });
    }
    transformCreateIndex(node) {
        return requireAllProps({
            kind: 'CreateIndexNode',
            name: this.transformNode(node.name),
            table: this.transformNode(node.table),
            columns: this.transformNodeList(node.columns),
            unique: node.unique,
            using: this.transformNode(node.using),
            ifNotExists: node.ifNotExists,
            where: this.transformNode(node.where),
            nullsNotDistinct: node.nullsNotDistinct,
        });
    }
    transformList(node) {
        return requireAllProps({
            kind: 'ListNode',
            items: this.transformNodeList(node.items),
        });
    }
    transformDropIndex(node) {
        return requireAllProps({
            kind: 'DropIndexNode',
            name: this.transformNode(node.name),
            table: this.transformNode(node.table),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformPrimaryKeyConstraint(node) {
        return requireAllProps({
            kind: 'PrimaryKeyConstraintNode',
            columns: this.transformNodeList(node.columns),
            name: this.transformNode(node.name),
        });
    }
    transformUniqueConstraint(node) {
        return requireAllProps({
            kind: 'UniqueConstraintNode',
            columns: this.transformNodeList(node.columns),
            name: this.transformNode(node.name),
            nullsNotDistinct: node.nullsNotDistinct,
        });
    }
    transformForeignKeyConstraint(node) {
        return requireAllProps({
            kind: 'ForeignKeyConstraintNode',
            columns: this.transformNodeList(node.columns),
            references: this.transformNode(node.references),
            name: this.transformNode(node.name),
            onDelete: node.onDelete,
            onUpdate: node.onUpdate,
        });
    }
    transformSetOperation(node) {
        return requireAllProps({
            kind: 'SetOperationNode',
            operator: node.operator,
            expression: this.transformNode(node.expression),
            all: node.all,
        });
    }
    transformReferences(node) {
        return requireAllProps({
            kind: 'ReferencesNode',
            table: this.transformNode(node.table),
            columns: this.transformNodeList(node.columns),
            onDelete: node.onDelete,
            onUpdate: node.onUpdate,
        });
    }
    transformCheckConstraint(node) {
        return requireAllProps({
            kind: 'CheckConstraintNode',
            expression: this.transformNode(node.expression),
            name: this.transformNode(node.name),
        });
    }
    transformWith(node) {
        return requireAllProps({
            kind: 'WithNode',
            expressions: this.transformNodeList(node.expressions),
            recursive: node.recursive,
        });
    }
    transformCommonTableExpression(node) {
        return requireAllProps({
            kind: 'CommonTableExpressionNode',
            name: this.transformNode(node.name),
            materialized: node.materialized,
            expression: this.transformNode(node.expression),
        });
    }
    transformCommonTableExpressionName(node) {
        return requireAllProps({
            kind: 'CommonTableExpressionNameNode',
            table: this.transformNode(node.table),
            columns: this.transformNodeList(node.columns),
        });
    }
    transformHaving(node) {
        return requireAllProps({
            kind: 'HavingNode',
            having: this.transformNode(node.having),
        });
    }
    transformCreateSchema(node) {
        return requireAllProps({
            kind: 'CreateSchemaNode',
            schema: this.transformNode(node.schema),
            ifNotExists: node.ifNotExists,
        });
    }
    transformDropSchema(node) {
        return requireAllProps({
            kind: 'DropSchemaNode',
            schema: this.transformNode(node.schema),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformAlterTable(node) {
        return requireAllProps({
            kind: 'AlterTableNode',
            table: this.transformNode(node.table),
            renameTo: this.transformNode(node.renameTo),
            setSchema: this.transformNode(node.setSchema),
            columnAlterations: this.transformNodeList(node.columnAlterations),
            addConstraint: this.transformNode(node.addConstraint),
            dropConstraint: this.transformNode(node.dropConstraint),
            addIndex: this.transformNode(node.addIndex),
            dropIndex: this.transformNode(node.dropIndex),
        });
    }
    transformDropColumn(node) {
        return requireAllProps({
            kind: 'DropColumnNode',
            column: this.transformNode(node.column),
        });
    }
    transformRenameColumn(node) {
        return requireAllProps({
            kind: 'RenameColumnNode',
            column: this.transformNode(node.column),
            renameTo: this.transformNode(node.renameTo),
        });
    }
    transformAlterColumn(node) {
        return requireAllProps({
            kind: 'AlterColumnNode',
            column: this.transformNode(node.column),
            dataType: this.transformNode(node.dataType),
            dataTypeExpression: this.transformNode(node.dataTypeExpression),
            setDefault: this.transformNode(node.setDefault),
            dropDefault: node.dropDefault,
            setNotNull: node.setNotNull,
            dropNotNull: node.dropNotNull,
        });
    }
    transformModifyColumn(node) {
        return requireAllProps({
            kind: 'ModifyColumnNode',
            column: this.transformNode(node.column),
        });
    }
    transformAddConstraint(node) {
        return requireAllProps({
            kind: 'AddConstraintNode',
            constraint: this.transformNode(node.constraint),
        });
    }
    transformDropConstraint(node) {
        return requireAllProps({
            kind: 'DropConstraintNode',
            constraintName: this.transformNode(node.constraintName),
            ifExists: node.ifExists,
            modifier: node.modifier,
        });
    }
    transformCreateView(node) {
        return requireAllProps({
            kind: 'CreateViewNode',
            name: this.transformNode(node.name),
            temporary: node.temporary,
            orReplace: node.orReplace,
            ifNotExists: node.ifNotExists,
            materialized: node.materialized,
            columns: this.transformNodeList(node.columns),
            as: this.transformNode(node.as),
        });
    }
    transformDropView(node) {
        return requireAllProps({
            kind: 'DropViewNode',
            name: this.transformNode(node.name),
            ifExists: node.ifExists,
            materialized: node.materialized,
            cascade: node.cascade,
        });
    }
    transformGenerated(node) {
        return requireAllProps({
            kind: 'GeneratedNode',
            byDefault: node.byDefault,
            always: node.always,
            identity: node.identity,
            stored: node.stored,
            expression: this.transformNode(node.expression),
        });
    }
    transformDefaultValue(node) {
        return requireAllProps({
            kind: 'DefaultValueNode',
            defaultValue: this.transformNode(node.defaultValue),
        });
    }
    transformOn(node) {
        return requireAllProps({
            kind: 'OnNode',
            on: this.transformNode(node.on),
        });
    }
    transformSelectModifier(node) {
        return requireAllProps({
            kind: 'SelectModifierNode',
            modifier: node.modifier,
            rawModifier: this.transformNode(node.rawModifier),
            of: this.transformNodeList(node.of),
        });
    }
    transformCreateType(node) {
        return requireAllProps({
            kind: 'CreateTypeNode',
            name: this.transformNode(node.name),
            enum: this.transformNode(node.enum),
        });
    }
    transformDropType(node) {
        return requireAllProps({
            kind: 'DropTypeNode',
            name: this.transformNode(node.name),
            ifExists: node.ifExists,
        });
    }
    transformExplain(node) {
        return requireAllProps({
            kind: 'ExplainNode',
            format: node.format,
            options: this.transformNode(node.options),
        });
    }
    transformSchemableIdentifier(node) {
        return requireAllProps({
            kind: 'SchemableIdentifierNode',
            schema: this.transformNode(node.schema),
            identifier: this.transformNode(node.identifier),
        });
    }
    transformAggregateFunction(node) {
        return requireAllProps({
            kind: 'AggregateFunctionNode',
            aggregated: this.transformNodeList(node.aggregated),
            distinct: node.distinct,
            orderBy: this.transformNode(node.orderBy),
            filter: this.transformNode(node.filter),
            func: node.func,
            over: this.transformNode(node.over),
        });
    }
    transformOver(node) {
        return requireAllProps({
            kind: 'OverNode',
            orderBy: this.transformNode(node.orderBy),
            partitionBy: this.transformNode(node.partitionBy),
        });
    }
    transformPartitionBy(node) {
        return requireAllProps({
            kind: 'PartitionByNode',
            items: this.transformNodeList(node.items),
        });
    }
    transformPartitionByItem(node) {
        return requireAllProps({
            kind: 'PartitionByItemNode',
            partitionBy: this.transformNode(node.partitionBy),
        });
    }
    transformBinaryOperation(node) {
        return requireAllProps({
            kind: 'BinaryOperationNode',
            leftOperand: this.transformNode(node.leftOperand),
            operator: this.transformNode(node.operator),
            rightOperand: this.transformNode(node.rightOperand),
        });
    }
    transformUnaryOperation(node) {
        return requireAllProps({
            kind: 'UnaryOperationNode',
            operator: this.transformNode(node.operator),
            operand: this.transformNode(node.operand),
        });
    }
    transformUsing(node) {
        return requireAllProps({
            kind: 'UsingNode',
            tables: this.transformNodeList(node.tables),
        });
    }
    transformFunction(node) {
        return requireAllProps({
            kind: 'FunctionNode',
            func: node.func,
            arguments: this.transformNodeList(node.arguments),
        });
    }
    transformCase(node) {
        return requireAllProps({
            kind: 'CaseNode',
            value: this.transformNode(node.value),
            when: this.transformNodeList(node.when),
            else: this.transformNode(node.else),
            isStatement: node.isStatement,
        });
    }
    transformWhen(node) {
        return requireAllProps({
            kind: 'WhenNode',
            condition: this.transformNode(node.condition),
            result: this.transformNode(node.result),
        });
    }
    transformJSONReference(node) {
        return requireAllProps({
            kind: 'JSONReferenceNode',
            reference: this.transformNode(node.reference),
            traversal: this.transformNode(node.traversal),
        });
    }
    transformJSONPath(node) {
        return requireAllProps({
            kind: 'JSONPathNode',
            inOperator: this.transformNode(node.inOperator),
            pathLegs: this.transformNodeList(node.pathLegs),
        });
    }
    transformJSONPathLeg(node) {
        return requireAllProps({
            kind: 'JSONPathLegNode',
            type: node.type,
            value: node.value,
        });
    }
    transformJSONOperatorChain(node) {
        return requireAllProps({
            kind: 'JSONOperatorChainNode',
            operator: this.transformNode(node.operator),
            values: this.transformNodeList(node.values),
        });
    }
    transformTuple(node) {
        return requireAllProps({
            kind: 'TupleNode',
            values: this.transformNodeList(node.values),
        });
    }
    transformMergeQuery(node) {
        return requireAllProps({
            kind: 'MergeQueryNode',
            into: this.transformNode(node.into),
            using: this.transformNode(node.using),
            whens: this.transformNodeList(node.whens),
            with: this.transformNode(node.with),
            top: this.transformNode(node.top),
            endModifiers: this.transformNodeList(node.endModifiers),
            output: this.transformNode(node.output),
        });
    }
    transformMatched(node) {
        return requireAllProps({
            kind: 'MatchedNode',
            not: node.not,
            bySource: node.bySource,
        });
    }
    transformAddIndex(node) {
        return requireAllProps({
            kind: 'AddIndexNode',
            name: this.transformNode(node.name),
            columns: this.transformNodeList(node.columns),
            unique: node.unique,
            using: this.transformNode(node.using),
            ifNotExists: node.ifNotExists,
        });
    }
    transformCast(node) {
        return requireAllProps({
            kind: 'CastNode',
            expression: this.transformNode(node.expression),
            dataType: this.transformNode(node.dataType),
        });
    }
    transformFetch(node) {
        return requireAllProps({
            kind: 'FetchNode',
            rowCount: this.transformNode(node.rowCount),
            modifier: node.modifier,
        });
    }
    transformTop(node) {
        return requireAllProps({
            kind: 'TopNode',
            expression: node.expression,
            modifiers: node.modifiers,
        });
    }
    transformOutput(node) {
        return requireAllProps({
            kind: 'OutputNode',
            selections: this.transformNodeList(node.selections),
        });
    }
    transformDataType(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformSelectAll(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformIdentifier(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformValue(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformPrimitiveValueList(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformOperator(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformDefaultInsertValue(node) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
}

/// <reference types="./with-schema-transformer.d.ts" />
// This object exist only so that we get a type error when a new RootOperationNode
// is added. If you get a type error here, make sure to add the new root node and
// handle it correctly in the transformer.
//
// DO NOT REFACTOR THIS EVEN IF IT SEEMS USELESS TO YOU!
const ROOT_OPERATION_NODES = freeze({
    AlterTableNode: true,
    CreateIndexNode: true,
    CreateSchemaNode: true,
    CreateTableNode: true,
    CreateTypeNode: true,
    CreateViewNode: true,
    DeleteQueryNode: true,
    DropIndexNode: true,
    DropSchemaNode: true,
    DropTableNode: true,
    DropTypeNode: true,
    DropViewNode: true,
    InsertQueryNode: true,
    RawNode: true,
    SelectQueryNode: true,
    UpdateQueryNode: true,
    MergeQueryNode: true,
});
const SCHEMALESS_FUNCTIONS = {
    json_agg: true,
    to_json: true,
};
class WithSchemaTransformer extends OperationNodeTransformer {
    #schema;
    #schemableIds = new Set();
    #ctes = new Set();
    constructor(schema) {
        super();
        this.#schema = schema;
    }
    transformNodeImpl(node) {
        if (!this.#isRootOperationNode(node)) {
            return super.transformNodeImpl(node);
        }
        const ctes = this.#collectCTEs(node);
        for (const cte of ctes) {
            this.#ctes.add(cte);
        }
        const tables = this.#collectSchemableIds(node);
        for (const table of tables) {
            this.#schemableIds.add(table);
        }
        const transformed = super.transformNodeImpl(node);
        for (const table of tables) {
            this.#schemableIds.delete(table);
        }
        for (const cte of ctes) {
            this.#ctes.delete(cte);
        }
        return transformed;
    }
    transformSchemableIdentifier(node) {
        const transformed = super.transformSchemableIdentifier(node);
        if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
            return transformed;
        }
        return {
            ...transformed,
            schema: IdentifierNode.create(this.#schema),
        };
    }
    transformReferences(node) {
        const transformed = super.transformReferences(node);
        if (transformed.table.table.schema) {
            return transformed;
        }
        return {
            ...transformed,
            table: TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name),
        };
    }
    transformAggregateFunction(node) {
        return {
            ...super.transformAggregateFunction({ ...node, aggregated: [] }),
            aggregated: this.#transformTableArgsWithoutSchemas(node, 'aggregated'),
        };
    }
    transformFunction(node) {
        return {
            ...super.transformFunction({ ...node, arguments: [] }),
            arguments: this.#transformTableArgsWithoutSchemas(node, 'arguments'),
        };
    }
    #transformTableArgsWithoutSchemas(node, argsKey) {
        return SCHEMALESS_FUNCTIONS[node.func]
            ? node[argsKey].map((arg) => !TableNode.is(arg) || arg.table.schema
                ? this.transformNode(arg)
                : {
                    ...arg,
                    table: this.transformIdentifier(arg.table.identifier),
                })
            : this.transformNodeList(node[argsKey]);
    }
    #isRootOperationNode(node) {
        return node.kind in ROOT_OPERATION_NODES;
    }
    #collectSchemableIds(node) {
        const schemableIds = new Set();
        if ('name' in node && node.name && SchemableIdentifierNode.is(node.name)) {
            this.#collectSchemableId(node.name, schemableIds);
        }
        if ('from' in node && node.from) {
            for (const from of node.from.froms) {
                this.#collectSchemableIdsFromTableExpr(from, schemableIds);
            }
        }
        if ('into' in node && node.into) {
            this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
        }
        if ('table' in node && node.table) {
            this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
        }
        if ('joins' in node && node.joins) {
            for (const join of node.joins) {
                this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
            }
        }
        if ('using' in node && node.using) {
            this.#collectSchemableIdsFromTableExpr(node.using, schemableIds);
        }
        return schemableIds;
    }
    #collectCTEs(node) {
        const ctes = new Set();
        if ('with' in node && node.with) {
            this.#collectCTEIds(node.with, ctes);
        }
        return ctes;
    }
    #collectSchemableIdsFromTableExpr(node, schemableIds) {
        const table = TableNode.is(node)
            ? node
            : AliasNode.is(node) && TableNode.is(node.node)
                ? node.node
                : null;
        if (table) {
            this.#collectSchemableId(table.table, schemableIds);
        }
    }
    #collectSchemableId(node, schemableIds) {
        const id = node.identifier.name;
        if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
            schemableIds.add(id);
        }
    }
    #collectCTEIds(node, ctes) {
        for (const expr of node.expressions) {
            const cteId = expr.name.table.table.identifier.name;
            if (!this.#ctes.has(cteId)) {
                ctes.add(cteId);
            }
        }
    }
}

/// <reference types="./with-schema-plugin.d.ts" />
class WithSchemaPlugin {
    #transformer;
    constructor(schema) {
        this.#transformer = new WithSchemaTransformer(schema);
    }
    transformQuery(args) {
        return this.#transformer.transformNode(args.node);
    }
    async transformResult(args) {
        return args.result;
    }
}

/// <reference types="./matched-node.d.ts" />
/**
 * @internal
 */
const MatchedNode = freeze({
    is(node) {
        return node.kind === 'MatchedNode';
    },
    create(not, bySource = false) {
        return freeze({
            kind: 'MatchedNode',
            not,
            bySource,
        });
    },
});

/// <reference types="./merge-parser.d.ts" />
function parseMergeWhen(type, args, refRight) {
    return WhenNode.create(parseFilterList([
        MatchedNode.create(!type.isMatched, type.bySource),
        ...(args && args.length > 0
            ? [
                args.length === 3 && refRight
                    ? parseReferentialBinaryOperation(args[0], args[1], args[2])
                    : parseValueBinaryOperationOrExpression(args),
            ]
            : []),
    ], 'and', false));
}
function parseMergeThen(result) {
    if (isString(result)) {
        return RawNode.create([result], []);
    }
    if (isOperationNodeSource(result)) {
        return result.toOperationNode();
    }
    return result;
}

/// <reference types="./deferred.d.ts" />
class Deferred {
    #promise;
    #resolve;
    #reject;
    constructor() {
        this.#promise = new Promise((resolve, reject) => {
            this.#reject = reject;
            this.#resolve = resolve;
        });
    }
    get promise() {
        return this.#promise;
    }
    resolve = (value) => {
        if (this.#resolve) {
            this.#resolve(value);
        }
    };
    reject = (reason) => {
        if (this.#reject) {
            this.#reject(reason);
        }
    };
}

/// <reference types="./log-once.d.ts" />
const LOGGED_MESSAGES = new Set();
/**
 * Use for system-level logging, such as deprecation messages.
 * Logs a message and ensures it won't be logged again.
 */
function logOnce(message) {
    if (LOGGED_MESSAGES.has(message)) {
        return;
    }
    LOGGED_MESSAGES.add(message);
    console.log(message);
}

/// <reference types="./query-executor-base.d.ts" />
const NO_PLUGINS = freeze([]);
class QueryExecutorBase {
    #plugins;
    constructor(plugins = NO_PLUGINS) {
        this.#plugins = plugins;
    }
    get plugins() {
        return this.#plugins;
    }
    transformQuery(node, queryId) {
        for (const plugin of this.#plugins) {
            const transformedNode = plugin.transformQuery({ node, queryId });
            // We need to do a runtime check here. There is no good way
            // to write types that enforce this constraint.
            if (transformedNode.kind === node.kind) {
                node = transformedNode;
            }
            else {
                throw new Error([
                    `KyselyPlugin.transformQuery must return a node`,
                    `of the same kind that was given to it.`,
                    `The plugin was given a ${node.kind}`,
                    `but it returned a ${transformedNode.kind}`,
                ].join(' '));
            }
        }
        return node;
    }
    async executeQuery(compiledQuery, queryId) {
        return await this.provideConnection(async (connection) => {
            const result = await connection.executeQuery(compiledQuery);
            const transformedResult = await this.#transformResult(result, queryId);
            // TODO: remove.
            warnOfOutdatedDriverOrPlugins(result, transformedResult);
            return transformedResult;
        });
    }
    async *stream(compiledQuery, chunkSize, queryId) {
        const connectionDefer = new Deferred();
        const connectionReleaseDefer = new Deferred();
        this.provideConnection(async (connection) => {
            connectionDefer.resolve(connection);
            // Lets wait until we don't need connection before returning here (returning releases connection)
            return await connectionReleaseDefer.promise;
        }).catch((ex) => connectionDefer.reject(ex));
        const connection = await connectionDefer.promise;
        try {
            for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
                yield await this.#transformResult(result, queryId);
            }
        }
        finally {
            connectionReleaseDefer.resolve();
        }
    }
    async #transformResult(result, queryId) {
        for (const plugin of this.#plugins) {
            result = await plugin.transformResult({ result, queryId });
        }
        return result;
    }
}
// TODO: remove.
function warnOfOutdatedDriverOrPlugins(result, transformedResult) {
    const { numAffectedRows } = result;
    if ((numAffectedRows === undefined &&
        result.numUpdatedOrDeletedRows === undefined) ||
        (numAffectedRows !== undefined &&
            transformedResult.numAffectedRows !== undefined)) {
        return;
    }
    logOnce('kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.');
}

/// <reference types="./noop-query-executor.d.ts" />
/**
 * A {@link QueryExecutor} subclass that can be used when you don't
 * have a {@link QueryCompiler}, {@link ConnectionProvider} or any
 * other needed things to actually execute queries.
 */
class NoopQueryExecutor extends QueryExecutorBase {
    get adapter() {
        throw new Error('this query cannot be compiled to SQL');
    }
    compileQuery() {
        throw new Error('this query cannot be compiled to SQL');
    }
    provideConnection() {
        throw new Error('this query cannot be executed');
    }
    withConnectionProvider() {
        throw new Error('this query cannot have a connection provider');
    }
    withPlugin(plugin) {
        return new NoopQueryExecutor([...this.plugins, plugin]);
    }
    withPlugins(plugins) {
        return new NoopQueryExecutor([...this.plugins, ...plugins]);
    }
    withPluginAtFront(plugin) {
        return new NoopQueryExecutor([plugin, ...this.plugins]);
    }
    withoutPlugins() {
        return new NoopQueryExecutor([]);
    }
}
const NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();

/// <reference types="./merge-result.d.ts" />
class MergeResult {
    numChangedRows;
    constructor(numChangedRows) {
        this.numChangedRows = numChangedRows;
    }
}

/// <reference types="./merge-query-builder.d.ts" />
class MergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Changes a `merge into` query to an `merge top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Affect 5 matched rows at most:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(5)
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(5) into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     *
     * Affect 50% of matched rows:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(50, 'percent')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(50) percent into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    top(expression, modifiers) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    using(...args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithUsing(this.#props.queryNode, parseJoin('Using', args)),
        });
    }
    output(args) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
}
preventAwait(MergeQueryBuilder, "don't await MergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
class WheneableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * See {@link MergeQueryBuilder.top}.
     */
    top(expression, modifiers) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    /**
     * Adds a simple `when matched` clause to the query.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * For a simple `when not matched` clause, see {@link whenNotMatched}.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    whenMatched() {
        return this.#whenMatched([]);
    }
    whenMatchedAnd(...args) {
        return this.#whenMatched(args);
    }
    /**
     * Adds the `when matched` clause to the query with an `and` condition. But unlike
     * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenMatchedAndRef(lhs, op, rhs) {
        return this.#whenMatched([lhs, op, rhs], true);
    }
    #whenMatched(args, refRight) {
        return new MatchedThenableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: true }, args, refRight)),
        });
    }
    /**
     * Adds a simple `when not matched` clause to the query.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * For a simple `when matched` clause, see {@link whenMatched}.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   insert ("first_name", "last_name") values ($1, $2)
     * ```
     */
    whenNotMatched() {
        return this.#whenNotMatched([]);
    }
    whenNotMatchedAnd(...args) {
        return this.#whenNotMatched(args);
    }
    /**
     * Adds the `when not matched` clause to the query with an `and` condition. But unlike
     * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenNotMatchedAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([lhs, op, rhs], true);
    }
    /**
     * Adds a simple `when not matched by source` clause to the query.
     *
     * Supported in MS SQL Server.
     *
     * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySource() {
        return this.#whenNotMatched([], false, true);
    }
    whenNotMatchedBySourceAnd(...args) {
        return this.#whenNotMatched(args, false, true);
    }
    /**
     * Adds the `when not matched by source` clause to the query with an `and` condition.
     *
     * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
     * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySourceAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([lhs, op, rhs], true, true);
    }
    output(args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    #whenNotMatched(args, refRight = false, bySource = false) {
        const props = {
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: false, bySource }, args, refRight)),
        };
        const Builder = bySource
            ? MatchedThenableMergeQueryBuilder
            : NotMatchedThenableMergeQueryBuilder;
        return new Builder(props);
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.updateTable('person')
     *   .set({ first_name: 'John' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new WheneableMergeQueryBuilder({
            ...this.#props,
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        if (compiledQuery.query.output &&
            this.#props.executor.adapter.supportsOutput) {
            return result.rows;
        }
        return [new MergeResult(result.numAffectedRows)];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
}
preventAwait(WheneableMergeQueryBuilder, "don't await WheneableMergeQueryBuilder instances directly. To execute the query you need to call `execute`.");
class MatchedThenableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Performs the `delete` action.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    thenDelete() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('delete')),
        });
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   do nothing
     * ```
     */
    thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('do nothing')),
        });
    }
    /**
     * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
     * This is handy when multiple `set` invocations are needed.
     *
     * For a shorthand version of this method, see {@link thenUpdateSet}.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenUpdate((ub) => ub
     *     .set(sql`metadata['has_pets']`, 'Y')
     *     .set({
     *       updated_at: new Date().toISOString(),
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   update set metadata['has_pets'] = $1, "updated_at" = $2
     * ```
     */
    thenUpdate(set) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(set(new UpdateQueryBuilder({
                queryId: this.#props.queryId,
                executor: NOOP_QUERY_EXECUTOR,
                queryNode: UpdateQueryNode.createWithoutTable(),
            })))),
        });
    }
    thenUpdateSet(...args) {
        // @ts-ignore not sure how to type this so it won't complain about set(...args).
        return this.thenUpdate((ub) => ub.set(...args));
    }
}
preventAwait(MatchedThenableMergeQueryBuilder, "don't await MatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
class NotMatchedThenableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `insert` action, see {@link thenInsertValues}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   do nothing
     * ```
     */
    thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('do nothing')),
        });
    }
    thenInsertValues(insert) {
        const [columns, values] = parseInsertExpression(insert);
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(InsertQueryNode.cloneWith(InsertQueryNode.createWithoutInto(), {
                columns,
                values,
            }))),
        });
    }
}
preventAwait(NotMatchedThenableMergeQueryBuilder, "don't await NotMatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");

/// <reference types="./query-creator.d.ts" />
class QueryCreator {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    selectFrom(from) {
        return createSelectQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), this.#props.withNode),
        });
    }
    selectNoFrom(selection) {
        return createSelectQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(this.#props.withNode), parseSelectArg(selection)),
        });
    }
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     */
    insertInto(table) {
        return new InsertQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode),
        });
    }
    /**
     * Creates a replace query.
     *
     * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
     * that deletes and inserts values on collision instead of updating existing rows.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     */
    replaceInto(table) {
        return new InsertQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode, true),
        });
    }
    deleteFrom(tables) {
        return new DeleteQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables), this.#props.withNode),
        });
    }
    updateTable(table) {
        return new UpdateQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: UpdateQueryNode.create(parseTableExpression(table), this.#props.withNode),
        });
    }
    mergeInto(targetTable) {
        return new MergeQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: MergeQueryNode.create(parseAliasedTable(targetTable), this.#props.withNode),
        });
    }
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * <!-- siteExample("cte", "Simple selects", 10) -->
     *
     * Common table expressions (CTE) are a great way to modularize complex queries.
     * Essentially they allow you to run multiple separate queries within a
     * single roundtrip to the DB.
     *
     * Since CTEs are a part of the main query, query optimizers inside DB
     * engines are able to optimize the overall query. For example, postgres
     * is able to inline the CTEs inside the using queries if it decides it's
     * faster.
     *
     * ```ts
     * const result = await db
     *   // Create a CTE called `jennifers` that selects all
     *   // persons named 'Jennifer'.
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   // Select all rows from the `jennifers` CTE and
     *   // further filter it.
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   // Finally select all adult jennifers that are
     *   // also younger than 60.
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
     *
     * Some databases like postgres also allow you to run other queries than selects
     * in CTEs. On these databases CTEs are extremely powerful:
     *
     * ```ts
     * const result = await db
     *   .with('new_person', (db) => db
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       age: 35,
     *     })
     *     .returning('id')
     *   )
     *   .with('new_pet', (db) => db
     *     .insertInto('pet')
     *     .values({
     *       name: 'Doggo',
     *       species: 'dog',
     *       is_favorite: true,
     *       // Use the id of the person we just inserted.
     *       owner_id: db
     *         .selectFrom('new_person')
     *         .select('id')
     *     })
     *     .returning('id')
     *   )
     *   .selectFrom(['new_person', 'new_pet'])
     *   .select([
     *     'new_person.id as person_id',
     *     'new_pet.id as pet_id'
     *   ])
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The first argument can also be a callback. The callback is passed
     * a `CTEBuilder` instance that can be used to configure the CTE:
     *
     * ```ts
     * await db
     *   .with(
     *     (cte) => cte('jennifers').materialized(),
     *     (db) => db
     *       .selectFrom('person')
     *       .where('first_name', '=', 'Jennifer')
     *       .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */
    with(nameOrBuilder, expression) {
        const cte = parseCommonTableExpression(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode
                ? WithNode.cloneWithExpression(this.#props.withNode, cte)
                : WithNode.create(cte),
        });
    }
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * Note that recursiveness is a property of the whole `with` statement.
     * You cannot have recursive and non-recursive CTEs in a same `with` statement.
     * Therefore the recursiveness is determined by the **first** `with` or
     * `withRecusive` call you make.
     *
     * See the {@link with} method for examples and more documentation.
     */
    withRecursive(nameOrBuilder, expression) {
        const cte = parseCommonTableExpression(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode
                ? WithNode.cloneWithExpression(this.#props.withNode, cte)
                : WithNode.create(cte, { recursive: true }),
        });
    }
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    /**
     * Returns a copy of this query creator instance without any plugins.
     */
    withoutPlugins() {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */
    withSchema(schema) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
}

/// <reference types="./parse-utils.d.ts" />
function createQueryCreator() {
    return new QueryCreator({
        executor: NOOP_QUERY_EXECUTOR,
    });
}
function createJoinBuilder(joinType, table) {
    return new JoinBuilder({
        joinNode: JoinNode.create(joinType, parseTableExpression(table)),
    });
}
function createOverBuilder() {
    return new OverBuilder({
        overNode: OverNode.create(),
    });
}

/// <reference types="./join-parser.d.ts" />
function parseJoin(joinType, args) {
    if (args.length === 3) {
        return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
    }
    else if (args.length === 2) {
        return parseCallbackJoin(joinType, args[0], args[1]);
    }
    else {
        throw new Error('not implemented');
    }
}
function parseCallbackJoin(joinType, from, callback) {
    return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
    return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, '=', rhsColumn));
}

/// <reference types="./offset-node.d.ts" />
/**
 * @internal
 */
const OffsetNode = freeze({
    is(node) {
        return node.kind === 'OffsetNode';
    },
    create(offset) {
        return freeze({
            kind: 'OffsetNode',
            offset,
        });
    },
});

/// <reference types="./group-by-item-node.d.ts" />
/**
 * @internal
 */
const GroupByItemNode = freeze({
    is(node) {
        return node.kind === 'GroupByItemNode';
    },
    create(groupBy) {
        return freeze({
            kind: 'GroupByItemNode',
            groupBy,
        });
    },
});

/// <reference types="./group-by-parser.d.ts" />
function parseGroupBy(groupBy) {
    groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
    return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}

/// <reference types="./set-operation-node.d.ts" />
/**
 * @internal
 */
const SetOperationNode = freeze({
    is(node) {
        return node.kind === 'SetOperationNode';
    },
    create(operator, expression, all) {
        return freeze({
            kind: 'SetOperationNode',
            operator,
            expression,
            all,
        });
    },
});

/// <reference types="./set-operation-parser.d.ts" />
function parseSetOperations(operator, expression, all) {
    if (isFunction(expression)) {
        expression = expression(createExpressionBuilder());
    }
    if (!isReadonlyArray(expression)) {
        expression = [expression];
    }
    return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}

/// <reference types="./expression-wrapper.d.ts" />
class ExpressionWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    and(...args) {
        return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `ExpressionWrapper` with a new output type.
     */
    $castTo() {
        return new ExpressionWrapper(this.#node);
    }
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull() {
        return new ExpressionWrapper(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedExpressionWrapper {
    #expr;
    #alias;
    constructor(expr, alias) {
        this.#expr = expr;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#expr;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#expr.toOperationNode(), isOperationNodeSource(this.#alias)
            ? this.#alias.toOperationNode()
            : IdentifierNode.create(this.#alias));
    }
}
class OrWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `OrWrapper` with a new output type.
     */
    $castTo() {
        return new OrWrapper(this.#node);
    }
    toOperationNode() {
        return ParensNode.create(this.#node);
    }
}
class AndWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    and(...args) {
        return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AndWrapper` with a new output type.
     */
    $castTo() {
        return new AndWrapper(this.#node);
    }
    toOperationNode() {
        return ParensNode.create(this.#node);
    }
}

/// <reference types="./fetch-node.d.ts" />
/**
 * @internal
 */
const FetchNode = {
    is(node) {
        return node.kind === 'FetchNode';
    },
    create(rowCount, modifier) {
        return {
            kind: 'FetchNode',
            rowCount: ValueNode.create(rowCount),
            modifier,
        };
    },
};

/// <reference types="./fetch-parser.d.ts" />
function parseFetch(rowCount, modifier) {
    if (!isNumber(rowCount) && !isBigInt(rowCount)) {
        throw new Error(`Invalid fetch row count: ${rowCount}`);
    }
    if (!isFetchModifier(modifier)) {
        throw new Error(`Invalid fetch modifier: ${modifier}`);
    }
    return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
    return value === 'only' || value === 'with ties';
}

/// <reference types="./select-query-builder.d.ts" />
class SelectQueryBuilderImpl {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    get expressionType() {
        return undefined;
    }
    get isSelectQueryBuilder() {
        return true;
    }
    where(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    having(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    havingRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    select(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    distinctOn(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, parseReferenceExpressionOrList(selection)),
        });
    }
    modifyFront(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode())),
        });
    }
    modifyEnd(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode())),
        });
    }
    distinct() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.create('Distinct')),
        });
    }
    forUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForUpdate', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForShare', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forKeyShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForKeyShare', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forNoKeyUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForNoKeyUpdate', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    skipLocked() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('SkipLocked')),
        });
    }
    noWait() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('NoWait')),
        });
    }
    selectAll(table) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    innerJoin(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('InnerJoin', args)),
        });
    }
    leftJoin(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('LeftJoin', args)),
        });
    }
    rightJoin(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('RightJoin', args)),
        });
    }
    fullJoin(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('FullJoin', args)),
        });
    }
    innerJoinLateral(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('LateralInnerJoin', args)),
        });
    }
    leftJoinLateral(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin('LateralLeftJoin', args)),
        });
    }
    orderBy(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args)),
        });
    }
    groupBy(groupBy) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, parseGroupBy(groupBy)),
        });
    }
    limit(limit) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    offset(offset) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithOffset(this.#props.queryNode, OffsetNode.create(parseValueExpression(offset))),
        });
    }
    fetch(rowCount, modifier = 'only') {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFetch(this.#props.queryNode, parseFetch(rowCount, modifier)),
        });
    }
    top(expression, modifiers) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    union(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('union', expression, false)),
        });
    }
    unionAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('union', expression, true)),
        });
    }
    intersect(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('intersect', expression, false)),
        });
    }
    intersectAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('intersect', expression, true)),
        });
    }
    except(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('except', expression, false)),
        });
    }
    exceptAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('except', expression, true)),
        });
    }
    as(alias) {
        return new AliasedSelectQueryBuilderImpl(this, alias);
    }
    clearSelect() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutSelections(this.#props.queryNode),
        });
    }
    clearWhere() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    clearLimit() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutLimit(this.#props.queryNode),
        });
    }
    clearOffset() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutOffset(this.#props.queryNode),
        });
    }
    clearOrderBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutOrderBy(this.#props.queryNode),
        });
    }
    clearGroupBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutGroupBy(this.#props.queryNode),
        });
    }
    $call(func) {
        return func(this);
    }
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new SelectQueryBuilderImpl({
            ...this.#props,
        });
    }
    $castTo() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $narrowType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $assertType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $asTuple() {
        return new ExpressionWrapper(this.toOperationNode());
    }
    withPlugin(plugin) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        return result.rows;
    }
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}
preventAwait(SelectQueryBuilderImpl, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
function createSelectQueryBuilder(props) {
    return new SelectQueryBuilderImpl(props);
}
/**
 * {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
 */
class AliasedSelectQueryBuilderImpl {
    #queryBuilder;
    #alias;
    constructor(queryBuilder, alias) {
        this.#queryBuilder = queryBuilder;
        this.#alias = alias;
    }
    get expression() {
        return this.#queryBuilder;
    }
    get alias() {
        return this.#alias;
    }
    get isAliasedSelectQueryBuilder() {
        return true;
    }
    toOperationNode() {
        return AliasNode.create(this.#queryBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
    }
}
preventAwait(AliasedSelectQueryBuilderImpl, "don't await AliasedSelectQueryBuilder instances directly. AliasedSelectQueryBuilder should never be executed directly since it's always a part of another query.");

/// <reference types="./aggregate-function-node.d.ts" />
/**
 * @internal
 */
const AggregateFunctionNode = freeze({
    is(node) {
        return node.kind === 'AggregateFunctionNode';
    },
    create(aggregateFunction, aggregated = []) {
        return freeze({
            kind: 'AggregateFunctionNode',
            func: aggregateFunction,
            aggregated,
        });
    },
    cloneWithDistinct(aggregateFunctionNode) {
        return freeze({
            ...aggregateFunctionNode,
            distinct: true,
        });
    },
    cloneWithOrderBy(aggregateFunctionNode, orderItems) {
        return freeze({
            ...aggregateFunctionNode,
            orderBy: aggregateFunctionNode.orderBy
                ? OrderByNode.cloneWithItems(aggregateFunctionNode.orderBy, orderItems)
                : OrderByNode.create(orderItems),
        });
    },
    cloneWithFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'And', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOrFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'Or', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOver(aggregateFunctionNode, over) {
        return freeze({
            ...aggregateFunctionNode,
            over,
        });
    },
});

/// <reference types="./function-node.d.ts" />
/**
 * @internal
 */
const FunctionNode = freeze({
    is(node) {
        return node.kind === 'FunctionNode';
    },
    create(func, args) {
        return freeze({
            kind: 'FunctionNode',
            func,
            arguments: args,
        });
    },
});

/// <reference types="./aggregate-function-builder.d.ts" />
class AggregateFunctionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */
    as(alias) {
        return new AliasedAggregateFunctionBuilder(this, alias);
    }
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */
    distinct() {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode),
        });
    }
    /**
     * Adds an `order by` clause inside the aggregate function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) =>
     *     eb.fn.jsonAgg('pet').orderBy('pet.name').as('person_pets')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select json_agg("pet" order by "pet"."name") as "person_pets"
     * from "person"
     * inner join "pet" ON "pet"."owner_id" = "person"."id"
     * ```
     */
    orderBy(orderBy, direction) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(this.#props.aggregateFunctionNode, parseOrderBy([orderBy, direction])),
        });
    }
    filterWhere(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhereRef('first_name', '=', 'last_name')
     *       .as('repeat_name_count'),
     *     eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereRef(lhs, op, rhs) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */
    over(over) {
        const builder = createOverBuilder();
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode()),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    /**
     * Casts the expression to the given type.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AggregateFunctionBuilder` with a new output type.
     */
    $castTo() {
        return new AggregateFunctionBuilder(this.#props);
    }
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull() {
        return new AggregateFunctionBuilder(this.#props);
    }
    toOperationNode() {
        return this.#props.aggregateFunctionNode;
    }
}
preventAwait(AggregateFunctionBuilder, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
/**
 * {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
 */
class AliasedAggregateFunctionBuilder {
    #aggregateFunctionBuilder;
    #alias;
    constructor(aggregateFunctionBuilder, alias) {
        this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#aggregateFunctionBuilder;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
    }
}

/// <reference types="./function-module.d.ts" />
function createFunctionModule() {
    const fn = (name, args) => {
        return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
    };
    const agg = (name, args) => {
        return new AggregateFunctionBuilder({
            aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : undefined),
        });
    };
    return Object.assign(fn, {
        agg,
        avg(column) {
            return agg('avg', [column]);
        },
        coalesce(...values) {
            return fn('coalesce', values);
        },
        count(column) {
            return agg('count', [column]);
        },
        countAll(table) {
            return new AggregateFunctionBuilder({
                aggregateFunctionNode: AggregateFunctionNode.create('count', parseSelectAll(table)),
            });
        },
        max(column) {
            return agg('max', [column]);
        },
        min(column) {
            return agg('min', [column]);
        },
        sum(column) {
            return agg('sum', [column]);
        },
        any(column) {
            return fn('any', [column]);
        },
        jsonAgg(table) {
            return new AggregateFunctionBuilder({
                aggregateFunctionNode: AggregateFunctionNode.create('json_agg', [
                    isString(table) ? parseTable(table) : table.toOperationNode(),
                ]),
            });
        },
        toJson(table) {
            return new ExpressionWrapper(FunctionNode.create('to_json', [
                isString(table) ? parseTable(table) : table.toOperationNode(),
            ]));
        },
    });
}

/// <reference types="./unary-operation-node.d.ts" />
/**
 * @internal
 */
const UnaryOperationNode = freeze({
    is(node) {
        return node.kind === 'UnaryOperationNode';
    },
    create(operator, operand) {
        return freeze({
            kind: 'UnaryOperationNode',
            operator,
            operand,
        });
    },
});

/// <reference types="./unary-operation-parser.d.ts" />
function parseUnaryOperation(operator, operand) {
    return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}

/// <reference types="./case-node.d.ts" />
/**
 * @internal
 */
const CaseNode = freeze({
    is(node) {
        return node.kind === 'CaseNode';
    },
    create(value) {
        return freeze({
            kind: 'CaseNode',
            value,
        });
    },
    cloneWithWhen(caseNode, when) {
        return freeze({
            ...caseNode,
            when: freeze(caseNode.when ? [...caseNode.when, when] : [when]),
        });
    },
    cloneWithThen(caseNode, then) {
        return freeze({
            ...caseNode,
            when: caseNode.when
                ? freeze([
                    ...caseNode.when.slice(0, -1),
                    WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then),
                ])
                : undefined,
        });
    },
    cloneWith(caseNode, props) {
        return freeze({
            ...caseNode,
            ...props,
        });
    },
});

/// <reference types="./case-builder.d.ts" />
class CaseBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args))),
        });
    }
}
class CaseThenBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    then(valueExpression) {
        return new CaseWhenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithThen(this.#props.node, isSafeImmediateValue(valueExpression)
                ? parseSafeImmediateValue(valueExpression)
                : parseValueExpression(valueExpression)),
        });
    }
}
class CaseWhenBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args))),
        });
    }
    else(valueExpression) {
        return new CaseEndBuilder({
            ...this.#props,
            node: CaseNode.cloneWith(this.#props.node, {
                else: isSafeImmediateValue(valueExpression)
                    ? parseSafeImmediateValue(valueExpression)
                    : parseValueExpression(valueExpression),
            }),
        });
    }
    end() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
    }
    endCase() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
    }
}
class CaseEndBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    end() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
    }
    endCase() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
    }
}

/// <reference types="./json-path-leg-node.d.ts" />
/**
 * @internal
 */
const JSONPathLegNode = freeze({
    is(node) {
        return node.kind === 'JSONPathLegNode';
    },
    create(type, value) {
        return freeze({
            kind: 'JSONPathLegNode',
            type,
            value,
        });
    },
});

/// <reference types="./json-path-builder.d.ts" />
class JSONPathBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Access an element of a JSON array in a specific location.
     *
     * Since there's no guarantee an element exists in the given array location, the
     * resulting type is always nullable. If you're sure the element exists, you
     * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
     *
     * See also {@link key} to access properties of JSON objects.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(eb =>
     *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "nicknames"->0 as "primary_nickname" from "person"
     *```
     *
     * Combined with {@link key}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('experience', '->').at(0).key('role').as('first_role')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "experience"->0->'role' as "first_role" from "person"
     * ```
     *
     * You can use `'last'` to access the last element of the array in MySQL:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `nicknames`->'$[last]' as `last_nickname` from `person`
     * ```
     *
     * Or `'#-1'` in SQLite:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
     * ```
     */
    at(index) {
        return this.#createBuilderWithPathLeg('ArrayLocation', index);
    }
    /**
     * Access a property of a JSON object.
     *
     * If a field is optional, the resulting type will be nullable.
     *
     * See also {@link at} to access elements of JSON arrays.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('address', '->').key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "address"->'city' as "city" from "person"
     * ```
     *
     * Going deeper:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `profile`->'$.website.url' as `website_url` from `person`
     * ```
     *
     * Combined with {@link at}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "profile"->'addresses'->0->'city' as "city" from "person"
     * ```
     */
    key(key) {
        return this.#createBuilderWithPathLeg('Member', key);
    }
    #createBuilderWithPathLeg(legType, value) {
        if (JSONReferenceNode.is(this.#node)) {
            return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(this.#node, JSONPathNode.is(this.#node.traversal)
                ? JSONPathNode.cloneWithLeg(this.#node.traversal, JSONPathLegNode.create(legType, value))
                : JSONOperatorChainNode.cloneWithValue(this.#node.traversal, ValueNode.createImmediate(value))));
        }
        return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(this.#node, JSONPathLegNode.create(legType, value)));
    }
}
class TraversedJSONPathBuilder extends JSONPathBuilder {
    #node;
    constructor(node) {
        super(node);
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedJSONPathBuilder(this, alias);
    }
    /**
     * Change the output type of the json path.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `JSONPathBuilder` with a new output type.
     */
    $castTo() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    $notNull() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedJSONPathBuilder {
    #jsonPath;
    #alias;
    constructor(jsonPath, alias) {
        this.#jsonPath = jsonPath;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#jsonPath;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#jsonPath.toOperationNode(), isOperationNodeSource(this.#alias)
            ? this.#alias.toOperationNode()
            : IdentifierNode.create(this.#alias));
    }
}

/// <reference types="./tuple-node.d.ts" />
/**
 * @internal
 */
const TupleNode = freeze({
    is(node) {
        return node.kind === 'TupleNode';
    },
    create(values) {
        return freeze({
            kind: 'TupleNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./data-type-node.d.ts" />
const SIMPLE_COLUMN_DATA_TYPES = [
    'varchar',
    'char',
    'text',
    'integer',
    'int2',
    'int4',
    'int8',
    'smallint',
    'bigint',
    'boolean',
    'real',
    'double precision',
    'float4',
    'float8',
    'decimal',
    'numeric',
    'binary',
    'bytea',
    'date',
    'datetime',
    'time',
    'timetz',
    'timestamp',
    'timestamptz',
    'serial',
    'bigserial',
    'uuid',
    'json',
    'jsonb',
    'blob',
    'varbinary',
    'int4range',
    'int4multirange',
    'int8range',
    'int8multirange',
    'numrange',
    'nummultirange',
    'tsrange',
    'tsmultirange',
    'tstzrange',
    'tstzmultirange',
    'daterange',
    'datemultirange',
];
const COLUMN_DATA_TYPE_REGEX = [
    /^varchar\(\d+\)$/,
    /^char\(\d+\)$/,
    /^decimal\(\d+, \d+\)$/,
    /^numeric\(\d+, \d+\)$/,
    /^binary\(\d+\)$/,
    /^datetime\(\d+\)$/,
    /^time\(\d+\)$/,
    /^timetz\(\d+\)$/,
    /^timestamp\(\d+\)$/,
    /^timestamptz\(\d+\)$/,
    /^varbinary\(\d+\)$/,
];
/**
 * @internal
 */
const DataTypeNode = freeze({
    is(node) {
        return node.kind === 'DataTypeNode';
    },
    create(dataType) {
        return freeze({
            kind: 'DataTypeNode',
            dataType,
        });
    },
});
function isColumnDataType(dataType) {
    if (SIMPLE_COLUMN_DATA_TYPES.includes(dataType)) {
        return true;
    }
    if (COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType))) {
        return true;
    }
    return false;
}

/// <reference types="./data-type-parser.d.ts" />
function parseDataTypeExpression(dataType) {
    if (isOperationNodeSource(dataType)) {
        return dataType.toOperationNode();
    }
    if (isColumnDataType(dataType)) {
        return DataTypeNode.create(dataType);
    }
    throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}

/// <reference types="./cast-node.d.ts" />
/**
 * @internal
 */
const CastNode = freeze({
    is(node) {
        return node.kind === 'CastNode';
    },
    create(expression, dataType) {
        return freeze({
            kind: 'CastNode',
            expression,
            dataType,
        });
    },
});

/// <reference types="./expression-builder.d.ts" />
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
    function binary(lhs, op, rhs) {
        return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    }
    function unary(op, expr) {
        return new ExpressionWrapper(parseUnaryOperation(op, expr));
    }
    const eb = Object.assign(binary, {
        fn: undefined,
        eb: undefined,
        selectFrom(table) {
            return createSelectQueryBuilder({
                queryId: createQueryId(),
                executor,
                queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table)),
            });
        },
        case(reference) {
            return new CaseBuilder({
                node: CaseNode.create(isUndefined(reference)
                    ? undefined
                    : parseReferenceExpression(reference)),
            });
        },
        ref(reference, op) {
            if (isUndefined(op)) {
                return new ExpressionWrapper(parseStringReference(reference));
            }
            return new JSONPathBuilder(parseJSONReference(reference, op));
        },
        jsonPath() {
            return new JSONPathBuilder(JSONPathNode.create());
        },
        table(table) {
            return new ExpressionWrapper(parseTable(table));
        },
        val(value) {
            return new ExpressionWrapper(parseValueExpression(value));
        },
        refTuple(...values) {
            return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
        },
        tuple(...values) {
            return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
        },
        lit(value) {
            return new ExpressionWrapper(parseSafeImmediateValue(value));
        },
        unary,
        not(expr) {
            return unary('not', expr);
        },
        exists(expr) {
            return unary('exists', expr);
        },
        neg(expr) {
            return unary('-', expr);
        },
        between(expr, start, end) {
            return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create('between'), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
        },
        betweenSymmetric(expr, start, end) {
            return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create('between symmetric'), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
        },
        and(exprs) {
            if (isReadonlyArray(exprs)) {
                return new ExpressionWrapper(parseFilterList(exprs, 'and'));
            }
            return new ExpressionWrapper(parseFilterObject(exprs, 'and'));
        },
        or(exprs) {
            if (isReadonlyArray(exprs)) {
                return new ExpressionWrapper(parseFilterList(exprs, 'or'));
            }
            return new ExpressionWrapper(parseFilterObject(exprs, 'or'));
        },
        parens(...args) {
            const node = parseValueBinaryOperationOrExpression(args);
            if (ParensNode.is(node)) {
                // No double wrapping.
                return new ExpressionWrapper(node);
            }
            else {
                return new ExpressionWrapper(ParensNode.create(node));
            }
        },
        cast(expr, dataType) {
            return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
        },
        withSchema(schema) {
            return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
        },
    });
    eb.fn = createFunctionModule();
    eb.eb = eb;
    return eb;
}
function expressionBuilder(_) {
    return createExpressionBuilder();
}

/// <reference types="./expression-parser.d.ts" />
function parseExpression(exp) {
    if (isOperationNodeSource(exp)) {
        return exp.toOperationNode();
    }
    else if (isFunction(exp)) {
        return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
    if (isOperationNodeSource(exp)) {
        return exp.toOperationNode();
    }
    else if (isFunction(exp)) {
        return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
    return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}

/// <reference types="./table-parser.d.ts" />
function parseTableExpressionOrList(table) {
    if (isReadonlyArray(table)) {
        return table.map((it) => parseTableExpression(it));
    }
    else {
        return [parseTableExpression(table)];
    }
}
function parseTableExpression(table) {
    if (isString(table)) {
        return parseAliasedTable(table);
    }
    else {
        return parseAliasedExpression(table);
    }
}
function parseAliasedTable(from) {
    const ALIAS_SEPARATOR = ' as ';
    if (from.includes(ALIAS_SEPARATOR)) {
        const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
        return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
    }
    else {
        return parseTable(from);
    }
}
function parseTable(from) {
    const SCHEMA_SEPARATOR = '.';
    if (from.includes(SCHEMA_SEPARATOR)) {
        const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
        return TableNode.createWithSchema(schema, table);
    }
    else {
        return TableNode.create(from);
    }
}
function trim$1(str) {
    return str.trim();
}

/// <reference types="./add-column-node.d.ts" />
/**
 * @internal
 */
const AddColumnNode = freeze({
    is(node) {
        return node.kind === 'AddColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'AddColumnNode',
            column,
        });
    },
});

/// <reference types="./column-definition-node.d.ts" />
/**
 * @internal
 */
const ColumnDefinitionNode = freeze({
    is(node) {
        return node.kind === 'ColumnDefinitionNode';
    },
    create(column, dataType) {
        return freeze({
            kind: 'ColumnDefinitionNode',
            column: ColumnNode.create(column),
            dataType,
        });
    },
    cloneWithFrontModifier(node, modifier) {
        return freeze({
            ...node,
            frontModifiers: node.frontModifiers
                ? freeze([...node.frontModifiers, modifier])
                : [modifier],
        });
    },
    cloneWithEndModifier(node, modifier) {
        return freeze({
            ...node,
            endModifiers: node.endModifiers
                ? freeze([...node.endModifiers, modifier])
                : [modifier],
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./drop-column-node.d.ts" />
/**
 * @internal
 */
const DropColumnNode = freeze({
    is(node) {
        return node.kind === 'DropColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'DropColumnNode',
            column: ColumnNode.create(column),
        });
    },
});

/// <reference types="./rename-column-node.d.ts" />
/**
 * @internal
 */
const RenameColumnNode = freeze({
    is(node) {
        return node.kind === 'RenameColumnNode';
    },
    create(column, newColumn) {
        return freeze({
            kind: 'RenameColumnNode',
            column: ColumnNode.create(column),
            renameTo: ColumnNode.create(newColumn),
        });
    },
});

/// <reference types="./check-constraint-node.d.ts" />
/**
 * @internal
 */
const CheckConstraintNode = freeze({
    is(node) {
        return node.kind === 'CheckConstraintNode';
    },
    create(expression, constraintName) {
        return freeze({
            kind: 'CheckConstraintNode',
            expression,
            name: constraintName ? IdentifierNode.create(constraintName) : undefined,
        });
    },
});

/// <reference types="./references-node.d.ts" />
const ON_MODIFY_FOREIGN_ACTIONS = [
    'no action',
    'restrict',
    'cascade',
    'set null',
    'set default',
];
/**
 * @internal
 */
const ReferencesNode = freeze({
    is(node) {
        return node.kind === 'ReferencesNode';
    },
    create(table, columns) {
        return freeze({
            kind: 'ReferencesNode',
            table,
            columns: freeze([...columns]),
        });
    },
    cloneWithOnDelete(references, onDelete) {
        return freeze({
            ...references,
            onDelete,
        });
    },
    cloneWithOnUpdate(references, onUpdate) {
        return freeze({
            ...references,
            onUpdate,
        });
    },
});

/// <reference types="./default-value-parser.d.ts" />
function parseDefaultValueExpression(value) {
    return isOperationNodeSource(value)
        ? value.toOperationNode()
        : ValueNode.createImmediate(value);
}

/// <reference types="./generated-node.d.ts" />
/**
 * @internal
 */
const GeneratedNode = freeze({
    is(node) {
        return node.kind === 'GeneratedNode';
    },
    create(params) {
        return freeze({
            kind: 'GeneratedNode',
            ...params,
        });
    },
    createWithExpression(expression) {
        return freeze({
            kind: 'GeneratedNode',
            always: true,
            expression,
        });
    },
    cloneWith(node, params) {
        return freeze({
            ...node,
            ...params,
        });
    },
});

/// <reference types="./default-value-node.d.ts" />
/**
 * @internal
 */
const DefaultValueNode = freeze({
    is(node) {
        return node.kind === 'DefaultValueNode';
    },
    create(defaultValue) {
        return freeze({
            kind: 'DefaultValueNode',
            defaultValue,
        });
    },
});

/// <reference types="./on-modify-action-parser.d.ts" />
function parseOnModifyForeignAction(action) {
    if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
        return action;
    }
    throw new Error(`invalid OnModifyForeignAction ${action}`);
}

/// <reference types="./column-definition-builder.d.ts" />
class ColumnDefinitionBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key auto_increment
     * )
     * ```
     */
    autoIncrement() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
    }
    /**
     * Makes the column an identity column.
     *
     * This only works on some dialects like MS SQL Server (MSSQL).
     *
     * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.identity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer identity primary key
     * )
     * ```
     */
    identity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { identity: true }));
    }
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key
     * )
     */
    primaryKey() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
    }
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id")
     * )
     * ```
     */
    references(ref) {
        const references = parseStringReference(ref);
        if (!references.table || SelectAllNode.is(references.column)) {
            throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.create(references.table, [
                references.column,
            ]),
        }));
    }
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on delete cascade
     * )
     * ```
     */
    onDelete(onDelete) {
        if (!this.#node.references) {
            throw new Error('on delete constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.cloneWithOnDelete(this.#node.references, parseOnModifyForeignAction(onDelete)),
        }));
    }
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onUpdate('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on update cascade
     * )
     * ```
     */
    onUpdate(onUpdate) {
        if (!this.#node.references) {
            throw new Error('on update constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.cloneWithOnUpdate(this.#node.references, parseOnModifyForeignAction(onUpdate)),
        }));
    }
    /**
     * Adds a unique constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `email` varchar(255) unique
     * )
     * ```
     */
    unique() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
    }
    /**
     * Adds a `not null` constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `first_name` varchar(255) not null
     * )
     * ```
     */
    notNull() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
    }
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('age', 'integer', col => col.unsigned())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `age` integer unsigned
     * )
     * ```
     */
    unsigned() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
    }
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer default 4
     * )
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'created_at',
     *     'timestamp',
     *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `created_at` timestamp default CURRENT_TIMESTAMP
     * )
     * ```
     */
    defaultTo(value) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value)),
        }));
    }
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer check (number_of_legs < 5)
     * )
     * ```
     */
    check(expression) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            check: CheckConstraintNode.create(expression.toOperationNode()),
        }));
    }
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
     * )
     * ```
     */
    generatedAlwaysAs(expression) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.createWithExpression(expression.toOperationNode()),
        }));
    }
    /**
     * Adds the `generated always as identity` specifier.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated always as identity primary key
     * )
     * ```
     */
    generatedAlwaysAsIdentity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.create({ identity: true, always: true }),
        }));
    }
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated by default as identity primary key
     * )
     * ```
     */
    generatedByDefaultAsIdentity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.create({ identity: true, byDefault: true }),
        }));
    }
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *     .stored()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
     * )
     * ```
     */
    stored() {
        if (!this.#node.generated) {
            throw new Error('stored() can only be called after generatedAlwaysAs');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.cloneWith(this.#node.generated, {
                stored: true,
            }),
        }));
    }
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'first_name',
     *     'varchar(36)',
     *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */
    modifyFront(modifier) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Adds `nulls not distinct` specifier.
     * Should be used with `unique` constraint.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(30) unique nulls not distinct
     * )
     * ```
     */
    nullsNotDistinct() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
    /**
     * Adds `if not exists` specifier. This only works for PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * alter table "person" add column if not exists "email" varchar(255) unique
     * ```
     */
    ifNotExists() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { ifNotExists: true }));
    }
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'age',
     *     'integer',
     *     col => col.unsigned()
     *       .notNull()
     *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */
    modifyEnd(modifier) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
preventAwait(ColumnDefinitionBuilder, "don't await ColumnDefinitionBuilder instances directly.");

/// <reference types="./modify-column-node.d.ts" />
/**
 * @internal
 */
const ModifyColumnNode = freeze({
    is(node) {
        return node.kind === 'ModifyColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'ModifyColumnNode',
            column,
        });
    },
});

/// <reference types="./foreign-key-constraint-node.d.ts" />
/**
 * @internal
 */
const ForeignKeyConstraintNode = freeze({
    is(node) {
        return node.kind === 'ForeignKeyConstraintNode';
    },
    create(sourceColumns, targetTable, targetColumns, constraintName) {
        return freeze({
            kind: 'ForeignKeyConstraintNode',
            columns: sourceColumns,
            references: ReferencesNode.create(targetTable, targetColumns),
            name: constraintName ? IdentifierNode.create(constraintName) : undefined,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./foreign-key-constraint-builder.d.ts" />
class ForeignKeyConstraintBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    onDelete(onDelete) {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            onDelete: parseOnModifyForeignAction(onDelete),
        }));
    }
    onUpdate(onUpdate) {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            onUpdate: parseOnModifyForeignAction(onUpdate),
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
preventAwait(ForeignKeyConstraintBuilder, "don't await ForeignKeyConstraintBuilder instances directly.");

/// <reference types="./add-constraint-node.d.ts" />
/**
 * @internal
 */
const AddConstraintNode = freeze({
    is(node) {
        return node.kind === 'AddConstraintNode';
    },
    create(constraint) {
        return freeze({
            kind: 'AddConstraintNode',
            constraint,
        });
    },
});

/// <reference types="./unique-constraint-node.d.ts" />
/**
 * @internal
 */
const UniqueConstraintNode = freeze({
    is(node) {
        return node.kind === 'UniqueConstraintNode';
    },
    create(columns, constraintName, nullsNotDistinct) {
        return freeze({
            kind: 'UniqueConstraintNode',
            columns: freeze(columns.map(ColumnNode.create)),
            name: constraintName ? IdentifierNode.create(constraintName) : undefined,
            nullsNotDistinct,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./drop-constraint-node.d.ts" />
/**
 * @internal
 */
const DropConstraintNode = freeze({
    is(node) {
        return node.kind === 'DropConstraintNode';
    },
    create(constraintName) {
        return freeze({
            kind: 'DropConstraintNode',
            constraintName: IdentifierNode.create(constraintName),
        });
    },
    cloneWith(dropConstraint, props) {
        return freeze({
            ...dropConstraint,
            ...props,
        });
    },
});

/// <reference types="./alter-column-node.d.ts" />
/**
 * @internal
 */
const AlterColumnNode = freeze({
    is(node) {
        return node.kind === 'AlterColumnNode';
    },
    create(column, prop, value) {
        return freeze({
            kind: 'AlterColumnNode',
            column: ColumnNode.create(column),
            [prop]: value,
        });
    },
});

/// <reference types="./alter-column-builder.d.ts" />
class AlterColumnBuilder {
    #column;
    constructor(column) {
        this.#column = column;
    }
    setDataType(dataType) {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dataType', parseDataTypeExpression(dataType)));
    }
    setDefault(value) {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'setDefault', parseDefaultValueExpression(value)));
    }
    dropDefault() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dropDefault', true));
    }
    setNotNull() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'setNotNull', true));
    }
    dropNotNull() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dropNotNull', true));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
}
preventAwait(AlterColumnBuilder, "don't await AlterColumnBuilder instances");
/**
 * Allows us to force consumers to do exactly one alteration to a column.
 *
 * One cannot do no alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .execute() // Property 'execute' does not exist on type 'AlteredColumnBuilder'.
 * ```
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac) // Type 'AlterColumnBuilder' is not assignable to type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * One cannot do multiple alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac.dropNotNull().setNotNull()) // Property 'setNotNull' does not exist on type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
class AlteredColumnBuilder {
    #alterColumnNode;
    constructor(alterColumnNode) {
        this.#alterColumnNode = alterColumnNode;
    }
    toOperationNode() {
        return this.#alterColumnNode;
    }
}
preventAwait(AlteredColumnBuilder, "don't await AlteredColumnBuilder instances");

/// <reference types="./alter-table-executor.d.ts" />
class AlterTableExecutor {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");

/// <reference types="./alter-table-add-foreign-key-constraint-builder.d.ts" />
class AlterTableAddForeignKeyConstraintBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    onDelete(onDelete) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete),
        });
    }
    onUpdate(onUpdate) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode()),
        }), this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./alter-table-drop-constraint-builder.d.ts" />
class AlterTableDropConstraintBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    ifExists: true,
                }),
            }),
        });
    }
    cascade() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'cascade',
                }),
            }),
        });
    }
    restrict() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'restrict',
                }),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(AlterTableDropConstraintBuilder, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./primary-constraint-node.d.ts" />
/**
 * @internal
 */
const PrimaryConstraintNode = freeze({
    is(node) {
        return node.kind === 'PrimaryKeyConstraintNode';
    },
    create(columns, constraintName) {
        return freeze({
            kind: 'PrimaryKeyConstraintNode',
            columns: freeze(columns.map(ColumnNode.create)),
            name: constraintName ? IdentifierNode.create(constraintName) : undefined,
        });
    },
});

/// <reference types="./add-index-node.d.ts" />
/**
 * @internal
 */
const AddIndexNode = freeze({
    is(node) {
        return node.kind === 'AddIndexNode';
    },
    create(name) {
        return freeze({
            kind: 'AddIndexNode',
            name: IdentifierNode.create(name),
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumns(node, columns) {
        return freeze({
            ...node,
            columns: [...(node.columns || []), ...columns],
        });
    },
});

/// <reference types="./alter-table-add-index-builder.d.ts" />
class AlterTableAddIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Makes the index unique.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .unique()
     *   .column('email')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_first_name_index` (`email`)
     * ```
     */
    unique() {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
                    unique: true,
                }),
            }),
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .column('first_name')
     *   .column('age desc')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    column(column) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
                    parseOrderedColumnName(column),
                ]),
            }),
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .columns(['first_name', 'age desc'])
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    columns(columns) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, columns.map(parseOrderedColumnName)),
            }),
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .expression(sql<boolean>`(first_name < 'Sami')`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
     * ```
     */
    expression(expression) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
                    expression.toOperationNode(),
                ]),
            }),
        });
    }
    using(indexType) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
                    using: RawNode.createWithSql(indexType),
                }),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(AlterTableAddIndexBuilder, "don't await AlterTableAddIndexBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./unique-constraint-builder.d.ts" />
class UniqueConstraintNodeBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    toOperationNode() {
        return this.#node;
    }
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */
    nullsNotDistinct() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
}
preventAwait(UniqueConstraintNodeBuilder, "don't await UniqueConstraintNodeBuilder instances directly.");

/// <reference types="./alter-table-builder.d.ts" />
/**
 * This builder can be used to create a `alter table` query.
 */
class AlterTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    renameTo(newTableName) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                renameTo: parseTable(newTableName),
            }),
        });
    }
    setSchema(newSchema) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                setSchema: IdentifierNode.create(newSchema),
            }),
        });
    }
    alterColumn(column, alteration) {
        const builder = alteration(new AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode()),
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column)),
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn)),
        });
    }
    addColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode())),
        });
    }
    modifyColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode())),
        });
    }
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */
    addUniqueConstraint(constraintName, columns, build = noop) {
        const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode()),
            }),
        });
    }
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */
    addCheckConstraint(constraintName, checkExpression) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)),
            }),
        });
    }
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)),
        });
    }
    /**
     * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
     */
    addPrimaryKeyConstraint(constraintName, columns) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(PrimaryConstraintNode.create(columns, constraintName)),
            }),
        });
    }
    dropConstraint(constraintName) {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.create(constraintName),
            }),
        });
    }
    /**
     * This can be used to add index to table.
     *
     *  ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .addIndex('person_email_index')
     *   .column('email')
     *   .unique()
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_email_index` (`email`)
     * ```
     */
    addIndex(indexName) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.create(indexName),
            }),
        });
    }
    /**
     * This can be used to drop index from table.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .dropIndex('person_email_index')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` drop index `test_first_name_index`
     * ```
     */
    dropIndex(indexName) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropIndex: DropIndexNode.create(indexName),
            }),
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.$call}
     */
    $call(func) {
        return func(this);
    }
}
preventAwait(AlterTableBuilder, "don't await AlterTableBuilder instances");
class AlterTableColumnAlteringBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    alterColumn(column, alteration) {
        const builder = alteration(new AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode()),
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column)),
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn)),
        });
    }
    addColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode())),
        });
    }
    modifyColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode())),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(AlterTableColumnAlteringBuilder, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./immediate-value-transformer.d.ts" />
/**
 * Transforms all ValueNodes to immediate.
 *
 * WARNING! This should never be part of the public API. Users should never use this.
 * This is an internal helper.
 *
 * @internal
 */
class ImmediateValueTransformer extends OperationNodeTransformer {
    transformValue(node) {
        return {
            ...super.transformValue(node),
            immediate: true,
        };
    }
}

/// <reference types="./create-index-builder.d.ts" />
class CreateIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the index already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    /**
     * Makes the index unique.
     */
    unique() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                unique: true,
            }),
        });
    }
    /**
     * Adds `nulls not distinct` specifier to index.
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createIndex('person_first_name_index')
     *  .on('person')
     *  .column('first_name')
     *  .nullsNotDistinct()
     *  .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index"
     * on "test" ("first_name")
     * nulls not distinct;
     * ```
     */
    nullsNotDistinct() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                nullsNotDistinct: true,
            }),
        });
    }
    /**
     * Specifies the table for the index.
     */
    on(table) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                table: parseTable(table),
            }),
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .column('first_name')
     *         .column('age desc')
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    column(column) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, [
                parseOrderedColumnName(column),
            ]),
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .columns(['first_name', 'age desc'])
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    columns(columns) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, columns.map(parseOrderedColumnName)),
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
     * ```
     */
    expression(expression) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, [
                expression.toOperationNode(),
            ]),
        });
    }
    using(indexType) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                using: RawNode.createWithSql(indexType),
            }),
        });
    }
    where(...args) {
        const transformer = new ImmediateValueTransformer();
        return new CreateIndexBuilder({
            ...this.#props,
            node: QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode(parseValueBinaryOperationOrExpression(args))),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./create-schema-builder.d.ts" />
class CreateSchemaBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifNotExists() {
        return new CreateSchemaBuilder({
            ...this.#props,
            node: CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateSchemaBuilder, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./on-commit-action-parse.d.ts" />
function parseOnCommitAction(action) {
    if (ON_COMMIT_ACTIONS.includes(action)) {
        return action;
    }
    throw new Error(`invalid OnCommitAction ${action}`);
}

/// <reference types="./create-table-builder.d.ts" />
/**
 * This builder can be used to create a `create table` query.
 */
class CreateTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary() {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                temporary: true,
            }),
        });
    }
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                onCommit: parseOnCommitAction(onCommit),
            }),
        });
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade')
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databases. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.primaryKey())
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk',
     *     ['parent_id'],
     *     'person',
     *     ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey())
     *   .execute()
     * ```
     */
    addColumn(columnName, dataType, build = noop) {
        const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    addPrimaryKeyConstraint(constraintName, columns) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, PrimaryConstraintNode.create(columns, constraintName)),
        });
    }
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name']
     *   )
     *   .execute()
     * ```
     *
     * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name'],
     *     (cb) => cb.nullsNotDistinct()
     *   )
     *   .execute()
     * ```
     */
    addUniqueConstraint(constraintName, columns, build = noop) {
        const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('animal')
     *   .addColumn('number_of_legs', 'integer')
     *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     *   .execute()
     * ```
     */
    addCheckConstraint(constraintName, checkExpression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)),
        });
    }
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id'],
     *     'person',
     *     ['id'],
     *   )
     *   .execute()
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id1', 'integer')
     *   .addColumn('owner_id2', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id1', 'owner_id2'],
     *     'person',
     *     ['id1', 'id2'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
        const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * Allows to create table from `select` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('copy')
     *   .temporary()
     *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create temporary table "copy" as
     * select "first_name", "last_name" from "person"
     * ```
     */
    as(expression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                selectQuery: parseExpression(expression),
            }),
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * This is useful for creating reusable functions that can be called with a builder.
     *
     * ```ts
     * import { type CreateTableBuilder, sql } from 'kysely'
     *
     * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
     *   return ctb
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * await db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./drop-index-builder.d.ts" />
class DropIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */
    on(table) {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                table: parseTable(table),
            }),
        });
    }
    ifExists() {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./drop-schema-builder.d.ts" />
class DropSchemaBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: DropSchemaNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: DropSchemaNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./drop-table-builder.d.ts" />
class DropTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropTableBuilder({
            ...this.#props,
            node: DropTableNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropTableBuilder({
            ...this.#props,
            node: DropTableNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(DropTableBuilder, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./create-view-node.d.ts" />
/**
 * @internal
 */
const CreateViewNode = freeze({
    is(node) {
        return node.kind === 'CreateViewNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateViewNode',
            name: SchemableIdentifierNode.create(name),
        });
    },
    cloneWith(createView, params) {
        return freeze({
            ...createView,
            ...params,
        });
    },
});

/// <reference types="./immediate-value-plugin.d.ts" />
/**
 * Transforms all ValueNodes to immediate.
 *
 * WARNING! This should never be part of the public API. Users should never use this.
 * This is an internal helper.
 *
 * @internal
 */
class ImmediateValuePlugin {
    #transformer = new ImmediateValueTransformer();
    transformQuery(args) {
        return this.#transformer.transformNode(args.node);
    }
    transformResult(args) {
        return Promise.resolve(args.result);
    }
}

/// <reference types="./create-view-builder.d.ts" />
class CreateViewBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */
    temporary() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                temporary: true,
            }),
        });
    }
    materialized() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */
    ifNotExists() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    orReplace() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                orReplace: true,
            }),
        });
    }
    columns(columns) {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                columns: columns.map(parseColumnName),
            }),
        });
    }
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */
    as(query) {
        const queryNode = query
            .withPlugin(new ImmediateValuePlugin())
            .toOperationNode();
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                as: queryNode,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateViewBuilder, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./drop-view-node.d.ts" />
/**
 * @internal
 */
const DropViewNode = freeze({
    is(node) {
        return node.kind === 'DropViewNode';
    },
    create(name) {
        return freeze({
            kind: 'DropViewNode',
            name: SchemableIdentifierNode.create(name),
        });
    },
    cloneWith(dropView, params) {
        return freeze({
            ...dropView,
            ...params,
        });
    },
});

/// <reference types="./drop-view-builder.d.ts" />
class DropViewBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    materialized() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    ifExists() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(DropViewBuilder, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./create-type-node.d.ts" />
/**
 * @internal
 */
const CreateTypeNode = freeze({
    is(node) {
        return node.kind === 'CreateTypeNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateTypeNode',
            name,
        });
    },
    cloneWithEnum(createType, values) {
        return freeze({
            ...createType,
            enum: ValueListNode.create(values.map((value) => ValueNode.createImmediate(value))),
        });
    },
});

/// <reference types="./create-type-builder.d.ts" />
class CreateTypeBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values) {
        return new CreateTypeBuilder({
            ...this.#props,
            node: CreateTypeNode.cloneWithEnum(this.#props.node, values),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateTypeBuilder, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./drop-type-node.d.ts" />
/**
 * @internal
 */
const DropTypeNode = freeze({
    is(node) {
        return node.kind === 'DropTypeNode';
    },
    create(name) {
        return freeze({
            kind: 'DropTypeNode',
            name,
        });
    },
    cloneWith(dropType, params) {
        return freeze({
            ...dropType,
            ...params,
        });
    },
});

/// <reference types="./drop-type-builder.d.ts" />
class DropTypeBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropTypeBuilder({
            ...this.#props,
            node: DropTypeNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(DropTypeBuilder, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");

/// <reference types="./identifier-parser.d.ts" />
function parseSchemableIdentifier(id) {
    const SCHEMA_SEPARATOR = '.';
    if (id.includes(SCHEMA_SEPARATOR)) {
        const parts = id.split(SCHEMA_SEPARATOR).map(trim);
        if (parts.length === 2) {
            return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
        }
        else {
            throw new Error(`invalid schemable identifier ${id}`);
        }
    }
    else {
        return SchemableIdentifierNode.create(id);
    }
}
function trim(str) {
    return str.trim();
}

/// <reference types="./schema.d.ts" />
/**
 * Provides methods for building database schema.
 */
class SchemaModule {
    #executor;
    constructor(executor) {
        this.#executor = executor;
    }
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    createTable(table) {
        return new CreateTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateTableNode.create(parseTable(table)),
        });
    }
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */
    dropTable(table) {
        return new DropTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropTableNode.create(parseTable(table)),
        });
    }
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    createIndex(indexName) {
        return new CreateIndexBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateIndexNode.create(indexName),
        });
    }
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */
    dropIndex(indexName) {
        return new DropIndexBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropIndexNode.create(indexName),
        });
    }
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */
    createSchema(schema) {
        return new CreateSchemaBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateSchemaNode.create(schema),
        });
    }
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */
    dropSchema(schema) {
        return new DropSchemaBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropSchemaNode.create(schema),
        });
    }
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
     *   .execute()
     * ```
     */
    alterTable(table) {
        return new AlterTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: AlterTableNode.create(parseTable(table)),
        });
    }
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */
    createView(viewName) {
        return new CreateViewBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateViewNode.create(viewName),
        });
    }
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropView(viewName) {
        return new DropViewBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropViewNode.create(viewName),
        });
    }
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */
    createType(typeName) {
        return new CreateTypeBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateTypeNode.create(parseSchemableIdentifier(typeName)),
        });
    }
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropType(typeName) {
        return new DropTypeBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropTypeNode.create(parseSchemableIdentifier(typeName)),
        });
    }
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */
    withPlugin(plugin) {
        return new SchemaModule(this.#executor.withPlugin(plugin));
    }
    /**
     * Returns a copy of this schema module  without any plugins.
     */
    withoutPlugins() {
        return new SchemaModule(this.#executor.withoutPlugins());
    }
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema) {
        return new SchemaModule(this.#executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
}

/// <reference types="./dynamic.d.ts" />
class DynamicModule {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by TypeScript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput: PossibleColumns = 'birthdate';
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | null | undefined = person?.last_name
     * const firstName: string | undefined = person?.first_name
     * const birthDate: Date | null | undefined = person?.birthdate
     *
     * // The result type also contains the compile time selection `id`.
     * person?.id
     * ```
     */
    ref(reference) {
        return new DynamicReferenceBuilder(reference);
    }
}

/// <reference types="./default-connection-provider.d.ts" />
class DefaultConnectionProvider {
    #driver;
    constructor(driver) {
        this.#driver = driver;
    }
    async provideConnection(consumer) {
        const connection = await this.#driver.acquireConnection();
        try {
            return await consumer(connection);
        }
        finally {
            await this.#driver.releaseConnection(connection);
        }
    }
}

/// <reference types="./default-query-executor.d.ts" />
class DefaultQueryExecutor extends QueryExecutorBase {
    #compiler;
    #adapter;
    #connectionProvider;
    constructor(compiler, adapter, connectionProvider, plugins = []) {
        super(plugins);
        this.#compiler = compiler;
        this.#adapter = adapter;
        this.#connectionProvider = connectionProvider;
    }
    get adapter() {
        return this.#adapter;
    }
    compileQuery(node) {
        return this.#compiler.compileQuery(node);
    }
    provideConnection(consumer) {
        return this.#connectionProvider.provideConnection(consumer);
    }
    withPlugins(plugins) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
    }
    withPlugin(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
    }
    withPluginAtFront(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
    }
    withConnectionProvider(connectionProvider) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
    }
    withoutPlugins() {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
    }
}

/// <reference types="./performance-now.d.ts" />
function performanceNow() {
    if (typeof performance !== 'undefined' && isFunction(performance.now)) {
        return performance.now();
    }
    else {
        return Date.now();
    }
}

/// <reference types="./runtime-driver.d.ts" />
/**
 * A small wrapper around {@link Driver} that makes sure the driver is
 * initialized before it is used, only initialized and destroyed
 * once etc.
 */
class RuntimeDriver {
    #driver;
    #log;
    #initPromise;
    #initDone;
    #destroyPromise;
    #connections = new WeakSet();
    constructor(driver, log) {
        this.#initDone = false;
        this.#driver = driver;
        this.#log = log;
    }
    async init() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initPromise) {
            this.#initPromise = this.#driver
                .init()
                .then(() => {
                this.#initDone = true;
            })
                .catch((err) => {
                this.#initPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#initPromise;
    }
    async acquireConnection() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initDone) {
            await this.init();
        }
        const connection = await this.#driver.acquireConnection();
        if (!this.#connections.has(connection)) {
            if (this.#needsLogging()) {
                this.#addLogging(connection);
            }
            this.#connections.add(connection);
        }
        return connection;
    }
    async releaseConnection(connection) {
        await this.#driver.releaseConnection(connection);
    }
    beginTransaction(connection, settings) {
        return this.#driver.beginTransaction(connection, settings);
    }
    commitTransaction(connection) {
        return this.#driver.commitTransaction(connection);
    }
    rollbackTransaction(connection) {
        return this.#driver.rollbackTransaction(connection);
    }
    async destroy() {
        if (!this.#initPromise) {
            return;
        }
        await this.#initPromise;
        if (!this.#destroyPromise) {
            this.#destroyPromise = this.#driver.destroy().catch((err) => {
                this.#destroyPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#destroyPromise;
    }
    #needsLogging() {
        return (this.#log.isLevelEnabled('query') || this.#log.isLevelEnabled('error'));
    }
    // This method monkey patches the database connection's executeQuery method
    // by adding logging code around it. Monkey patching is not pretty, but it's
    // the best option in this case.
    #addLogging(connection) {
        const executeQuery = connection.executeQuery;
        connection.executeQuery = async (compiledQuery) => {
            let caughtError;
            const startTime = performanceNow();
            try {
                return await executeQuery.call(connection, compiledQuery);
            }
            catch (error) {
                caughtError = error;
                await this.#logError(error, compiledQuery, startTime);
                throw error;
            }
            finally {
                if (!caughtError) {
                    await this.#logQuery(compiledQuery, startTime);
                }
            }
        };
    }
    async #logError(error, compiledQuery, startTime) {
        await this.#log.error(() => ({
            level: 'error',
            error,
            query: compiledQuery,
            queryDurationMillis: this.#calculateDurationMillis(startTime),
        }));
    }
    async #logQuery(compiledQuery, startTime) {
        await this.#log.query(() => ({
            level: 'query',
            query: compiledQuery,
            queryDurationMillis: this.#calculateDurationMillis(startTime),
        }));
    }
    #calculateDurationMillis(startTime) {
        return performanceNow() - startTime;
    }
}

/// <reference types="./single-connection-provider.d.ts" />
const ignoreError = () => { };
class SingleConnectionProvider {
    #connection;
    #runningPromise;
    constructor(connection) {
        this.#connection = connection;
    }
    async provideConnection(consumer) {
        while (this.#runningPromise) {
            await this.#runningPromise.catch(ignoreError);
        }
        // `#runningPromise` must be set to undefined before it's
        // resolved or rejected. Otherwise the while loop above
        // will misbehave.
        this.#runningPromise = this.#run(consumer).finally(() => {
            this.#runningPromise = undefined;
        });
        return this.#runningPromise;
    }
    // Run the runner in an async function to make sure it doesn't
    // throw synchronous errors.
    async #run(runner) {
        return await runner(this.#connection);
    }
}

/// <reference types="./driver.d.ts" />
const TRANSACTION_ISOLATION_LEVELS = [
    'read uncommitted',
    'read committed',
    'repeatable read',
    'serializable',
    'snapshot',
];

/// <reference types="./log.d.ts" />
freeze(['query', 'error']);
class Log {
    #levels;
    #logger;
    constructor(config) {
        if (isFunction(config)) {
            this.#logger = config;
            this.#levels = freeze({
                query: true,
                error: true,
            });
        }
        else {
            this.#logger = defaultLogger;
            this.#levels = freeze({
                query: config.includes('query'),
                error: config.includes('error'),
            });
        }
    }
    isLevelEnabled(level) {
        return this.#levels[level];
    }
    async query(getEvent) {
        if (this.#levels.query) {
            await this.#logger(getEvent());
        }
    }
    async error(getEvent) {
        if (this.#levels.error) {
            await this.#logger(getEvent());
        }
    }
}
function defaultLogger(event) {
    if (event.level === 'query') {
        console.log(`kysely:query: ${event.query.sql}`);
        console.log(`kysely:query: duration: ${event.queryDurationMillis.toFixed(1)}ms`);
    }
    else if (event.level === 'error') {
        if (event.error instanceof Error) {
            console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
        }
        else {
            console.error(`kysely:error: ${JSON.stringify({
                error: event.error,
                query: event.query.sql,
                queryDurationMillis: event.queryDurationMillis,
            })}`);
        }
    }
}

/// <reference types="./compilable.d.ts" />
function isCompilable(value) {
    return isObject(value) && isFunction(value.compile);
}

/// <reference types="./kysely.d.ts" />
/**
 * The main Kysely class.
 *
 * You should create one instance of `Kysely` per database using the {@link Kysely}
 * constructor. Each `Kysely` instance maintains its own connection pool.
 *
 * ### Examples
 *
 * This example assumes your database has a "person" table:
 *
 * ```ts
 * import * as Sqlite from 'better-sqlite3'
 * import { type Generated, Kysely, SqliteDialect } from 'kysely'
 *
 * interface Database {
 *   person: {
 *     id: Generated<number>
 *     first_name: string
 *     last_name: string | null
 *   }
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new SqliteDialect({
 *     database: new Sqlite(':memory:'),
 *   })
 * })
 * ```
 *
 * @typeParam DB - The database interface type. Keys of this type must be table names
 *    in the database and values must be interfaces that describe the rows in those
 *    tables. See the examples above.
 */
class Kysely extends QueryCreator {
    #props;
    constructor(args) {
        let superProps;
        let props;
        if (isKyselyProps(args)) {
            superProps = { executor: args.executor };
            props = { ...args };
        }
        else {
            const dialect = args.dialect;
            const driver = dialect.createDriver();
            const compiler = dialect.createQueryCompiler();
            const adapter = dialect.createAdapter();
            const log = new Log(args.log ?? []);
            const runtimeDriver = new RuntimeDriver(driver, log);
            const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
            const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
            superProps = { executor };
            props = {
                config: args,
                executor,
                dialect,
                driver: runtimeDriver,
            };
        }
        super(superProps);
        this.#props = freeze(props);
    }
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */
    get schema() {
        return new SchemaModule(this.#props.executor);
    }
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */
    get dynamic() {
        return new DynamicModule();
    }
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */
    get introspection() {
        return this.#props.dialect.createIntrospector(this.withoutPlugins());
    }
    case(value) {
        return new CaseBuilder({
            node: CaseNode.create(isUndefined(value) ? undefined : parseExpression(value)),
        });
    }
    /**
     * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'id',
     *     count('pet.id').as('person_count'),
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "person_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     *
     * Why "somewhat" type-safe? Because the function calls are not bound to the
     * current query context. They allow you to reference columns and tables that
     * are not in the current query. E.g. remove the `innerJoin` from the previous
     * query and TypeScript won't even complain.
     *
     * If you want to make the function calls fully type-safe, you can use the
     * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'person.id',
     *     eb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
     *   .execute()
     * ```
     */
    get fn() {
        return createFunctionModule();
    }
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws an exception,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Simple transaction", 10) -->
     *
     * This example inserts two rows in a transaction. If an exception is thrown inside
     * the callback passed to the `execute` method,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     *
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    transaction() {
        return new TransactionBuilder({ ...this.#props });
    }
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    connection() {
        return new ConnectionBuilder({ ...this.#props });
    }
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins() {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    /**
     * @override
     */
    withSchema(schema) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables() {
        return new Kysely({ ...this.#props });
    }
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    async destroy() {
        await this.#props.driver.destroy();
    }
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction() {
        return false;
    }
    /**
     * @internal
     * @private
     */
    getExecutor() {
        return this.#props.executor;
    }
    /**
     * Executes a given compiled query or query builder.
     *
     * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
     */
    executeQuery(query, queryId = createQueryId()) {
        const compiledQuery = isCompilable(query) ? query.compile() : query;
        return this.getExecutor().executeQuery(compiledQuery, queryId);
    }
}
class Transaction extends Kysely {
    #props;
    constructor(props) {
        super(props);
        this.#props = props;
    }
    // The return type is `true` instead of `boolean` to make Kysely<DB>
    // unassignable to Transaction<DB> while allowing assignment the
    // other way around.
    get isTransaction() {
        return true;
    }
    transaction() {
        throw new Error('calling the transaction method for a Transaction is not supported');
    }
    connection() {
        throw new Error('calling the connection method for a Transaction is not supported');
    }
    async destroy() {
        throw new Error('calling the destroy method for a Transaction is not supported');
    }
    withPlugin(plugin) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    withoutPlugins() {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    withSchema(schema) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
    withTables() {
        return new Transaction({ ...this.#props });
    }
}
function isKyselyProps(obj) {
    return (isObject(obj) &&
        isObject(obj.config) &&
        isObject(obj.driver) &&
        isObject(obj.executor) &&
        isObject(obj.dialect));
}
class ConnectionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    async execute(callback) {
        return this.#props.executor.provideConnection(async (connection) => {
            const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
            const db = new Kysely({
                ...this.#props,
                executor,
            });
            return await callback(db);
        });
    }
}
preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
class TransactionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    setIsolationLevel(isolationLevel) {
        return new TransactionBuilder({
            ...this.#props,
            isolationLevel,
        });
    }
    async execute(callback) {
        const { isolationLevel, ...kyselyProps } = this.#props;
        const settings = { isolationLevel };
        validateTransactionSettings(settings);
        return this.#props.executor.provideConnection(async (connection) => {
            const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
            const transaction = new Transaction({
                ...kyselyProps,
                executor,
            });
            try {
                await this.#props.driver.beginTransaction(connection, settings);
                const result = await callback(transaction);
                await this.#props.driver.commitTransaction(connection);
                return result;
            }
            catch (error) {
                await this.#props.driver.rollbackTransaction(connection);
                throw error;
            }
        });
    }
}
preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
function validateTransactionSettings(settings) {
    if (settings.isolationLevel &&
        !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
        throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
    }
}

/// <reference types="./raw-builder.d.ts" />
class RawBuilderImpl {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    get expressionType() {
        return undefined;
    }
    get isRawBuilder() {
        return true;
    }
    as(alias) {
        return new AliasedRawBuilderImpl(this, alias);
    }
    $castTo() {
        return new RawBuilderImpl({ ...this.#props });
    }
    $notNull() {
        return new RawBuilderImpl(this.#props);
    }
    withPlugin(plugin) {
        return new RawBuilderImpl({
            ...this.#props,
            plugins: this.#props.plugins !== undefined
                ? freeze([...this.#props.plugins, plugin])
                : freeze([plugin]),
        });
    }
    toOperationNode() {
        return this.#toOperationNode(this.#getExecutor());
    }
    compile(executorProvider) {
        return this.#compile(this.#getExecutor(executorProvider));
    }
    async execute(executorProvider) {
        const executor = this.#getExecutor(executorProvider);
        return executor.executeQuery(this.#compile(executor), this.#props.queryId);
    }
    #getExecutor(executorProvider) {
        const executor = executorProvider !== undefined
            ? executorProvider.getExecutor()
            : NOOP_QUERY_EXECUTOR;
        return this.#props.plugins !== undefined
            ? executor.withPlugins(this.#props.plugins)
            : executor;
    }
    #toOperationNode(executor) {
        return executor.transformQuery(this.#props.rawNode, this.#props.queryId);
    }
    #compile(executor) {
        return executor.compileQuery(this.#toOperationNode(executor), this.#props.queryId);
    }
}
function createRawBuilder(props) {
    return new RawBuilderImpl(props);
}
preventAwait(RawBuilderImpl, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
class AliasedRawBuilderImpl {
    #rawBuilder;
    #alias;
    constructor(rawBuilder, alias) {
        this.#rawBuilder = rawBuilder;
        this.#alias = alias;
    }
    get expression() {
        return this.#rawBuilder;
    }
    get alias() {
        return this.#alias;
    }
    get rawBuilder() {
        return this.#rawBuilder;
    }
    toOperationNode() {
        return AliasNode.create(this.#rawBuilder.toOperationNode(), isOperationNodeSource(this.#alias)
            ? this.#alias.toOperationNode()
            : IdentifierNode.create(this.#alias));
    }
}
preventAwait(AliasedRawBuilderImpl, "don't await AliasedRawBuilder instances directly. AliasedRawBuilder should never be executed directly since it's always a part of another query.");

/// <reference types="./sql.d.ts" />
const sql = Object.assign((sqlFragments, ...parameters) => {
    return createRawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.create(sqlFragments, parameters?.map(parseParameter) ?? []),
    });
}, {
    ref(columnReference) {
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithChild(parseStringReference(columnReference)),
        });
    },
    val(value) {
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithChild(parseValueExpression(value)),
        });
    },
    value(value) {
        return this.val(value);
    },
    table(tableReference) {
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithChild(parseTable(tableReference)),
        });
    },
    id(...ids) {
        const fragments = new Array(ids.length + 1).fill('.');
        fragments[0] = '';
        fragments[fragments.length - 1] = '';
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create)),
        });
    },
    lit(value) {
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithChild(ValueNode.createImmediate(value)),
        });
    },
    literal(value) {
        return this.lit(value);
    },
    raw(sql) {
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithSql(sql),
        });
    },
    join(array, separator = sql `, `) {
        const nodes = new Array(2 * array.length - 1);
        const sep = separator.toOperationNode();
        for (let i = 0; i < array.length; ++i) {
            nodes[2 * i] = parseParameter(array[i]);
            if (i !== array.length - 1) {
                nodes[2 * i + 1] = sep;
            }
        }
        return createRawBuilder({
            queryId: createQueryId(),
            rawNode: RawNode.createWithChildren(nodes),
        });
    },
});
function parseParameter(param) {
    if (isOperationNodeSource(param)) {
        return param.toOperationNode();
    }
    return parseValueExpression(param);
}

/// <reference types="./operation-node-visitor.d.ts" />
class OperationNodeVisitor {
    nodeStack = [];
    get parentNode() {
        return this.nodeStack[this.nodeStack.length - 2];
    }
    #visitors = freeze({
        AliasNode: this.visitAlias.bind(this),
        ColumnNode: this.visitColumn.bind(this),
        IdentifierNode: this.visitIdentifier.bind(this),
        SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this),
        RawNode: this.visitRaw.bind(this),
        ReferenceNode: this.visitReference.bind(this),
        SelectQueryNode: this.visitSelectQuery.bind(this),
        SelectionNode: this.visitSelection.bind(this),
        TableNode: this.visitTable.bind(this),
        FromNode: this.visitFrom.bind(this),
        SelectAllNode: this.visitSelectAll.bind(this),
        AndNode: this.visitAnd.bind(this),
        OrNode: this.visitOr.bind(this),
        ValueNode: this.visitValue.bind(this),
        ValueListNode: this.visitValueList.bind(this),
        PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this),
        ParensNode: this.visitParens.bind(this),
        JoinNode: this.visitJoin.bind(this),
        OperatorNode: this.visitOperator.bind(this),
        WhereNode: this.visitWhere.bind(this),
        InsertQueryNode: this.visitInsertQuery.bind(this),
        DeleteQueryNode: this.visitDeleteQuery.bind(this),
        ReturningNode: this.visitReturning.bind(this),
        CreateTableNode: this.visitCreateTable.bind(this),
        AddColumnNode: this.visitAddColumn.bind(this),
        ColumnDefinitionNode: this.visitColumnDefinition.bind(this),
        DropTableNode: this.visitDropTable.bind(this),
        DataTypeNode: this.visitDataType.bind(this),
        OrderByNode: this.visitOrderBy.bind(this),
        OrderByItemNode: this.visitOrderByItem.bind(this),
        GroupByNode: this.visitGroupBy.bind(this),
        GroupByItemNode: this.visitGroupByItem.bind(this),
        UpdateQueryNode: this.visitUpdateQuery.bind(this),
        ColumnUpdateNode: this.visitColumnUpdate.bind(this),
        LimitNode: this.visitLimit.bind(this),
        OffsetNode: this.visitOffset.bind(this),
        OnConflictNode: this.visitOnConflict.bind(this),
        OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this),
        CreateIndexNode: this.visitCreateIndex.bind(this),
        DropIndexNode: this.visitDropIndex.bind(this),
        ListNode: this.visitList.bind(this),
        PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.visitUniqueConstraint.bind(this),
        ReferencesNode: this.visitReferences.bind(this),
        CheckConstraintNode: this.visitCheckConstraint.bind(this),
        WithNode: this.visitWith.bind(this),
        CommonTableExpressionNode: this.visitCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this),
        HavingNode: this.visitHaving.bind(this),
        CreateSchemaNode: this.visitCreateSchema.bind(this),
        DropSchemaNode: this.visitDropSchema.bind(this),
        AlterTableNode: this.visitAlterTable.bind(this),
        DropColumnNode: this.visitDropColumn.bind(this),
        RenameColumnNode: this.visitRenameColumn.bind(this),
        AlterColumnNode: this.visitAlterColumn.bind(this),
        ModifyColumnNode: this.visitModifyColumn.bind(this),
        AddConstraintNode: this.visitAddConstraint.bind(this),
        DropConstraintNode: this.visitDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
        CreateViewNode: this.visitCreateView.bind(this),
        DropViewNode: this.visitDropView.bind(this),
        GeneratedNode: this.visitGenerated.bind(this),
        DefaultValueNode: this.visitDefaultValue.bind(this),
        OnNode: this.visitOn.bind(this),
        ValuesNode: this.visitValues.bind(this),
        SelectModifierNode: this.visitSelectModifier.bind(this),
        CreateTypeNode: this.visitCreateType.bind(this),
        DropTypeNode: this.visitDropType.bind(this),
        ExplainNode: this.visitExplain.bind(this),
        DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.visitAggregateFunction.bind(this),
        OverNode: this.visitOver.bind(this),
        PartitionByNode: this.visitPartitionBy.bind(this),
        PartitionByItemNode: this.visitPartitionByItem.bind(this),
        SetOperationNode: this.visitSetOperation.bind(this),
        BinaryOperationNode: this.visitBinaryOperation.bind(this),
        UnaryOperationNode: this.visitUnaryOperation.bind(this),
        UsingNode: this.visitUsing.bind(this),
        FunctionNode: this.visitFunction.bind(this),
        CaseNode: this.visitCase.bind(this),
        WhenNode: this.visitWhen.bind(this),
        JSONReferenceNode: this.visitJSONReference.bind(this),
        JSONPathNode: this.visitJSONPath.bind(this),
        JSONPathLegNode: this.visitJSONPathLeg.bind(this),
        JSONOperatorChainNode: this.visitJSONOperatorChain.bind(this),
        TupleNode: this.visitTuple.bind(this),
        MergeQueryNode: this.visitMergeQuery.bind(this),
        MatchedNode: this.visitMatched.bind(this),
        AddIndexNode: this.visitAddIndex.bind(this),
        CastNode: this.visitCast.bind(this),
        FetchNode: this.visitFetch.bind(this),
        TopNode: this.visitTop.bind(this),
        OutputNode: this.visitOutput.bind(this),
    });
    visitNode = (node) => {
        this.nodeStack.push(node);
        this.#visitors[node.kind](node);
        this.nodeStack.pop();
    };
}

/// <reference types="./default-query-compiler.d.ts" />
class DefaultQueryCompiler extends OperationNodeVisitor {
    #sql = '';
    #parameters = [];
    get numParameters() {
        return this.#parameters.length;
    }
    compileQuery(node) {
        this.#sql = '';
        this.#parameters = [];
        this.nodeStack.splice(0, this.nodeStack.length);
        this.visitNode(node);
        return freeze({
            query: node,
            sql: this.getSql(),
            parameters: [...this.#parameters],
        });
    }
    getSql() {
        return this.#sql;
    }
    visitSelectQuery(node) {
        const wrapInParens = this.parentNode !== undefined &&
            !ParensNode.is(this.parentNode) &&
            !InsertQueryNode.is(this.parentNode) &&
            !CreateTableNode.is(this.parentNode) &&
            !CreateViewNode.is(this.parentNode) &&
            !SetOperationNode.is(this.parentNode);
        if (this.parentNode === undefined && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (wrapInParens) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('select');
        if (node.distinctOn) {
            this.append(' ');
            this.compileDistinctOn(node.distinctOn);
        }
        if (node.frontModifiers?.length) {
            this.append(' ');
            this.compileList(node.frontModifiers, ' ');
        }
        if (node.top) {
            this.append(' ');
            this.visitNode(node.top);
        }
        if (node.selections) {
            this.append(' ');
            this.compileList(node.selections);
        }
        if (node.from) {
            this.append(' ');
            this.visitNode(node.from);
        }
        if (node.joins) {
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.groupBy) {
            this.append(' ');
            this.visitNode(node.groupBy);
        }
        if (node.having) {
            this.append(' ');
            this.visitNode(node.having);
        }
        if (node.setOperations) {
            this.append(' ');
            this.compileList(node.setOperations, ' ');
        }
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.offset) {
            this.append(' ');
            this.visitNode(node.offset);
        }
        if (node.fetch) {
            this.append(' ');
            this.visitNode(node.fetch);
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(this.sortSelectModifiers([...node.endModifiers]), ' ');
        }
        if (wrapInParens) {
            this.append(')');
        }
    }
    visitFrom(node) {
        this.append('from ');
        this.compileList(node.froms);
    }
    visitSelection(node) {
        this.visitNode(node.selection);
    }
    visitColumn(node) {
        this.visitNode(node.column);
    }
    compileDistinctOn(expressions) {
        this.append('distinct on (');
        this.compileList(expressions);
        this.append(')');
    }
    compileList(nodes, separator = ', ') {
        const lastIndex = nodes.length - 1;
        for (let i = 0; i <= lastIndex; i++) {
            this.visitNode(nodes[i]);
            if (i < lastIndex) {
                this.append(separator);
            }
        }
    }
    visitWhere(node) {
        this.append('where ');
        this.visitNode(node.where);
    }
    visitHaving(node) {
        this.append('having ');
        this.visitNode(node.having);
    }
    visitInsertQuery(node) {
        const rootQueryNode = this.nodeStack.find(QueryNode.is);
        const isSubQuery = rootQueryNode !== node;
        if (!isSubQuery && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append(node.replace ? 'replace' : 'insert');
        if (node.ignore) {
            this.append(' ignore');
        }
        if (node.top) {
            this.append(' ');
            this.visitNode(node.top);
        }
        if (node.into) {
            this.append(' into ');
            this.visitNode(node.into);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.values) {
            this.append(' ');
            this.visitNode(node.values);
        }
        if (node.defaultValues) {
            this.append(' ');
            this.append('default values');
        }
        if (node.onConflict) {
            this.append(' ');
            this.visitNode(node.onConflict);
        }
        if (node.onDuplicateKey) {
            this.append(' ');
            this.visitNode(node.onDuplicateKey);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitValues(node) {
        this.append('values ');
        this.compileList(node.values);
    }
    visitDeleteQuery(node) {
        const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
        if (!isSubQuery && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (isSubQuery) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('delete ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        this.visitNode(node.from);
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.using) {
            this.append(' ');
            this.visitNode(node.using);
        }
        if (node.joins) {
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (isSubQuery) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitReturning(node) {
        this.append('returning ');
        this.compileList(node.selections);
    }
    visitAlias(node) {
        this.visitNode(node.node);
        this.append(' as ');
        this.visitNode(node.alias);
    }
    visitReference(node) {
        if (node.table) {
            this.visitNode(node.table);
            this.append('.');
        }
        this.visitNode(node.column);
    }
    visitSelectAll(_) {
        this.append('*');
    }
    visitIdentifier(node) {
        this.append(this.getLeftIdentifierWrapper());
        this.compileUnwrappedIdentifier(node);
        this.append(this.getRightIdentifierWrapper());
    }
    compileUnwrappedIdentifier(node) {
        if (!isString(node.name)) {
            throw new Error('a non-string identifier was passed to compileUnwrappedIdentifier.');
        }
        this.append(this.sanitizeIdentifier(node.name));
    }
    visitAnd(node) {
        this.visitNode(node.left);
        this.append(' and ');
        this.visitNode(node.right);
    }
    visitOr(node) {
        this.visitNode(node.left);
        this.append(' or ');
        this.visitNode(node.right);
    }
    visitValue(node) {
        if (node.immediate) {
            this.appendImmediateValue(node.value);
        }
        else {
            this.appendValue(node.value);
        }
    }
    visitValueList(node) {
        this.append('(');
        this.compileList(node.values);
        this.append(')');
    }
    visitTuple(node) {
        this.append('(');
        this.compileList(node.values);
        this.append(')');
    }
    visitPrimitiveValueList(node) {
        this.append('(');
        const { values } = node;
        for (let i = 0; i < values.length; ++i) {
            this.appendValue(values[i]);
            if (i !== values.length - 1) {
                this.append(', ');
            }
        }
        this.append(')');
    }
    visitParens(node) {
        this.append('(');
        this.visitNode(node.node);
        this.append(')');
    }
    visitJoin(node) {
        this.append(JOIN_TYPE_SQL[node.joinType]);
        this.append(' ');
        this.visitNode(node.table);
        if (node.on) {
            this.append(' ');
            this.visitNode(node.on);
        }
    }
    visitOn(node) {
        this.append('on ');
        this.visitNode(node.on);
    }
    visitRaw(node) {
        const { sqlFragments, parameters: params } = node;
        for (let i = 0; i < sqlFragments.length; ++i) {
            this.append(sqlFragments[i]);
            if (params.length > i) {
                this.visitNode(params[i]);
            }
        }
    }
    visitOperator(node) {
        this.append(node.operator);
    }
    visitTable(node) {
        this.visitNode(node.table);
    }
    visitSchemableIdentifier(node) {
        if (node.schema) {
            this.visitNode(node.schema);
            this.append('.');
        }
        this.visitNode(node.identifier);
    }
    visitCreateTable(node) {
        this.append('create ');
        if (node.frontModifiers && node.frontModifiers.length > 0) {
            this.compileList(node.frontModifiers, ' ');
            this.append(' ');
        }
        if (node.temporary) {
            this.append('temporary ');
        }
        this.append('table ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.table);
        if (node.selectQuery) {
            this.append(' as ');
            this.visitNode(node.selectQuery);
        }
        else {
            this.append(' (');
            this.compileList([...node.columns, ...(node.constraints ?? [])]);
            this.append(')');
            if (node.onCommit) {
                this.append(' on commit ');
                this.append(node.onCommit);
            }
            if (node.endModifiers && node.endModifiers.length > 0) {
                this.append(' ');
                this.compileList(node.endModifiers, ' ');
            }
        }
    }
    visitColumnDefinition(node) {
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.column);
        this.append(' ');
        this.visitNode(node.dataType);
        if (node.unsigned) {
            this.append(' unsigned');
        }
        if (node.frontModifiers && node.frontModifiers.length > 0) {
            this.append(' ');
            this.compileList(node.frontModifiers, ' ');
        }
        if (node.generated) {
            this.append(' ');
            this.visitNode(node.generated);
        }
        if (node.identity) {
            this.append(' identity');
        }
        if (node.defaultTo) {
            this.append(' ');
            this.visitNode(node.defaultTo);
        }
        if (node.notNull) {
            this.append(' not null');
        }
        if (node.unique) {
            this.append(' unique');
        }
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        if (node.primaryKey) {
            this.append(' primary key');
        }
        if (node.autoIncrement) {
            this.append(' ');
            this.append(this.getAutoIncrement());
        }
        if (node.references) {
            this.append(' ');
            this.visitNode(node.references);
        }
        if (node.check) {
            this.append(' ');
            this.visitNode(node.check);
        }
        if (node.endModifiers && node.endModifiers.length > 0) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    getAutoIncrement() {
        return 'auto_increment';
    }
    visitReferences(node) {
        this.append('references ');
        this.visitNode(node.table);
        this.append(' (');
        this.compileList(node.columns);
        this.append(')');
        if (node.onDelete) {
            this.append(' on delete ');
            this.append(node.onDelete);
        }
        if (node.onUpdate) {
            this.append(' on update ');
            this.append(node.onUpdate);
        }
    }
    visitDropTable(node) {
        this.append('drop table ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.table);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitDataType(node) {
        this.append(node.dataType);
    }
    visitOrderBy(node) {
        this.append('order by ');
        this.compileList(node.items);
    }
    visitOrderByItem(node) {
        this.visitNode(node.orderBy);
        if (node.direction) {
            this.append(' ');
            this.visitNode(node.direction);
        }
    }
    visitGroupBy(node) {
        this.append('group by ');
        this.compileList(node.items);
    }
    visitGroupByItem(node) {
        this.visitNode(node.groupBy);
    }
    visitUpdateQuery(node) {
        const rootQueryNode = this.nodeStack.find(QueryNode.is);
        const isSubQuery = rootQueryNode !== node;
        if (!isSubQuery && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('update ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        if (node.table) {
            this.visitNode(node.table);
            this.append(' ');
        }
        this.append('set ');
        if (node.updates) {
            this.compileList(node.updates);
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.from) {
            this.append(' ');
            this.visitNode(node.from);
        }
        if (node.joins) {
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitColumnUpdate(node) {
        this.visitNode(node.column);
        this.append(' = ');
        this.visitNode(node.value);
    }
    visitLimit(node) {
        this.append('limit ');
        this.visitNode(node.limit);
    }
    visitOffset(node) {
        this.append('offset ');
        this.visitNode(node.offset);
    }
    visitOnConflict(node) {
        this.append('on conflict');
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        else if (node.constraint) {
            this.append(' on constraint ');
            this.visitNode(node.constraint);
        }
        else if (node.indexExpression) {
            this.append(' (');
            this.visitNode(node.indexExpression);
            this.append(')');
        }
        if (node.indexWhere) {
            this.append(' ');
            this.visitNode(node.indexWhere);
        }
        if (node.doNothing === true) {
            this.append(' do nothing');
        }
        else if (node.updates) {
            this.append(' do update set ');
            this.compileList(node.updates);
            if (node.updateWhere) {
                this.append(' ');
                this.visitNode(node.updateWhere);
            }
        }
    }
    visitOnDuplicateKey(node) {
        this.append('on duplicate key update ');
        this.compileList(node.updates);
    }
    visitCreateIndex(node) {
        this.append('create ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
    }
    visitDropIndex(node) {
        this.append('drop index ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitCreateSchema(node) {
        this.append('create schema ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.schema);
    }
    visitDropSchema(node) {
        this.append('drop schema ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.schema);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitPrimaryKeyConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('primary key (');
        this.compileList(node.columns);
        this.append(')');
    }
    visitUniqueConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('unique');
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        this.append(' (');
        this.compileList(node.columns);
        this.append(')');
    }
    visitCheckConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('check (');
        this.visitNode(node.expression);
        this.append(')');
    }
    visitForeignKeyConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('foreign key (');
        this.compileList(node.columns);
        this.append(') ');
        this.visitNode(node.references);
        if (node.onDelete) {
            this.append(' on delete ');
            this.append(node.onDelete);
        }
        if (node.onUpdate) {
            this.append(' on update ');
            this.append(node.onUpdate);
        }
    }
    visitList(node) {
        this.compileList(node.items);
    }
    visitWith(node) {
        this.append('with ');
        if (node.recursive) {
            this.append('recursive ');
        }
        this.compileList(node.expressions);
    }
    visitCommonTableExpression(node) {
        this.visitNode(node.name);
        this.append(' as ');
        if (isBoolean(node.materialized)) {
            if (!node.materialized) {
                this.append('not ');
            }
            this.append('materialized ');
        }
        this.visitNode(node.expression);
    }
    visitCommonTableExpressionName(node) {
        this.visitNode(node.table);
        if (node.columns) {
            this.append('(');
            this.compileList(node.columns);
            this.append(')');
        }
    }
    visitAlterTable(node) {
        this.append('alter table ');
        this.visitNode(node.table);
        this.append(' ');
        if (node.renameTo) {
            this.append('rename to ');
            this.visitNode(node.renameTo);
        }
        if (node.setSchema) {
            this.append('set schema ');
            this.visitNode(node.setSchema);
        }
        if (node.addConstraint) {
            this.visitNode(node.addConstraint);
        }
        if (node.dropConstraint) {
            this.visitNode(node.dropConstraint);
        }
        if (node.columnAlterations) {
            this.compileColumnAlterations(node.columnAlterations);
        }
        if (node.addIndex) {
            this.visitNode(node.addIndex);
        }
        if (node.dropIndex) {
            this.visitNode(node.dropIndex);
        }
    }
    visitAddColumn(node) {
        this.append('add column ');
        this.visitNode(node.column);
    }
    visitRenameColumn(node) {
        this.append('rename column ');
        this.visitNode(node.column);
        this.append(' to ');
        this.visitNode(node.renameTo);
    }
    visitDropColumn(node) {
        this.append('drop column ');
        this.visitNode(node.column);
    }
    visitAlterColumn(node) {
        this.append('alter column ');
        this.visitNode(node.column);
        this.append(' ');
        if (node.dataType) {
            if (this.announcesNewColumnDataType()) {
                this.append('type ');
            }
            this.visitNode(node.dataType);
            if (node.dataTypeExpression) {
                this.append('using ');
                this.visitNode(node.dataTypeExpression);
            }
        }
        if (node.setDefault) {
            this.append('set default ');
            this.visitNode(node.setDefault);
        }
        if (node.dropDefault) {
            this.append('drop default');
        }
        if (node.setNotNull) {
            this.append('set not null');
        }
        if (node.dropNotNull) {
            this.append('drop not null');
        }
    }
    visitModifyColumn(node) {
        this.append('modify column ');
        this.visitNode(node.column);
    }
    visitAddConstraint(node) {
        this.append('add ');
        this.visitNode(node.constraint);
    }
    visitDropConstraint(node) {
        this.append('drop constraint ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.constraintName);
        if (node.modifier === 'cascade') {
            this.append(' cascade');
        }
        else if (node.modifier === 'restrict') {
            this.append(' restrict');
        }
    }
    visitSetOperation(node) {
        this.append(node.operator);
        this.append(' ');
        if (node.all) {
            this.append('all ');
        }
        this.visitNode(node.expression);
    }
    visitCreateView(node) {
        this.append('create ');
        if (node.orReplace) {
            this.append('or replace ');
        }
        if (node.materialized) {
            this.append('materialized ');
        }
        if (node.temporary) {
            this.append('temporary ');
        }
        this.append('view ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        this.append(' ');
        if (node.columns) {
            this.append('(');
            this.compileList(node.columns);
            this.append(') ');
        }
        if (node.as) {
            this.append('as ');
            this.visitNode(node.as);
        }
    }
    visitDropView(node) {
        this.append('drop ');
        if (node.materialized) {
            this.append('materialized ');
        }
        this.append('view ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitGenerated(node) {
        this.append('generated ');
        if (node.always) {
            this.append('always ');
        }
        if (node.byDefault) {
            this.append('by default ');
        }
        this.append('as ');
        if (node.identity) {
            this.append('identity');
        }
        if (node.expression) {
            this.append('(');
            this.visitNode(node.expression);
            this.append(')');
        }
        if (node.stored) {
            this.append(' stored');
        }
    }
    visitDefaultValue(node) {
        this.append('default ');
        this.visitNode(node.defaultValue);
    }
    visitSelectModifier(node) {
        if (node.rawModifier) {
            this.visitNode(node.rawModifier);
        }
        else {
            this.append(SELECT_MODIFIER_SQL[node.modifier]);
        }
        if (node.of) {
            this.append(' of ');
            this.compileList(node.of, ', ');
        }
    }
    visitCreateType(node) {
        this.append('create type ');
        this.visitNode(node.name);
        if (node.enum) {
            this.append(' as enum ');
            this.visitNode(node.enum);
        }
    }
    visitDropType(node) {
        this.append('drop type ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
    }
    visitExplain(node) {
        this.append('explain');
        if (node.options || node.format) {
            this.append(' ');
            this.append(this.getLeftExplainOptionsWrapper());
            if (node.options) {
                this.visitNode(node.options);
                if (node.format) {
                    this.append(this.getExplainOptionsDelimiter());
                }
            }
            if (node.format) {
                this.append('format');
                this.append(this.getExplainOptionAssignment());
                this.append(node.format);
            }
            this.append(this.getRightExplainOptionsWrapper());
        }
    }
    visitDefaultInsertValue(_) {
        this.append('default');
    }
    visitAggregateFunction(node) {
        this.append(node.func);
        this.append('(');
        if (node.distinct) {
            this.append('distinct ');
        }
        this.compileList(node.aggregated);
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        this.append(')');
        if (node.filter) {
            this.append(' filter(');
            this.visitNode(node.filter);
            this.append(')');
        }
        if (node.over) {
            this.append(' ');
            this.visitNode(node.over);
        }
    }
    visitOver(node) {
        this.append('over(');
        if (node.partitionBy) {
            this.visitNode(node.partitionBy);
            if (node.orderBy) {
                this.append(' ');
            }
        }
        if (node.orderBy) {
            this.visitNode(node.orderBy);
        }
        this.append(')');
    }
    visitPartitionBy(node) {
        this.append('partition by ');
        this.compileList(node.items);
    }
    visitPartitionByItem(node) {
        this.visitNode(node.partitionBy);
    }
    visitBinaryOperation(node) {
        this.visitNode(node.leftOperand);
        this.append(' ');
        this.visitNode(node.operator);
        this.append(' ');
        this.visitNode(node.rightOperand);
    }
    visitUnaryOperation(node) {
        this.visitNode(node.operator);
        if (!this.isMinusOperator(node.operator)) {
            this.append(' ');
        }
        this.visitNode(node.operand);
    }
    isMinusOperator(node) {
        return OperatorNode.is(node) && node.operator === '-';
    }
    visitUsing(node) {
        this.append('using ');
        this.compileList(node.tables);
    }
    visitFunction(node) {
        this.append(node.func);
        this.append('(');
        this.compileList(node.arguments);
        this.append(')');
    }
    visitCase(node) {
        this.append('case');
        if (node.value) {
            this.append(' ');
            this.visitNode(node.value);
        }
        if (node.when) {
            this.append(' ');
            this.compileList(node.when, ' ');
        }
        if (node.else) {
            this.append(' else ');
            this.visitNode(node.else);
        }
        this.append(' end');
        if (node.isStatement) {
            this.append(' case');
        }
    }
    visitWhen(node) {
        this.append('when ');
        this.visitNode(node.condition);
        if (node.result) {
            this.append(' then ');
            this.visitNode(node.result);
        }
    }
    visitJSONReference(node) {
        this.visitNode(node.reference);
        this.visitNode(node.traversal);
    }
    visitJSONPath(node) {
        if (node.inOperator) {
            this.visitNode(node.inOperator);
        }
        this.append("'$");
        for (const pathLeg of node.pathLegs) {
            this.visitNode(pathLeg);
        }
        this.append("'");
    }
    visitJSONPathLeg(node) {
        const isArrayLocation = node.type === 'ArrayLocation';
        this.append(isArrayLocation ? '[' : '.');
        this.append(String(node.value));
        if (isArrayLocation) {
            this.append(']');
        }
    }
    visitJSONOperatorChain(node) {
        for (let i = 0, len = node.values.length; i < len; i++) {
            if (i === len - 1) {
                this.visitNode(node.operator);
            }
            else {
                this.append('->');
            }
            this.visitNode(node.values[i]);
        }
    }
    visitMergeQuery(node) {
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('merge ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        this.append('into ');
        this.visitNode(node.into);
        if (node.using) {
            this.append(' ');
            this.visitNode(node.using);
        }
        if (node.whens) {
            this.append(' ');
            this.compileList(node.whens, ' ');
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitMatched(node) {
        if (node.not) {
            this.append('not ');
        }
        this.append('matched');
        if (node.bySource) {
            this.append(' by source');
        }
    }
    visitAddIndex(node) {
        this.append('add ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        this.visitNode(node.name);
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
    }
    visitCast(node) {
        this.append('cast(');
        this.visitNode(node.expression);
        this.append(' as ');
        this.visitNode(node.dataType);
        this.append(')');
    }
    visitFetch(node) {
        this.append('fetch next ');
        this.visitNode(node.rowCount);
        this.append(` rows ${node.modifier}`);
    }
    visitOutput(node) {
        this.append('output ');
        this.compileList(node.selections);
    }
    visitTop(node) {
        this.append(`top(${node.expression})`);
        if (node.modifiers) {
            this.append(` ${node.modifiers}`);
        }
    }
    append(str) {
        this.#sql += str;
    }
    appendValue(parameter) {
        this.addParameter(parameter);
        this.append(this.getCurrentParameterPlaceholder());
    }
    getLeftIdentifierWrapper() {
        return '"';
    }
    getRightIdentifierWrapper() {
        return '"';
    }
    getCurrentParameterPlaceholder() {
        return '$' + this.numParameters;
    }
    getLeftExplainOptionsWrapper() {
        return '(';
    }
    getExplainOptionAssignment() {
        return ' ';
    }
    getExplainOptionsDelimiter() {
        return ', ';
    }
    getRightExplainOptionsWrapper() {
        return ')';
    }
    sanitizeIdentifier(identifier) {
        const leftWrap = this.getLeftIdentifierWrapper();
        const rightWrap = this.getRightIdentifierWrapper();
        let sanitized = '';
        for (const c of identifier) {
            sanitized += c;
            if (c === leftWrap) {
                sanitized += leftWrap;
            }
            else if (c === rightWrap) {
                sanitized += rightWrap;
            }
        }
        return sanitized;
    }
    addParameter(parameter) {
        this.#parameters.push(parameter);
    }
    appendImmediateValue(value) {
        if (isString(value)) {
            this.append(`'${value}'`);
        }
        else if (isNumber(value) || isBoolean(value)) {
            this.append(value.toString());
        }
        else if (isNull(value)) {
            this.append('null');
        }
        else if (isDate(value)) {
            this.appendImmediateValue(value.toISOString());
        }
        else if (isBigInt(value)) {
            this.appendImmediateValue(value.toString());
        }
        else {
            throw new Error(`invalid immediate value ${value}`);
        }
    }
    sortSelectModifiers(arr) {
        arr.sort((left, right) => left.modifier && right.modifier
            ? SELECT_MODIFIER_PRIORITY[left.modifier] -
                SELECT_MODIFIER_PRIORITY[right.modifier]
            : 1);
        return freeze(arr);
    }
    compileColumnAlterations(columnAlterations) {
        this.compileList(columnAlterations);
    }
    /**
     * controls whether the dialect adds a "type" keyword before a column's new data
     * type in an ALTER TABLE statement.
     */
    announcesNewColumnDataType() {
        return true;
    }
}
const SELECT_MODIFIER_SQL = freeze({
    ForKeyShare: 'for key share',
    ForNoKeyUpdate: 'for no key update',
    ForUpdate: 'for update',
    ForShare: 'for share',
    NoWait: 'nowait',
    SkipLocked: 'skip locked',
    Distinct: 'distinct',
});
const SELECT_MODIFIER_PRIORITY = freeze({
    ForKeyShare: 1,
    ForNoKeyUpdate: 1,
    ForUpdate: 1,
    ForShare: 1,
    NoWait: 2,
    SkipLocked: 2,
    Distinct: 0,
});
const JOIN_TYPE_SQL = freeze({
    InnerJoin: 'inner join',
    LeftJoin: 'left join',
    RightJoin: 'right join',
    FullJoin: 'full join',
    LateralInnerJoin: 'inner join lateral',
    LateralLeftJoin: 'left join lateral',
    Using: 'using',
});

/// <reference types="./compiled-query.d.ts" />
const CompiledQuery = freeze({
    raw(sql, parameters = []) {
        return freeze({
            sql,
            query: RawNode.createWithSql(sql),
            parameters: freeze(parameters),
        });
    },
});

/// <reference types="./dialect-adapter-base.d.ts" />
/**
 * A basic implementation of `DialectAdapter` with sensible default values.
 * Third-party dialects can extend this instead of implementing the `DialectAdapter`
 * interface from scratch. That way all new settings will get default values when
 * they are added and there will be less breaking changes.
 */
class DialectAdapterBase {
    get supportsCreateIfNotExists() {
        return true;
    }
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return false;
    }
    get supportsOutput() {
        return false;
    }
}

/// <reference types="./sqlite-driver.d.ts" />
class SqliteDriver {
    #config;
    #connectionMutex = new ConnectionMutex();
    #db;
    #connection;
    constructor(config) {
        this.#config = freeze({ ...config });
    }
    async init() {
        this.#db = isFunction(this.#config.database)
            ? await this.#config.database()
            : this.#config.database;
        this.#connection = new SqliteConnection(this.#db);
        if (this.#config.onCreateConnection) {
            await this.#config.onCreateConnection(this.#connection);
        }
    }
    async acquireConnection() {
        // SQLite only has one single connection. We use a mutex here to wait
        // until the single connection has been released.
        await this.#connectionMutex.lock();
        return this.#connection;
    }
    async beginTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('begin'));
    }
    async commitTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('rollback'));
    }
    async releaseConnection() {
        this.#connectionMutex.unlock();
    }
    async destroy() {
        this.#db?.close();
    }
}
class SqliteConnection {
    #db;
    constructor(db) {
        this.#db = db;
    }
    executeQuery(compiledQuery) {
        const { sql, parameters } = compiledQuery;
        const stmt = this.#db.prepare(sql);
        if (stmt.reader) {
            return Promise.resolve({
                rows: stmt.all(parameters),
            });
        }
        else {
            const { changes, lastInsertRowid } = stmt.run(parameters);
            const numAffectedRows = changes !== undefined && changes !== null ? BigInt(changes) : undefined;
            return Promise.resolve({
                // TODO: remove.
                numUpdatedOrDeletedRows: numAffectedRows,
                numAffectedRows,
                insertId: lastInsertRowid !== undefined && lastInsertRowid !== null
                    ? BigInt(lastInsertRowid)
                    : undefined,
                rows: [],
            });
        }
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const { sql, parameters, query } = compiledQuery;
        const stmt = this.#db.prepare(sql);
        if (SelectQueryNode.is(query)) {
            const iter = stmt.iterate(parameters);
            for (const row of iter) {
                yield {
                    rows: [row],
                };
            }
        }
        else {
            throw new Error('Sqlite driver only supports streaming of select queries');
        }
    }
}
class ConnectionMutex {
    #promise;
    #resolve;
    async lock() {
        while (this.#promise) {
            await this.#promise;
        }
        this.#promise = new Promise((resolve) => {
            this.#resolve = resolve;
        });
    }
    unlock() {
        const resolve = this.#resolve;
        this.#promise = undefined;
        this.#resolve = undefined;
        resolve?.();
    }
}

/// <reference types="./sqlite-query-compiler.d.ts" />
const ID_WRAP_REGEX$2 = /"/g;
class SqliteQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
        return '?';
    }
    getLeftExplainOptionsWrapper() {
        return '';
    }
    getRightExplainOptionsWrapper() {
        return '';
    }
    getLeftIdentifierWrapper() {
        return '"';
    }
    getRightIdentifierWrapper() {
        return '"';
    }
    getAutoIncrement() {
        return 'autoincrement';
    }
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX$2, '""');
    }
    visitDefaultInsertValue(_) {
        // sqlite doesn't support the `default` keyword in inserts.
        this.append('null');
    }
}

/// <reference types="./migrator.d.ts" />
const DEFAULT_MIGRATION_TABLE = 'kysely_migration';
const DEFAULT_MIGRATION_LOCK_TABLE = 'kysely_migration_lock';
freeze({ __noMigrations__: true });

/// <reference types="./sqlite-introspector.d.ts" />
class SqliteIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        // Sqlite doesn't support schemas.
        return [];
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        return await this.#getTableMetadata(options);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
    #tablesQuery(qb, options) {
        let tablesQuery = qb
            .selectFrom('sqlite_master')
            .where('type', 'in', ['table', 'view'])
            .where('name', 'not like', 'sqlite_%')
            .select(['name', 'sql', 'type'])
            .orderBy('name');
        if (!options.withInternalKyselyTables) {
            tablesQuery = tablesQuery
                .where('name', '!=', DEFAULT_MIGRATION_TABLE)
                .where('name', '!=', DEFAULT_MIGRATION_LOCK_TABLE);
        }
        return tablesQuery;
    }
    async #getTableMetadata(options) {
        const tablesResult = await this.#tablesQuery(this.#db, options).execute();
        const tableMetadata = await this.#db
            .with('table_list', (qb) => this.#tablesQuery(qb, options))
            .selectFrom([
            'table_list as tl',
            sql `pragma_table_info(tl.name)`.as('p'),
        ])
            .select([
            'tl.name as table',
            'p.cid',
            'p.name',
            'p.type',
            'p.notnull',
            'p.dflt_value',
            'p.pk',
        ])
            .orderBy(['tl.name', 'p.cid'])
            .execute();
        const columnsByTable = {};
        for (const row of tableMetadata) {
            columnsByTable[row.table] ??= [];
            columnsByTable[row.table].push(row);
        }
        return tablesResult.map(({ name, sql, type }) => {
            // // Try to find the name of the column that has `autoincrement` 🤦
            let autoIncrementCol = sql
                ?.split(/[\(\),]/)
                ?.find((it) => it.toLowerCase().includes('autoincrement'))
                ?.trimStart()
                ?.split(/\s+/)?.[0]
                ?.replace(/["`]/g, '');
            const columns = columnsByTable[name] ?? [];
            // Otherwise, check for an INTEGER PRIMARY KEY
            // https://www.sqlite.org/autoinc.html
            if (!autoIncrementCol) {
                const pkCols = columns.filter((r) => r.pk > 0);
                if (pkCols.length === 1 && pkCols[0].type.toLowerCase() === 'integer') {
                    autoIncrementCol = pkCols[0].name;
                }
            }
            return {
                name: name,
                isView: type === 'view',
                columns: columns.map((col) => ({
                    name: col.name,
                    dataType: col.type,
                    isNullable: !col.notnull,
                    isAutoIncrementing: col.name === autoIncrementCol,
                    hasDefaultValue: col.dflt_value != null,
                    comment: undefined,
                })),
            };
        });
    }
}

/// <reference types="./sqlite-adapter.d.ts" />
class SqliteAdapter extends DialectAdapterBase {
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return true;
    }
    async acquireMigrationLock(_db, _opt) {
        // SQLite only has one connection that's reserved by the migration system
        // for the whole time between acquireMigrationLock and releaseMigrationLock.
        // We don't need to do anything here.
    }
    async releaseMigrationLock(_db, _opt) {
        // SQLite only has one connection that's reserved by the migration system
        // for the whole time between acquireMigrationLock and releaseMigrationLock.
        // We don't need to do anything here.
    }
}

/// <reference types="./sqlite-dialect.d.ts" />
/**
 * SQLite dialect that uses the [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) library.
 *
 * The constructor takes an instance of {@link SqliteDialectConfig}.
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: new Database('db.sqlite')
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `database`
 * can be a function:
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: async () => new Database('db.sqlite')
 * })
 * ```
 */
class SqliteDialect {
    #config;
    constructor(config) {
        this.#config = freeze({ ...config });
    }
    createDriver() {
        return new SqliteDriver(this.#config);
    }
    createQueryCompiler() {
        return new SqliteQueryCompiler();
    }
    createAdapter() {
        return new SqliteAdapter();
    }
    createIntrospector(db) {
        return new SqliteIntrospector(db);
    }
}

/// <reference types="./postgres-query-compiler.d.ts" />
const ID_WRAP_REGEX$1 = /"/g;
class PostgresQueryCompiler extends DefaultQueryCompiler {
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX$1, '""');
    }
}

/// <reference types="./postgres-introspector.d.ts" />
class PostgresIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db
            .selectFrom('pg_catalog.pg_namespace')
            .select('nspname')
            .$castTo()
            .execute();
        return rawSchemas.map((it) => ({ name: it.nspname }));
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db
            // column
            .selectFrom('pg_catalog.pg_attribute as a')
            // table
            .innerJoin('pg_catalog.pg_class as c', 'a.attrelid', 'c.oid')
            // table schema
            .innerJoin('pg_catalog.pg_namespace as ns', 'c.relnamespace', 'ns.oid')
            // column data type
            .innerJoin('pg_catalog.pg_type as typ', 'a.atttypid', 'typ.oid')
            // column data type schema
            .innerJoin('pg_catalog.pg_namespace as dtns', 'typ.typnamespace', 'dtns.oid')
            .select([
            'a.attname as column',
            'a.attnotnull as not_null',
            'a.atthasdef as has_default',
            'c.relname as table',
            'c.relkind as table_type',
            'ns.nspname as schema',
            'typ.typname as type',
            'dtns.nspname as type_schema',
            sql `col_description(a.attrelid, a.attnum)`.as('column_description'),
            // Detect if the column is auto incrementing by finding the sequence
            // that is created for `serial` and `bigserial` columns.
            this.#db
                .selectFrom('pg_class')
                .select(sql `true`.as('auto_incrementing'))
                // Make sure the sequence is in the same schema as the table.
                .whereRef('relnamespace', '=', 'c.relnamespace')
                .where('relkind', '=', 'S')
                .where('relname', '=', sql `c.relname || '_' || a.attname || '_seq'`)
                .as('auto_incrementing'),
        ])
            // r == normal table
            .where((eb) => eb.or([
            eb('c.relkind', '=', 'r'),
            eb('c.relkind', '=', 'v'),
            eb('c.relkind', '=', 'p'),
        ]))
            .where('ns.nspname', '!~', '^pg_')
            .where('ns.nspname', '!=', 'information_schema')
            // No system columns
            .where('a.attnum', '>=', 0)
            .where('a.attisdropped', '!=', true)
            .orderBy('ns.nspname')
            .orderBy('c.relname')
            .orderBy('a.attnum')
            .$castTo();
        if (!options.withInternalKyselyTables) {
            query = query
                .where('c.relname', '!=', DEFAULT_MIGRATION_TABLE)
                .where('c.relname', '!=', DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
    #parseTableMetadata(columns) {
        return columns.reduce((tables, it) => {
            let table = tables.find((tbl) => tbl.name === it.table && tbl.schema === it.schema);
            if (!table) {
                table = freeze({
                    name: it.table,
                    isView: it.table_type === 'v',
                    schema: it.schema,
                    columns: [],
                });
                tables.push(table);
            }
            table.columns.push(freeze({
                name: it.column,
                dataType: it.type,
                dataTypeSchema: it.type_schema,
                isNullable: !it.not_null,
                isAutoIncrementing: !!it.auto_incrementing,
                hasDefaultValue: it.has_default,
                comment: it.column_description ?? undefined,
            }));
            return tables;
        }, []);
    }
}

/// <reference types="./postgres-adapter.d.ts" />
// Random id for our transaction lock.
const LOCK_ID$1 = BigInt('3853314791062309107');
class PostgresAdapter extends DialectAdapterBase {
    get supportsTransactionalDdl() {
        return true;
    }
    get supportsReturning() {
        return true;
    }
    async acquireMigrationLock(db, _opt) {
        // Acquire a transaction level advisory lock.
        await sql `select pg_advisory_xact_lock(${sql.lit(LOCK_ID$1)})`.execute(db);
    }
    async releaseMigrationLock(_db, _opt) {
        // Nothing to do here. `pg_advisory_xact_lock` is automatically released at the
        // end of the transaction and since `supportsTransactionalDdl` true, we know
        // the `db` instance passed to acquireMigrationLock is actually a transaction.
    }
}

/// <reference types="./stack-trace-utils.d.ts" />
function extendStackTrace(err, stackError) {
    if (isStackHolder(err) && stackError.stack) {
        // Remove the first line that just says `Error`.
        const stackExtension = stackError.stack.split('\n').slice(1).join('\n');
        err.stack += `\n${stackExtension}`;
        return err;
    }
    return err;
}
function isStackHolder(obj) {
    return isObject(obj) && isString(obj.stack);
}

/// <reference types="./mysql-driver.d.ts" />
const PRIVATE_RELEASE_METHOD$2 = Symbol();
class MysqlDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(configOrPool) {
        this.#config = freeze({ ...configOrPool });
    }
    async init() {
        this.#pool = isFunction(this.#config.pool)
            ? await this.#config.pool()
            : this.#config.pool;
    }
    async acquireConnection() {
        const rawConnection = await this.#acquireConnection();
        let connection = this.#connections.get(rawConnection);
        if (!connection) {
            connection = new MysqlConnection(rawConnection);
            this.#connections.set(rawConnection, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `mysql2` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config?.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config?.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async #acquireConnection() {
        return new Promise((resolve, reject) => {
            this.#pool.getConnection(async (err, rawConnection) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rawConnection);
                }
            });
        });
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel) {
            // On MySQL this sets the isolation level of the next transaction.
            await connection.executeQuery(CompiledQuery.raw(`set transaction isolation level ${settings.isolationLevel}`));
        }
        await connection.executeQuery(CompiledQuery.raw('begin'));
    }
    async commitTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('rollback'));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD$2]();
    }
    async destroy() {
        return new Promise((resolve, reject) => {
            this.#pool.end((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
function isOkPacket(obj) {
    return isObject(obj) && 'insertId' in obj && 'affectedRows' in obj;
}
class MysqlConnection {
    #rawConnection;
    constructor(rawConnection) {
        this.#rawConnection = rawConnection;
    }
    async executeQuery(compiledQuery) {
        try {
            const result = await this.#executeQuery(compiledQuery);
            if (isOkPacket(result)) {
                const { insertId, affectedRows, changedRows } = result;
                const numAffectedRows = affectedRows !== undefined && affectedRows !== null
                    ? BigInt(affectedRows)
                    : undefined;
                const numChangedRows = changedRows !== undefined && changedRows !== null
                    ? BigInt(changedRows)
                    : undefined;
                return {
                    insertId: insertId !== undefined &&
                        insertId !== null &&
                        insertId.toString() !== '0'
                        ? BigInt(insertId)
                        : undefined,
                    // TODO: remove.
                    numUpdatedOrDeletedRows: numAffectedRows,
                    numAffectedRows,
                    numChangedRows,
                    rows: [],
                };
            }
            else if (Array.isArray(result)) {
                return {
                    rows: result,
                };
            }
            return {
                rows: [],
            };
        }
        catch (err) {
            throw extendStackTrace(err, new Error());
        }
    }
    #executeQuery(compiledQuery) {
        return new Promise((resolve, reject) => {
            this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const stream = this.#rawConnection
            .query(compiledQuery.sql, compiledQuery.parameters)
            .stream({
            objectMode: true,
        });
        try {
            for await (const row of stream) {
                yield {
                    rows: [row],
                };
            }
        }
        catch (ex) {
            if (ex &&
                typeof ex === 'object' &&
                'code' in ex &&
                // @ts-ignore
                ex.code === 'ERR_STREAM_PREMATURE_CLOSE') {
                // Most likely because of https://github.com/mysqljs/mysql/blob/master/lib/protocol/sequences/Query.js#L220
                return;
            }
            throw ex;
        }
    }
    [PRIVATE_RELEASE_METHOD$2]() {
        this.#rawConnection.release();
    }
}

/// <reference types="./mysql-query-compiler.d.ts" />
const ID_WRAP_REGEX = /`/g;
class MysqlQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
        return '?';
    }
    getLeftExplainOptionsWrapper() {
        return '';
    }
    getExplainOptionAssignment() {
        return '=';
    }
    getExplainOptionsDelimiter() {
        return ' ';
    }
    getRightExplainOptionsWrapper() {
        return '';
    }
    getLeftIdentifierWrapper() {
        return '`';
    }
    getRightIdentifierWrapper() {
        return '`';
    }
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '``');
    }
    visitCreateIndex(node) {
        this.append('create ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
    }
}

/// <reference types="./mysql-introspector.d.ts" />
class MysqlIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db
            .selectFrom('information_schema.schemata')
            .select('schema_name')
            .$castTo()
            .execute();
        return rawSchemas.map((it) => ({ name: it.SCHEMA_NAME }));
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db
            .selectFrom('information_schema.columns as columns')
            .innerJoin('information_schema.tables as tables', (b) => b
            .onRef('columns.TABLE_CATALOG', '=', 'tables.TABLE_CATALOG')
            .onRef('columns.TABLE_SCHEMA', '=', 'tables.TABLE_SCHEMA')
            .onRef('columns.TABLE_NAME', '=', 'tables.TABLE_NAME'))
            .select([
            'columns.COLUMN_NAME',
            'columns.COLUMN_DEFAULT',
            'columns.TABLE_NAME',
            'columns.TABLE_SCHEMA',
            'tables.TABLE_TYPE',
            'columns.IS_NULLABLE',
            'columns.DATA_TYPE',
            'columns.EXTRA',
            'columns.COLUMN_COMMENT',
        ])
            .where('columns.TABLE_SCHEMA', '=', sql `database()`)
            .orderBy('columns.TABLE_NAME')
            .orderBy('columns.ORDINAL_POSITION')
            .$castTo();
        if (!options.withInternalKyselyTables) {
            query = query
                .where('columns.TABLE_NAME', '!=', DEFAULT_MIGRATION_TABLE)
                .where('columns.TABLE_NAME', '!=', DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
    #parseTableMetadata(columns) {
        return columns.reduce((tables, it) => {
            let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
            if (!table) {
                table = freeze({
                    name: it.TABLE_NAME,
                    isView: it.TABLE_TYPE === 'VIEW',
                    schema: it.TABLE_SCHEMA,
                    columns: [],
                });
                tables.push(table);
            }
            table.columns.push(freeze({
                name: it.COLUMN_NAME,
                dataType: it.DATA_TYPE,
                isNullable: it.IS_NULLABLE === 'YES',
                isAutoIncrementing: it.EXTRA.toLowerCase().includes('auto_increment'),
                hasDefaultValue: it.COLUMN_DEFAULT !== null,
                comment: it.COLUMN_COMMENT === '' ? undefined : it.COLUMN_COMMENT,
            }));
            return tables;
        }, []);
    }
}

/// <reference types="./mysql-adapter.d.ts" />
const LOCK_ID = 'ea586330-2c93-47c8-908d-981d9d270f9d';
const LOCK_TIMEOUT_SECONDS = 60 * 60;
class MysqlAdapter extends DialectAdapterBase {
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return false;
    }
    async acquireMigrationLock(db, _opt) {
        // Kysely uses a single connection to run the migrations. Because of that, we
        // can take a lock using `get_lock`. Locks acquired using `get_lock` get
        // released when the connection is destroyed (session ends) or when the lock
        // is released using `release_lock`. This way we know that the lock is either
        // released by us after successfull or failed migrations OR it's released by
        // MySQL if the process gets killed for some reason.
        await sql `select get_lock(${sql.lit(LOCK_ID)}, ${sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
    }
    async releaseMigrationLock(db, _opt) {
        await sql `select release_lock(${sql.lit(LOCK_ID)})`.execute(db);
    }
}

/// <reference types="./mysql-dialect.d.ts" />
/**
 * MySQL dialect that uses the [mysql2](https://github.com/sidorares/node-mysql2#readme) library.
 *
 * The constructor takes an instance of {@link MysqlDialectConfig}.
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: async () => createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
class MysqlDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createDriver() {
        return new MysqlDriver(this.#config);
    }
    createQueryCompiler() {
        return new MysqlQueryCompiler();
    }
    createAdapter() {
        return new MysqlAdapter();
    }
    createIntrospector(db) {
        return new MysqlIntrospector(db);
    }
}

/// <reference types="./postgres-driver.d.ts" />
const PRIVATE_RELEASE_METHOD$1 = Symbol();
class PostgresDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(config) {
        this.#config = freeze({ ...config });
    }
    async init() {
        this.#pool = isFunction(this.#config.pool)
            ? await this.#config.pool()
            : this.#config.pool;
    }
    async acquireConnection() {
        const client = await this.#pool.connect();
        let connection = this.#connections.get(client);
        if (!connection) {
            connection = new PostgresConnection(client, {
                cursor: this.#config.cursor ?? null,
            });
            this.#connections.set(client, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `pg` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel) {
            await connection.executeQuery(CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`));
        }
        else {
            await connection.executeQuery(CompiledQuery.raw('begin'));
        }
    }
    async commitTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('rollback'));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD$1]();
    }
    async destroy() {
        if (this.#pool) {
            const pool = this.#pool;
            this.#pool = undefined;
            await pool.end();
        }
    }
}
class PostgresConnection {
    #client;
    #options;
    constructor(client, options) {
        this.#client = client;
        this.#options = options;
    }
    async executeQuery(compiledQuery) {
        try {
            const result = await this.#client.query(compiledQuery.sql, [
                ...compiledQuery.parameters,
            ]);
            if (result.command === 'INSERT' ||
                result.command === 'UPDATE' ||
                result.command === 'DELETE' ||
                result.command === 'MERGE') {
                const numAffectedRows = BigInt(result.rowCount);
                return {
                    // TODO: remove.
                    numUpdatedOrDeletedRows: numAffectedRows,
                    numAffectedRows,
                    rows: result.rows ?? [],
                };
            }
            return {
                rows: result.rows ?? [],
            };
        }
        catch (err) {
            throw extendStackTrace(err, new Error());
        }
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!this.#options.cursor) {
            throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
        }
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
        try {
            while (true) {
                const rows = await cursor.read(chunkSize);
                if (rows.length === 0) {
                    break;
                }
                yield {
                    rows,
                };
            }
        }
        finally {
            await cursor.close();
        }
    }
    [PRIVATE_RELEASE_METHOD$1]() {
        this.#client.release();
    }
}

/// <reference types="./postgres-dialect.d.ts" />
/**
 * PostgreSQL dialect that uses the [pg](https://node-postgres.com/) library.
 *
 * The constructor takes an instance of {@link PostgresDialectConfig}.
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: async () => new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
class PostgresDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createDriver() {
        return new PostgresDriver(this.#config);
    }
    createQueryCompiler() {
        return new PostgresQueryCompiler();
    }
    createAdapter() {
        return new PostgresAdapter();
    }
    createIntrospector(db) {
        return new PostgresIntrospector(db);
    }
}

/// <reference types="./mssql-adapter.d.ts" />
class MssqlAdapter extends DialectAdapterBase {
    get supportsCreateIfNotExists() {
        return false;
    }
    get supportsTransactionalDdl() {
        return true;
    }
    get supportsOutput() {
        return true;
    }
    async acquireMigrationLock(db) {
        // Acquire a transaction-level exclusive lock on the migrations table.
        // https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-getapplock-transact-sql?view=sql-server-ver16
        await sql `exec sp_getapplock @DbPrincipal = ${sql.lit('dbo')}, @Resource = ${sql.lit(DEFAULT_MIGRATION_TABLE)}, @LockMode = ${sql.lit('Exclusive')}`.execute(db);
    }
    async releaseMigrationLock() {
        // Nothing to do here. `sp_getapplock` is automatically released at the
        // end of the transaction and since `supportsTransactionalDdl` true, we know
        // the `db` instance passed to acquireMigrationLock is actually a transaction.
    }
}

/// <reference types="./mssql-driver.d.ts" />
const PRIVATE_RELEASE_METHOD = Symbol();
const PRIVATE_DESTROY_METHOD = Symbol();
class MssqlDriver {
    #config;
    #pool;
    constructor(config) {
        this.#config = freeze({ ...config });
        const { tarn, tedious } = this.#config;
        const { validateConnections, ...poolOptions } = tarn.options;
        this.#pool = new tarn.Pool({
            ...poolOptions,
            create: async () => {
                const connection = await tedious.connectionFactory();
                return await new MssqlConnection(connection, tedious).connect();
            },
            destroy: async (connection) => {
                await connection[PRIVATE_DESTROY_METHOD]();
            },
            // @ts-ignore `tarn` accepts a function that returns a promise here, but
            // the types are not aligned and it type errors.
            validate: validateConnections === false
                ? undefined
                : (connection) => connection.validate(),
        });
    }
    async init() {
        // noop
    }
    async acquireConnection() {
        return await this.#pool.acquire().promise;
    }
    async beginTransaction(connection, settings) {
        await connection.beginTransaction(settings);
    }
    async commitTransaction(connection) {
        await connection.commitTransaction();
    }
    async rollbackTransaction(connection) {
        await connection.rollbackTransaction();
    }
    async releaseConnection(connection) {
        await connection[PRIVATE_RELEASE_METHOD]();
        this.#pool.release(connection);
    }
    async destroy() {
        await this.#pool.destroy();
    }
}
class MssqlConnection {
    #connection;
    #tedious;
    constructor(connection, tedious) {
        this.#connection = connection;
        this.#tedious = tedious;
        this.#connection.on('error', console.error);
        this.#connection.once('end', () => {
            this.#connection.off('error', console.error);
        });
    }
    async beginTransaction(settings) {
        const { isolationLevel } = settings;
        await new Promise((resolve, reject) => this.#connection.beginTransaction((error) => {
            if (error)
                reject(error);
            else
                resolve(undefined);
        }, isolationLevel ? randomString(8) : undefined, isolationLevel
            ? this.#getTediousIsolationLevel(isolationLevel)
            : undefined));
    }
    async commitTransaction() {
        await new Promise((resolve, reject) => this.#connection.commitTransaction((error) => {
            if (error)
                reject(error);
            else
                resolve(undefined);
        }));
    }
    async connect() {
        await new Promise((resolve, reject) => {
            this.#connection.connect((error) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            });
        });
        return this;
    }
    async executeQuery(compiledQuery) {
        try {
            const deferred = new Deferred();
            const request = new MssqlRequest({
                compiledQuery,
                tedious: this.#tedious,
                onDone: deferred,
            });
            this.#connection.execSql(request.request);
            const { rowCount, rows } = await deferred.promise;
            return {
                numAffectedRows: rowCount !== undefined ? BigInt(rowCount) : undefined,
                rows,
            };
        }
        catch (err) {
            throw extendStackTrace(err, new Error());
        }
    }
    async rollbackTransaction() {
        await new Promise((resolve, reject) => this.#connection.rollbackTransaction((error) => {
            if (error)
                reject(error);
            else
                resolve(undefined);
        }));
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const request = new MssqlRequest({
            compiledQuery,
            streamChunkSize: chunkSize,
            tedious: this.#tedious,
        });
        this.#connection.execSql(request.request);
        try {
            while (true) {
                const rows = await request.readChunk();
                if (rows.length === 0) {
                    break;
                }
                yield { rows };
                if (rows.length < chunkSize) {
                    break;
                }
            }
        }
        finally {
            await this.#cancelRequest(request);
        }
    }
    async validate() {
        try {
            const deferred = new Deferred();
            const request = new MssqlRequest({
                compiledQuery: CompiledQuery.raw('select 1'),
                onDone: deferred,
                tedious: this.#tedious,
            });
            this.#connection.execSql(request.request);
            await deferred.promise;
            return true;
        }
        catch {
            return false;
        }
    }
    #getTediousIsolationLevel(isolationLevel) {
        const { ISOLATION_LEVEL } = this.#tedious;
        const mapper = {
            'read committed': ISOLATION_LEVEL.READ_COMMITTED,
            'read uncommitted': ISOLATION_LEVEL.READ_UNCOMMITTED,
            'repeatable read': ISOLATION_LEVEL.REPEATABLE_READ,
            serializable: ISOLATION_LEVEL.SERIALIZABLE,
            snapshot: ISOLATION_LEVEL.SNAPSHOT,
        };
        const tediousIsolationLevel = mapper[isolationLevel];
        if (tediousIsolationLevel === undefined) {
            throw new Error(`Unknown isolation level: ${isolationLevel}`);
        }
        return tediousIsolationLevel;
    }
    #cancelRequest(request) {
        return new Promise((resolve) => {
            request.request.once('requestCompleted', resolve);
            const wasCanceled = this.#connection.cancel();
            if (!wasCanceled) {
                request.request.off('requestCompleted', resolve);
                resolve(undefined);
            }
        });
    }
    async [PRIVATE_RELEASE_METHOD]() {
        // TODO: flip this to `if (!this.#tedious.resetConnectionOnRelease) {}` in a future PR.
        if (this.#tedious.resetConnectionOnRelease !== false) {
            await new Promise((resolve, reject) => {
                this.#connection.reset((error) => {
                    if (error)
                        reject(error);
                    else
                        resolve(undefined);
                });
            });
        }
    }
    [PRIVATE_DESTROY_METHOD]() {
        return new Promise((resolve) => {
            this.#connection.once('end', () => {
                resolve(undefined);
            });
            this.#connection.close();
        });
    }
}
class MssqlRequest {
    #request;
    #rows;
    #streamChunkSize;
    #subscribers;
    #tedious;
    #error;
    #rowCount;
    constructor(props) {
        const { compiledQuery, onDone, streamChunkSize, tedious } = props;
        this.#rows = [];
        this.#streamChunkSize = streamChunkSize;
        this.#subscribers = {};
        this.#tedious = tedious;
        if (onDone) {
            const subscriptionKey = 'onDone';
            this.#subscribers[subscriptionKey] = (event, error) => {
                if (event === 'chunkReady') {
                    return;
                }
                delete this.#subscribers[subscriptionKey];
                if (event === 'error') {
                    onDone.reject(error);
                }
                else {
                    onDone.resolve({
                        rowCount: this.#rowCount,
                        rows: this.#rows,
                    });
                }
            };
        }
        this.#request = new this.#tedious.Request(compiledQuery.sql, (err, rowCount) => {
            if (err) {
                Object.values(this.#subscribers).forEach((subscriber) => subscriber('error', err instanceof AggregateError ? err.errors : err));
            }
            else {
                this.#rowCount = rowCount;
            }
        });
        this.#addParametersToRequest(compiledQuery.parameters);
        this.#attachListeners();
    }
    get request() {
        return this.#request;
    }
    readChunk() {
        const subscriptionKey = this.readChunk.name;
        return new Promise((resolve, reject) => {
            this.#subscribers[subscriptionKey] = (event, error) => {
                delete this.#subscribers[subscriptionKey];
                if (event === 'error') {
                    reject(error);
                }
                else {
                    resolve(this.#rows.splice(0, this.#streamChunkSize));
                }
            };
            this.#request.resume();
        });
    }
    #addParametersToRequest(parameters) {
        for (let i = 0; i < parameters.length; i++) {
            const parameter = parameters[i];
            this.#request.addParameter(String(i + 1), this.#getTediousDataType(parameter), parameter);
        }
    }
    #attachListeners() {
        const pauseAndEmitChunkReady = this.#streamChunkSize
            ? () => {
                if (this.#streamChunkSize <= this.#rows.length) {
                    this.#request.pause();
                    Object.values(this.#subscribers).forEach((subscriber) => subscriber('chunkReady'));
                }
            }
            : () => { };
        const rowListener = (columns) => {
            const row = {};
            for (const column of columns) {
                row[column.metadata.colName] = column.value;
            }
            this.#rows.push(row);
            pauseAndEmitChunkReady();
        };
        this.#request.on('row', rowListener);
        this.#request.once('requestCompleted', () => {
            Object.values(this.#subscribers).forEach((subscriber) => subscriber('completed'));
            this.#request.off('row', rowListener);
        });
    }
    #getTediousDataType(value) {
        if (isNull(value) || isUndefined(value) || isString(value)) {
            return this.#tedious.TYPES.NVarChar;
        }
        if (isBigInt(value) || (isNumber(value) && value % 1 === 0)) {
            if (value < -2147483648 || value > 2147483647) {
                return this.#tedious.TYPES.BigInt;
            }
            else {
                return this.#tedious.TYPES.Int;
            }
        }
        if (isNumber(value)) {
            return this.#tedious.TYPES.Float;
        }
        if (isBoolean(value)) {
            return this.#tedious.TYPES.Bit;
        }
        if (isDate(value)) {
            return this.#tedious.TYPES.DateTime;
        }
        if (isBuffer(value)) {
            return this.#tedious.TYPES.VarBinary;
        }
        return this.#tedious.TYPES.NVarChar;
    }
}

/// <reference types="./mssql-introspector.d.ts" />
class MssqlIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        return await this.#db.selectFrom('sys.schemas').select('name').execute();
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        const rawColumns = await this.#db
            .selectFrom('sys.tables as tables')
            .leftJoin('sys.schemas as table_schemas', 'table_schemas.schema_id', 'tables.schema_id')
            .innerJoin('sys.columns as columns', 'columns.object_id', 'tables.object_id')
            .innerJoin('sys.types as types', 'types.user_type_id', 'columns.user_type_id')
            .leftJoin('sys.schemas as type_schemas', 'type_schemas.schema_id', 'types.schema_id')
            .leftJoin('sys.extended_properties as comments', (join) => join
            .onRef('comments.major_id', '=', 'tables.object_id')
            .onRef('comments.minor_id', '=', 'columns.column_id')
            .on('comments.name', '=', 'MS_Description'))
            .$if(!options.withInternalKyselyTables, (qb) => qb
            .where('tables.name', '!=', DEFAULT_MIGRATION_TABLE)
            .where('tables.name', '!=', DEFAULT_MIGRATION_LOCK_TABLE))
            .select([
            'tables.name as table_name',
            (eb) => eb
                .ref('tables.type')
                .$castTo()
                .as('table_type'),
            'table_schemas.name as table_schema_name',
            'columns.default_object_id as column_default_object_id',
            'columns.generated_always_type_desc as column_generated_always_type',
            'columns.is_computed as column_is_computed',
            'columns.is_identity as column_is_identity',
            'columns.is_nullable as column_is_nullable',
            'columns.is_rowguidcol as column_is_rowguidcol',
            'columns.name as column_name',
            'types.is_nullable as type_is_nullable',
            'types.name as type_name',
            'type_schemas.name as type_schema_name',
            'comments.value as column_comment',
        ])
            .unionAll(this.#db
            .selectFrom('sys.views as views')
            .leftJoin('sys.schemas as view_schemas', 'view_schemas.schema_id', 'views.schema_id')
            .innerJoin('sys.columns as columns', 'columns.object_id', 'views.object_id')
            .innerJoin('sys.types as types', 'types.user_type_id', 'columns.user_type_id')
            .leftJoin('sys.schemas as type_schemas', 'type_schemas.schema_id', 'types.schema_id')
            .leftJoin('sys.extended_properties as comments', (join) => join
            .onRef('comments.major_id', '=', 'views.object_id')
            .onRef('comments.minor_id', '=', 'columns.column_id')
            .on('comments.name', '=', 'MS_Description'))
            .select([
            'views.name as table_name',
            'views.type as table_type',
            'view_schemas.name as table_schema_name',
            'columns.default_object_id as column_default_object_id',
            'columns.generated_always_type_desc as column_generated_always_type',
            'columns.is_computed as column_is_computed',
            'columns.is_identity as column_is_identity',
            'columns.is_nullable as column_is_nullable',
            'columns.is_rowguidcol as column_is_rowguidcol',
            'columns.name as column_name',
            'types.is_nullable as type_is_nullable',
            'types.name as type_name',
            'type_schemas.name as type_schema_name',
            'comments.value as column_comment',
        ]))
            .orderBy('table_schema_name')
            .orderBy('table_name')
            .orderBy('column_name')
            .execute();
        const tableDictionary = {};
        for (const rawColumn of rawColumns) {
            const key = `${rawColumn.table_schema_name}.${rawColumn.table_name}`;
            const table = (tableDictionary[key] =
                tableDictionary[key] ||
                    freeze({
                        columns: [],
                        isView: rawColumn.table_type === 'V ',
                        name: rawColumn.table_name,
                        schema: rawColumn.table_schema_name ?? undefined,
                    }));
            table.columns.push(freeze({
                dataType: rawColumn.type_name,
                dataTypeSchema: rawColumn.type_schema_name ?? undefined,
                hasDefaultValue: rawColumn.column_default_object_id > 0 ||
                    rawColumn.column_generated_always_type !== 'NOT_APPLICABLE' ||
                    rawColumn.column_is_identity ||
                    rawColumn.column_is_computed ||
                    rawColumn.column_is_rowguidcol,
                isAutoIncrementing: rawColumn.column_is_identity,
                isNullable: rawColumn.column_is_nullable && rawColumn.type_is_nullable,
                name: rawColumn.column_name,
                comment: rawColumn.column_comment ?? undefined,
            }));
        }
        return Object.values(tableDictionary);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
}

/// <reference types="./mssql-query-compiler.d.ts" />
class MssqlQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
        return `@${this.numParameters}`;
    }
    visitOffset(node) {
        super.visitOffset(node);
        this.append(' rows');
    }
    // mssql allows multi-column alterations in a single statement,
    // but you can only use the command keyword/s once.
    // it also doesn't support multiple kinds of commands in the same
    // alter table statement, but we compile that anyway for the sake
    // of WYSIWYG.
    compileColumnAlterations(columnAlterations) {
        const nodesByKind = {};
        for (const columnAlteration of columnAlterations) {
            if (!nodesByKind[columnAlteration.kind]) {
                nodesByKind[columnAlteration.kind] = [];
            }
            nodesByKind[columnAlteration.kind].push(columnAlteration);
        }
        let first = true;
        if (nodesByKind.AddColumnNode) {
            this.append('add ');
            this.compileList(nodesByKind.AddColumnNode);
            first = false;
        }
        // multiple of these are not really supported by mssql,
        // but for the sake of WYSIWYG.
        if (nodesByKind.AlterColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.AlterColumnNode);
        }
        if (nodesByKind.DropColumnNode) {
            if (!first)
                this.append(', ');
            this.append('drop column ');
            this.compileList(nodesByKind.DropColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.ModifyColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.ModifyColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.RenameColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.RenameColumnNode);
        }
    }
    visitAddColumn(node) {
        this.visitNode(node.column);
    }
    visitDropColumn(node) {
        this.visitNode(node.column);
    }
    visitMergeQuery(node) {
        super.visitMergeQuery(node);
        this.append(';');
    }
    announcesNewColumnDataType() {
        return false;
    }
}

/// <reference types="./mssql-dialect.d.ts" />
/**
 * MS SQL Server dialect that uses the [tedious](https://tediousjs.github.io/tedious)
 * library.
 *
 * The constructor takes an instance of {@link MssqlDialectConfig}.
 *
 * ```ts
 * import * as Tedious from 'tedious'
 * import * as Tarn from 'tarn'
 *
 * const dialect = new MssqlDialect({
 *   tarn: {
 *     ...Tarn,
 *     options: {
 *       min: 0,
 *       max: 10,
 *     },
 *   },
 *   tedious: {
 *     ...Tedious,
 *     connectionFactory: () => new Tedious.Connection({
 *       authentication: {
 *         options: {
 *           password: 'password',
 *           userName: 'username',
 *         },
 *         type: 'default',
 *       },
 *       options: {
 *         database: 'some_db',
 *         port: 1433,
 *         trustServerCertificate: true,
 *       },
 *       server: 'localhost',
 *     }),
 *   },
 * })
 * ```
 */
class MssqlDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createDriver() {
        return new MssqlDriver(this.#config);
    }
    createQueryCompiler() {
        return new MssqlQueryCompiler();
    }
    createAdapter() {
        return new MssqlAdapter();
    }
    createIntrospector(db) {
        return new MssqlIntrospector(db);
    }
}

var Pe=createMiddleware(async()=>({})),Z=createMiddlewareCreator({use:[Pe,createMiddleware(async()=>({}))]}),k$1=createEndpointCreator({use:[Pe]});var Se=Z(async e=>{if(e.request?.method!=="POST")return;let{body:t,query:r,context:n}=e,i=e.headers?.get("origin")||e.headers?.get("referer")||"",s=t?.callbackURL||r?.callbackURL,a=t?.redirectTo,u=r?.currentURL,o=n.trustedOrigins,d=e.headers?.has("cookie"),c=(p,m)=>m.includes("*")?new RegExp("^"+m.replace(/\*/g,"[^/]+").replace(/\./g,"\\.")+"$").test(p):p.startsWith(m),l=(p,m)=>{if(!p)return;if(!o.some(g=>c(p,g)||p?.startsWith("/")&&m!=="origin"&&!p.includes(":")))throw e.context.logger.error(`Invalid ${m}: ${p}`),e.context.logger.info(`If it's a valid URL, please add ${p} to trustedOrigins in your auth config
`,`Current list of trustedOrigins: ${o}`),new APIError("FORBIDDEN",{message:`Invalid ${m}`})};d&&!e.context.options.advanced?.disableCSRFCheck&&l(i,"origin"),s&&l(s,"callbackURL"),a&&l(a,"redirectURL"),u&&l(u,"currentURL");});function ge(e,t){let r=new Uint8Array(e),n=new Uint8Array(t);if(r.length!==n.length)return  false;let i=0;for(let s=0;s<r.length;s++)i|=r[s]^n[s];return i===0}async function Jt({value:e,secret:t}){return new HMAC$1("SHA-256").sign(new TextEncoder().encode(t),new TextEncoder().encode(e)).then(n=>Buffer.from(n).toString("base64"))}function Yt({value:e,signature:t,secret:r}){return new HMAC$1("SHA-256").verify(new TextEncoder().encode(r),Buffer.from(t,"base64"),new TextEncoder().encode(e))}var ne={sign:Jt,verify:Yt};var L=class extends Error{constructor(t,r){super(t),this.name="BetterAuthError",this.message=t,this.cause=r,this.stack="";}};var D=(e,t="ms")=>new Date(Date.now()+(t==="sec"?e*1e3:e));var oe=Object.create(null),Q=e=>globalThis.process?.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?oe:globalThis),P$1=new Proxy(oe,{get(e,t){return Q()[t]??oe[t]},has(e,t){let r=Q();return t in r||t in oe},set(e,t,r){let n=Q(true);return n[t]=r,true},deleteProperty(e,t){if(!t)return  false;let r=Q(true);return delete r[t],true},ownKeys(){let e=Q(true);return Object.keys(e)}});function Xt(e){return e?e!=="false":false}var ie=typeof process<"u"&&process.env&&process.env.NODE_ENV||"",J=ie==="production",Ce=ie==="dev"||ie==="development",De=ie==="test"||Xt(P$1.TEST);function he(e){let r=(e.advanced?.useSecureCookies!==void 0?e.advanced?.useSecureCookies:e.baseURL!==void 0?!!e.baseURL.startsWith("https://"):J)?"__Secure-":"",n=!!e.advanced?.crossSubDomainCookies?.enabled,i=n?e.advanced?.crossSubDomainCookies?.domain||(e.baseURL?new URL(e.baseURL).hostname:void 0):void 0;if(n&&!i)throw new L("baseURL is required when crossSubdomainCookies are enabled");function s(a,u={}){let o=e.advanced?.cookiePrefix||"better-auth",d=e.advanced?.cookies?.[a]?.name||`${o}.${a}`,c=e.advanced?.cookies?.[a]?.attributes;return {name:`${r}${d}`,attributes:{secure:!!r,sameSite:"lax",path:"/",httpOnly:true,...n?{domain:i}:{},...e.advanced?.defaultCookieAttributes,...u,...c}}}return s}function Be(e){let t=he(e),r=e.session?.expiresIn||new TimeSpan(7,"d").seconds(),n=t("session_token",{maxAge:r}),i=t("session_data",{maxAge:e.session?.cookieCache?.maxAge||60*5}),s=t("dont_remember");return {sessionToken:{name:n.name,options:n.attributes},sessionData:{name:i.name,options:i.attributes},dontRememberToken:{name:s.name,options:s.attributes}}}async function O(e,t,r,n){let i=e.context.authCookies.sessionToken.options,s=r?void 0:e.context.sessionConfig.expiresIn;await e.setSignedCookie(e.context.authCookies.sessionToken.name,t.session.token,e.context.secret,{...i,maxAge:s,...n}),r&&await e.setSignedCookie(e.context.authCookies.dontRememberToken.name,"true",e.context.secret,e.context.authCookies.dontRememberToken.options),e.context.options.session?.cookieCache?.enabled&&e.setCookie(e.context.authCookies.sessionData.name,JSON.stringify(base64url.encode(new TextEncoder().encode(JSON.stringify({session:t,expiresAt:D(e.context.authCookies.sessionData.options.maxAge||60,"sec").getTime(),signature:await ne.sign({value:JSON.stringify(t),secret:e.context.secret})})))),e.context.authCookies.sessionData.options),e.context.options.secondaryStorage&&await e.context.secondaryStorage?.set(t.session.token,JSON.stringify({user:t.user,session:t.session}),t.session.expiresAt.getTime()-Date.now());}function N(e){e.setCookie(e.context.authCookies.sessionToken.name,"",{...e.context.authCookies.sessionToken.options,maxAge:0}),e.setCookie(e.context.authCookies.sessionData.name,"",{...e.context.authCookies.sessionData.options,maxAge:0}),e.setCookie(e.context.authCookies.dontRememberToken.name,"",{...e.context.authCookies.dontRememberToken.options,maxAge:0});}async function qe(e){let t=await sha256$1(new TextEncoder().encode(e));return base64url.encode(new Uint8Array(t),{includePadding:false})}function Ne(e){return {tokenType:e.token_type,accessToken:e.access_token,refreshToken:e.refresh_token,accessTokenExpiresAt:e.expires_in?D(e.expires_in,"sec"):void 0,scopes:e?.scope?typeof e.scope=="string"?e.scope.split(" "):e.scope:[],idToken:e.id_token}}async function v$1({id:e,options:t,authorizationEndpoint:r,state:n,codeVerifier:i,scopes:s,claims:a,redirectURI:u}){let o=new URL(r);if(o.searchParams.set("response_type","code"),o.searchParams.set("client_id",t.clientId),o.searchParams.set("state",n),o.searchParams.set("scope",s.join(" ")),o.searchParams.set("redirect_uri",t.redirectURI||u),i){let d=await qe(i);o.searchParams.set("code_challenge_method","S256"),o.searchParams.set("code_challenge",d);}if(a){let d=a.reduce((c,l)=>(c[l]=null,c),{});o.searchParams.set("claims",JSON.stringify({id_token:{email:null,email_verified:null,...d}}));}return o}async function x$1({code:e,codeVerifier:t,redirectURI:r,options:n,tokenEndpoint:i,authentication:s}){let a=new URLSearchParams,u={"content-type":"application/x-www-form-urlencoded",accept:"application/json","user-agent":"better-auth"};if(a.set("grant_type","authorization_code"),a.set("code",e),t&&a.set("code_verifier",t),a.set("redirect_uri",r),s==="basic"){let l=btoa(`${n.clientId}:${n.clientSecret}`);u.authorization=`Basic ${l}`;}else a.set("client_id",n.clientId),a.set("client_secret",n.clientSecret);let{data:o,error:d}=await betterFetch(i,{method:"POST",body:a,headers:u});if(d)throw d;return Ne(o)}function ir(e){try{return new URL(e).pathname!=="/"}catch{throw new L(`Invalid base URL: ${e}. Please provide a valid base URL.`)}}function ye(e,t="/api/auth"){return ir(e)?e:(t=t.startsWith("/")?t:`/${t}`,`${e}${t}`)}function Y(e,t){if(e)return ye(e,t);let r=P$1.BETTER_AUTH_URL||P$1.NEXT_PUBLIC_BETTER_AUTH_URL||P$1.PUBLIC_BETTER_AUTH_URL||P$1.NUXT_PUBLIC_BETTER_AUTH_URL||P$1.NUXT_PUBLIC_AUTH_URL||(P$1.BASE_URL!=="/"?P$1.BASE_URL:void 0);if(r)return ye(r,t);if(typeof window<"u"&&window.location)return ye(window.location.origin,t)}function je(e){try{return new URL(e).origin}catch{return null}}async function se(e,t){let r=e.body?.callbackURL||(e.query?.currentURL?je(e.query?.currentURL):"")||e.context.options.baseURL;if(!r)throw new APIError("BAD_REQUEST",{message:"callbackURL is required"});let n=generateCodeVerifier(),i=generateState(),s=JSON.stringify({callbackURL:r,codeVerifier:n,errorURL:e.body?.errorCallbackURL||e.query?.currentURL,link:t,expiresAt:Date.now()+10*60*1e3}),a=new Date;a.setMinutes(a.getMinutes()+10);let u=await e.context.internalAdapter.createVerificationValue({value:s,identifier:i,expiresAt:a});if(!u)throw e.context.logger.error("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database"),new APIError("INTERNAL_SERVER_ERROR",{message:"Unable to create verification"});return {state:u.identifier,codeVerifier:n}}async function Ve(e){let t=e.query.state||e.body.state,r=await e.context.internalAdapter.findVerificationValue(t);if(!r)throw e.context.logger.error("State Mismatch. Verification not found",{state:t}),e.redirect(`${e.context.baseURL}/error?error=please_restart_the_process`);let n=objectType({callbackURL:stringType(),codeVerifier:stringType(),errorURL:stringType().optional(),expiresAt:numberType(),link:objectType({email:stringType(),userId:stringType()}).optional()}).parse(JSON.parse(r.value));if(n.errorURL||(n.errorURL=`${e.context.baseURL}/error`),n.expiresAt<Date.now())throw await e.context.internalAdapter.deleteVerificationValue(r.id),e.context.logger.error("State expired.",{state:t}),e.redirect(`${e.context.baseURL}/error?error=please_restart_the_process`);return await e.context.internalAdapter.deleteVerificationValue(r.id),n}var $e=e=>{let t="https://appleid.apple.com/auth/token";return {id:"apple",name:"Apple",createAuthorizationURL({state:r,scopes:n,redirectURI:i}){let s=n||["email","name"];return e.scope&&s.push(...e.scope),new URL(`https://appleid.apple.com/auth/authorize?client_id=${e.clientId}&response_type=code&redirect_uri=${i||e.redirectURI}&scope=${s.join(" ")}&state=${r}&response_mode=form_post`)},validateAuthorizationCode:async({code:r,codeVerifier:n,redirectURI:i})=>x$1({code:r,codeVerifier:n,redirectURI:e.redirectURI||i,options:e,tokenEndpoint:t}),async verifyIdToken(r,n){if(e.disableIdTokenSignIn)return  false;if(e.verifyIdToken)return e.verifyIdToken(r,n);let i=decodeProtectedHeader(r),{kid:s,alg:a}=i;if(!s||!a)return  false;let u=await mr(s),{payload:o}=await jwtVerify(r,u,{algorithms:[a],issuer:"https://appleid.apple.com",audience:e.clientId,maxTokenAge:"1h"});return ["email_verified","is_private_email"].forEach(d=>{o[d]!==void 0&&(o[d]=!!o[d]);}),n&&o.nonce!==n?false:!!o},async getUserInfo(r){if(e.getUserInfo)return e.getUserInfo(r);if(!r.idToken)return null;let n=parseJWT(r.idToken)?.payload;if(!n)return null;let i=n.user?`${n.user.name.firstName} ${n.user.name.lastName}`:n.email;return {user:{id:n.sub,name:i,emailVerified:false,email:n.email},data:n}}}},mr=async e=>{let t="https://appleid.apple.com",r="/auth/keys",{data:n}=await betterFetch(`${t}${r}`);if(!n?.keys)throw new APIError("BAD_REQUEST",{message:"Keys not found"});let i=n.keys.find(s=>s.kid===e);if(!i)throw new Error(`JWK with kid ${e} not found`);return await importJWK(i,i.alg)};var ze=e=>({id:"discord",name:"Discord",createAuthorizationURL({state:t,scopes:r,redirectURI:n}){let i=r||["identify","email"];return e.scope&&i.push(...e.scope),new URL(`https://discord.com/api/oauth2/authorize?scope=${i.join("+")}&response_type=code&client_id=${e.clientId}&redirect_uri=${encodeURIComponent(e.redirectURI||n)}&state=${t}`)},validateAuthorizationCode:async({code:t,redirectURI:r})=>x$1({code:t,redirectURI:e.redirectURI||r,options:e,tokenEndpoint:"https://discord.com/api/oauth2/token"}),async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);let{data:r,error:n}=await betterFetch("https://discord.com/api/users/@me",{headers:{authorization:`Bearer ${t.accessToken}`}});if(n)return null;if(r.avatar===null){let i=r.discriminator==="0"?Number(BigInt(r.id)>>BigInt(22))%6:parseInt(r.discriminator)%5;r.image_url=`https://cdn.discordapp.com/embed/avatars/${i}.png`;}else {let i=r.avatar.startsWith("a_")?"gif":"png";r.image_url=`https://cdn.discordapp.com/avatars/${r.id}/${r.avatar}.${i}`;}return {user:{id:r.id,name:r.display_name||r.username||"",email:r.email,emailVerified:r.verified,image:r.image_url},data:r}}});var Me=e=>({id:"facebook",name:"Facebook",async createAuthorizationURL({state:t,scopes:r,redirectURI:n}){let i=r||["email","public_profile"];return e.scope&&i.push(...e.scope),await v$1({id:"facebook",options:e,authorizationEndpoint:"https://www.facebook.com/v21.0/dialog/oauth",scopes:i,state:t,redirectURI:n})},validateAuthorizationCode:async({code:t,redirectURI:r})=>x$1({code:t,redirectURI:e.redirectURI||r,options:e,tokenEndpoint:"https://graph.facebook.com/oauth/access_token"}),async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);let{data:r,error:n}=await betterFetch("https://graph.facebook.com/me?fields=id,name,email,picture",{auth:{type:"Bearer",token:t.accessToken}});return n?null:{user:{id:r.id,name:r.name,email:r.email,image:r.picture.data.url,emailVerified:r.email_verified},data:r}}});var Ge=e=>{let t="https://github.com/login/oauth/access_token";return {id:"github",name:"GitHub",createAuthorizationURL({state:r,scopes:n,codeVerifier:i,redirectURI:s}){let a=n||["user:email"];return e.scope&&a.push(...e.scope),v$1({id:"github",options:e,authorizationEndpoint:"https://github.com/login/oauth/authorize",scopes:a,state:r,redirectURI:s})},validateAuthorizationCode:async({code:r,redirectURI:n})=>x$1({code:r,redirectURI:e.redirectURI||n,options:e,tokenEndpoint:t}),async getUserInfo(r){if(e.getUserInfo)return e.getUserInfo(r);let{data:n,error:i}=await betterFetch("https://api.github.com/user",{headers:{"User-Agent":"better-auth",authorization:`Bearer ${r.accessToken}`}});if(i)return null;let s=false;if(!n.email){let{data:a,error:u}=await betterFetch("https://api.github.com/user/emails",{headers:{authorization:`Bearer ${r.accessToken}`,"User-Agent":"better-auth"}});u||(n.email=(a.find(o=>o.primary)??a[0])?.email,s=a.find(o=>o.email===n.email)?.verified??false);}return {user:{id:n.id.toString(),name:n.name||n.login,email:n.email,image:n.avatar_url,emailVerified:s},data:n}}}};var we=["info","success","warn","error","debug"];function wr(e,t){return we.indexOf(t)<=we.indexOf(e)}var br=createConsola({formatOptions:{date:false,colors:true,compact:true},defaults:{tag:"Better Auth"}}),ae=e=>{let t=e?.disabled!==true,r=e?.level??"error",n=(i,s,a=[])=>{if(!(!t||!wr(r,i))){if(!e||typeof e.log!="function"){br[i]("",s,...a);return}e.log(i==="success"?"info":i,s,a);}};return Object.fromEntries(we.map(i=>[i,(...[s,...a])=>n(i,s,a)]))},E=ae();var Ke=e=>({id:"google",name:"Google",async createAuthorizationURL({state:t,scopes:r,codeVerifier:n,redirectURI:i}){if(!e.clientId||!e.clientSecret)throw E.error("Client Id and Client Secret is required for Google. Make sure to provide them in the options."),new L("CLIENT_ID_AND_SECRET_REQUIRED");if(!n)throw new L("codeVerifier is required for Google");let s=r||["email","profile","openid"];e.scope&&s.push(...e.scope);let a=await v$1({id:"google",options:e,authorizationEndpoint:"https://accounts.google.com/o/oauth2/auth",scopes:s,state:t,codeVerifier:n,redirectURI:i});return e.accessType&&a.searchParams.set("access_type",e.accessType),e.prompt&&a.searchParams.set("prompt",e.prompt),a},validateAuthorizationCode:async({code:t,codeVerifier:r,redirectURI:n})=>x$1({code:t,codeVerifier:r,redirectURI:e.redirectURI||n,options:e,tokenEndpoint:"https://oauth2.googleapis.com/token"}),async verifyIdToken(t,r){if(e.disableIdTokenSignIn)return  false;if(e.verifyIdToken)return e.verifyIdToken(t,r);let n=`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${t}`,{data:i}=await betterFetch(n);return i?i.aud===e.clientId&&i.iss==="https://accounts.google.com":false},async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);if(!t.idToken)return null;let r=parseJWT(t.idToken)?.payload;return {user:{id:r.sub,name:r.name,email:r.email,image:r.picture,emailVerified:r.email_verified},data:r}}});var We=e=>{let t=e.tenantId||"common",r=`https://login.microsoftonline.com/${t}/oauth2/v2.0/authorize`,n=`https://login.microsoftonline.com/${t}/oauth2/v2.0/token`;return {id:"microsoft",name:"Microsoft EntraID",createAuthorizationURL(i){let s=i.scopes||["openid","profile","email","User.Read"];return e.scope&&s.push(...e.scope),v$1({id:"microsoft",options:e,authorizationEndpoint:r,state:i.state,codeVerifier:i.codeVerifier,scopes:s,redirectURI:i.redirectURI})},validateAuthorizationCode({code:i,codeVerifier:s,redirectURI:a}){return x$1({code:i,codeVerifier:s,redirectURI:e.redirectURI||a,options:e,tokenEndpoint:n})},async getUserInfo(i){if(e.getUserInfo)return e.getUserInfo(i);if(!i.idToken)return null;let s=parseJWT(i.idToken)?.payload,a=e.profilePhotoSize||48;return await betterFetch(`https://graph.microsoft.com/v1.0/me/photos/${a}x${a}/$value`,{headers:{Authorization:`Bearer ${i.accessToken}`},async onResponse(u){if(!(e.disableProfilePhoto||!u.response.ok))try{let d=await u.response.clone().arrayBuffer(),c=Buffer.from(d).toString("base64");s.picture=`data:image/jpeg;base64, ${c}`;}catch(o){E.error(o&&typeof o=="object"&&"name"in o?o.name:"",o);}}}),{user:{id:s.sub,name:s.name,email:s.email,image:s.picture,emailVerified:true},data:s}}}};var Ze=e=>({id:"spotify",name:"Spotify",createAuthorizationURL({state:t,scopes:r,codeVerifier:n,redirectURI:i}){let s=r||["user-read-email"];return e.scope&&s.push(...e.scope),v$1({id:"spotify",options:e,authorizationEndpoint:"https://accounts.spotify.com/authorize",scopes:s,state:t,codeVerifier:n,redirectURI:i})},validateAuthorizationCode:async({code:t,codeVerifier:r,redirectURI:n})=>x$1({code:t,codeVerifier:r,redirectURI:e.redirectURI||n,options:e,tokenEndpoint:"https://accounts.spotify.com/api/token"}),async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);let{data:r,error:n}=await betterFetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:`Bearer ${t.accessToken}`}});return n?null:{user:{id:r.id,name:r.display_name,email:r.email,image:r.images[0]?.url,emailVerified:false},data:r}}});var H={isAction:false};var q=e=>nanoid(e);var Qe=e=>({id:"twitch",name:"Twitch",createAuthorizationURL({state:t,scopes:r,redirectURI:n}){let i=r||["user:read:email","openid"];return e.scope&&i.push(...e.scope),v$1({id:"twitch",redirectURI:n,options:e,authorizationEndpoint:"https://id.twitch.tv/oauth2/authorize",scopes:i,state:t,claims:e.claims||["email","email_verified","preferred_username","picture"]})},validateAuthorizationCode:async({code:t,redirectURI:r})=>x$1({code:t,redirectURI:e.redirectURI||r,options:e,tokenEndpoint:"https://id.twitch.tv/oauth2/token"}),async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);let r=t.idToken;if(!r)return E.error("No idToken found in token"),null;let n=parseJWT(r)?.payload;return {user:{id:n.sub,name:n.preferred_username,email:n.email,image:n.picture,emailVerified:false},data:n}}});var Je=e=>({id:"twitter",name:"Twitter",createAuthorizationURL(t){let r=t.scopes||["users.read","tweet.read","offline.access"];return e.scope&&r.push(...e.scope),v$1({id:"twitter",options:e,authorizationEndpoint:"https://x.com/i/oauth2/authorize",scopes:r,state:t.state,codeVerifier:t.codeVerifier,redirectURI:t.redirectURI})},validateAuthorizationCode:async({code:t,codeVerifier:r,redirectURI:n})=>x$1({code:t,codeVerifier:r,authentication:"basic",redirectURI:e.redirectURI||n,options:e,tokenEndpoint:"https://api.x.com/2/oauth2/token"}),async getUserInfo(t){if(e.getUserInfo)return e.getUserInfo(t);let{data:r,error:n}=await betterFetch("https://api.x.com/2/users/me?user.fields=profile_image_url",{method:"GET",headers:{Authorization:`Bearer ${t.accessToken}`}});return n?null:{user:{id:r.data.id,name:r.data.name,email:r.data.email||null,image:r.data.profile_image_url,emailVerified:r.data.verified||false},data:r}}});var Ye=e=>{let t="https://api.dropboxapi.com/oauth2/token";return {id:"dropbox",name:"Dropbox",createAuthorizationURL:async({state:r,scopes:n,codeVerifier:i,redirectURI:s})=>{let a=n||["account_info.read"];return e.scope&&a.push(...e.scope),await v$1({id:"dropbox",options:e,authorizationEndpoint:"https://www.dropbox.com/oauth2/authorize",scopes:a,state:r,redirectURI:s,codeVerifier:i})},validateAuthorizationCode:async({code:r,codeVerifier:n,redirectURI:i})=>await x$1({code:r,codeVerifier:n,redirectURI:e.redirectURI||i,options:e,tokenEndpoint:t}),async getUserInfo(r){if(e.getUserInfo)return e.getUserInfo(r);let{data:n,error:i}=await betterFetch("https://api.dropboxapi.com/2/users/get_current_account",{method:"POST",headers:{Authorization:`Bearer ${r.accessToken}`}});return i?null:{user:{id:n.account_id,name:n.name?.display_name,email:n.email,emailVerified:n.email_verified||false,image:n.profile_photo_url},data:n}}}};var Xe=e=>{let t="https://www.linkedin.com/oauth/v2/authorization",r="https://www.linkedin.com/oauth/v2/accessToken";return {id:"linkedin",name:"Linkedin",createAuthorizationURL:async({state:n,scopes:i,redirectURI:s})=>{let a=i||["profile","email","openid"];return e.scope&&a.push(...e.scope),await v$1({id:"linkedin",options:e,authorizationEndpoint:t,scopes:a,state:n,redirectURI:s})},validateAuthorizationCode:async({code:n,redirectURI:i})=>await x$1({code:n,redirectURI:e.redirectURI||i,options:e,tokenEndpoint:r}),async getUserInfo(n){let{data:i,error:s}=await betterFetch("https://api.linkedin.com/v2/userinfo",{method:"GET",headers:{Authorization:`Bearer ${n.accessToken}`}});return s?null:{user:{id:i.sub,name:i.name,email:i.email,emailVerified:i.email_verified||false,image:i.picture},data:i}}}};var be=(e="")=>e.split("://").map(t=>t.replace(/\/{2,}/g,"/")).join("://"),Sr=e=>{let t=e||"https://gitlab.com";return {authorizationEndpoint:be(`${t}/oauth/authorize`),tokenEndpoint:be(`${t}/oauth/token`),userinfoEndpoint:be(`${t}/api/v4/user`)}},et=e=>{let{authorizationEndpoint:t,tokenEndpoint:r,userinfoEndpoint:n}=Sr(e.issuer),i="gitlab";return {id:i,name:"Gitlab",createAuthorizationURL:async({state:a,scopes:u,codeVerifier:o,redirectURI:d})=>{let c=u||["read_user"];return e.scope&&c.push(...e.scope),await v$1({id:i,options:e,authorizationEndpoint:t,scopes:c,state:a,redirectURI:d,codeVerifier:o})},validateAuthorizationCode:async({code:a,redirectURI:u,codeVerifier:o})=>x$1({code:a,redirectURI:e.redirectURI||u,options:e,codeVerifier:o,tokenEndpoint:r}),async getUserInfo(a){if(e.getUserInfo)return e.getUserInfo(a);let{data:u,error:o}=await betterFetch(n,{headers:{authorization:`Bearer ${a.accessToken}`}});return o||u.state!=="active"||u.locked?null:{user:{id:u.id.toString(),name:u.name??u.username,email:u.email,image:u.avatar_url,emailVerified:true},data:u}}}};var Ae={apple:$e,discord:ze,facebook:Me,github:Ge,microsoft:We,google:Ke,spotify:Ze,twitch:Qe,twitter:Je,dropbox:Ye,linkedin:Xe,gitlab:et},de=Object.keys(Ae);function G(e){try{return JSON.parse(e)}catch{return null}}var ke=()=>k$1("/get-session",{method:"GET",query:optionalType(objectType({disableCookieCache:booleanType({description:"Disable cookie cache and fetch session from database"}).optional()})),requireHeaders:true,metadata:{openapi:{description:"Get the current session",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{session:{type:"object",properties:{token:{type:"string"},userId:{type:"string"},expiresAt:{type:"string"}}},user:{type:"object",$ref:"#/components/schemas/User"}}}}}}}}}},async e=>{try{let t=await e.getSignedCookie(e.context.authCookies.sessionToken.name,e.context.secret);if(!t)return e.json(null);let r=e.getCookie(e.context.authCookies.sessionData.name),n=r?G(Buffer.from(r,"base64").toString()):null;if(n&&!await ne.verify({value:JSON.stringify(n.session),signature:n?.signature,secret:e.context.secret}))return N(e),e.json(null);let i=await e.getSignedCookie(e.context.authCookies.dontRememberToken.name,e.context.secret);if(n?.session&&e.context.options.session?.cookieCache?.enabled&&!e.query?.disableCookieCache){let c=n.session;if(n.expiresAt<Date.now()||c.session.expiresAt<new Date){let p=e.context.authCookies.sessionData.name;e.setCookie(p,"",{maxAge:0});}else return e.json(c)}let s=await e.context.internalAdapter.findSession(t);if(!s||s.session.expiresAt<new Date)return N(e),s&&await e.context.internalAdapter.deleteSession(s.session.token),e.json(null);if(i)return e.json(s);let a=e.context.sessionConfig.expiresIn,u=e.context.sessionConfig.updateAge;if(s.session.expiresAt.valueOf()-a*1e3+u*1e3<=Date.now()){let c=await e.context.internalAdapter.updateSession(s.session.token,{expiresAt:D(e.context.sessionConfig.expiresIn,"sec")});if(!c)return N(e),e.json(null,{status:401});let l=(c.expiresAt.valueOf()-Date.now())/1e3;return await O(e,{session:c,user:s.user},!1,{maxAge:l}),e.json({session:c,user:s.user})}return e.json(s)}catch(t){throw e.context.logger.error("INTERNAL_SERVER_ERROR",t),new APIError("INTERNAL_SERVER_ERROR",{message:"internal server error"})}}),ee=async e=>{if(e.context.session)return e.context.session;let t=await ke()({...e,_flag:"json",headers:e.headers});return e.context.session=t,t},_=Z(async e=>{let t=await ee(e);if(!t?.session)throw new APIError("UNAUTHORIZED");return {session:t}}),tt=Z(async e=>{let t=await ee(e);if(!t?.session)throw new APIError("UNAUTHORIZED");if(e.context.sessionConfig.freshAge===0)return {session:t};let r=e.context.sessionConfig.freshAge,n=t.session.createdAt.valueOf(),i=Date.now();if(!(n+r*1e3>i))throw new APIError("FORBIDDEN",{message:"Session is not fresh"});return {session:t}}),rt=()=>k$1("/list-sessions",{method:"GET",use:[_],requireHeaders:true,metadata:{openapi:{description:"List all active sessions for the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"array",items:{type:"object",properties:{token:{type:"string"},userId:{type:"string"},expiresAt:{type:"string"}}}}}}}}}}},async e=>{let r=(await e.context.internalAdapter.listSessions(e.context.session.user.id)).filter(n=>n.expiresAt>new Date);return e.json(r)}),nt=k$1("/revoke-session",{method:"POST",body:objectType({token:stringType({description:"The token to revoke"})}),use:[_],requireHeaders:true,metadata:{openapi:{description:"Revoke a single session",requestBody:{content:{"application/json":{schema:{type:"object",properties:{token:{type:"string"}},required:["token"]}}}}}}},async e=>{let t=e.body.token,r=await e.context.internalAdapter.findSession(t);if(!r)throw new APIError("BAD_REQUEST",{message:"Session not found"});if(r.session.userId!==e.context.session.user.id)throw new APIError("UNAUTHORIZED");try{await e.context.internalAdapter.deleteSession(t);}catch(n){throw e.context.logger.error(n&&typeof n=="object"&&"name"in n?n.name:"",n),new APIError("INTERNAL_SERVER_ERROR")}return e.json({status:true})}),ot=k$1("/revoke-sessions",{method:"POST",use:[_],requireHeaders:true,metadata:{openapi:{description:"Revoke all sessions for the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{status:{type:"boolean"}},required:["status"]}}}}}}}},async e=>{try{await e.context.internalAdapter.deleteSessions(e.context.session.user.id);}catch(t){throw e.context.logger.error(t&&typeof t=="object"&&"name"in t?t.name:"",t),new APIError("INTERNAL_SERVER_ERROR")}return e.json({status:true})}),it=k$1("/revoke-other-sessions",{method:"POST",requireHeaders:true,use:[_],metadata:{openapi:{description:"Revoke all other sessions for the user except the current one",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{status:{type:"boolean"}}}}}}}}}},async e=>{let t=e.context.session;if(!t.user)throw new APIError("UNAUTHORIZED");let i=(await e.context.internalAdapter.listSessions(t.user.id)).filter(s=>s.expiresAt>new Date).filter(s=>s.token!==e.context.session.session.token);return await Promise.all(i.map(s=>e.context.internalAdapter.deleteSession(s.token))),e.json({status:true})});async function F$1(e,t,r){return await createJWT("HS256",Buffer.from(e),{email:t.toLowerCase(),updateTo:r},{expiresIn:new TimeSpan(1,"h"),issuer:"better-auth",subject:"verify-email",audiences:[t]})}var st=k$1("/send-verification-email",{method:"POST",query:objectType({currentURL:stringType({description:"The URL to use for email verification callback"}).optional()}).optional(),body:objectType({email:stringType({description:"The email to send the verification email to"}).email(),callbackURL:stringType({description:"The URL to use for email verification callback"}).optional()}),metadata:{openapi:{description:"Send a verification email to the user",requestBody:{content:{"application/json":{schema:{type:"object",properties:{email:{type:"string",description:"The email to send the verification email to"},callbackURL:{type:"string",description:"The URL to use for email verification callback"}},required:["email"]}}}},responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{status:{type:"boolean"}}}}}}}}}},async e=>{if(!e.context.options.emailVerification?.sendVerificationEmail)throw e.context.logger.error("Verification email isn't enabled."),new APIError("BAD_REQUEST",{message:"Verification email isn't enabled"});let{email:t}=e.body,r=await e.context.internalAdapter.findUserByEmail(t);if(!r)throw new APIError("BAD_REQUEST",{message:"User not found"});let n=await F$1(e.context.secret,t),i=`${e.context.baseURL}/verify-email?token=${n}&callbackURL=${e.body.callbackURL||e.query?.currentURL||"/"}`;return await e.context.options.emailVerification.sendVerificationEmail({user:r.user,url:i,token:n},e.request),e.json({status:true})}),at=k$1("/verify-email",{method:"GET",query:objectType({token:stringType({description:"The token to verify the email"}),callbackURL:stringType({description:"The URL to redirect to after email verification"}).optional()}),metadata:{openapi:{description:"Verify the email of the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{user:{type:"object"},status:{type:"boolean"}},required:["user","status"]}}}}}}}},async e=>{function t(u){throw e.query.callbackURL?e.redirect(`${e.query.callbackURL}?error=${u}`):new APIError("UNAUTHORIZED",{message:u})}let{token:r}=e.query,n;try{n=await validateJWT("HS256",Buffer.from(e.context.secret),r);}catch(u){return e.context.logger.error("Failed to verify email",u),t("invalid_token")}let s=objectType({email:stringType().email(),updateTo:stringType().optional()}).parse(n.payload),a=await e.context.internalAdapter.findUserByEmail(s.email);if(!a)return t("user_not_found");if(s.updateTo){let u=await ee(e);if(!u){if(e.query.callbackURL)throw e.redirect(`${e.query.callbackURL}?error=unauthorized`);return t("unauthorized")}if(u.user.email!==s.email){if(e.query.callbackURL)throw e.redirect(`${e.query.callbackURL}?error=unauthorized`);return t("unauthorized")}let o=await e.context.internalAdapter.updateUserByEmail(s.email,{email:s.updateTo});if(await e.context.options.emailVerification?.sendVerificationEmail?.({user:o,url:`${e.context.baseURL}/verify-email?token=${r}`,token:r},e.request),e.query.callbackURL)throw e.redirect(e.query.callbackURL);return e.json({user:o,status:true})}if(await e.context.internalAdapter.updateUserByEmail(s.email,{emailVerified:true}),e.context.options.emailVerification?.autoSignInAfterVerification&&!await ee(e)){let o=await e.context.internalAdapter.createSession(a.user.id,e.request);if(!o)throw new APIError("INTERNAL_SERVER_ERROR",{message:"Failed to create session"});await O(e,{session:o,user:a.user});}if(e.query.callbackURL)throw e.redirect(e.query.callbackURL);return e.json({user:null,status:true})});async function ue(e,{userInfo:t,account:r,callbackURL:n}){let i=await e.context.internalAdapter.findUserByEmail(t.email.toLowerCase(),{includeAccounts:true}).catch(u=>{throw E.error(`Better auth was unable to query your database.
Error: `,u),e.redirect(`${e.context.baseURL}/error?error=internal_server_error`)}),s=i?.user;if(i){let u=i.accounts.find(o=>o.providerId===r.providerId);if(u)await e.context.internalAdapter.updateAccount(u.id,{accessToken:r.accessToken,idToken:r.idToken,refreshToken:r.refreshToken,accessTokenExpiresAt:r.accessTokenExpiresAt,refreshTokenExpiresAt:r.refreshTokenExpiresAt});else {if(!e.context.options.account?.accountLinking?.trustedProviders?.includes(r.providerId)&&!t.emailVerified||e.context.options.account?.accountLinking?.enabled===false)return Ce&&E.warn(`User already exist but account isn't linked to ${r.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`),{error:"account not linked",data:null};try{await e.context.internalAdapter.linkAccount({providerId:r.providerId,accountId:t.id.toString(),userId:i.user.id,accessToken:r.accessToken,idToken:r.idToken,refreshToken:r.refreshToken,accessTokenExpiresAt:r.accessTokenExpiresAt,refreshTokenExpiresAt:r.refreshTokenExpiresAt,scope:r.scope});}catch(c){return E.error("Unable to link account",c),{error:"unable to link account",data:null}}}}else try{let u=t.emailVerified||!1;if(s=await e.context.internalAdapter.createOAuthUser({...t,id:void 0,emailVerified:u,email:t.email.toLowerCase()},{accessToken:r.accessToken,idToken:r.idToken,refreshToken:r.refreshToken,accessTokenExpiresAt:r.accessTokenExpiresAt,refreshTokenExpiresAt:r.refreshTokenExpiresAt,scope:r.scope,providerId:r.providerId,accountId:t.id.toString()}).then(o=>o?.user),!u&&s&&e.context.options.emailVerification?.sendOnSignUp){let o=await F$1(e.context.secret,s.email),d=`${e.context.baseURL}/verify-email?token=${o}&callbackURL=${n}`;await e.context.options.emailVerification?.sendVerificationEmail?.({user:s,url:d,token:o},e.request);}}catch(u){return E.error("Unable to create user",u),{error:"unable to create user",data:null}}if(!s)return {error:"unable to create user",data:null};let a=await e.context.internalAdapter.createSession(s.id,e.request);return a?{data:{session:a,user:s},error:null}:{error:"unable to create session",data:null}}var dt=k$1("/sign-in/social",{method:"POST",query:objectType({currentURL:stringType().optional()}).optional(),body:objectType({callbackURL:stringType({description:"Callback URL to redirect to after the user has signed in"}).optional(),errorCallbackURL:stringType({description:"Callback URL to redirect to if an error happens"}).optional(),provider:enumType(de,{description:"OAuth2 provider to use"}),disableRedirect:booleanType({description:"Disable automatic redirection to the provider. Useful for handling the redirection yourself"}).optional(),idToken:optionalType(objectType({token:stringType({description:"ID token from the provider"}),nonce:stringType({description:"Nonce used to generate the token"}).optional(),accessToken:stringType({description:"Access token from the provider"}).optional(),refreshToken:stringType({description:"Refresh token from the provider"}).optional(),expiresAt:numberType({description:"Expiry date of the token"}).optional()}),{description:"ID token from the provider to sign in the user with id token"})}),metadata:{openapi:{description:"Sign in with a social provider",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{session:{type:"string"},user:{type:"object"},url:{type:"string"},redirect:{type:"boolean"}},required:["session","user","url","redirect"]}}}}}}}},async e=>{let t=e.context.socialProviders.find(s=>s.id===e.body.provider);if(!t)throw e.context.logger.error("Provider not found. Make sure to add the provider in your auth config",{provider:e.body.provider}),new APIError("NOT_FOUND",{message:"Provider not found"});if(e.body.idToken){if(!t.verifyIdToken)throw e.context.logger.error("Provider does not support id token verification",{provider:e.body.provider}),new APIError("NOT_FOUND",{message:"Provider does not support id token verification"});let{token:s,nonce:a}=e.body.idToken;if(!await t.verifyIdToken(s,a))throw e.context.logger.error("Invalid id token",{provider:e.body.provider}),new APIError("UNAUTHORIZED",{message:"Invalid id token"});let o=await t.getUserInfo({idToken:s,accessToken:e.body.idToken.accessToken,refreshToken:e.body.idToken.refreshToken});if(!o||!o?.user)throw e.context.logger.error("Failed to get user info",{provider:e.body.provider}),new APIError("UNAUTHORIZED",{message:"Failed to get user info"});if(!o.user.email)throw e.context.logger.error("User email not found",{provider:e.body.provider}),new APIError("UNAUTHORIZED",{message:"User email not found"});let d=await ue(e,{userInfo:{email:o.user.email,id:o.user.id,name:o.user.name||"",image:o.user.image,emailVerified:o.user.emailVerified||false},account:{providerId:t.id,accountId:o.user.id,accessToken:e.body.idToken.accessToken}});if(d.error)throw new APIError("UNAUTHORIZED",{message:d.error});return await O(e,d.data),e.json({session:d.data.session,user:d.data.user,url:`${e.body.callbackURL||e.query?.currentURL||e.context.options.baseURL}`,redirect:true})}let{codeVerifier:r,state:n}=await se(e),i=await t.createAuthorizationURL({state:n,codeVerifier:r,redirectURI:`${e.context.baseURL}/callback/${t.id}`});return e.json({url:i.toString(),redirect:!e.body.disableRedirect})}),ct=k$1("/sign-in/email",{method:"POST",body:objectType({email:stringType({description:"Email of the user"}),password:stringType({description:"Password of the user"}),callbackURL:stringType({description:"Callback URL to use as a redirect for email verification"}).optional(),rememberMe:booleanType({description:"If this is false, the session will not be remembered. Default is `true`."}).default(true).optional()}),metadata:{openapi:{description:"Sign in with email and password",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{session:{type:"string"},user:{type:"object"},url:{type:"string"},redirect:{type:"boolean"}},required:["session","user","url","redirect"]}}}}}}}},async e=>{if(!e.context.options?.emailAndPassword?.enabled)throw e.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!"),new APIError("BAD_REQUEST",{message:"Email and password is not enabled"});let{email:t,password:r}=e.body;if(!stringType().email().safeParse(t).success)throw new APIError("BAD_REQUEST",{message:"Invalid email"});let i=await e.context.internalAdapter.findUserByEmail(t,{includeAccounts:true});if(!i)throw await e.context.password.hash(r),e.context.logger.error("User not found",{email:t}),new APIError("UNAUTHORIZED",{message:"Invalid email or password"});let s=i.accounts.find(d=>d.providerId==="credential");if(!s)throw e.context.logger.error("Credential account not found",{email:t}),new APIError("UNAUTHORIZED",{message:"Invalid email or password"});let a=s?.password;if(!a)throw e.context.logger.error("Password not found",{email:t}),new APIError("UNAUTHORIZED",{message:"Unexpected error"});if(!await e.context.password.verify(a,r))throw e.context.logger.error("Invalid password"),new APIError("UNAUTHORIZED",{message:"Invalid email or password"});if(e.context.options?.emailAndPassword?.requireEmailVerification&&!i.user.emailVerified){if(!e.context.options?.emailVerification?.sendVerificationEmail)throw new APIError("UNAUTHORIZED",{message:"Email is not verified."});let d=await F$1(e.context.secret,i.user.email),c=`${e.context.baseURL}/verify-email?token=${d}&callbackURL=${e.body.callbackURL||"/"}`;throw await e.context.options.emailVerification.sendVerificationEmail({user:i.user,url:c,token:d},e.request),e.context.logger.error("Email not verified",{email:t}),new APIError("FORBIDDEN",{message:"Email is not verified. Check your email for a verification link"})}let o=await e.context.internalAdapter.createSession(i.user.id,e.headers,e.body.rememberMe===false);if(!o)throw e.context.logger.error("Failed to create session"),new APIError("UNAUTHORIZED",{message:"Failed to create session"});return await O(e,{session:o,user:i.user},e.body.rememberMe===false),e.json({user:i.user,session:o,redirect:!!e.body.callbackURL,url:e.body.callbackURL})});var le=objectType({code:stringType().optional(),error:stringType().optional(),errorMessage:stringType().optional(),state:stringType().optional()}),ut=k$1("/callback/:id",{method:["GET","POST"],body:le.optional(),query:le.optional(),metadata:H},async e=>{let t;try{if(e.method==="GET")t=le.parse(e.query);else if(e.method==="POST")t=le.parse(e.body);else throw new Error("Unsupported method")}catch(h){throw e.context.logger.error("INVALID_CALLBACK_REQUEST",h),e.redirect(`${e.context.baseURL}/error?error=invalid_callback_request`)}let{code:r,error:n,state:i}=t;if(!i)throw e.context.logger.error("State not found"),e.redirect(`${e.context.baseURL}/error?error=state_not_found`);if(!r)throw e.context.logger.error("Code not found"),e.redirect(`${e.context.baseURL}/error?error=${n||"no_code"}`);let s=e.context.socialProviders.find(h=>h.id===e.params.id);if(!s)throw e.context.logger.error("Oauth provider with id",e.params.id,"not found"),e.redirect(`${e.context.baseURL}/error?error=oauth_provider_not_found`);let{codeVerifier:a,callbackURL:u,link:o,errorURL:d}=await Ve(e),c;try{c=await s.validateAuthorizationCode({code:r,codeVerifier:a,redirectURI:`${e.context.baseURL}/callback/${s.id}`});}catch(h){throw e.context.logger.error("",h),e.redirect(`${e.context.baseURL}/error?error=please_restart_the_process`)}let l=await s.getUserInfo(c).then(h=>h?.user);function p(h){let w=d||u||`${e.context.baseURL}/error`;throw w.includes("?")?w=`${w}&error=${h}`:w=`${w}?error=${h}`,e.redirect(w)}if(!l)return e.context.logger.error("Unable to get user info"),p("unable_to_get_user_info");if(!l.email)return e.context.logger.error("Provider did not return email. This could be due to misconfiguration in the provider settings."),p("email_not_found");if(!u)throw e.context.logger.error("No callback URL found"),e.redirect(`${e.context.baseURL}/error?error=please_restart_the_process`);if(o){if(o.email!==l.email.toLowerCase())return p("email_doesn't_match");if(!await e.context.internalAdapter.createAccount({userId:o.userId,providerId:s.id,accountId:l.id}))return p("unable_to_link_account");let w;try{w=new URL(u).toString();}catch{w=u;}throw e.redirect(w)}let m=await ue(e,{userInfo:{id:l.id,email:l.email,name:l.name||"",image:l.image,emailVerified:l.emailVerified||false},account:{providerId:s.id,accountId:l.id,...c,scope:c.scopes?.join(",")},callbackURL:u});if(m.error)return e.context.logger.error(m.error.split(" ").join("_")),p(m.error.split(" ").join("_"));let{session:f,user:g}=m.data;await O(e,{session:f,user:g});let y;try{y=new URL(u).toString();}catch{y=u;}throw e.redirect(y)});var lt=k$1("/sign-out",{method:"POST",requireHeaders:true,metadata:{openapi:{description:"Sign out the current user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{success:{type:"boolean"}}}}}}}}}},async e=>{let t=await e.getSignedCookie(e.context.authCookies.sessionToken.name,e.context.secret);if(!t)throw N(e),new APIError("BAD_REQUEST",{message:"Session not found"});return await e.context.internalAdapter.deleteSession(t),N(e),e.json({success:true})});function pt(e,t,r){let n=t?new URL(t,e.baseURL):new URL(`${e.baseURL}/error`);return r&&Object.entries(r).forEach(([i,s])=>n.searchParams.set(i,s)),n.href}function Br(e,t,r){let n=new URL(t,e.baseURL);return r&&Object.entries(r).forEach(([i,s])=>n.searchParams.set(i,s)),n.href}var ft=k$1("/forget-password",{method:"POST",body:objectType({email:stringType({description:"The email address of the user to send a password reset email to"}).email(),redirectTo:stringType({description:"The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN"}).optional()}),metadata:{openapi:{description:"Send a password reset email to the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{status:{type:"boolean"}}}}}}}}}},async e=>{if(!e.context.options.emailAndPassword?.sendResetPassword)throw e.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPasswordToken function in your auth config!"),new APIError("BAD_REQUEST",{message:"Reset password isn't enabled"});let{email:t,redirectTo:r}=e.body,n=await e.context.internalAdapter.findUserByEmail(t,{includeAccounts:true});if(!n)return e.context.logger.error("Reset Password: User not found",{email:t}),e.json({status:false},{body:{status:true}});let i=60*60*1,s=D(e.context.options.emailAndPassword.resetPasswordTokenExpiresIn||i,"sec"),a=q(24);await e.context.internalAdapter.createVerificationValue({value:n.user.id,identifier:`reset-password:${a}`,expiresAt:s});let u=`${e.context.baseURL}/reset-password/${a}?callbackURL=${r}`;return await e.context.options.emailAndPassword.sendResetPassword({user:n.user,url:u,token:a},e.request),e.json({status:true})}),mt=k$1("/reset-password/:token",{method:"GET",query:objectType({callbackURL:stringType({description:"The URL to redirect the user to reset their password"})}),metadata:{openapi:{description:"Redirects the user to the callback URL with the token",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{token:{type:"string"}}}}}}}}}},async e=>{let{token:t}=e.params,{callbackURL:r}=e.query;if(!t||!r)throw e.redirect(pt(e.context,r,{error:"INVALID_TOKEN"}));let n=await e.context.internalAdapter.findVerificationValue(`reset-password:${t}`);throw !n||n.expiresAt<new Date?e.redirect(pt(e.context,r,{error:"INVALID_TOKEN"})):e.redirect(Br(e.context,r,{token:t}))}),gt=k$1("/reset-password",{query:optionalType(objectType({token:stringType().optional(),currentURL:stringType().optional()})),method:"POST",body:objectType({newPassword:stringType({description:"The new password to set"}),token:stringType({description:"The token to reset the password"}).optional()}),metadata:{openapi:{description:"Reset the password for a user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{status:{type:"boolean"}}}}}}}}}},async e=>{let t=e.body.token||e.query?.token||(e.query?.currentURL?new URL(e.query.currentURL).searchParams.get("token"):"");if(!t)throw new APIError("BAD_REQUEST",{message:"Token not found"});let{newPassword:r}=e.body,n=`reset-password:${t}`,i=await e.context.internalAdapter.findVerificationValue(n);if(!i||i.expiresAt<new Date)throw new APIError("BAD_REQUEST",{message:"Invalid token"});await e.context.internalAdapter.deleteVerificationValue(i.id);let s=i.value,a=await e.context.password.hash(r);return (await e.context.internalAdapter.findAccounts(s)).find(d=>d.providerId==="credential")?(await e.context.internalAdapter.updatePassword(s,a),e.json({status:true})):(await e.context.internalAdapter.createAccount({userId:s,providerId:"credential",password:a,accountId:s}),e.json({status:true}))});objectType({id:stringType(),providerId:stringType(),accountId:stringType(),userId:stringType(),accessToken:stringType().nullish(),refreshToken:stringType().nullish(),idToken:stringType().nullish(),accessTokenExpiresAt:dateType().nullish(),refreshTokenExpiresAt:dateType().nullish(),scope:stringType().nullish(),password:stringType().nullish(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date)});objectType({id:stringType(),email:stringType().transform(e=>e.toLowerCase()),emailVerified:booleanType().default(false),name:stringType(),image:stringType().nullish(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date)});objectType({id:stringType(),userId:stringType(),expiresAt:dateType(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date),token:stringType(),ipAddress:stringType().nullish(),userAgent:stringType().nullish()});objectType({id:stringType(),value:stringType(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date),expiresAt:dateType(),identifier:stringType()});function ht(e,t){let r=t.fields,n={};for(let i in e){let s=r[i];if(!s){n[i]=e[i];continue}s.returned!==false&&(n[i]=e[i]);}return n}function ve(e,t){let r={...t==="user"?e.user?.additionalFields:{},...t==="session"?e.session?.additionalFields:{}};for(let n of e.plugins||[])n.schema&&n.schema[t]&&(r={...r,...n.schema[t].fields});return r}function Re(e,t){let r=ve(e,"user");return ht(t,{fields:r})}function pe(e,t){let r=ve(e,"session");return ht(t,{fields:r})}function qr(e,t){let r=t.action||"create",n=t.fields,i={};for(let s in n){if(s in e){if(n[s].input===false){if(n[s].defaultValue){i[s]=n[s].defaultValue;continue}continue}i[s]=e[s];continue}if(n[s].defaultValue&&r==="create"){i[s]=n[s].defaultValue;continue}}return i}function fe(e,t,r){let n=ve(e,"user");return qr(t||{},{fields:n,action:r})}var yt=()=>k$1("/update-user",{method:"POST",body:recordType(stringType(),anyType()),use:[_],metadata:{openapi:{description:"Update the current user",requestBody:{content:{"application/json":{schema:{type:"object",properties:{name:{type:"string",description:"The name of the user"},image:{type:"string",description:"The image of the user"}}}}}},responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{user:{type:"object"}}}}}}}}}},async e=>{let t=e.body;if(t.email)throw new APIError("BAD_REQUEST",{message:"You can't update email"});let{name:r,image:n,...i}=t,s=e.context.session;if(!n&&!r&&Object.keys(i).length===0)return e.json({user:s.user});let a=fe(e.context.options,i,"update"),u=await e.context.internalAdapter.updateUserByEmail(s.user.email,{name:r,image:n,...a});return await O(e,{session:s.session,user:u}),e.json({user:u})}),wt=k$1("/change-password",{method:"POST",body:objectType({newPassword:stringType({description:"The new password to set"}),currentPassword:stringType({description:"The current password"}),revokeOtherSessions:booleanType({description:"Revoke all other sessions"}).optional()}),use:[_],metadata:{openapi:{description:"Change the password of the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{user:{description:"The user object",$ref:"#/components/schemas/User"}}}}}}}}}},async e=>{let{newPassword:t,currentPassword:r,revokeOtherSessions:n}=e.body,i=e.context.session,s=e.context.password.config.minPasswordLength;if(t.length<s)throw e.context.logger.error("Password is too short"),new APIError("BAD_REQUEST",{message:"Password is too short"});let a=e.context.password.config.maxPasswordLength;if(t.length>a)throw e.context.logger.error("Password is too long"),new APIError("BAD_REQUEST",{message:"Password too long"});let o=(await e.context.internalAdapter.findAccounts(i.user.id)).find(l=>l.providerId==="credential"&&l.password);if(!o||!o.password)throw new APIError("BAD_REQUEST",{message:"User does not have a password"});let d=await e.context.password.hash(t);if(!await e.context.password.verify(o.password,r))throw new APIError("BAD_REQUEST",{message:"Incorrect password"});if(await e.context.internalAdapter.updateAccount(o.id,{password:d}),n){await e.context.internalAdapter.deleteSessions(i.user.id);let l=await e.context.internalAdapter.createSession(i.user.id,e.headers);if(!l)throw new APIError("INTERNAL_SERVER_ERROR",{message:"Unable to create session"});await O(e,{session:l,user:i.user});}return e.json(i.user)}),bt=k$1("/set-password",{method:"POST",body:objectType({newPassword:stringType()}),metadata:{SERVER_ONLY:true},use:[_]},async e=>{let{newPassword:t}=e.body,r=e.context.session,n=e.context.password.config.minPasswordLength;if(t.length<n)throw e.context.logger.error("Password is too short"),new APIError("BAD_REQUEST",{message:"Password is too short"});let i=e.context.password.config.maxPasswordLength;if(t.length>i)throw e.context.logger.error("Password is too long"),new APIError("BAD_REQUEST",{message:"Password too long"});let a=(await e.context.internalAdapter.findAccounts(r.user.id)).find(o=>o.providerId==="credential"&&o.password),u=await e.context.password.hash(t);if(!a)return await e.context.internalAdapter.linkAccount({userId:r.user.id,providerId:"credential",accountId:r.user.id,password:u}),e.json(r.user);throw new APIError("BAD_REQUEST",{message:"user already has a password"})}),At=k$1("/delete-user",{method:"POST",body:objectType({password:stringType({description:"The password of the user"})}),use:[tt],metadata:{openapi:{description:"Delete the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object"}}}}}}}},async e=>{let t=e.context.session;return await e.context.internalAdapter.deleteUser(t.user.id),await e.context.internalAdapter.deleteSessions(t.user.id),N(e),e.json(null)}),kt=k$1("/change-email",{method:"POST",query:objectType({currentURL:stringType().optional()}).optional(),body:objectType({newEmail:stringType({description:"The new email to set"}).email(),callbackURL:stringType({description:"The URL to redirect to after email verification"}).optional()}),use:[_],metadata:{openapi:{responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{user:{type:"object"},status:{type:"boolean"}}}}}}}}}},async e=>{if(!e.context.options.user?.changeEmail?.enabled)throw e.context.logger.error("Change email is disabled."),new APIError("BAD_REQUEST",{message:"Change email is disabled"});if(e.body.newEmail===e.context.session.user.email)throw e.context.logger.error("Email is the same"),new APIError("BAD_REQUEST",{message:"Email is the same"});if(await e.context.internalAdapter.findUserByEmail(e.body.newEmail))throw e.context.logger.error("Email already exists"),new APIError("BAD_REQUEST",{message:"Couldn't update your email"});if(e.context.session.user.emailVerified!==true){let i=await e.context.internalAdapter.updateUserByEmail(e.context.session.user.email,{email:e.body.newEmail});return e.json({user:i,status:true})}if(!e.context.options.user.changeEmail.sendChangeEmailVerification)throw e.context.logger.error("Verification email isn't enabled."),new APIError("BAD_REQUEST",{message:"Verification email isn't enabled"});let r=await F$1(e.context.secret,e.context.session.user.email,e.body.newEmail),n=`${e.context.baseURL}/verify-email?token=${r}&callbackURL=${e.body.callbackURL||e.query?.currentURL||"/"}`;return await e.context.options.user.changeEmail.sendChangeEmailVerification({user:e.context.session.user,newEmail:e.body.newEmail,url:n,token:r},e.request),e.json({user:null,status:true})});var Nr=(e="Unknown")=>`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication Error</title>
    <style>
        :root {
            --bg-color: #f8f9fa;
            --text-color: #212529;
            --accent-color: #000000;
            --error-color: #dc3545;
            --border-color: #e9ecef;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            line-height: 1.5;
        }
        .error-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 2.5rem;
            text-align: center;
            max-width: 90%;
            width: 400px;
        }
        h1 {
            color: var(--error-color);
            font-size: 1.75rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        p {
            margin-bottom: 1.5rem;
            color: #495057;
        }
        .btn {
            background-color: var(--accent-color);
            color: #ffffff;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            transition: all 0.3s ease;
            display: inline-block;
            font-weight: 500;
            border: 2px solid var(--accent-color);
        }
        .btn:hover {
            background-color: #131721;
        }
        .error-code {
            font-size: 0.875rem;
            color: #6c757d;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="icon">\u26A0\uFE0F</div>
        <h1>Better Auth Error</h1>
        <p>We encountered an issue while processing your request. Please try again or contact the application owner if the problem persists.</p>
        <a href="/" id="returnLink" class="btn">Return to Application</a>
        <div class="error-code">Error Code: <span id="errorCode">${e}</span></div>
    </div>
</body>
</html>`,xt=k$1("/error",{method:"GET",metadata:{...H,openapi:{description:"Displays an error page",responses:{200:{description:"Success",content:{"text/html":{schema:{type:"string"}}}}}}}},async e=>{let t=new URL(e.request?.url||"").searchParams.get("error")||"Unknown";return new Response(Nr(t),{headers:{"Content-Type":"text/html"}})});var vt=k$1("/ok",{method:"GET",metadata:{...H,openapi:{description:"Check if the API is working",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{ok:{type:"boolean"}}}}}}}}}},async e=>e.json({ok:true}));var Rt=()=>k$1("/sign-up/email",{method:"POST",query:objectType({currentURL:stringType().optional()}).optional(),body:recordType(stringType(),anyType()),metadata:{openapi:{description:"Sign up a user using email and password",requestBody:{content:{"application/json":{schema:{type:"object",properties:{name:{type:"string",description:"The name of the user"},email:{type:"string",description:"The email of the user"},password:{type:"string",description:"The password of the user"},callbackURL:{type:"string",description:"The URL to use for email verification callback"}},required:["name","email","password"]}}}},responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{user:{type:"object"},session:{type:"object"}}}}}}}}}},async e=>{if(!e.context.options.emailAndPassword?.enabled)throw new APIError("BAD_REQUEST",{message:"Email and password sign up is not enabled"});let t=e.body,{name:r,email:n,password:i,image:s,callbackURL:a,...u}=t;if(!stringType().email().safeParse(n).success)throw new APIError("BAD_REQUEST",{message:"Invalid email"});let d=e.context.password.config.minPasswordLength;if(i.length<d)throw e.context.logger.error("Password is too short"),new APIError("BAD_REQUEST",{message:"Password is too short"});let c=e.context.password.config.maxPasswordLength;if(i.length>c)throw e.context.logger.error("Password is too long"),new APIError("BAD_REQUEST",{message:"Password is too long"});if((await e.context.internalAdapter.findUserByEmail(n))?.user)throw e.context.logger.info(`Sign-up attempt for existing email: ${n}`),new APIError("UNPROCESSABLE_ENTITY",{message:"User with this email already exists"});let p=fe(e.context.options,u),m;try{if(m=await e.context.internalAdapter.createUser({email:n.toLowerCase(),name:r,image:s,...p,emailVerified:!1}),!m)throw new APIError("BAD_REQUEST",{message:"Failed to create user"})}catch(y){throw e.context.logger.error("Failed to create user",y),new APIError("UNPROCESSABLE_ENTITY",{message:"Failed to create user",details:y})}if(!m)throw new APIError("UNPROCESSABLE_ENTITY",{message:"Failed to create user"});let f=await e.context.password.hash(i);if(await e.context.internalAdapter.linkAccount({userId:m.id,providerId:"credential",accountId:m.id,password:f}),e.context.options.emailVerification?.sendOnSignUp){let y=await F$1(e.context.secret,m.email),h=`${e.context.baseURL}/verify-email?token=${y}&callbackURL=${t.callbackURL||e.query?.currentURL||"/"}`;await e.context.options.emailVerification?.sendVerificationEmail?.({user:m,url:h,token:y},e.request);}if(!e.context.options.emailAndPassword.autoSignIn||e.context.options.emailAndPassword.requireEmailVerification)return e.json({user:m,session:null});let g=await e.context.internalAdapter.createSession(m.id,e.request);if(!g)throw new APIError("BAD_REQUEST",{message:"Failed to create session"});return await O(e,{session:g,user:m}),e.json({user:m,session:g})});var Tt=k$1("/list-accounts",{method:"GET",use:[_],metadata:{openapi:{description:"List all accounts linked to the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"array",items:{type:"object",properties:{id:{type:"string"},provider:{type:"string"}}}}}}}}}}},async e=>{let t=e.context.session,r=await e.context.internalAdapter.findAccounts(t.user.id);return e.json(r.map(n=>({id:n.id,provider:n.providerId})))}),Et=k$1("/link-social",{method:"POST",requireHeaders:true,query:objectType({currentURL:stringType().optional()}).optional(),body:objectType({callbackURL:stringType({description:"The URL to redirect to after the user has signed in"}).optional(),provider:enumType(de,{description:"The OAuth2 provider to use"})}),use:[_],metadata:{openapi:{description:"Link a social account to the user",responses:{200:{description:"Success",content:{"application/json":{schema:{type:"object",properties:{url:{type:"string"},redirect:{type:"boolean"}},required:["url","redirect"]}}}}}}}},async e=>{let t=e.context.session;if((await e.context.internalAdapter.findAccounts(t.user.id)).find(u=>u.providerId===e.body.provider))throw new APIError("BAD_REQUEST",{message:"Social Account is already linked."});let i=e.context.socialProviders.find(u=>u.id===e.body.provider);if(!i)throw e.context.logger.error("Provider not found. Make sure to add the provider in your auth config",{provider:e.body.provider}),new APIError("NOT_FOUND",{message:"Provider not found"});let s=await se(e,{userId:t.user.id,email:t.user.email}),a=await i.createAuthorizationURL({state:s.state,codeVerifier:s.codeVerifier,redirectURI:`${e.context.baseURL}/callback/${i.id}`});return e.json({url:a.toString(),redirect:true})});function me(e,t){if(t.advanced?.ipAddress?.disableIpTracking)return null;let r="127.0.0.1";if(De)return r;let i=t.advanced?.ipAddress?.ipAddressHeaders||["x-client-ip","x-forwarded-for","cf-connecting-ip","fastly-client-ip","x-real-ip","x-cluster-client-ip","x-forwarded","forwarded-for","forwarded"],s=e instanceof Request?e.headers:e;for(let a of i){let u=s.get(a);if(typeof u=="string"){let o=u.split(",")[0].trim();if(o)return o}}return null}function jr(e,t,r){let n=Date.now(),i=t*1e3;return n-r.lastRequest<i&&r.count>=e}function Fr(e){return new Response(JSON.stringify({message:"Too many requests. Please try again later."}),{status:429,statusText:"Too Many Requests",headers:{"X-Retry-After":e.toString()}})}function Vr(e,t){let r=Date.now(),n=t*1e3;return Math.ceil((e+n-r)/1e3)}function $r(e,t){let r="rateLimit",n=e.adapter;return {get:async i=>await n.findOne({model:r,where:[{field:"key",value:i}]}),set:async(i,s,a)=>{try{a?await n.update({model:t??"rateLimit",where:[{field:"key",value:i}],update:{count:s.count,lastRequest:s.lastRequest}}):await n.create({model:t??"rateLimit",data:{key:i,count:s.count,lastRequest:s.lastRequest}});}catch(u){e.logger.error("Error setting rate limit",u);}}}}var It=new Map;function zr(e){return e.rateLimit.storage==="secondary-storage"?{get:async r=>{let n=await e.options.secondaryStorage?.get(r);return n?JSON.parse(n):void 0},set:async(r,n)=>{await e.options.secondaryStorage?.set?.(r,JSON.stringify(n));}}:e.rateLimit.storage==="memory"?{async get(r){return It.get(r)},async set(r,n,i){It.set(r,n);}}:$r(e,e.rateLimit.modelName)}async function Ot(e,t){if(!t.rateLimit.enabled)return;let r=t.baseURL,n=e.url.replace(r,""),i=t.rateLimit.window,s=t.rateLimit.max,a=me(e,t.options)+n,o=Mr().find(p=>p.pathMatcher(n));o&&(i=o.window,s=o.max);for(let p of t.options.plugins||[])if(p.rateLimit){let m=p.rateLimit.find(f=>f.pathMatcher(n));if(m){i=m.window,s=m.max;break}}if(t.rateLimit.customRules){let p=t.rateLimit.customRules[n];p&&(i=p.window,s=p.max);}let d=zr(t),c=await d.get(a),l=Date.now();if(!c)await d.set(a,{key:a,count:1,lastRequest:l});else {let p=l-c.lastRequest;if(jr(s,i,c)){let m=Vr(c.lastRequest,i);return Fr(m)}else p>i*1e3?await d.set(a,{...c,count:1,lastRequest:l}):await d.set(a,{...c,count:c.count+1,lastRequest:l});}}function Mr(){return [{pathMatcher(t){return t.startsWith("/sign-in")||t.startsWith("/sign-up")||t.startsWith("/change-password")||t.startsWith("/change-email")},window:10,max:3}]}function Ue(e,t){let r=t.plugins?.reduce((u,o)=>({...u,...o.endpoints}),{}),n=t.plugins?.map(u=>u.middlewares?.map(o=>{let d=async c=>o.middleware({...c,context:{...e,...c.context}});return d.path=o.path,d.options=o.middleware.options,d.headers=o.middleware.headers,{path:o.path,middleware:d}})).filter(u=>u!==void 0).flat()||[],s={...{signInSocial:dt,callbackOAuth:ut,getSession:ke(),signOut:lt,signUpEmail:Rt(),signInEmail:ct,forgetPassword:ft,resetPassword:gt,verifyEmail:at,sendVerificationEmail:st,changeEmail:kt,changePassword:wt,setPassword:bt,updateUser:yt(),deleteUser:At,forgetPasswordCallback:mt,listSessions:rt(),revokeSession:nt,revokeSessions:ot,revokeOtherSessions:it,linkSocialAccount:Et,listUserAccounts:Tt},...r,ok:vt,error:xt},a={};for(let[u,o]of Object.entries(s))a[u]=async(d={})=>{o.headers=new Headers;let c={setHeader(y,h){o.headers.set(y,h);},setCookie(y,h,w){setCookie(o.headers,y,h,w);},getCookie(y,h){let b=d.headers?.get("cookie");return getCookie(b||"",y,h)},getSignedCookie(y,h,w){let b=d.headers;return b?getSignedCookie(b,h,y,w):null},async setSignedCookie(y,h,w,b){await setSignedCookie(o.headers,y,h,w,b);},redirect(y){return o.headers.set("Location",y),new APIError("FOUND")},responseHeader:o.headers},l=await e,p={...c,...d,path:o.path,context:{...l,...d.context,endpoint:o}};l.session=null;let m=t.plugins||[];for(let y of m){let h=y.hooks?.before??[];for(let w of h){if(!w.matcher(p))continue;let b=await w.handler(p);if(b&&"context"in b){p={...p,...b.context};continue}if(b)return b}}let f;try{f=await o(p);}catch(y){if(y instanceof APIError){let h=t.plugins?.map(w=>{if(w.hooks?.after)return w.hooks.after}).filter(w=>w!==void 0).flat();if(!h?.length)throw y.headers=o.headers,y;p.context.returned=y,p.context.returned.headers=o.headers;for(let w of h||[])if(w.matcher(p))try{let U=await w.handler(p);U&&"response"in U&&(p.context.returned=U.response);}catch(U){if(U instanceof APIError){p.context.returned=U;continue}throw U}if(p.context.returned instanceof APIError)throw p.context.returned.headers=o.headers,p.context.returned;return p.context.returned}throw y}p.context.returned=f,p.responseHeader=o.headers;for(let y of t.plugins||[])if(y.hooks?.after){for(let h of y.hooks.after)if(h.matcher(p))try{let b=await h.handler(p);b&&(p.context.returned=b);}catch(b){if(b instanceof APIError){p.context.returned=b;continue}throw b}}let g=p.context.returned;return g instanceof Response&&o.headers.forEach((y,h)=>{h==="set-cookie"?g.headers.append(h,y):g.headers.set(h,y);}),g},a[u].path=o.path,a[u].method=o.method,a[u].options=o.options,a[u].headers=o.headers;return {api:a,middlewares:n}}var Pt=(e,t)=>{let{api:r,middlewares:n}=Ue(e,t),i=new URL(e.baseURL).pathname;return createRouter(r,{extraContext:e,basePath:i,routerMiddleware:[{path:"/**",middleware:Se},...n],async onRequest(s){for(let a of e.options.plugins||[])if(a.onRequest){let u=await a.onRequest(s,e);if(u&&"response"in u)return u.response}return Ot(s,e)},async onResponse(s){for(let a of e.options.plugins||[])if(a.onResponse){let u=await a.onResponse(s,e);if(u)return u.response}return s},onError(s){if(s instanceof APIError&&s.status==="FOUND")return;if(t.onAPIError?.throw)throw s;if(t.onAPIError?.onError){t.onAPIError.onError(s,e);return}let a=t.logger?.level,u=a==="error"||a==="warn"||a==="debug"?E:void 0;if(t.logger?.disabled!==true){if(s&&typeof s=="object"&&"message"in s&&typeof s.message=="string"&&(s.message.includes("no column")||s.message.includes("column")||s.message.includes("relation")||s.message.includes("table")||s.message.includes("does not exist"))){e.logger?.error(s.message),e.logger?.error("If you are seeing this error, it is likely that you need to run the migrations for the database or you need to update your database schema. If you recently updated the package, make sure to run the migrations.");return}s instanceof APIError?(s.status==="INTERNAL_SERVER_ERROR"&&e.logger.error(s.status,s),u?.error(s.message)):e.logger?.error(s&&typeof s=="object"&&"name"in s?s.name:"",s);}}})};var W={N:16384,r:16,p:1,dkLen:64};async function Lt(e,t){return await scryptAsync(e.normalize("NFKC"),t,{N:W.N,p:W.p,r:W.r,dkLen:W.dkLen,maxmem:128*W.N*W.r*2})}var _t=async e=>{let t=encodeHex(getRandomValues(new Uint8Array(16))),r=await Lt(e,t);return `${t}:${encodeHex(r)}`},Ct=async(e,t)=>{let[r,n]=e.split(":"),i=await Lt(t,r);return ge(i,decodeHex(n))};function Dt(e,t){let r=t.hooks;async function n(a,u,o){let d=a;for(let p of r||[]){let m=p[u]?.create?.before;if(m){let f=await m(a);if(f===false)return null;typeof f=="object"&&"data"in f&&(d=f.data);}}let c=o?await o.fn(d):null,l=!o||o.executeMainFn?await e.create({model:u,data:d}):c;for(let p of r||[]){let m=p[u]?.create?.after;m&&await m(l);}return l}async function i(a,u,o,d){let c=a;for(let m of r||[]){let f=m[o]?.update?.before;if(f){let g=await f(a);if(g===false)return null;c=typeof g=="object"?g.data:g;}}let l=d?await d.fn(c):null,p=!d||d.executeMainFn?await e.update({model:o,update:c,where:u}):l;for(let m of r||[]){let f=m[o]?.update?.after;f&&await f(p);}return p}async function s(a,u,o,d){let c=a;for(let m of r||[]){let f=m[o]?.update?.before;if(f){let g=await f(a);if(g===false)return null;c=typeof g=="object"?g.data:g;}}let l=d?await d.fn(c):null,p=!d||d.executeMainFn?await e.updateMany({model:o,update:c,where:u}):l;for(let m of r||[]){let f=m[o]?.update?.after;f&&await f(p);}return p}return {createWithHooks:n,updateWithHooks:i,updateManyWithHooks:s}}var Te=(e,t)=>{let r=t.options,n=r.secondaryStorage,i=r.session?.expiresIn||60*60*24*7,{createWithHooks:s,updateWithHooks:a,updateManyWithHooks:u}=Dt(e,t);return {createOAuthUser:async(o,d)=>{try{let c=await s({createdAt:new Date,updatedAt:new Date,...o},"user"),l=await s({...d,userId:c.id||o.id,createdAt:new Date,updatedAt:new Date},"account");return {user:c,account:l}}catch(c){return console.log(c),null}},createUser:async o=>await s({createdAt:new Date,updatedAt:new Date,emailVerified:false,...o},"user"),createAccount:async o=>await s({createdAt:new Date,updatedAt:new Date,...o},"account"),listSessions:async o=>{if(n){let c=await n.get(`active-sessions-${o}`);if(!c)return [];let l=G(c)||[],p=Date.now(),m=l.filter(g=>g.expiresAt>p),f=[];for(let g of m){let y=await n.get(g.token);if(y){let h=JSON.parse(y),w=pe(t.options,{...h.session,expiresAt:new Date(h.session.expiresAt)});f.push(w);}}return f}return await e.findMany({model:"session",where:[{field:"userId",value:o}]})},listUsers:async(o,d,c,l)=>await e.findMany({model:"user",limit:o,offset:d,sortBy:c,where:l}),deleteUser:async o=>{await e.deleteMany({model:"session",where:[{field:"userId",value:o}]}),await e.deleteMany({model:"account",where:[{field:"userId",value:o}]}),await e.delete({model:"user",where:[{field:"id",value:o}]});},createSession:async(o,d,c,l)=>{let p=d instanceof Request?d.headers:d,{id:m,...f}=l||{},g={ipAddress:d&&me(d,t.options)||"",userAgent:p?.get("user-agent")||"",...f,expiresAt:c?D(60*60*24,"sec"):D(i,"sec"),userId:o,token:q(32),createdAt:new Date,updatedAt:new Date};return await s(g,"session",n?{fn:async()=>{let h=await e.findOne({model:"user",where:[{field:"id",value:o}]});n.set(g.token,JSON.stringify({session:g,user:h}),i);let w=await n.get(`active-sessions-${o}`),b=[],U=Date.now();return w&&(b=G(w)||[],b=b.filter(Kt=>Kt.expiresAt>U)),b.push({token:g.token,expiresAt:U+i*1e3}),await n.set(`active-sessions-${o}`,JSON.stringify(b),i),g},executeMainFn:r.session?.storeSessionInDatabase}:void 0)},findSession:async o=>{if(n){let p=await n.get(o);if(p){let m=JSON.parse(p),f=pe(t.options,{...m.session,expiresAt:new Date(m.session.expiresAt),createdAt:new Date(m.session.createdAt),updatedAt:new Date(m.session.updatedAt)}),g=Re(t.options,{...m.user,createdAt:new Date(m.user.createdAt),updatedAt:new Date(m.user.updatedAt)});return {session:f,user:g}}}let d=await e.findOne({model:"session",where:[{value:o,field:"token"}]});if(!d)return null;let c=await e.findOne({model:"user",where:[{value:d.userId,field:"id"}]});if(!c)return null;let l=Re(t.options,c);return {session:pe(t.options,d),user:l}},findSessions:async o=>{if(n){let p=[];for(let m of o){let f=await n.get(m);if(f){let g=JSON.parse(f),y={session:{...g.session,expiresAt:new Date(g.session.expiresAt)},user:{...g.user,createdAt:new Date(g.user.createdAt),updatedAt:new Date(g.user.updatedAt)}};p.push(y);}}return p}let d=await e.findMany({model:"session",where:[{field:"token",value:o,operator:"in"}]}),c=d.map(p=>p.userId);if(!c.length)return [];let l=await e.findMany({model:"user",where:[{field:"id",value:c,operator:"in"}]});return d.map(p=>{let m=l.find(f=>f.id===p.userId);return m?{session:p,user:m}:null})},updateSession:async(o,d)=>await a(d,[{field:"token",value:o}],"session",n?{async fn(l){let p=await n.get(o),m=null;if(p){let f=JSON.parse(p);return m={...f.session,...l},await n.set(o,JSON.stringify({session:m,user:f.user}),f.session.expiresAt?Math.floor((f.session.expiresAt.getTime()-Date.now())/1e3):i),m}else return null},executeMainFn:r.session?.storeSessionInDatabase}:void 0),deleteSession:async o=>{if(n){await n.delete(o),r.session?.storeSessionInDatabase&&await e.delete({model:"session",where:[{field:"token",value:o}]});return}await e.delete({model:"session",where:[{field:"token",value:o}]});},deleteSessions:async o=>{if(n){if(typeof o=="string"){let d=await n.get(`active-sessions-${o}`),c=d?G(d):[];if(!c)return;for(let l of c)await n.delete(l.token);}else for(let d of o)await n.get(d)&&await n.delete(d);r.session?.storeSessionInDatabase&&await e.deleteMany({model:"session",where:[{field:Array.isArray(o)?"token":"userId",value:o,operator:Array.isArray(o)?"in":void 0}]});return}await e.deleteMany({model:"session",where:[{field:Array.isArray(o)?"token":"userId",value:o,operator:Array.isArray(o)?"in":void 0}]});},findUserByEmail:async(o,d)=>{let c=await e.findOne({model:"user",where:[{value:o.toLowerCase(),field:"email"}]});if(!c)return null;if(d?.includeAccounts){let l=await e.findMany({model:"account",where:[{value:c.id,field:"userId"}]});return {user:c,accounts:l}}return {user:c,accounts:[]}},findUserById:async o=>await e.findOne({model:"user",where:[{field:"id",value:o}]}),linkAccount:async o=>await s({...o,createdAt:new Date,updatedAt:new Date},"account"),updateUser:async(o,d)=>await a(d,[{field:"id",value:o}],"user"),updateUserByEmail:async(o,d)=>await a(d,[{field:"email",value:o}],"user"),updatePassword:async(o,d)=>{await u({password:d},[{field:"userId",value:o},{field:"providerId",value:"credential"}],"account");},findAccounts:async o=>await e.findMany({model:"account",where:[{field:"userId",value:o}]}),findAccount:async o=>await e.findOne({model:"account",where:[{field:"accountId",value:o}]}),findAccountByUserId:async o=>await e.findMany({model:"account",where:[{field:"userId",value:o}]}),updateAccount:async(o,d)=>await a(d,[{field:"id",value:o}],"account"),createVerificationValue:async o=>await s({createdAt:new Date,updatedAt:new Date,...o},"verification"),findVerificationValue:async o=>(await e.findMany({model:"verification",where:[{field:"identifier",value:o}],sortBy:{field:"createdAt",direction:"desc"},limit:10}))[0],deleteVerificationValue:async o=>{await e.delete({model:"verification",where:[{field:"id",value:o}]});},deleteVerificationByIdentifier:async o=>{await e.delete({model:"verification",where:[{field:"identifier",value:o}]});},updateVerificationValue:async(o,d)=>await a(d,[{field:"id",value:o}],"verification")}};var $=e=>{let t=e.plugins?.reduce((o,d)=>{let c=d.schema;if(!c)return o;for(let[l,p]of Object.entries(c))o[l]={fields:{...o[l]?.fields,...p.fields},modelName:p.modelName||l};return o},{}),r=e.rateLimit?.storage==="database",n={rateLimit:{modelName:e.rateLimit?.modelName||"rateLimit",fields:{key:{type:"string",fieldName:e.rateLimit?.fields?.key||"key"},count:{type:"number",fieldName:e.rateLimit?.fields?.count||"count"},lastRequest:{type:"number",fieldName:e.rateLimit?.fields?.lastRequest||"lastRequest"}}}},{user:i,session:s,account:a,...u}=t||{};return {user:{modelName:e.user?.modelName||"user",fields:{name:{type:"string",required:true,fieldName:e.user?.fields?.name||"name"},email:{type:"string",unique:true,required:true,fieldName:e.user?.fields?.email||"email"},emailVerified:{type:"boolean",defaultValue:()=>false,required:true,fieldName:e.user?.fields?.emailVerified||"emailVerified"},image:{type:"string",required:false,fieldName:e.user?.fields?.image||"image"},createdAt:{type:"date",defaultValue:()=>new Date,required:true,fieldName:e.user?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",defaultValue:()=>new Date,required:true,fieldName:e.user?.fields?.updatedAt||"updatedAt"},...i?.fields,...e.user?.additionalFields},order:1},session:{modelName:e.session?.modelName||"session",fields:{expiresAt:{type:"date",required:true,fieldName:e.session?.fields?.expiresAt||"expiresAt"},token:{type:"string",required:true,fieldName:e.session?.fields?.token||"token",unique:true},createdAt:{type:"date",required:true,fieldName:e.session?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:true,fieldName:e.session?.fields?.updatedAt||"updatedAt"},ipAddress:{type:"string",required:false,fieldName:e.session?.fields?.ipAddress||"ipAddress"},userAgent:{type:"string",required:false,fieldName:e.session?.fields?.userAgent||"userAgent"},userId:{type:"string",fieldName:e.session?.fields?.userId||"userId",references:{model:e.user?.modelName||"user",field:"id",onDelete:"cascade"},required:true},...s?.fields,...e.session?.additionalFields},order:2},account:{modelName:e.account?.modelName||"account",fields:{accountId:{type:"string",required:true,fieldName:e.account?.fields?.accountId||"accountId"},providerId:{type:"string",required:true,fieldName:e.account?.fields?.providerId||"providerId"},userId:{type:"string",references:{model:e.user?.modelName||"user",field:"id",onDelete:"cascade"},required:true,fieldName:e.account?.fields?.userId||"userId"},accessToken:{type:"string",required:false,fieldName:e.account?.fields?.accessToken||"accessToken"},refreshToken:{type:"string",required:false,fieldName:e.account?.fields?.refreshToken||"refreshToken"},idToken:{type:"string",required:false,fieldName:e.account?.fields?.idToken||"idToken"},accessTokenExpiresAt:{type:"date",required:false,fieldName:e.account?.fields?.accessTokenExpiresAt||"accessTokenExpiresAt"},refreshTokenExpiresAt:{type:"date",required:false,fieldName:e.account?.fields?.accessTokenExpiresAt||"refreshTokenExpiresAt"},scope:{type:"string",required:false,fieldName:e.account?.fields?.scope||"scope"},password:{type:"string",required:false,fieldName:e.account?.fields?.password||"password"},createdAt:{type:"date",required:true,fieldName:e.account?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:true,fieldName:e.account?.fields?.updatedAt||"updatedAt"},...a?.fields},order:3},verification:{modelName:e.verification?.modelName||"verification",fields:{identifier:{type:"string",required:true,fieldName:e.verification?.fields?.identifier||"identifier"},value:{type:"string",required:true,fieldName:e.verification?.fields?.value||"value"},expiresAt:{type:"date",required:true,fieldName:e.verification?.fields?.expiresAt||"expiresAt"},createdAt:{type:"date",required:false,defaultValue:()=>new Date,fieldName:e.verification?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:false,defaultValue:()=>new Date,fieldName:e.verification?.fields?.updatedAt||"updatedAt"}},order:4},...u,...r?n:{}}};function Ft(e){if(!e)return null;if("dialect"in e)return Ft(e.dialect);if("createDriver"in e){if(e instanceof SqliteDialect)return "sqlite";if(e instanceof MysqlDialect)return "mysql";if(e instanceof PostgresDialect)return "postgres";if(e instanceof MssqlDialect)return "mssql"}return "aggregate"in e?"sqlite":"getConnection"in e?"mysql":"connect"in e?"postgres":null}var Ee=async e=>{let t=e.database;if(!t)return {kysely:null,databaseType:null};if("db"in t)return {kysely:t.db,databaseType:t.type};if("dialect"in t)return {kysely:new Kysely({dialect:t.dialect}),databaseType:t.type};let r,n=Ft(t);return "createDriver"in t&&(r=t),"aggregate"in t&&(r=new SqliteDialect({database:t})),"getConnection"in t&&(r=new MysqlDialect(t)),"connect"in t&&(r=new PostgresDialect({pool:t})),{kysely:r?new Kysely({dialect:r}):null,databaseType:n}};var en=(e,t,r)=>{let n=$(t);function i(d,c){if(c==="id")return c;let l=n[d].fields[c];return l||console.log("Field not found",d,c),l.fieldName||c}function s(d,c,l){let{type:p="sqlite"}=r||{},m=n[c].fields[l];return m.type==="boolean"&&p==="sqlite"?d?1:0:m.type==="date"&&d&&d instanceof Date&&p==="sqlite"?d.toISOString():d}function a(d,c,l){let{type:p="sqlite"}=r||{},m=n[c].fields[l];return m.type==="boolean"&&p==="sqlite"&&d!==null?d===1:m.type==="date"&&d?new Date(d):d}function u(d){return n[d].modelName}let o=t?.advanced?.generateId===false;return {transformInput(d,c,l){let p=o||l==="update"?{}:{id:d.id||(t.advanced?.generateId?t.advanced.generateId({model:c}):q())};for(let m in d){let f=n[c].fields[m];f&&(p[f.fieldName||m]=s(d[m],c,m));}return p},transformOutput(d,c,l=[]){if(!d)return null;let p=d.id?l.length===0||l.includes("id")?{id:d.id}:{}:{},m=n[c].fields;for(let f in m){if(l.length&&!l.includes(f))continue;let g=m[f];g&&(p[f]=a(d[g.fieldName||f],c,f));}return p},convertWhereClause(d,c){if(!c)return {and:null,or:null};let l={and:[],or:[]};return c.forEach(p=>{let{field:m,value:f,operator:g="=",connector:y="AND"}=p,h=i(d,m),w=b=>g.toLowerCase()==="in"?b(h,"in",Array.isArray(f)?f:[f]):g==="contains"?b(h,"like",`%${f}%`):g==="starts_with"?b(h,"like",`${f}%`):g==="ends_with"?b(h,"like",`%${f}`):g==="eq"?b(h,"=",f):g==="ne"?b(h,"<>",f):g==="gt"?b(h,">",f):g==="gte"?b(h,">=",f):g==="lt"?b(h,"<",f):g==="lte"?b(h,"<=",f):b(h,g,f);y==="OR"?l.or.push(w):l.and.push(w);}),{and:l.and.length?l.and:null,or:l.or.length?l.or:null}},async withReturning(d,c,l,p){let m;if(r?.type!=="mysql")m=await c.returningAll().executeTakeFirst();else {await c.execute();let f=d.id?"id":p[0].field?p[0].field:"id",g=d[f]||p[0].value;m=await e.selectFrom(u(l)).selectAll().where(i(l,f),"=",g).executeTakeFirst();}return m},getModelName:u,getField:i}},Vt=(e,t)=>r=>{let{transformInput:n,withReturning:i,transformOutput:s,convertWhereClause:a,getModelName:u,getField:o}=en(e,r,t);return {id:"kysely",async create(d){let{model:c,data:l,select:p}=d,m=n(l,c,"create"),f=e.insertInto(u(c)).values(m);return s(await i(m,f,c,[]),c,p)},async findOne(d){let{model:c,where:l,select:p}=d,{and:m,or:f}=a(c,l),g=e.selectFrom(u(c)).selectAll();m&&(g=g.where(h=>h.and(m.map(w=>w(h))))),f&&(g=g.where(h=>h.or(f.map(w=>w(h)))));let y=await g.executeTakeFirst();return y?s(y,c,p):null},async findMany(d){let{model:c,where:l,limit:p,offset:m,sortBy:f}=d,{and:g,or:y}=a(c,l),h=e.selectFrom(u(c));g&&(h=h.where(b=>b.and(g.map(U=>U(b))))),y&&(h=h.where(b=>b.or(y.map(U=>U(b))))),h=h.limit(p||100),m&&(h=h.offset(m)),f&&(h=h.orderBy(o(c,f.field),f.direction));let w=await h.selectAll().execute();return w?w.map(b=>s(b,c)):[]},async update(d){let{model:c,where:l,update:p}=d,{and:m,or:f}=a(c,l),g=n(p,c,"update"),y=e.updateTable(u(c)).set(g);return m&&(y=y.where(w=>w.and(m.map(b=>b(w))))),f&&(y=y.where(w=>w.or(f.map(b=>b(w))))),await s(await i(g,y,c,l),c)},async updateMany(d){let{model:c,where:l,update:p}=d,{and:m,or:f}=a(c,l),g=n(p,c,"update"),y=e.updateTable(u(c)).set(g);return m&&(y=y.where(w=>w.and(m.map(b=>b(w))))),f&&(y=y.where(w=>w.or(f.map(b=>b(w))))),(await y.execute()).length},async delete(d){let{model:c,where:l}=d,{and:p,or:m}=a(c,l),f=e.deleteFrom(u(c));p&&(f=f.where(g=>g.and(p.map(y=>y(g))))),m&&(f=f.where(g=>g.or(m.map(y=>y(g))))),await f.execute();},async deleteMany(d){let{model:c,where:l}=d,{and:p,or:m}=a(c,l),f=e.deleteFrom(u(c));return p&&(f=f.where(g=>g.and(p.map(y=>y(g))))),m&&(f=f.where(g=>g.or(m.map(y=>y(g))))),(await f.execute()).length},options:t}};var tn=e=>{let t=$(e);function r(n,i){return i==="id"?i:t[n].fields[i].fieldName||i}return {transformInput(n,i,s){let a=s==="update"?{}:{id:n.id||(e.advanced?.generateId?e.advanced.generateId({model:i}):q())};for(let u in n){let o=t[i].fields[u];o&&(a[o.fieldName||u]=n[u]);}return a},transformOutput(n,i,s=[]){if(!n)return null;let a=n.id||n._id?s.length===0||s.includes("id")?{id:n.id}:{}:{},u=t[i].fields;for(let o in u){if(s.length&&!s.includes(o))continue;let d=u[o];d&&(a[o]=n[d.fieldName||o]);}return a},convertWhereClause(n,i,s){return i.filter(a=>n.every(u=>{let{field:o,value:d,operator:c}=u,l=r(s,o);if(c==="in"){if(!Array.isArray(d))throw new Error("Value must be an array");return d.includes(a[l])}else return c==="contains"?a[l].includes(d):c==="starts_with"?a[l].startsWith(d):c==="ends_with"?a[l].endsWith(d):a[l]===d}))},getField:r}},$t=e=>t=>{let{transformInput:r,transformOutput:n,convertWhereClause:i,getField:s}=tn(t);return {id:"memory",create:async({model:a,data:u})=>{let o=r(u,a,"create");return e[a].push(o),n(o,a)},findOne:async({model:a,where:u,select:o})=>{let d=e[a],l=i(u,d,a)[0]||null;return n(l,a,o)},findMany:async({model:a,where:u,sortBy:o,limit:d,offset:c})=>{let l=e[a];return u&&(l=i(u,l,a)),o&&(l=l.sort((p,m)=>{let f=s(a,o.field);return o.direction==="asc"?p[f]>m[f]?1:-1:p[f]<m[f]?1:-1})),c!==void 0&&(l=l.slice(c)),d!==void 0&&(l=l.slice(0,d)),l.map(p=>n(p,a))},update:async({model:a,where:u,update:o})=>{let d=e[a],c=i(u,d,a);return c.forEach(l=>{Object.assign(l,r(o,a,"update"));}),n(c[0],a)},delete:async({model:a,where:u})=>{let o=e[a],d=i(u,o,a);e[a]=o.filter(c=>!d.includes(c));},deleteMany:async({model:a,where:u})=>{let o=e[a],d=i(u,o,a),c=0;return e[a]=o.filter(l=>d.includes(l)?(c++,false):!d.includes(l)),c},updateMany(a){let{model:u,where:o,update:d}=a,c=e[u],l=i(o,c,u);return l.forEach(p=>{Object.assign(p,d);}),l[0]||null}}};async function zt(e){if(!e.database){let n=$(e),i=Object.keys(n).reduce((s,a)=>(s[a]=[],s),{});return E.warn("No database configuration provided. Using memory adapter in development"),$t(i)(e)}if(typeof e.database=="function")return e.database(e);let{kysely:t,databaseType:r}=await Ee(e);if(!t)throw new L("Failed to initialize database adapter");return Vt(t,{type:r||"sqlite"})(e)}var Ie="better-auth-secret-123456789";async function Ht(e,t){let n=(await t.context.internalAdapter.findAccounts(e))?.find(a=>a.providerId==="credential"),i=n?.password;if(!n||!i)throw new APIError("BAD_REQUEST",{message:"No password credential found"});if(!await t.context.password.verify(i,t.body.password))throw new APIError("BAD_REQUEST",{message:"Invalid password"});return  true}var Gt=async e=>{let t=await zt(e),r=e.plugins||[],n=on(e),i=ae(e.logger),s=Y(e.baseURL,e.basePath),a=e.secret||P$1.BETTER_AUTH_SECRET||P$1.AUTH_SECRET||Ie;a===Ie&&J&&i.error("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config."),e={...e,secret:a,baseURL:s?new URL(s).origin:"",basePath:e.basePath||"/api/auth",plugins:r.concat(n),emailAndPassword:{...e.emailAndPassword,enabled:e.emailAndPassword?.enabled??false,autoSignIn:e.emailAndPassword?.autoSignIn??true}};let u=Be(e),o=$(e),d=Object.keys(e.socialProviders||{}).map(m=>{let f=e.socialProviders?.[m];return f.enabled===false?null:((!f.clientId||!f.clientSecret)&&i.warn(`Social provider ${m} is missing clientId or clientSecret`),Ae[m](f))}).filter(m=>m!==null),c=({model:m,size:f})=>typeof e?.advanced?.generateId=="function"?e.advanced.generateId({model:m,size:f}):q(f),l={appName:e.appName||"Better Auth",socialProviders:d,options:e,tables:o,trustedOrigins:sn(e),baseURL:s||"",sessionConfig:{updateAge:e.session?.updateAge!==void 0?e.session.updateAge:24*60*60,expiresIn:e.session?.expiresIn||60*60*24*7,freshAge:e.session?.freshAge||60*5},secret:a,rateLimit:{...e.rateLimit,enabled:e.rateLimit?.enabled??J,window:e.rateLimit?.window||10,max:e.rateLimit?.max||100,storage:e.rateLimit?.storage||e.secondaryStorage?"secondary-storage":"memory"},authCookies:u,logger:i,generateId:c,session:null,secondaryStorage:e.secondaryStorage,password:{hash:e.emailAndPassword?.password?.hash||_t,verify:e.emailAndPassword?.password?.verify||Ct,config:{minPasswordLength:e.emailAndPassword?.minPasswordLength||8,maxPasswordLength:e.emailAndPassword?.maxPasswordLength||128},checkPassword:Ht},adapter:t,internalAdapter:Te(t,{options:e,hooks:e.databaseHooks?[e.databaseHooks]:[]}),createAuthCookie:he(e)},{context:p}=nn(l);return p};function nn(e){let t=e.options,r=t.plugins||[],n=e,i=[];for(let s of r)if(s.init){let a=s.init(e);typeof a=="object"&&(a.options&&(a.options.databaseHooks&&i.push(a.options.databaseHooks),t=defu(t,a.options)),a.context&&(n={...n,...a.context}));}return i.push(t.databaseHooks),n.internalAdapter=Te(e.adapter,{options:t,hooks:i.filter(s=>s!==void 0),generateId:e.generateId}),n.options=t,{context:n}}function on(e){let t=[];return e.advanced?.crossSubDomainCookies?.enabled,t}function sn(e){let t=Y(e.baseURL,e.basePath);if(!t)return [];let r=[new URL(t).origin];e.trustedOrigins&&r.push(...e.trustedOrigins);let n=P$1.BETTER_AUTH_TRUSTED_ORIGINS;return n&&r.push(...n.split(",")),r}var pc=e=>{let t=Gt(e),{api:r}=Ue(t,e);return {handler:async n=>{let i=await t,s=i.options.basePath||"/api/auth",a=new URL(n.url);if(!i.options.baseURL){let o=Y(void 0,s)||`${a.origin}${s}`;i.options.baseURL=o,i.baseURL=o;}i.trustedOrigins=[...e.trustedOrigins||[],i.baseURL,a.origin];let{handler:u}=Pt(i,e);return u(n)},api:r,options:e,$context:t,$Infer:{}}};

objectType({id:stringType(),providerId:stringType(),accountId:stringType(),userId:stringType(),accessToken:stringType().nullish(),refreshToken:stringType().nullish(),idToken:stringType().nullish(),accessTokenExpiresAt:dateType().nullish(),refreshTokenExpiresAt:dateType().nullish(),scope:stringType().nullish(),password:stringType().nullish(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date)});objectType({id:stringType(),email:stringType().transform(e=>e.toLowerCase()),emailVerified:booleanType().default(false),name:stringType(),image:stringType().nullish(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date)});objectType({id:stringType(),userId:stringType(),expiresAt:dateType(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date),token:stringType(),ipAddress:stringType().nullish(),userAgent:stringType().nullish()});objectType({id:stringType(),value:stringType(),createdAt:dateType().default(()=>new Date),updatedAt:dateType().default(()=>new Date),expiresAt:dateType(),identifier:stringType()});var b=Object.create(null),w=e=>globalThis.process?.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?b:globalThis),T=new Proxy(b,{get(e,d){return w()[d]??b[d]},has(e,d){let l=w();return d in l||d in b},set(e,d,l){let u=w(true);return u[d]=l,true},deleteProperty(e,d){if(!d)return  false;let l=w(true);return delete l[d],true},ownKeys(){let e=w(true);return Object.keys(e)}});function R(e){return e?e!=="false":false}var F=typeof process<"u"&&process.env&&process.env.NODE_ENV||"";F==="test"||R(T.TEST);var x=e=>nanoid(e);var v=["info","success","warn","error","debug"];function S(e,d){return v.indexOf(d)<=v.indexOf(e)}var B=createConsola({formatOptions:{date:false,colors:true,compact:true},defaults:{tag:"Better Auth"}}),k=e=>{let l="error",u=(c,m,f=[])=>{if(!(!S(l,c))){{B[c]("",m,...f);return}}};return Object.fromEntries(v.map(c=>[c,(...[m,...f])=>u(c,m,f)]))};k();var h=e=>{let d=e.plugins?.reduce((s,p)=>{let o=p.schema;if(!o)return s;for(let[t,a]of Object.entries(o))s[t]={fields:{...s[t]?.fields,...a.fields},modelName:a.modelName||t};return s},{}),l=e.rateLimit?.storage==="database",u={rateLimit:{modelName:e.rateLimit?.modelName||"rateLimit",fields:{key:{type:"string",fieldName:e.rateLimit?.fields?.key||"key"},count:{type:"number",fieldName:e.rateLimit?.fields?.count||"count"},lastRequest:{type:"number",fieldName:e.rateLimit?.fields?.lastRequest||"lastRequest"}}}},{user:c,session:m,account:f,...i}=d||{};return {user:{modelName:e.user?.modelName||"user",fields:{name:{type:"string",required:true,fieldName:e.user?.fields?.name||"name"},email:{type:"string",unique:true,required:true,fieldName:e.user?.fields?.email||"email"},emailVerified:{type:"boolean",defaultValue:()=>false,required:true,fieldName:e.user?.fields?.emailVerified||"emailVerified"},image:{type:"string",required:false,fieldName:e.user?.fields?.image||"image"},createdAt:{type:"date",defaultValue:()=>new Date,required:true,fieldName:e.user?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",defaultValue:()=>new Date,required:true,fieldName:e.user?.fields?.updatedAt||"updatedAt"},...c?.fields,...e.user?.additionalFields},order:1},session:{modelName:e.session?.modelName||"session",fields:{expiresAt:{type:"date",required:true,fieldName:e.session?.fields?.expiresAt||"expiresAt"},token:{type:"string",required:true,fieldName:e.session?.fields?.token||"token",unique:true},createdAt:{type:"date",required:true,fieldName:e.session?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:true,fieldName:e.session?.fields?.updatedAt||"updatedAt"},ipAddress:{type:"string",required:false,fieldName:e.session?.fields?.ipAddress||"ipAddress"},userAgent:{type:"string",required:false,fieldName:e.session?.fields?.userAgent||"userAgent"},userId:{type:"string",fieldName:e.session?.fields?.userId||"userId",references:{model:e.user?.modelName||"user",field:"id",onDelete:"cascade"},required:true},...m?.fields,...e.session?.additionalFields},order:2},account:{modelName:e.account?.modelName||"account",fields:{accountId:{type:"string",required:true,fieldName:e.account?.fields?.accountId||"accountId"},providerId:{type:"string",required:true,fieldName:e.account?.fields?.providerId||"providerId"},userId:{type:"string",references:{model:e.user?.modelName||"user",field:"id",onDelete:"cascade"},required:true,fieldName:e.account?.fields?.userId||"userId"},accessToken:{type:"string",required:false,fieldName:e.account?.fields?.accessToken||"accessToken"},refreshToken:{type:"string",required:false,fieldName:e.account?.fields?.refreshToken||"refreshToken"},idToken:{type:"string",required:false,fieldName:e.account?.fields?.idToken||"idToken"},accessTokenExpiresAt:{type:"date",required:false,fieldName:e.account?.fields?.accessTokenExpiresAt||"accessTokenExpiresAt"},refreshTokenExpiresAt:{type:"date",required:false,fieldName:e.account?.fields?.accessTokenExpiresAt||"refreshTokenExpiresAt"},scope:{type:"string",required:false,fieldName:e.account?.fields?.scope||"scope"},password:{type:"string",required:false,fieldName:e.account?.fields?.password||"password"},createdAt:{type:"date",required:true,fieldName:e.account?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:true,fieldName:e.account?.fields?.updatedAt||"updatedAt"},...f?.fields},order:3},verification:{modelName:e.verification?.modelName||"verification",fields:{identifier:{type:"string",required:true,fieldName:e.verification?.fields?.identifier||"identifier"},value:{type:"string",required:true,fieldName:e.verification?.fields?.value||"value"},expiresAt:{type:"date",required:true,fieldName:e.verification?.fields?.expiresAt||"expiresAt"},createdAt:{type:"date",required:false,defaultValue:()=>new Date,fieldName:e.verification?.fields?.createdAt||"createdAt"},updatedAt:{type:"date",required:false,defaultValue:()=>new Date,fieldName:e.verification?.fields?.updatedAt||"updatedAt"}},order:4},...i,...l?u:{}}};var P=(e,d)=>{let l=h(d);function u(i,s){return s==="id"?s:l[i].fields[s].fieldName||s}function c(i){switch(i){case "starts_with":return "startsWith";case "ends_with":return "endsWith";default:return i}}function m(i){return l[i].modelName}let f=d?.advanced?.generateId===false;return {transformInput(i,s,p){let o=f||p==="update"?{}:{id:i.id||(d.advanced?.generateId?d.advanced.generateId({model:s}):x())};for(let t in i){let a=l[s].fields[t];a&&(o[a.fieldName||t]=i[t]);}return o},transformOutput(i,s,p=[]){if(!i)return null;let o=i.id||i._id?p.length===0||p.includes("id")?{id:i.id}:{}:{},t=l[s].fields;for(let a in t){if(p.length&&!p.includes(a))continue;let r=t[a];r&&(o[a]=i[r.fieldName||a]);}return o},convertWhereClause(i,s){if(!s)return {};if(s.length===1){let r=s[0];return r?{[u(i,r.field)]:r.operator==="eq"||!r.operator?r.value:{[c(r.operator)]:r.value}}:void 0}let p=s.filter(r=>r.connector==="AND"||!r.connector),o=s.filter(r=>r.connector==="OR"),t=p.map(r=>({[u(i,r.field)]:r.operator==="eq"||!r.operator?r.value:{[c(r.operator)]:r.value}})),a=o.map(r=>({[u(i,r.field)]:{[r.operator||"eq"]:r.value}}));return {AND:t.length?t:void 0,OR:a.length?a:void 0}},convertSelect:(i,s)=>{if(!(!i||!s))return i.reduce((p,o)=>({...p,[u(s,o)]:true}),{})},getModelName:m,getField:u}},Ut=(e,d)=>l=>{let u=e,{transformInput:c,transformOutput:m,convertWhereClause:f,convertSelect:i,getModelName:s,getField:p}=P(d,l);return {id:"prisma",async create(o){let{model:t,data:a,select:r}=o,y=c(a,t,"create"),g=await u[s(t)].create({data:y,select:i(r,t)});return m(g,t,r)},async findOne(o){let{model:t,where:a,select:r}=o,y=f(t,a),g=await u[s(t)].findFirst({where:y,select:i(r,t)});return m(g,t,r)},async findMany(o){let{model:t,where:a,limit:r,offset:y,sortBy:g}=o,A=f(t,a);return (await u[s(t)].findMany({where:A,take:r||100,skip:y||0,orderBy:g?.field?{[p(t,g.field)]:g.direction==="desc"?"desc":"asc"}:void 0})).map(O=>m(O,t))},async update(o){let{model:t,where:a,update:r}=o,y=f(t,a),g=c(r,t,"update"),A=await u[s(t)].update({where:y,data:g});return m(A,t)},async updateMany(o){let{model:t,where:a,update:r}=o,y=f(t,a),g=c(r,t,"update"),A=await u[s(t)].updateMany({where:y,data:g});return A?A.count:0},async delete(o){let{model:t,where:a}=o,r=f(t,a);try{await u[s(t)].delete({where:r});}catch{}},async deleteMany(o){let{model:t,where:a}=o,r=f(t,a),y=await u[s(t)].deleteMany({where:r});return y?y.count:0},options:d}};

async function sendEmail(name, email, subject, message) {
  try {
    const apiInstance = new apiExports.TransactionalEmailsApi();
    apiInstance.setApiKey(apiExports.TransactionalEmailsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const sendSmtpEmail = new apiExports.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    sendSmtpEmail.htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
                    .header { background-color: #1e293b; padding: 32px; text-align: center; }
                    .content { padding: 40px; }
                    .footer { padding: 24px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f3f4f6; }
                    .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-top: 24px; }
                    h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
                    h2 { color: #111827; margin: 0 0 16px 0; font-size: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>FACT FLEXI</h1>
                    </div>
                    <div class="content">
                        <h2>${subject}</h2>
                        <p style="color: #4b5563;">Olá,</p>
                        <div class="message-box">
                            ${message.replace(/\n/g, "<br>")}
                        </div>
                    </div>
                    <div class="footer">
                        <p style="margin: 0 0 8px 0;">Este é um e-mail enviado via <strong>FACT FLEXI</strong>.</p>
                        <p style="margin: 0;">© ${currentYear} FACT FLEXI. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    sendSmtpEmail.sender = { name: "FACT FLEXI", email: "anvimaa@gmail.com" };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.replyTo = { email, name };
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
}
const prisma = new PrismaClient();
const auth = pc({
  database: Ut(prisma, {
    provider: "sqlite"
    // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user"
      }
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const callbackURL = `${baseURL}/email-verified`;
      const verificationUrl = `${baseURL}/api/auth/verify-email?token=${token}&callbackURL=${callbackURL}`;
      const message = `Clique no link para verificar seu email: ${verificationUrl}`;
      await sendEmail(user.name, user.email, "Verifique seu email", message);
    }
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    }
  },
  plugins: [],
  trustedOrigins: [
    PUBLIC_BETTER_AUTH_URL,
    "http://localhost:5173"
  ]
});

export { auth as a };
//# sourceMappingURL=auth-ke1JlaCA.js.map
