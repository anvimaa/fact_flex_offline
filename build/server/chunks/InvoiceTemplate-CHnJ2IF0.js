import { aw as attr, an as ensure_array_like, _ as derived } from './index-DPRpZFUH.js';
import { a as calculateTotalItem, f as formatCurrency, q as getTipoLabel } from './utils3-DjmiJAAD.js';
import { D as Download, n as numberToWords, S as Share_2, P as Phone_call } from './numberToWords-DxaVbgC_.js';
import { B as Button } from './button-DjcfiVkK.js';
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as Dropdown_menu_item } from './index6-Co-qiBWu.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import html2canvas from './html2canvas.esm-C_tcw68Z.js';
import { E } from './jspdf.es.min-tD8vcH26.js';
import './qr-code-styling-Cv8cjKyf.js';
import { g as getTaxExemptionReason } from './taxaExceptins-GD_SevWk.js';
import { C as CERTIFICATE_NUMBER } from './constants-DhttDS3t.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { P as Printer } from './printer-Byrp_rev.js';
import { M as Mail } from './mail-B-m3CooH.js';

function InvoiceTemplate($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { factura, tipo = "FACTURA", hash } = $$props;
    let documento = derived(() => getTipoLabel(tipo));
    let totalPorExtenso = derived(() => numberToWords(factura.total));
    let motivoIsento = derived(() => Array.from(new Set(factura.itens.map((i) => i.produto?.motivoIsento).filter(Boolean))).sort());
    function handlePrint() {
      window.print();
    }
    async function handleExportPDF() {
      try {
        const pdf = await generatePDF(".invoice-content");
        pdf.save(`factura-${factura.numero}.pdf`);
      } catch (error) {
        toast.error("Erro ao gerar PDF");
      }
    }
    async function handleEmail() {
      try {
        const pdf = await generatePDF(".invoice-content");
        const pdfBase64 = pdf.output("datauristring").split(",")[1];
        const response = await fetch("/api/invoice/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ factura, pdfBase64 })
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Email enviado com sucesso!");
        } else {
          toast.error(data.message || "Erro ao enviar email");
        }
      } catch (error) {
        console.error("Erro ao enviar email:", error);
        toast.error("Erro ao enviar email");
      }
    }
    async function handleWhatsapp() {
      try {
        const pdf = await generatePDF(".invoice-content");
        pdf.save(`factura-${factura.numero}.pdf`);
        const message = `Olá ${factura.cliente?.nome},

Segue a sua factura ${factura.numero} no valor de ${formatCurrency(factura.total)}.

Atenciosamente,
${factura.empresa?.nome}`;
        window.open(`https://wa.me/${factura.cliente?.telefone}?text=${encodeURIComponent(message)}`, "_blank");
        toast.success("PDF gerado com sucesso! Abrindo WhatsApp...");
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        toast.error("Erro ao gerar PDF");
      }
    }
    async function generatePDF(elementId) {
      try {
        const invoiceElement = document.querySelector(elementId);
        if (!invoiceElement) {
          throw new Error("Erro ao gerar PDF da factura");
        }
        const canvas = await html2canvas(invoiceElement, { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL("image/jpeg", 1);
        const pdf = new E({ orientation: "portrait", unit: "mm", format: "a4" });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = imgProps.height * pdfWidth / imgProps.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        return pdf;
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        throw error;
      }
    }
    $$renderer2.push(`<div class="flex min-h-screen flex-col bg-gray-100 print:bg-white"><div class="sticky top-0 z-10 border-b bg-white print:hidden"><div class="container mx-auto px-4 py-3"><div class="flex items-center justify-between">`);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      onclick: () => window.history.back(),
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "mr-2 h-4 w-4" });
        $$renderer3.push(`<!----> Voltar`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <h2 class="hidden text-lg font-semibold text-gray-900 sm:block">${escape_html(documento())} #${escape_html(factura.numero)}</h2> <div class="flex items-center gap-2">`);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      onclick: handlePrint,
      title: "Imprimir",
      children: ($$renderer3) => {
        Printer($$renderer3, { class: "h-5 w-5" });
        $$renderer3.push(`<!----> Imprimir documento`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      onclick: handleExportPDF,
      title: "Exportar para PDF",
      children: ($$renderer3) => {
        Download($$renderer3, { class: "h-5 w-5" });
        $$renderer3.push(`<!----> Exportar PDF`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (Root) {
      $$renderer2.push("<!--[-->");
      Root($$renderer2, {
        children: ($$renderer3) => {
          if (Trigger) {
            $$renderer3.push("<!--[-->");
            Trigger($$renderer3, {
              children: ($$renderer4) => {
                Button($$renderer4, {
                  variant: "outline",
                  size: "sm",
                  children: ($$renderer5) => {
                    Share_2($$renderer5, { class: "mr-2 h-4 w-4" });
                    $$renderer5.push(`<!----> Partilhar`);
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` `);
          if (Dropdown_menu_content) {
            $$renderer3.push("<!--[-->");
            Dropdown_menu_content($$renderer3, {
              children: ($$renderer4) => {
                if (Dropdown_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Dropdown_menu_item($$renderer4, {
                    onclick: handleEmail,
                    children: ($$renderer5) => {
                      Mail($$renderer5, { class: "mr-2 h-4 w-4" });
                      $$renderer5.push(`<!----> Enviar por Email`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Dropdown_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Dropdown_menu_item($$renderer4, {
                    onclick: handleWhatsapp,
                    children: ($$renderer5) => {
                      Phone_call($$renderer5, { class: "mr-2 h-4 w-4" });
                      $$renderer5.push(`<!----> Enviar por WhatsApp`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div></div></div></div> <main class="flex-grow p-4"><div class="invoice-content mx-auto max-w-4xl bg-white p-8 shadow-lg ring-1 ring-gray-200 print:p-0 print:shadow-none print:ring-0"><header class="flex items-start justify-between border-b pb-8"><div><img${attr("src", factura.empresa?.logo || "https://placehold.co/200x60?text=SUA+LOGO")} alt="Logo da Empresa" class="h-16"/> <div class="mt-4 text-sm text-gray-600"><h1 class="text-lg font-bold text-gray-900">${escape_html(factura.empresa?.nome)}</h1> <p>${escape_html(factura.empresa?.endereco)}</p> <p>NIF: ${escape_html(factura.empresa?.nif)}</p></div></div> <div class="text-right"><h2 class="text-3xl font-bold uppercase text-gray-800">${escape_html(documento())}</h2> <p class="text-md text-gray-500">#${escape_html(factura.numero)}</p> `);
    if (factura.status == "ANULADO") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-600">${escape_html(documento())} anulada</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (factura.status == "RECTIFICADO") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-blue-600">${escape_html(documento())} rectificada</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-1 text-sm">`);
    if (factura.referenciaOriginal) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p><span class="font-semibold text-gray-600">Referência:
									${escape_html(factura.referenciaOriginal)}</span></p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (tipo == "FACTURA_PROFORMA") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-red-600">Este documento não serve de factura.</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <p><span class="font-semibold text-gray-600">Data de Emissão:
								${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("pt", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }))}</span></p></div> <section class="mt-2 gap-8"><div><h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500">Cliente</h3> <div class="mt-2 text-sm text-gray-800"><p class="font-bold">${escape_html(factura.cliente?.nome)}</p> <p>${escape_html(factura.cliente?.endereco)}</p> <p>NIF: ${escape_html(factura.cliente?.nif)}</p> <p>Contacto: ${escape_html(factura.cliente?.telefone)}</p></div></div></section></div></header> <section class="mt-2"><table class="w-full text-sm"><thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left font-semibold uppercase tracking-wider text-gray-600">N/Ord</th><th class="px-4 py-3 text-left font-semibold uppercase tracking-wider text-gray-600">Descrição</th><th class="px-4 py-3 text-right font-semibold uppercase tracking-wider text-gray-600">Qtd.</th><th class="px-4 py-3 text-right font-semibold uppercase tracking-wider text-gray-600">Preço Unit.</th><th class="px-4 py-3 text-right font-semibold uppercase tracking-wider text-gray-600">Taxa/IVA%</th><th class="px-4 py-3 text-right font-semibold uppercase tracking-wider text-gray-600">Desconto%</th><th class="px-4 py-3 text-right font-semibold uppercase tracking-wider text-gray-600">Total</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
    const each_array = ensure_array_like(factura.itens);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      const total = calculateTotalItem(item);
      const count = i + 1;
      $$renderer2.push(`<tr><td class="text-center text-gray-800">${escape_html(count)}</td><td class="text-gray-800">${escape_html(item.produto?.descricao || item.descricao)} <br/> <span class="text-[8pt]">${escape_html(item.codigo)}</span></td><td class="text-center text-gray-600">${escape_html(item.quantidade)}</td><td class="text-center text-gray-600">${escape_html(formatCurrency(item.precoUnitario))}</td><td class="text-center text-gray-600">${escape_html(item.taxa)}% `);
      if (item.produto?.motivoIsento) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<sup>${escape_html(item.produto.motivoIsento)}</sup>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="text-center text-gray-600">${escape_html(item.desconto)}%</td><td class="text-right font-medium text-gray-800">${escape_html(formatCurrency(total))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section> `);
    if (tipo === "FACTURA" || tipo === "FACTURA_RECIBO") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-gray-600 mt-4">Os bens e serviços, foram colocados a disposição do cliente na data e hora da emissão do
						documento.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <section class="mt-8 flex items-start justify-between"><div class="w-2/3 pr-8"><h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500">Observações</h3> <div class="mt-2 text-sm text-gray-600">`);
    if (motivoIsento().length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="font-semibold">Motivos de Isenção de Imposto:</p> <ul class="list-inside list-disc"><!--[-->`);
      const each_array_1 = ensure_array_like(motivoIsento());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let mot = each_array_1[$$index_1];
        $$renderer2.push(`<li>${escape_html(mot)} - ${escape_html(getTaxExemptionReason(mot))}</li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (factura.observacao) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>${escape_html(factura.observacao)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (factura.motivoEmissao) {
      $$renderer2.push("<!--[-->");
      if (factura.tipoDocumento !== "FACTURA" && factura.tipoDocumento !== "FACTURA_RECIBO") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p>${escape_html(documento())} emitido pelo seguinte motivo: <br/>${escape_html(factura.motivoEmissao)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p>${escape_html(documento())} ${escape_html(factura.status.toLowerCase())} pelo seguinte motivo: <br/>${escape_html(factura.motivoEmissao)}</p>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (factura.motivoAnulacao) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>${escape_html(documento())} Anulado pelo seguinte motivo: <br/>${escape_html(factura.motivoAnulacao)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!factura.observacao && !factura.motivoAnulacao && !factura.motivoEmissao) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>Nenhuma observação adicional.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="w-1/3"><div class="space-y-2 text-sm"><span class="text-gray-600">SUMÁRIO</span> <div class="flex justify-between border-t"><span class="text-gray-600">Total ilíquido</span> <span class="font-medium text-gray-800">${escape_html(formatCurrency(factura.subtotal))}</span></div> <div class="flex justify-between border-t"><span class="text-gray-600">Desconto Financeiro</span> <span class="font-medium text-gray-800">${escape_html(formatCurrency(factura.totalDesconto))}</span></div> <div class="flex justify-between border-t"><span class="text-gray-600">Total de impostos(IVA):</span> <span class="font-medium text-gray-800">${escape_html(formatCurrency(factura.totalImpostos))}</span></div> <div class="mt-2 flex justify-between border-t pt-2"><span class="text-base font-bold text-gray-900">Total Geral</span> <span class="text-base font-bold text-gray-900">${escape_html(formatCurrency(factura.total))}</span></div> <div class="mt-2 flex justify-between border-t pt-2"><span class="text-base italic text-gray-900">${escape_html(totalPorExtenso())}</span></div></div></div></section> <footer class="mt-12 border-t pt-4 text-center text-xs text-gray-500"><p>${escape_html(factura.hashDocumento?.slice(0, 4))}-Processado por programa validado nº ${escape_html(CERTIFICATE_NUMBER)} - FACT FLEX</p> <p class="mt-1">${escape_html(factura.empresa?.nome)} - NIF: ${escape_html(factura.empresa?.nif)}</p> <p>Obrigado pela sua preferência!</p></footer></div></main></div>`);
  });
}

export { InvoiceTemplate as I };
//# sourceMappingURL=InvoiceTemplate-CHnJ2IF0.js.map
