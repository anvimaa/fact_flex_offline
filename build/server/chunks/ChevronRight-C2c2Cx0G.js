import { as as getContext, al as attributes, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function ChevronRight($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getContext("iconCtx") ?? {};
    let {
      size = ctx.size || "24",
      role = ctx.role || "img",
      color = ctx.color || "currentColor",
      title,
      desc,
      ariaLabel = "chevron right",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let ariaDescribedby = `${title?.id || ""} ${desc?.id || ""}`;
    const hasDescription = derived(() => !!(title?.id || desc?.id));
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        ...restProps,
        role,
        width: size,
        height: size,
        fill: color,
        "aria-label": ariaLabel,
        "aria-describedby": hasDescription() ? ariaDescribedby : void 0,
        viewBox: "0 0 15 15"
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (title?.id && title.title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<title${attr("id", title.id)}>${escape_html(title.title)}</title>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (desc?.id && desc.desc) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<desc${attr("id", desc.id)}>${escape_html(desc.desc)}</desc>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"></path></svg>`);
  });
}

export { ChevronRight as C };
//# sourceMappingURL=ChevronRight-C2c2Cx0G.js.map
