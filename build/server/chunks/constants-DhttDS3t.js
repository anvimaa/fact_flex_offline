const CERTIFICATE_NUMBER = "FE/183/AGT/2026";
const servicos = [
  {
    titulo: "Faturação Eletrônica",
    descricao: "Emissão de faturas eletrônicas em conformidade com a legislação vigente. Sistema integrado com validação automática de dados fiscais, numeração sequencial e armazenamento seguro em nuvem.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>`
  },
  {
    titulo: "Gestão de Documentos",
    descricao: "Sistema completo de gestão documental com organização inteligente, busca avançada e categorização automática. Mantenha todos os seus documentos fiscais organizados e acessíveis com backup automático.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>`
  },
  {
    titulo: "Integração ERP",
    descricao: "Conecte facilmente com seu sistema ERP existente através de nossa API robusta. Sincronização automática de dados, importação de catálogos e exportação de relatórios em tempo real.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>`
  }
];
const faqs = [
  {
    pergunta: "Como começar a usar o sistema?",
    resposta: "Basta se cadastrar e começar seu período de teste gratuito de 14 dias. Nossa equipe oferece suporte completo durante a implementação.",
    aberto: false
  },
  {
    pergunta: "O sistema é certificado?",
    resposta: "Sim, nosso sistema atende todas as normas fiscais vigentes e possui certificação digital conforme exigido pela legislação.",
    aberto: false
  },
  {
    pergunta: "Como funciona o suporte técnico?",
    resposta: "Oferecemos suporte por email, chat e telefone em horário comercial. Planos empresariais contam com suporte 24/7.",
    aberto: false
  },
  {
    pergunta: "É possível integrar com meu sistema atual?",
    resposta: "Sim, disponibilizamos API REST completa e conectores para os principais sistemas ERP do mercado.",
    aberto: false
  }
];
const motivosNC = [
  // --- Devolução de Mercadorias ---
  {
    value: "DEVOLUCAO_POR_DEFEITO",
    label: "Devolução de mercadoria por defeito ou avaria"
  },
  {
    value: "DEVOLUCAO_NAO_CONFORMIDADE",
    label: "Devolução por não conformidade com a encomenda"
  },
  {
    value: "DEVOLUCAO_DANOS_TRANSPORTE",
    label: "Mercadoria danificada durante o transporte"
  },
  // --- Erros de Facturação (Rectificação) ---
  {
    value: "ERRO_QUANTIDADE_FACTURADA",
    label: "Erro na quantidade (faturada a mais)"
  },
  {
    value: "ERRO_PRECO_UNITARIO",
    label: "Erro no preço unitário aplicado"
  },
  {
    value: "ERRO_TAXA_IMPOSTO",
    label: "Erro na aplicação da taxa de imposto (IVA)"
  },
  {
    value: "ERRO_DADOS_CLIENTE",
    label: "Anulação por erro nos dados de identificação do cliente"
  },
  {
    value: "DUPLICACAO_DOCUMENTO",
    label: "Anulação por duplicação de documento"
  },
  // --- Ajustes Comerciais e Financeiros ---
  {
    value: "DESCONTO_CONCEDIDO_POSTERIOR",
    label: "Desconto comercial concedido após a emissão da factura"
  },
  {
    value: "BONUS_OU_RAPPEL",
    label: "Atribuição de bónus ou rappel por volume de vendas"
  },
  {
    value: "ANULACAO_MUTUO_ACORDO",
    label: "Anulação da operação por mútuo acordo entre as partes"
  },
  // --- Outros (Exige descrição detalhada) ---
  {
    value: "OUTROS_MOTIVOS_LEGAIS",
    label: "Outros motivos legalmente previstos"
  }
];
const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Para começar",
    description: "Ideal para freelancers e pequenos negócios.",
    price: 7500,
    priceAnnual: 6e3,
    color: "emerald",
    badge: null,
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
    features: [
      { text: "Até 100 facturas/mês", included: true, highlight: false },
      { text: "1 Utilizador", included: true, highlight: false },
      { text: "Emissão de Factura Electrónica", included: true, highlight: true },
      { text: "Suporte por email", included: true, highlight: false },
      { text: "Relatórios básicos", included: true, highlight: false },
      { text: "Backup automático", included: true, highlight: false },
      { text: "Exportação SAF-T (AGT)", included: false, highlight: false },
      { text: "Acesso móvel", included: false, highlight: false },
      { text: "API Access", included: false, highlight: false }
    ],
    cta: "Começar Agora"
  },
  {
    id: "professional",
    name: "Profissional",
    tagline: "O mais escolhido",
    description: "Para empresas em crescimento.",
    price: 15e3,
    priceAnnual: 12e3,
    color: "blue",
    badge: "Mais Popular",
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>`,
    features: [
      { text: "Até 1000 facturas/mês", included: true, highlight: true },
      { text: "Até 5 utilizadores", included: true, highlight: false },
      { text: "Emissão de Factura Electrónica", included: true, highlight: true },
      { text: "Exportação SAF-T (AGT)", included: true, highlight: false },
      { text: "Suporte prioritário 24h", included: true, highlight: true },
      { text: "Relatórios avançados", included: true, highlight: false },
      { text: "Backup em tempo real", included: true, highlight: false },
      { text: "App móvel completa", included: false, highlight: true },
      { text: "API Access completo", included: false, highlight: false }
    ],
    cta: "Começar Agora"
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Para negócios exigentes",
    description: "Para empresas com alto volume de facturação.",
    price: 3e4,
    priceAnnual: 24e3,
    color: "orange",
    badge: null,
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>`,
    features: [
      { text: "Faturas ilimitadas", included: true, highlight: true },
      { text: "Até 10 utilizadores", included: true, highlight: false },
      { text: "Emissão de Factura Electrónica", included: true, highlight: true },
      { text: "Exportação SAF-T (AGT)", included: true, highlight: false },
      { text: "Suporte prioritário 24h", included: true, highlight: true },
      { text: "Relatórios avançados", included: true, highlight: false },
      { text: "Backup em tempo real", included: true, highlight: false },
      { text: "App móvel completa", included: true, highlight: true },
      { text: "API Access completo", included: true, highlight: false }
    ],
    cta: "Começar Agora"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Poder sem limites",
    description: "Solução completa para grandes empresas.",
    price: 0,
    priceAnnual: 0,
    color: "purple",
    badge: "Premium",
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" /></svg>`,
    features: [
      { text: "Tudo do Profissional", included: true, highlight: true },
      { text: "Utilizadores ilimitados", included: true, highlight: false },
      { text: "Suporte 24/7 dedicado", included: true, highlight: true },
      { text: "SLA garantido 99.9%", included: true, highlight: false },
      { text: "Ambiente dedicado", included: true, highlight: false },
      { text: "Formação da equipa", included: true, highlight: true },
      { text: "Gestor de conta", included: true, highlight: false },
      { text: "Auditoria de segurança", included: true, highlight: false }
    ],
    cta: "Falar com Vendas"
  }
];

export { CERTIFICATE_NUMBER as C, faqs as f, motivosNC as m, plans as p, servicos as s };
//# sourceMappingURL=constants-DhttDS3t.js.map
