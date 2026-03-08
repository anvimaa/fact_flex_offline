import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<div class="container mx-auto max-w-4xl px-4 py-8"><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"><div class="mb-6"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Confirmar Exclusão</h2> <p class="mt-4 text-gray-600 dark:text-gray-400">Tem certeza que deseja excluir o cliente <span class="font-semibold">${escape_html(data.cliente.nome)}</span>?
                Esta ação não pode ser desfeita.</p></div> <div class="flex justify-end space-x-4"><a href="/cadastros/clientes" class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cancelar</a> <form method="POST" class="inline"><button type="submit" class="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">Excluir Cliente</button></form></div></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CGt03JO1.js.map
