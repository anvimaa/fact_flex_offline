import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { a as auth } from './auth-ke1JlaCA.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { s as superValidate, z as zod, m as message } from './zod-vsheQqNr.js';
import './superForm-Bw4SE-EW.js';
import { o as objectType, s as stringType, b as booleanType, e as enumType } from './types-C7xnNV5k.js';
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
import './utils-FiC4zhrQ.js';
import './events-GtUqDgmb.js';
import './parse-DXcVuhZ4.js';
import './index2-Cz2gv4fD.js';
import './stores-BBk2HDxH.js';
import './index-server-CziyT60N.js';
import './client2-CcJ2Tk7F.js';
import './app-L81mENw7.js';

const userSchema = objectType({
  id: stringType().optional(),
  name: stringType().min(1, "Nome é obrigatório"),
  email: stringType().email("Email inválido"),
  role: enumType(["user", "admin"]).default("user"),
  active: booleanType().default(true),
  password: stringType().min(6, "A senha deve ter no mínimo 6 caracteres").optional()
});
const load = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session) {
    throw redirect(302, "/login");
  }
  const empresaId = await getEmpresaId(request);
  if (!empresaId) {
    throw new Error("Empresa não encontrada");
  }
  const currentUser = await db.user.findUnique({
    where: { id: session.user.id }
  });
  if (currentUser?.role !== "admin" && currentUser?.role !== "superroot") ;
  const usuarios = await db.user.findMany({
    where: {
      empresaId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const form = await superValidate(zod(userSchema));
  return {
    usuarios,
    form,
    currentUser: {
      id: currentUser?.id,
      role: currentUser?.role
    }
  };
};
const actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(userSchema));
    console.log("Criando Usuario...");
    if (!form.valid) {
      console.error(form.errors);
      return fail(400, { form });
    }
    if (!form.data.password) {
      console.error("A senha é obrigatória para criar um novo usuário.", form.data.password);
      return fail(400, {
        form,
        error: "A senha é obrigatória para criar um novo usuário."
      });
    }
    try {
      const empresaId = await getEmpresaId(request);
      if (!empresaId) {
        console.error("Empresa não encontrada", empresaId);
        return fail(400, { form, error: "Empresa não encontrada" });
      }
      const result = await auth.api.signUpEmail({
        body: {
          email: form.data.email,
          password: form.data.password,
          name: form.data.name
        }
      });
      if (!result || !result.user) {
        console.error("Erro ao criar conta de usuário. O email pode já estar em uso.", result);
        return fail(400, {
          form,
          message: "Erro ao criar conta de usuário. O email pode já estar em uso."
        });
      }
      await db.user.update({
        where: { id: result.user.id },
        data: {
          role: form.data.role,
          active: form.data.active,
          empresaId,
          emailVerified: true
          // Auto-verificar usuários criados por admin se desejado
        }
      });
      return message(form, {
        success: true,
        message: "Usuário criado com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      const errorMessage = error?.body?.message || error?.message || "Erro ao criar usuário";
      return message(form, {
        success: false,
        message: errorMessage
      }, { status: 500 });
    }
  },
  update: async ({ request }) => {
    const form = await superValidate(request, zod(userSchema));
    if (!form.valid) {
      console.error("Formulário inválido", form.errors);
      return fail(400, { form });
    }
    try {
      const existingUser = await db.user.findUnique({
        where: { id: form.data.id },
        include: { empresa: true }
      });
      if (!existingUser) {
        console.error("Usuário não encontrado", form.data.id);
        return fail(404, { form, error: "Usuário não encontrado" });
      }
      const empresaId = await getEmpresaId(request);
      if (existingUser.empresaId !== empresaId) {
        console.error("Acesso negado", existingUser.empresaId, empresaId);
        return fail(403, { form, error: "Acesso negado" });
      }
      const session = await auth.api.getSession({
        headers: request.headers
      });
      if (session?.user.id === form.data.id && !form.data.active) {
        console.error("Você não pode desativar sua própria conta", session?.user.id, form.data.id);
        return fail(400, { form, error: "Você não pode desativar sua própria conta" });
      }
      await db.user.update({
        where: { id: form.data.id },
        data: {
          name: form.data.name,
          role: form.data.role,
          active: form.data.active
        }
      });
      console.log("Usuário atualizado com sucesso!", form.data);
      return message(form, {
        success: true,
        message: "Usuário atualizado com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return fail(500, {
        form,
        error: "Erro ao atualizar usuário"
      });
    }
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    if (!id) {
      return fail(400, { error: "ID do usuário é obrigatório" });
    }
    try {
      const session = await auth.api.getSession({
        headers: request.headers
      });
      const userToDelete = await db.user.findUnique({
        where: { id },
        include: { empresa: true }
      });
      if (!userToDelete) {
        return fail(404, { error: "Usuário não encontrado" });
      }
      const empresaId = await getEmpresaId(request);
      if (userToDelete.empresaId !== empresaId) {
        return fail(403, { error: "Acesso negado" });
      }
      if (session?.user.id === id) {
        return fail(400, { error: "Você não pode excluir sua própria conta" });
      }
      const hasRelatedData = await db.venda.count({
        where: { usuarioId: id }
      }) > 0;
      if (hasRelatedData) {
        await db.user.update({
          where: { id },
          data: { active: false }
        });
        return {
          success: true,
          message: "Usuário desativado com sucesso (possui registros relacionados)"
        };
      } else {
        await db.user.delete({
          where: { id }
        });
        return {
          success: true,
          message: "Usuário excluído com sucesso!"
        };
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      return fail(500, {
        error: "Erro ao excluir usuário"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BMxE4dTP.js')).default;
const server_id = "src/routes/(app)/configuracoes/usuarios/+page.server.ts";
const imports = ["_app/immutable/nodes/32.CXuJPvfP.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/Cgkz4crr.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/C3yVhP7I.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/D6wW5i9R.js","_app/immutable/chunks/C05BI6PQ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/CwkdR6Eu.js","_app/immutable/chunks/s2C54vnN.js","_app/immutable/chunks/CLXrGED-.js","_app/immutable/chunks/B6NB2YT5.js","_app/immutable/chunks/ByL5rCyh.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/hVYzpWzF.js","_app/immutable/chunks/BxrALxPp.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-BiaOF3VH.js.map
