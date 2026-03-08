import { av as head, aB as stringify, _ as derived, an as ensure_array_like } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { H as History } from './history-DbDPS9Da.js';
import { U as User } from './user-D18r-fvg.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const documento = derived(() => data.documento), logs = derived(() => data.logs);
    function getAcaoBadgeVariant(acao) {
      const variants = {
        CRIADO: "default",
        EMITIDO: "default",
        ENVIADO_AGT: "secondary",
        VALIDADO_AGT: "default",
        REJEITADO_AGT: "destructive",
        ANULADO: "destructive",
        RECTIFICADO: "secondary",
        REENVIO_SUCESSO: "default",
        REENVIO_FALHA: "destructive",
        REENVIO_MANUAL_SOLICITADO: "secondary",
        STATUS_ATUALIZADO: "secondary"
      };
      return variants[acao] || "outline";
    }
    function formatarJSON(jsonString) {
      if (!jsonString) return null;
      try {
        return JSON.stringify(JSON.parse(jsonString), null, 2);
      } catch {
        return jsonString;
      }
    }
    head("toi8k2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Logs - ${escape_html(documento().numero)} | FACT FLEXI</title>`);
      });
    });
    $$renderer2.push(`<div class="container mx-auto max-w-5xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
    Button($$renderer2, {
      variant: "ghost",
      size: "sm",
      href: `/documentos/fiscais/${stringify(documento().id)}`,
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "h-4 w-4" });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Logs de Auditoria</h1> <p class="text-muted-foreground">${escape_html(documento().numero)}</p></div></div></div> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                File_text($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Documento`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="grid gap-4 md:grid-cols-3"><div><p class="text-sm text-muted-foreground">Número</p> <p class="font-medium">${escape_html(documento().numero)}</p></div> <div><p class="text-sm text-muted-foreground">Cliente</p> <p class="font-medium">${escape_html(documento().cliente?.nome || "-")}</p></div> <div><p class="text-sm text-muted-foreground">Status Atual</p> `);
            Badge($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(documento().status)}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                History($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Histórico Completo`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(logs().length)}
				${escape_html(logs().length === 1 ? "registro" : "registros")} de auditoria`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-6"><!--[-->`);
            const each_array = ensure_array_like(logs());
            for (let index = 0, $$length = each_array.length; index < $$length; index++) {
              let log = each_array[index];
              $$renderer4.push(`<div class="relative">`);
              if (index < logs().length - 1) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="absolute left-4 top-10 h-full w-0.5 bg-border" style="height: calc(100% + 1.5rem)"></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <div class="relative flex gap-4"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary"><div class="h-2 w-2 rounded-full bg-background"></div></div> <div class="flex-1 space-y-2 pb-6"><div class="flex items-start justify-between gap-4"><div class="flex-1"><div class="flex items-center gap-2">`);
              Badge($$renderer4, {
                variant: getAcaoBadgeVariant(log.acao),
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->${escape_html(log.acao)}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <p class="font-medium">${escape_html(log.descricao)}</p></div></div></div> <div class="flex flex-wrap gap-4 text-sm text-muted-foreground"><div class="flex items-center gap-1">`);
              User($$renderer4, { class: "h-3 w-3" });
              $$renderer4.push(`<!----> <span>${escape_html(log.usuario.name)}</span></div> <div class="flex items-center gap-1">`);
              Calendar($$renderer4, { class: "h-3 w-3" });
              $$renderer4.push(`<!----> <span>${escape_html(new Date(log.createdAt).toLocaleString("pt-AO"))}</span></div> `);
              if (log.ipAddress) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="flex items-center gap-1"><span>IP: ${escape_html(log.ipAddress)}</span></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div> `);
              if (log.dadosAnteriores || log.dadosNovos) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="mt-3 space-y-2">`);
                if (log.dadosAnteriores) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<details class="rounded-lg border bg-muted/50 p-3"><summary class="cursor-pointer text-sm font-medium">Dados Anteriores</summary> <pre class="mt-2 overflow-x-auto text-xs">${escape_html(formatarJSON(log.dadosAnteriores))}</pre></details>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (log.dadosNovos) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<details class="rounded-lg border bg-muted/50 p-3"><summary class="cursor-pointer text-sm font-medium">Dados Novos</summary> <pre class="mt-2 overflow-x-auto text-xs">${escape_html(formatarJSON(log.dadosNovos))}</pre></details>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div></div></div>`);
            }
            $$renderer4.push(`<!--]--> `);
            if (logs().length === 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="py-12 text-center text-muted-foreground">`);
              History($$renderer4, { class: "mx-auto mb-4 h-12 w-12 opacity-50" });
              $$renderer4.push(`<!----> <p>Nenhum log de auditoria disponível</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DRjccsp5.js.map
