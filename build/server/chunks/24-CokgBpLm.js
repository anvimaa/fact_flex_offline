import { d as db } from './db-BUWqG89e.js';
import { f as fail, e as error } from './index-BWA_9C9m.js';
import { s as superValidate, z as zod, m as message } from './zod-vsheQqNr.js';
import { p as produtoSchema } from './produto-CLH6rfGt.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import '@prisma/client';
import './utils-FiC4zhrQ.js';
import './parse-DXcVuhZ4.js';
import './types-C7xnNV5k.js';
import './auth-ke1JlaCA.js';
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
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const load = async ({ params, request }) => {
  const empresaId = await getEmpresaId(request);
  const produto = await db.produto.findUnique({
    where: { id: params.id },
    include: {
      taxa: true
    }
  });
  if (!produto) {
    throw error(404, "Produto não encontrado");
  }
  const [taxas, categorias, fornecedores] = await Promise.all([
    db.taxa.findMany({ orderBy: { descricao: "asc" } }),
    db.categoria.findMany({
      where: { empresaId },
      orderBy: { nome: "asc" }
    }),
    db.fornecedor.findMany({
      where: { empresaId },
      orderBy: { nome: "asc" }
    })
  ]);
  const form = await superValidate(
    {
      codigo: produto.codigo,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
      precoUnitario: produto.precoUnitario,
      desconto: produto.desconto,
      categoriaId: produto.categoriaId || "",
      fornecedorId: produto.fornecedorId || "",
      tipo: produto.tipo,
      isento: produto.isento,
      motivoIsento: produto.motivoIsento || "",
      taxaId: produto.taxaId || ""
    },
    zod(produtoSchema)
  );
  return serialize({
    produto,
    form,
    taxas,
    categorias,
    fornecedores
  });
};
const actions = {
  update: async ({ request, params }) => {
    const empresaId = await getEmpresaId(request);
    const form = await superValidate(request, zod(produtoSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const existingProduct = await db.produto.findFirst({
        where: {
          empresaId,
          codigo: form.data.codigo,
          id: { not: params.id }
        }
      });
      if (existingProduct) {
        return fail(400, {
          form,
          error: "Já existe um produto com este código"
        });
      }
      await db.produto.update({
        where: { id: params.id },
        data: {
          codigo: form.data.codigo,
          descricao: form.data.descricao,
          quantidade: form.data.quantidade,
          precoUnitario: form.data.precoUnitario,
          desconto: form.data.desconto,
          taxaId: form.data.isento === "on" || !form.data.taxaId ? null : form.data.taxaId,
          fornecedorId: form.data.fornecedorId || null,
          tipo: form.data.tipo,
          isento: form.data.isento,
          motivoIsento: form.data.isento === "on" ? form.data.motivoIsento : "",
          categoriaId: form.data.categoriaId || null
        }
      });
      return message(form, "Produto atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      return fail(500, {
        form,
        error: "Erro ao atualizar produto"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BRzUkCJG.js')).default;
const server_id = "src/routes/(app)/cadastros/produtos/[id]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/24.B3sbOUEk.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C05BI6PQ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DjgbYm18.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/DEny8yli.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/Cgkz4crr.js","_app/immutable/chunks/C3yVhP7I.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/qx7FnEI1.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/iSAE_zK9.js","_app/immutable/chunks/DNjCieoT.js","_app/immutable/chunks/D-VUovDK.js","_app/immutable/chunks/DsuRSs_v.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-CokgBpLm.js.map
