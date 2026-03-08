import { e as error } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { Z as ZodError, o as objectType, n as numberType, h as arrayType, s as stringType } from './types-C7xnNV5k.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
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
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const vendaSchema = objectType({
  clienteId: stringType().min(1, "Cliente é obrigatório"),
  metodoPagamento: stringType().min(1, "Método de pagamento é obrigatório"),
  observacoes: stringType().optional(),
  itens: arrayType(
    objectType({
      produtoId: stringType().min(1, "Produto é obrigatório"),
      quantidade: numberType().min(1, "Quantidade deve ser maior que 0"),
      precoUnitario: numberType().min(0, "Preço unitário deve ser maior ou igual a 0"),
      desconto: numberType().min(0, "Desconto deve ser maior ou igual a 0").default(0),
      descontoPercentual: numberType().min(0).max(100).default(0),
      taxaPercentual: numberType().min(0).default(0),
      taxaValor: numberType().min(0).default(0),
      total: numberType().min(0, "Total deve ser maior ou igual a 0")
    })
  ).min(1, "Venda deve ter pelo menos um item"),
  subtotal: numberType().min(0),
  totalDesconto: numberType().min(0).default(0),
  totalTaxa: numberType().min(0).default(0),
  total: numberType().min(0)
});
const load = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const [clientes, produtos] = await Promise.all([
      db.cliente.findMany({
        orderBy: { nome: "asc" },
        where: { empresaId }
      }),
      db.produto.findMany({
        where: { quantidade: { gt: 0 }, empresaId },
        include: {
          taxa: true
          // Incluir taxa para cálculos
        },
        orderBy: { descricao: "asc" }
      })
    ]);
    return {
      clientes,
      produtos: produtos.map((p) => ({
        ...p,
        precoUnitario: p.precoUnitario.toNumber(),
        desconto: p.desconto.toNumber(),
        taxa: p.taxa ? { ...p.taxa, valor: p.taxa.valor.toNumber() } : null
      }))
    };
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
    throw error(500, "Erro ao carregar dados necessários");
  }
};
function gerarCodigoVenda() {
  const agora = /* @__PURE__ */ new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = String(agora.getFullYear()).slice(-2);
  const numeroSequencial = String(agora.getTime() % 1e6).padStart(6, "0");
  const codigoVenda = `VE-${dia}-${mes}-${ano}-${numeroSequencial}`;
  return codigoVenda;
}
const actions = {
  // Ação para cadastro rápido de cliente
  cadastrarCliente: async ({ request }) => {
    const empresaId = await getEmpresaId(request);
    const data = await request.formData();
    const clienteData = {
      nome: data.get("nome")?.toString() || "",
      telefone: data.get("telefone")?.toString() || "",
      email: data.get("email")?.toString() || "",
      nif: data.get("nif")?.toString() || "",
      endereco: data.get("endereco")?.toString() || ""
    };
    try {
      const cliente = await db.cliente.create({
        data: { ...clienteData, empresaId }
      });
      return { success: true, cliente };
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      return { success: false, error: "Erro ao cadastrar cliente" };
    }
  },
  // Ação para salvar venda (rascunho ou finalizada)
  salvarVenda: async ({ request }) => {
    const data = await request.formData();
    const vendaData = JSON.parse(data.get("venda")?.toString() || "{}");
    const finalizar = data.get("finalizar") === "true";
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return { success: false, error: "Usuário não autenticado" };
    }
    try {
      const validatedData = vendaSchema.parse(vendaData);
      const codigoVenda = gerarCodigoVenda();
      const venda = await db.$transaction(async (tx) => {
        const novaVenda = await tx.venda.create({
          data: {
            codigo: codigoVenda,
            clienteId: validatedData.clienteId,
            empresaId,
            usuarioId,
            status: finalizar ? "FINALIZADA" : "RASCUNHO",
            total: validatedData.total,
            desconto: validatedData.totalDesconto || 0,
            observacao: validatedData.observacoes,
            itens: {
              create: validatedData.itens.map((item) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                desconto: item.descontoPercentual,
                // Salvar percentual, não valor absoluto
                total: item.total
              }))
            }
          }
        });
        if (finalizar) {
          for (const item of validatedData.itens) {
            await tx.produto.update({
              where: { id: item.produtoId },
              data: {
                quantidade: {
                  decrement: item.quantidade
                }
              }
            });
            await tx.movimentoEstoque.create({
              data: {
                empresaId,
                produtoId: item.produtoId,
                usuarioId,
                tipo: "SAIDA",
                quantidade: item.quantidade,
                motivo: "VENDA",
                observacao: `Venda: ${codigoVenda}`
              }
            });
          }
        }
        return novaVenda;
      });
      return { success: true, venda };
    } catch (err) {
      console.error("Erro ao salvar venda:", err);
      if (err instanceof ZodError) {
        return { success: false, error: "Dados da venda inválidos", validationErrors: err.errors };
      }
      return { success: false, error: "Erro ao salvar venda" };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 60;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CieVb0M6.js')).default;
const server_id = "src/routes/(app)/venda/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/60.M80negRe.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/BMqQavlV.js","_app/immutable/chunks/DEny8yli.js","_app/immutable/chunks/ByL5rCyh.js","_app/immutable/chunks/Cf6qd43C.js","_app/immutable/chunks/C3L2ZEEU.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=60-CytGjRLy.js.map
