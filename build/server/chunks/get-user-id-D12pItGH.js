import './db-BUWqG89e.js';
import { a as auth } from './auth-ke1JlaCA.js';

async function getUserId(request) {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) return null;
  return session.user.id;
}

export { getUserId as g };
//# sourceMappingURL=get-user-id-D12pItGH.js.map
