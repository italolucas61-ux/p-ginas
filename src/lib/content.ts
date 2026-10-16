/** Commercial values are references from the supplied brief, not contractual confirmation. */
export const siteConfig = {
  courseName: "Jornada do Zero à Fluência",
  officialPageUrl: "https://www.teachermurilo.com/zerofluency",
  teacherName: "Teacher Murilo",
  price: 297,
  priceConfirmed: false,
  previousPrice: null as number | null,
  checkoutUrl: null as string | null,
  siteUrl: null as string | null,
  teacherImage: null as string | null,
  guarantee: null as string | null,
  accessDuration: null as string | null,
  mentorshipTerms: null as string | null,
  paymentTerms: null as string | null,
  platformCompatibility: null as string | null,
  privacyUrl: null as string | null,
  termsUrl: null as string | null,
  contactUrl: null as string | null,
};

export const navLinks = [
  { label: "O método", href: "#metodo" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Acompanhamento", href: "#acompanhamento" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const painPoints = [
  {
    icon: "restart",
    title: "Sempre recomeçando?",
    text: "Já tentou aprender inglês, mas acabou desistindo no caminho?",
  },
  {
    icon: "message",
    title: "Na hora de falar, trava?",
    text: "Você entende algumas palavras, mas não consegue se expressar?",
  },
  {
    icon: "headphones",
    title: "A conversa fica para trás?",
    text: "Parece que todo mundo fala rápido demais para acompanhar?",
  },
  {
    icon: "globe",
    title: "Seu mundo tem limites?",
    text: "O inglês acaba ficando entre você e novas oportunidades?",
  },
  {
    icon: "compass",
    title: "Sem saber por onde ir?",
    text: "Com tanta informação, falta um caminho claro para começar?",
  },
] as const;

export const methodSteps = [
  {
    number: "01",
    icon: "route",
    title: "Um caminho, desde o zero",
    text: "Conteúdos organizados para construir uma base e avançar, um passo de cada vez.",
  },
  {
    number: "02",
    icon: "play",
    title: "Inglês que faz parte da vida",
    text: "Filmes, séries, conversas e situações reais aproximam o idioma do seu dia a dia.",
  },
  {
    number: "03",
    icon: "message",
    title: "Acompanhamento na jornada",
    text: "O apoio do professor faz parte da proposta. Conheça as condições do acompanhamento na oferta.",
  },
  {
    number: "04",
    icon: "clock",
    title: "O seu ritmo também conta",
    text: "Organize seus estudos de acordo com sua rotina e mantenha o inglês por perto.",
  },
] as const;

export type CourseModule = {
  title: string;
  category: "Fundamentos" | "Entretenimento" | "Vida real";
  theme: string;
  icon: string;
  caption: string;
  image?: string;
};
export const modules: CourseModule[] = [
  {
    title: "Do zero à fluência",
    category: "Fundamentos",
    theme: "foundation",
    icon: "route",
    caption: "O SEU PONTO DE PARTIDA",
  },
  {
    title: "Conversação",
    category: "Fundamentos",
    theme: "conversation",
    icon: "message",
    caption: "LET’S TALK",
  },
  {
    title: "Filmes",
    category: "Entretenimento",
    theme: "movies",
    icon: "film",
    caption: "LIGHTS. CAMERA. ENGLISH.",
  },
  {
    title: "Séries",
    category: "Entretenimento",
    theme: "series",
    icon: "tv",
    caption: "SÓ MAIS UM EPISÓDIO",
  },
  {
    title: "Desenhos",
    category: "Entretenimento",
    theme: "cartoons",
    icon: "sparkles",
    caption: "APRENDER TAMBÉM É SE DIVERTIR",
  },
  {
    title: "Inglês para viagem",
    category: "Vida real",
    theme: "travel",
    icon: "plane",
    caption: "NEXT STOP: THE WORLD",
  },
  {
    title: "Podcasts e Audiobooks",
    category: "Entretenimento",
    theme: "audio",
    icon: "headphones",
    caption: "DÊ OUVIDOS AO SEU INGLÊS",
  },
  {
    title: "Inglês com Suits",
    category: "Entretenimento",
    theme: "suits",
    icon: "briefcase",
    caption: "INGLÊS EM CENA",
  },
  {
    title: "Acompanhamento Vitalício Comigo",
    category: "Fundamentos",
    theme: "conversation",
    icon: "users",
    caption: "NOME DO MÓDULO NA REFERÊNCIA",
  },
  {
    title: "Inglês com O Rei Leão",
    category: "Entretenimento",
    theme: "cartoons",
    icon: "sun",
    caption: "HISTÓRIAS QUE ENSINAM",
  },
  {
    title: "Inglês com The Chosen",
    category: "Entretenimento",
    theme: "foundation",
    icon: "film",
    caption: "APRENDA COM HISTÓRIAS",
  },
  {
    title: "Inglês com a Bíblia",
    category: "Entretenimento",
    theme: "audio",
    icon: "book",
    caption: "LEITURA E APRENDIZADO",
  },
  {
    title: "Inglês com Avengers",
    category: "Entretenimento",
    theme: "movies",
    icon: "sparkles",
    caption: "INGLÊS EM AÇÃO",
  },
  {
    title: "Discursos",
    category: "Vida real",
    theme: "suits",
    icon: "mic",
    caption: "PALAVRAS QUE CONECTAM",
  },
  {
    title: "Inglês em 10 dias",
    category: "Fundamentos",
    theme: "foundation",
    icon: "calendar",
    caption: "TÍTULO DO CONTEÚDO ORIGINAL",
  },
  {
    title: "Inglês com Shrek",
    category: "Entretenimento",
    theme: "cartoons",
    icon: "film",
    caption: "DIVERSÃO EM OUTRO IDIOMA",
  },
  {
    title: "Inglês no aeroporto",
    category: "Vida real",
    theme: "travel",
    icon: "plane",
    caption: "READY FOR TAKEOFF",
  },
  {
    title: "Inglês no hotel",
    category: "Vida real",
    theme: "series",
    icon: "hotel",
    caption: "WELCOME TO YOUR NEXT STOP",
  },
  {
    title: "Inglês nas compras",
    category: "Vida real",
    theme: "conversation",
    icon: "bag",
    caption: "HOW MUCH IS IT?",
  },
  {
    title: "Inglês no restaurante",
    category: "Vida real",
    theme: "audio",
    icon: "coffee",
    caption: "A TABLE FOR TWO, PLEASE",
  },
  {
    title: "Inglês na estrada",
    category: "Vida real",
    theme: "travel",
    icon: "compass",
    caption: "ENJOY THE JOURNEY",
  },
];

export const benefits = [
  {
    icon: "book",
    title: "Materiais em PDF",
    text: "Conteúdo para acompanhar as aulas e retomar o que você aprendeu.",
  },
  {
    icon: "headphones",
    title: "Inglês além da aula",
    text: "Podcasts, audiobooks e conteúdos para trazer o idioma para sua rotina.",
  },
  {
    icon: "plane",
    title: "Mais mundo para explorar",
    text: "Inglês para situações de viagem: do aeroporto ao restaurante.",
  },
  {
    icon: "graduation",
    title: "Certificado de conclusão",
    text: "Previsto na oferta original. Consulte os critérios de emissão antes da inscrição.",
  },
] as const;

export type Testimonial = {
  name: string;
  quote: string;
  image?: string;
  videoUrl?: string;
};
/** Only add authorized, authentic material. Empty entries are never rendered as social proof. */
export const testimonials: Testimonial[] = [];

export const faqs = [
  {
    question: "O curso é indicado para quem está começando do zero?",
    answer:
      "Sim. A proposta da Jornada do Zero à Fluência inclui um percurso desde os fundamentos, com conteúdos organizados para desenvolver o inglês progressivamente. O aprendizado depende de prática e dedicação; não há promessa de fluência em um prazo específico.",
  },
  {
    question: "Como funciona o acompanhamento?",
    answer:
      siteConfig.mentorshipTerms ??
      "O acompanhamento faz parte da proposta apresentada na página original. O canal, a frequência, o formato e as condições ainda precisam ser confirmados pelo Teacher Murilo. O nome “Acompanhamento Vitalício Comigo” foi preservado no catálogo, mas não substitui a confirmação dos termos da oferta.",
  },
  {
    question: "Por quanto tempo terei acesso ao conteúdo?",
    answer:
      siteConfig.accessDuration ??
      "O prazo de acesso ainda está pendente de confirmação. Antes de concluir sua inscrição, confira essa condição na oferta e no checkout oficial.",
  },
  {
    question: "Posso estudar pelo celular?",
    answer:
      siteConfig.platformCompatibility ??
      "Esta página funciona em celulares, tablets e computadores. A compatibilidade e os requisitos da plataforma de aulas ainda precisam ser confirmados; consulte essas informações antes de se inscrever.",
  },
  {
    question: "Preciso estudar quantas horas por dia?",
    answer:
      "Não há uma carga diária confirmada nos materiais fornecidos. Uma rotina possível de manter e a prática frequente ajudam a dar continuidade aos estudos. A orientação específica de estudo deve ser consultada com o professor.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      siteConfig.paymentTerms ??
      "As formas de pagamento e as condições de parcelamento serão as disponibilizadas no checkout oficial. O link ainda está pendente, e o valor de R$ 297,00 é uma referência da página enviada, sujeito à confirmação.",
  },
  {
    question: "Existe garantia?",
    answer:
      siteConfig.guarantee ??
      "O prazo e as condições de garantia ainda não foram informados. Confira os termos oficiais antes de realizar a compra. Esta página não apresenta uma garantia não confirmada.",
  },
];
