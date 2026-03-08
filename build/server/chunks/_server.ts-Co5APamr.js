import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const PUT = async ({ params, request }) => {
  try {
    const { id } = params;
    const data = await request.json();
    const empresa = await db.empresa.update({
      where: { id },
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
    console.error("Error updating empresa:", error);
    return json({ error: "Failed to update empresa" }, { status: 500 });
  }
};
const DELETE = async ({ params }) => {
  try {
    const { id } = params;
    await db.empresa.delete({
      where: { id }
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting empresa:", error);
    return json({ error: "Failed to delete empresa" }, { status: 500 });
  }
};

export { DELETE, PUT };
//# sourceMappingURL=_server.ts-Co5APamr.js.map
