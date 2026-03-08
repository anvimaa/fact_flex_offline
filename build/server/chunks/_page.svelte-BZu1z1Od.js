import { av as head } from './index-DPRpZFUH.js';
import { D as Documento_fiscal_form } from './documento-fiscal-form-BrsjJij2.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './escaping-CqgfEcN3.js';
import './index-server-CziyT60N.js';
import './button-DjcfiVkK.js';
import './utils3-DjmiJAAD.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';
import './card-ChfkAej9.js';
import './card-title-DxB_j2nk.js';
import './card-description-BQA4H5z9.js';
import './card-footer-DiKIAxQs.js';
import './input-XVWEGj5m.js';
import './label-DVXSUDZH.js';
import './use-id-BeJs9ypc.js';
import './textarea-BSIF_PfD.js';
import './separator-DYGMnC9J.js';
import './attrs-mduo83PF.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './combobox-BTJ3pIs7.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';
import './check-cM-2r8Wr.js';
import './index8-VEsRSQHH.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './arrow-right-DEHhXJ9q.js';
import './trash-2-HZQLO-FJ.js';
import './user-D18r-fvg.js';
import './file-text-BeaU1KrO.js';
import './shopping-cart-DlXvsSgE.js';
import './arrow-left-B04jSFwd.js';
import './dialog-description-B25dU-Nc.js';
import './dialog-description2-CD_E6-6J.js';
import './search-BCOKC9CO.js';
import './loader-circle-DcjdY4IS.js';
import './index2-Cz2gv4fD.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    head("pgr24d", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Facturas | FACT FLEXI</title>`);
      });
    });
    Documento_fiscal_form($$renderer2, {
      clientes: data.clientes,
      produtos: data.produtos,
      serie: data.serie,
      tipoDocumento: "FACTURA",
      titulo: "Nova Factura",
      descricao: "Emissão de Factura Comercial (FT)",
      loading: false,
      onCancel: () => goto()
    });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BZu1z1Od.js.map
