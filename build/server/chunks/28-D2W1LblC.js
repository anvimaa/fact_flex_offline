import { f as fail } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { a as auth } from './auth-ke1JlaCA.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { s as superValidate, z as zod, m as message } from './zod-vsheQqNr.js';
import './superForm-Bw4SE-EW.js';
import { o as objectType, s as stringType } from './types-C7xnNV5k.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
import 'node:crypto';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import './private-BNWMvB1R.js';
import './public-B844qK3e.js';
import './api-BO0T-px8.js';
import 'net';
import 'url';
import 'util';
import 'crypto';
import 'buffer';
import 'http';
import 'https';
import 'stream';
import 'zlib';
import 'querystring';
import 'assert';
import './index-64ZZ3C7M.js';
import 'path';
import 'tls';
import 'fs';
import 'events';
import './performance-now-L-NpSMJt.js';
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './events-GtUqDgmb.js';
import './parse-DXcVuhZ4.js';
import './index2-Cz2gv4fD.js';
import './stores-BBk2HDxH.js';
import './index-server-CziyT60N.js';
import './client2-CcJ2Tk7F.js';
import './app-L81mENw7.js';

const empresaSchema = objectType({
  id: stringType().uuid().optional(),
  nome: stringType().min(3).max(255),
  nif: stringType().min(3).max(25),
  endereco: stringType().min(3).max(255),
  email: stringType().email().min(3).max(255),
  pais: stringType().min(3).max(255),
  cidade: stringType().min(3).max(255),
  website: stringType().url().min(3).max(255).optional(),
  telefone: stringType().min(3).max(25),
  logo: stringType().optional()
});
const PEM_PRIVATE_KEY_REGEX = /^-----BEGIN PRIVATE KEY-----[\s\S]+-----END PRIVATE KEY-----\s*$/;
const PEM_PUBLIC_KEY_REGEX = /^-----BEGIN PUBLIC KEY-----[\s\S]+-----END PUBLIC KEY-----\s*$/;
const pemSchema = objectType({
  id: stringType().uuid(),
  privateKeyPem: stringType().optional().refine((v) => !v || PEM_PRIVATE_KEY_REGEX.test(v.trim()), {
    message: "Formato de chave privada inválido. Deve começar com -----BEGIN PRIVATE KEY----- e terminar com -----END PRIVATE KEY-----"
  }).transform((v) => v?.trim() || null),
  publicKeyPem: stringType().optional().refine((v) => !v || PEM_PUBLIC_KEY_REGEX.test(v.trim()), {
    message: "Formato de certificado público inválido. Deve começar com -----BEGIN PUBLIC KEY----- e terminar com -----END PUBLIC KEY-----"
  }).transform((v) => v?.trim() || null)
});
const load = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  const usuario = await db.user.findUnique({
    where: {
      id: session?.user.id
    },
    include: {
      empresa: true
    }
  });
  if (!usuario?.empresaId) {
    throw new Error("Empresa não encontrada");
  }
  const empresa = await db.empresa.findUnique({
    where: {
      id: usuario.empresaId
    },
    include: {
      subscriptions: true
    }
  });
  const usuarios = await db.user.findMany({
    where: {
      empresaId: usuario.empresaId
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true
    }
  });
  const form = await superValidate(empresa, zod(empresaSchema));
  const pemForm = await superValidate(
    {
      id: empresa?.id,
      privateKeyPem: empresa?.privateKeyPem ?? "",
      publicKeyPem: empresa?.publicKeyPem ?? ""
    },
    zod(pemSchema),
    { id: "pem-form" }
  );
  return {
    form,
    pemForm,
    empresa,
    usuarios,
    usuario
  };
};
const actions = {
  update: async ({ request }) => {
    const form = await superValidate(request, zod(empresaSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await db.empresa.update({
        where: {
          id: form.data.id
        },
        data: {
          nome: form.data.nome,
          nif: form.data.nif,
          endereco: form.data.endereco,
          email: form.data.email,
          pais: form.data.pais,
          cidade: form.data.cidade,
          website: form.data.website,
          telefone: form.data.telefone,
          logo: form.data.logo
        }
      });
      return message(form, {
        success: true,
        message: "Empresa atualizada com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      return fail(500, {
        error: "Erro ao atualizar empresa"
      });
    }
  },
  updatePem: async ({ request }) => {
    const form = await superValidate(request, zod(pemSchema), { id: "pem-form" });
    if (!form.valid) {
      return fail(400, { pemForm: form });
    }
    try {
      await db.empresa.update({
        where: { id: form.data.id },
        data: {
          privateKeyPem: form.data.privateKeyPem ?? null,
          publicKeyPem: form.data.publicKeyPem ?? null
        }
      });
      return message(form, {
        success: true,
        message: "Chaves PEM actualizadas com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao actualizar chaves PEM:", error);
      return fail(500, { error: "Erro ao actualizar chaves PEM" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BporVV-5.js')).default;
const server_id = "src/routes/(app)/configuracoes/empresa/+page.server.ts";
const imports = ["_app/immutable/nodes/28.BQ4ucchi.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C05BI6PQ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DcvGvDXv.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/hVYzpWzF.js","_app/immutable/chunks/qMrFgvei.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/28.qkwulX02.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-D2W1LblC.js.map
