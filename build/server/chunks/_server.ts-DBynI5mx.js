import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { Z as ZodError, o as objectType, s as stringType, n as numberType, e as enumType } from './types-C7xnNV5k.js';
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

const movimentoSchema = objectType({
  produtoId: stringType().min(1, "Produto é obrigatório"),
  tipo: enumType(["ENTRADA", "SAIDA"], { required_error: "Tipo é obrigatório" }),
  quantidade: numberType().min(0.01, "Quantidade deve ser maior que 0"),
  motivo: stringType().optional(),
  observacao: stringType().optional()
});
const POST = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return json({ error: "Usuário não autenticado" }, { status: 401 });
    }
    const body = await request.json();
    const validatedData = movimentoSchema.parse(body);
    const produto = await db.produto.findFirst({
      where: {
        id: validatedData.produtoId,
        empresaId
      }
    });
    if (!produto) {
      return json({ error: "Produto não encontrado" }, { status: 404 });
    }
    if (validatedData.tipo === "SAIDA" && produto.quantidade < validatedData.quantidade) {
      return json(
        {
          error: `Estoque insuficiente. Disponível: ${produto.quantidade}`
        },
        { status: 400 }
      );
    }
    const movimento = await db.$transaction(async (tx) => {
      const novoMovimento = await tx.movimentoEstoque.create({
        data: {
          produtoId: validatedData.produtoId,
          empresaId,
          usuarioId,
          tipo: validatedData.tipo,
          quantidade: validatedData.quantidade,
          motivo: validatedData.motivo || null,
          observacao: validatedData.observacao || null
        },
        include: {
          produto: true,
          usuario: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      const novaQuantidade = validatedData.tipo === "ENTRADA" ? produto.quantidade + validatedData.quantidade : produto.quantidade - validatedData.quantidade;
      await tx.produto.update({
        where: { id: validatedData.produtoId },
        data: { quantidade: novaQuantidade }
      });
      return novoMovimento;
    });
    return json({ success: true, movimento }, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar movimento:", error);
    if (error instanceof ZodError) {
      return json(
        {
          error: "Dados inválidos",
          validationErrors: error.errors
        },
        { status: 400 }
      );
    }
    return json({ error: "Erro ao registrar movimento" }, { status: 500 });
  }
};
const GET = async ({ request, url }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const currentPage = page > 0 ? page : 1;
    const itemsPerPage = [10, 20, 50, 100].includes(limit) ? limit : 20;
    const skip = (currentPage - 1) * itemsPerPage;
    const produtoId = url.searchParams.get("produtoId");
    const tipo = url.searchParams.get("tipo");
    const dataInicio = url.searchParams.get("dataInicio");
    const dataFim = url.searchParams.get("dataFim");
    const where = { empresaId };
    if (produtoId) {
      where.produtoId = produtoId;
    }
    if (tipo && (tipo === "ENTRADA" || tipo === "SAIDA")) {
      where.tipo = tipo;
    }
    if (dataInicio || dataFim) {
      where.criadoEm = {};
      if (dataInicio) {
        where.criadoEm.gte = new Date(dataInicio);
      }
      if (dataFim) {
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);
        where.criadoEm.lte = fim;
      }
    }
    const [movimentos, totalMovimentos] = await Promise.all([
      db.movimentoEstoque.findMany({
        where,
        include: {
          produto: true,
          usuario: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { criadoEm: "desc" },
        skip,
        take: itemsPerPage
      }),
      db.movimentoEstoque.count({ where })
    ]);
    const totalPages = Math.ceil(totalMovimentos / itemsPerPage);
    return json({
      movimentos,
      paginacao: {
        currentPage,
        itemsPerPage,
        totalItems: totalMovimentos,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    console.error("Erro ao listar movimentos:", error);
    return json({ error: "Erro ao listar movimentos" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DBynI5mx.js.map
