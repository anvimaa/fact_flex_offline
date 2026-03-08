import { av as head } from './index-DPRpZFUH.js';
import { I as InvoiceTemplate } from './InvoiceTemplate-CHnJ2IF0.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils3-DjmiJAAD.js';
import './public-B844qK3e.js';
import './numberToWords-DxaVbgC_.js';
import './button-DjcfiVkK.js';
import './index-r8oPdwp5.js';
import './index6-Co-qiBWu.js';
import './use-id-BeJs9ypc.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './attrs-mduo83PF.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './index2-Cz2gv4fD.js';
import './html2canvas.esm-C_tcw68Z.js';
import './jspdf.es.min-tD8vcH26.js';
import './_commonjsHelpers-BFTU3MAI.js';
import 'module';
import './qr-code-styling-Cv8cjKyf.js';
import './taxaExceptins-GD_SevWk.js';
import './constants-DhttDS3t.js';
import './arrow-left-B04jSFwd.js';
import './printer-Byrp_rev.js';
import './mail-B-m3CooH.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("8jx63z", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>FACT FLEXI | ${escape_html(data.factura.tipoDocumento)} #${escape_html(data.factura.numero)}</title>`);
      });
    });
    InvoiceTemplate($$renderer2, {
      factura: data.factura,
      hash: data.hash,
      tipo: data.factura.tipoDocumento
    });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BdUWprmW.js.map
