import { d as db } from './db-BUWqG89e.js';
import { a as auth } from './auth-ke1JlaCA.js';

async function getEmpresaId(request) {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) return "";
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { empresaId: true }
  });
  return user?.empresaId || "";
}

export { getEmpresaId as g };
//# sourceMappingURL=get-empresa-id-B7WuhWrQ.js.map
