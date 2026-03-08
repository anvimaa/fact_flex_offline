import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const GET = async () => {
  try {
    const parceiros = await db.parceiro.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { empresas: true, comissoes: true }
        }
      }
    });
    return json(parceiros);
  } catch (error) {
    console.error("Erro ao buscar parceiros:", error);
    return json({ error: "Erro interno ao buscar parceiros" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { nome, email, telefone, codigoRecomendacao, percentagemComissao } = data;
    const parceiro = await db.parceiro.create({
      data: {
        nome,
        email,
        telefone,
        codigoRecomendacao,
        percentagemComissao: percentagemComissao || 10,
        ativo: true
      }
    });
    return json(parceiro);
  } catch (error) {
    console.error("Erro ao criar parceiro:", error);
    return json({ error: "Erro interno ao criar parceiro" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DMfAnnvp.js.map
