import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, z as zod } from './zod-vsheQqNr.js';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { d as db } from './db-BUWqG89e.js';
import { o as objectType, s as stringType } from './types-C7xnNV5k.js';
import './utils-FiC4zhrQ.js';
import './parse-DXcVuhZ4.js';
import '@prisma/client';

const UPLOAD_DIR = "static/uploads/logos";
const empresaSchema = objectType({
  id: stringType().optional(),
  nome: stringType().min(1, "Nome é obrigatório"),
  nif: stringType().min(9, "NIF inválido").max(9, "NIF inválido"),
  endereco: stringType().min(1, "Endereço é obrigatório"),
  email: stringType().email("Email inválido").optional(),
  telefone: stringType().optional(),
  website: stringType().url("Website inválido").optional(),
  pais: stringType().optional(),
  cidade: stringType().optional(),
  logo: stringType().optional(),
  codigoRecomendacaoAplicado: stringType().optional()
});
async function handleFileUpload(file) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    await mkdir(UPLOAD_DIR, { recursive: true });
    const filepath = join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);
    return `/uploads/logos/${filename}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}
const load = async () => {
  const empresas = await db.empresa.findMany({
    include: {
      _count: {
        select: {
          users: true,
          clientes: true,
          facturas: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const form = await superValidate(zod(empresaSchema));
  return {
    empresas,
    form
  };
};
const actions = {
  create: async ({ request }) => {
    console.log("Create");
    const formData = await request.formData();
    const form = await superValidate(formData, zod(empresaSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const existingEmpresa = await db.empresa.findUnique({
        where: { nif: form.data.nif }
      });
      if (existingEmpresa) {
        return fail(400, {
          form,
          success: false,
          message: "Já existe uma empresa com este NIF"
        });
      }
      const logoFile = formData.get("logoFile");
      let logoPath = form.data.logo;
      if (logoFile && logoFile.size > 0) {
        logoPath = await handleFileUpload(logoFile);
      }
      let parceiroId = null;
      if (form.data.codigoRecomendacaoAplicado) {
        const parceiro = await db.parceiro.findUnique({
          where: { codigoRecomendacao: form.data.codigoRecomendacaoAplicado }
        });
        if (parceiro && parceiro.ativo) {
          parceiroId = parceiro.id;
        } else {
          return fail(400, {
            form,
            success: false,
            message: "Código de parceiro inválido ou parceiro inativo"
          });
        }
      }
      await db.empresa.create({
        data: {
          nome: form.data.nome,
          nif: form.data.nif,
          endereco: form.data.endereco,
          email: form.data.email || null,
          telefone: form.data.telefone || null,
          website: form.data.website || null,
          pais: form.data.pais || null,
          cidade: form.data.cidade || null,
          logo: logoPath || null,
          parceiroId,
          codigoRecomendacaoAplicado: form.data.codigoRecomendacaoAplicado || null
        }
      });
      return {
        form,
        success: true,
        message: "Empresa criada com sucesso!"
      };
    } catch (error) {
      console.error("Error creating empresa:", error);
      return fail(500, {
        form,
        success: false,
        message: "Erro ao criar empresa"
      });
    }
  },
  update: async ({ request }) => {
    console.log("Update");
    const formData = await request.formData();
    const form = await superValidate(formData, zod(empresaSchema));
    if (!form.valid || !form.data.id) {
      return fail(400, { form });
    }
    try {
      const existingEmpresa = await db.empresa.findUnique({
        where: { nif: form.data.nif }
      });
      if (existingEmpresa && existingEmpresa.id !== form.data.id) {
        return fail(400, {
          form,
          success: false,
          message: "Já existe uma empresa com este NIF"
        });
      }
      const logoFile = formData.get("logoFile");
      let logoPath = form.data.logo;
      if (logoFile && logoFile.size > 0) {
        logoPath = await handleFileUpload(logoFile);
      }
      let parceiroId = existingEmpresa?.parceiroId || null;
      if (form.data.codigoRecomendacaoAplicado && form.data.codigoRecomendacaoAplicado !== existingEmpresa?.codigoRecomendacaoAplicado) {
        const parceiro = await db.parceiro.findUnique({
          where: { codigoRecomendacao: form.data.codigoRecomendacaoAplicado }
        });
        if (parceiro && parceiro.ativo) {
          parceiroId = parceiro.id;
        } else if (form.data.codigoRecomendacaoAplicado) {
          return fail(400, {
            form,
            success: false,
            message: "Código de parceiro inválido ou parceiro inativo"
          });
        }
      } else if (!form.data.codigoRecomendacaoAplicado) {
        parceiroId = null;
      }
      await db.empresa.update({
        where: { id: form.data.id },
        data: {
          nome: form.data.nome,
          nif: form.data.nif,
          endereco: form.data.endereco,
          email: form.data.email || null,
          telefone: form.data.telefone || null,
          website: form.data.website || null,
          pais: form.data.pais || null,
          cidade: form.data.cidade || null,
          logo: logoPath || null,
          parceiroId,
          codigoRecomendacaoAplicado: form.data.codigoRecomendacaoAplicado || null
        }
      });
      return {
        form,
        success: true,
        message: "Empresa atualizada com sucesso!"
      };
    } catch (error) {
      console.error("Error updating empresa:", error);
      return fail(500, {
        form,
        success: false,
        message: "Erro ao atualizar empresa"
      });
    }
  },
  delete: async ({ request }) => {
    console.log("Delete");
    const data = await request.formData();
    const id = data.get("id")?.toString();
    if (!id) {
      return fail(400, {
        success: false,
        message: "ID da empresa é obrigatório"
      });
    }
    try {
      await db.empresa.delete({
        where: { id }
      });
      return {
        success: true,
        message: "Empresa removida com sucesso!"
      };
    } catch (error) {
      console.error("Error deleting empresa:", error);
      return fail(500, {
        success: false,
        message: "Erro ao remover empresa"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DVYqDHy6.js')).default;
const server_id = "src/routes/(admin)/admin/empresas/+page.server.ts";
const imports = ["_app/immutable/nodes/7.HNoXezZ5.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/BVGJP2_Y.js","_app/immutable/chunks/C3L2ZEEU.js","_app/immutable/chunks/dSyDDdoo.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-uxK3r3bN.js.map
