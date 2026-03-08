import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { e as gerarCodigoVenda } from './utils3-DjmiJAAD.js';
import { v as vendaSchema } from './index4-6B8efaf4.js';
import { Z as ZodError } from './types-C7xnNV5k.js';
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
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const POST = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return json({ error: "Usuário não autenticado" }, { status: 401 });
    }
    const body = await request.json();
    const validatedData = vendaSchema.parse(body);
    for (const item of validatedData.itens) {
      const produto = await db.produto.findUnique({
        where: { id: item.produtoId }
      });
      if (!produto) {
        return json({ error: `Produto ${item.produtoId} não encontrado` }, { status: 404 });
      }
      if (produto.quantidade < item.quantidade) {
        return json(
          {
            error: `Estoque insuficiente para ${produto.descricao}. Disponível: ${produto.quantidade}`
          },
          { status: 400 }
        );
      }
    }
    const codigo = gerarCodigoVenda();
    const venda = await db.$transaction(async (tx) => {
      const novaVenda = await tx.venda.create({
        data: {
          codigo,
          clienteId: validatedData.clienteId || null,
          usuarioId,
          empresaId,
          status: validatedData.status,
          total: validatedData.total,
          desconto: validatedData.desconto,
          observacao: validatedData.observacao || null,
          itens: {
            create: validatedData.itens.map((item) => ({
              produtoId: item.produtoId,
              quantidade: item.quantidade,
              precoUnitario: item.precoUnitario,
              desconto: item.descontoPercentual,
              total: item.total
            }))
          }
        },
        include: {
          cliente: true,
          usuario: true,
          itens: {
            include: {
              produto: true
            }
          }
        }
      });
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
            observacao: `Venda: ${codigo}`
          }
        });
      }
      return novaVenda;
    });
    return json({ success: true, venda }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    if (error instanceof ZodError) {
      return json(
        {
          error: "Dados inválidos",
          validationErrors: error.errors
        },
        { status: 400 }
      );
    }
    return json({ error: "Erro ao criar venda" }, { status: 500 });
  }
};
const GET = async ({ request, url }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const currentPage = page > 0 ? page : 1;
    const itemsPerPage = [1, 5, 10, 25, 50, 100].includes(limit) ? limit : 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const status = url.searchParams.get("status");
    const clienteId = url.searchParams.get("clienteId");
    const dataInicio = url.searchParams.get("dataInicio");
    const dataFim = url.searchParams.get("dataFim");
    const where = { empresaId };
    if (status && status !== "todos") {
      where.status = status;
    }
    if (clienteId) {
      where.clienteId = clienteId;
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
    const [vendas, totalVendas] = await Promise.all([
      db.venda.findMany({
        where,
        include: {
          cliente: true,
          usuario: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          itens: {
            include: {
              produto: true
            }
          }
        },
        orderBy: { criadoEm: "desc" },
        skip,
        take: itemsPerPage
      }),
      db.venda.count({ where })
    ]);
    const totalPages = Math.ceil(totalVendas / itemsPerPage);
    return json({
      vendas,
      paginacao: {
        currentPage,
        itemsPerPage,
        totalItems: totalVendas,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    return json({ error: "Erro ao listar vendas" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DQLeGi5C.js.map
