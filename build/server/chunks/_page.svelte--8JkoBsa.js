import { an as ensure_array_like } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer) {
  let invoiceData = {
    company: {
      name: "AMANTENTE SOFT, COMERCIO E SERVICOS LDA",
      location: "Uige",
      phone: "+244 934342795",
      email: "amantentesoftware@gmail.com",
      nif: "5002037188"
    },
    client: {
      name: "CENTRO DE SAÚDE DE REFERÊNCIA NEVES BENDINHA",
      location: "Bairro Nelito, Bairro Popular, Luanda",
      country: "Luanda - Angola"
    },
    invoice: {
      number: "PP 2024/2",
      date: "2024-11-07",
      valid: "2024-11-07",
      items: [
        {
          code: "0002",
          description: "INSTALAÇÃO E IMPLEMENTO DO SISTEMA DE GESTÃO HOSPITALAR SANISSA",
          price: 2e5,
          qty: 1,
          tax: 0,
          discount: 0,
          total: 2e5
        },
        {
          code: "0001",
          description: "LICENÇA - SISTEMA DE GESTÃO HOSPITALAR SANISSA",
          price: 15e4,
          qty: 1,
          tax: 0,
          discount: 0,
          total: 15e4
        }
      ],
      totals: { subtotal: 35e4, discount: 0, total: 35e4 }
    }
  };
  $$renderer.push(`<body class="svelte-18q5blx"><main class="svelte-18q5blx"><div class="invoice svelte-18q5blx"><header class="svelte-18q5blx"><div class="company-info svelte-18q5blx"><h1 class="svelte-18q5blx">${escape_html(invoiceData.company.name)}</h1> <p class="svelte-18q5blx">${escape_html(invoiceData.company.location)}</p> <p class="svelte-18q5blx">T: ${escape_html(invoiceData.company.phone)}</p> <p class="svelte-18q5blx">E: ${escape_html(invoiceData.company.email)}</p> <p class="svelte-18q5blx">Contribuinte: ${escape_html(invoiceData.company.nif)}</p></div> <div class="client-info svelte-18q5blx"><h2 class="svelte-18q5blx">${escape_html(invoiceData.client.name)}</h2> <p class="svelte-18q5blx">${escape_html(invoiceData.client.location)}</p> <p class="svelte-18q5blx">${escape_html(invoiceData.client.country)}</p></div></header> <div class="invoice-details svelte-18q5blx"><div class="original svelte-18q5blx">Original</div> <div class="pre-forma svelte-18q5blx">Pró-forma n.º ${escape_html(invoiceData.invoice.number)}</div> <table class="dates svelte-18q5blx"><tbody><tr><th class="svelte-18q5blx">Data de emissão</th><th class="svelte-18q5blx">Contribuinte</th></tr><tr><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.date)}</td><td class="svelte-18q5blx">${escape_html(invoiceData.company.nif)}</td></tr><tr><th class="svelte-18q5blx">Válida até</th><th class="svelte-18q5blx">V. Ref</th></tr><tr><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.valid)}</td><td class="svelte-18q5blx">524125</td></tr></tbody></table></div> <table class="items svelte-18q5blx"><thead><tr><th class="svelte-18q5blx">Código</th><th class="svelte-18q5blx">Descrição</th><th class="svelte-18q5blx">Preço Un.</th><th class="svelte-18q5blx">Qtd.</th><th class="svelte-18q5blx">Taxa/IVA %</th><th class="svelte-18q5blx">Desc. %</th><th class="svelte-18q5blx">Total líquido</th></tr></thead><tbody><!--[-->`);
  const each_array = ensure_array_like(invoiceData.invoice.items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<tr><td class="svelte-18q5blx">${escape_html(item.code)}</td><td class="svelte-18q5blx">${escape_html(item.description)}</td><td class="svelte-18q5blx">${escape_html(item.price.toFixed(2))} Kz</td><td class="svelte-18q5blx">${escape_html(item.qty)}</td><td class="svelte-18q5blx">${escape_html(item.tax)}%</td><td class="svelte-18q5blx">${escape_html(item.discount)}%</td><td class="svelte-18q5blx">${escape_html(item.total.toFixed(2))} Kz</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table> <div class="summary svelte-18q5blx"><div class="tax-info svelte-18q5blx"><h3 class="svelte-18q5blx">Imposto/IVA</h3> <table class="svelte-18q5blx"><tbody><tr><th class="svelte-18q5blx">Incidência</th><th class="svelte-18q5blx">Valor</th></tr><tr><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.totals.subtotal.toFixed(2))} Kz</td><td class="svelte-18q5blx">0.00 Kz</td></tr></tbody></table> <p class="tax-reason svelte-18q5blx">Motivo de Isenção:</p> <p>M02 - Transmissão de bens e serviço não sujeita</p></div> <div class="totals svelte-18q5blx"><table class="svelte-18q5blx"><tbody><tr><th class="svelte-18q5blx">Sumário</th><td class="svelte-18q5blx"></td></tr><tr><td class="svelte-18q5blx">Total líquido:</td><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.totals.subtotal.toFixed(2))} Kz</td></tr><tr><td class="svelte-18q5blx">Desconto:</td><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.totals.discount.toFixed(2))} Kz</td></tr><tr><td class="svelte-18q5blx">Total:</td><td class="svelte-18q5blx">${escape_html(invoiceData.invoice.totals.total.toFixed(2))} Kz</td></tr></tbody></table></div></div> <footer class="svelte-18q5blx"><p>Este documento não serve de factura</p> <p>Processado por programa validado n.º 1444/AGT/2019 | Factplus</p> <p class="page-number svelte-18q5blx">1 de 1</p></footer></div></main></body>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte--8JkoBsa.js.map
