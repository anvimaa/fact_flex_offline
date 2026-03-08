import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const GET = async ({ url }) => {
  try {
    const empresas = await db.empresa.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return json(empresas);
  } catch (error) {
    return json({ error: "Failed to fetch empresas" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const empresa = await db.empresa.create({
      data: {
        nome: data.nome,
        nif: data.nif,
        endereco: data.endereco,
        email: data.email,
        telefone: data.telefone,
        website: data.website,
        pais: data.pais,
        cidade: data.cidade,
        logo: data.logo
      }
    });
    return json(empresa);
  } catch (error) {
    console.error("Error creating empresa:", error);
    return json({ error: "Failed to create empresa" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-D4bFP_N2.js.map
