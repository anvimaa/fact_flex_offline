import { r as redirect } from './index-BWA_9C9m.js';
import './utils-FiC4zhrQ.js';

const actions = {
  default: async ({ cookies }) => {
    cookies.delete("admin_session", { path: "/admin" });
    throw redirect(302, "/admin/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 10;
const server_id = "src/routes/(admin)/admin/logout/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-oDYSgNd_.js.map
