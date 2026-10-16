"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Compass,
  Film,
  Globe2,
  GraduationCap,
  Headphones,
  Hotel,
  Menu,
  MessageCircle,
  Mic,
  MoveUpRight,
  Plane,
  Play,
  Plus,
  RotateCcw,
  Route,
  ShoppingBag,
  Sparkles,
  Sun,
  Tv,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  benefits,
  faqs,
  methodSteps,
  modules,
  navLinks,
  painPoints,
  siteConfig,
  testimonials,
  type CourseModule,
} from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  restart: RotateCcw,
  message: MessageCircle,
  headphones: Headphones,
  globe: Globe2,
  compass: Compass,
  route: Route,
  play: Play,
  clock: Clock3,
  film: Film,
  tv: Tv,
  sparkles: Sparkles,
  plane: Plane,
  briefcase: BriefcaseBusiness,
  users: Users,
  sun: Sun,
  book: BookOpen,
  mic: Mic,
  calendar: CalendarDays,
  hotel: Hotel,
  bag: ShoppingBag,
  coffee: Coffee,
  graduation: GraduationCap,
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const Component = icons[name] ?? Compass;
  return (
    <Component aria-hidden="true" className={className} strokeWidth={1.6} />
  );
}

export function Logo() {
  return (
    <span className="brand" aria-label="Jornada do Zero à Fluência">
      <span className="brand-main">
        JORNADA<span className="brand-dot">.</span>
      </span>
      <span className="brand-sub">DO ZERO À FLUÊNCIA</span>
    </span>
  );
}

function CTAButton({
  children = "Quero começar minha jornada",
  href = "#oferta",
  className = "",
  onClick,
}: {
  children?: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={`cta ${className}`}>
      {content}
    </button>
  ) : (
    <a href={href} className={`cta ${className}`}>
      {content}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`section-heading ${light ? "heading-light" : ""} ${align === "center" ? "center" : ""}`}
    >
      <span className="eyebrow">
        <span />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#inicio"
          className="brand-link"
          aria-label="Jornada — início"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <CTAButton className="header-cta">
          Quero começar <ArrowRight size={16} aria-hidden="true" />
        </CTAButton>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        aria-label="Navegação para celular"
        hidden={!open}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
        <a
          href="#oferta"
          className="mobile-nav-cta"
          onClick={() => setOpen(false)}
        >
          Quero começar agora <ArrowRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function CourseArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`course-artwork ${compact ? "compact-artwork" : ""}`}
      aria-label="Composição gráfica da Jornada do Zero à Fluência"
    >
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="course-book">
        <div className="book-top">
          <Logo />
          <span>
            ENGLISH
            <br />
            FOR LIFE.
          </span>
        </div>
        <div className="book-heading">
          Hello,
          <br />
          <span>new world.</span>
        </div>
        <p>
          Novas palavras.
          <br />
          Novas possibilidades.
        </p>
        <svg
          className="journey-line"
          viewBox="0 0 400 205"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-20 170C60 230 52 70 135 115S220 215 261 115 323 30 423 38"
            stroke="#F4C430"
            strokeWidth="2"
            strokeDasharray="6 7"
          />
          <circle cx="134" cy="115" r="7" fill="#F4C430" />
          <circle cx="263" cy="110" r="7" fill="#F4C430" />
          <circle cx="346" cy="36" r="7" fill="#F4C430" />
        </svg>
        <div className="book-bottom">
          <span>DO ZERO À FLUÊNCIA</span>
          <ArrowUpRight size={28} aria-hidden="true" />
        </div>
      </div>
      <div className="floating-tag">
        <span className="tag-icon">
          <MessageCircle size={22} aria-hidden="true" />
        </span>
        <span>
          <strong>Seu inglês, na vida real.</strong>
          <small>Uma conversa de cada vez.</small>
        </span>
      </div>
      <div className="boarding-card">
        <span className="boarding-icon">
          <Plane size={25} aria-hidden="true" />
        </span>
        <div>
          <span>SEU PRÓXIMO DESTINO</span>
          <strong>Um mundo de possibilidades.</strong>
        </div>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <span className="art-caption">
        UMA NOVA JORNADA COMEÇA COM UM PRIMEIRO PASSO.
      </span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero dark-section" id="inicio">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="badge-line" />
            APRENDA INGLÊS DE VERDADE
          </span>
          <h1>
            Do zero à fluência
            <br />
            com{" "}
            <span>
              meu
              <br className="desktop-break" /> acompanhamento.
            </span>
          </h1>
          <p className="hero-description">
            Mais do que aprender inglês.
            <br className="mobile-break" /> Um caminho para descobrir o que você
            é capaz.
          </p>
          <p className="hero-support">
            Aulas organizadas, prática e um caminho claro para desenvolver sua
            confiança na comunicação.
          </p>
          <div className="hero-checks">
            <span>
              <Check />
              Um passo de cada vez
            </span>
            <span>
              <Check />
              No seu ritmo
            </span>
            <span>
              <Check />
              Com acompanhamento
            </span>
          </div>
          <CTAButton />
          <div className="hero-signature">
            <span className="signature-line" />
            <span>
              Uma jornada com <strong>Teacher Murilo</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          {siteConfig.teacherImage ? (
            <Image
              className="teacher-hero"
              src={siteConfig.teacherImage}
              alt="Teacher Murilo, professor da Jornada do Zero à Fluência"
              width={600}
              height={700}
              priority
              unoptimized
            />
          ) : (
            <CourseArtwork />
          )}
        </div>
      </div>
      <div className="container hero-bottom">
        <span>O inglês pode levar você mais longe.</span>
        <a href="#metodo">
          CONHEÇA A JORNADA <ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="hero-edition">APRENDA. PRATIQUE. EVOLUA.</span>
      </div>
    </section>
  );
}

function JourneyStrip() {
  return (
    <div className="journey-strip">
      <div className="container strip-inner">
        {[
          { icon: "route", label: "Um caminho organizado" },
          { icon: "film", label: "Conteúdos que conectam" },
          { icon: "message", label: "Inglês para a vida real" },
          { icon: "users", label: "Acompanhamento na jornada" },
        ].map((item) => (
          <div key={item.label}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PainPointsSection() {
  return (
    <section className="section pain-section">
      <div className="container">
        <div className="split-heading">
          <SectionHeading
            eyebrow="VOCÊ NÃO ESTÁ SOZINHO"
            title={
              <>
                O inglês ainda parece
                <br />
                distante <span className="highlight">de você?</span>
              </>
            }
          />
          <p>
            Às vezes, o que falta não é vontade.
            <br />É ter um caminho que faça sentido.
          </p>
        </div>
        <div className="pain-grid">
          {painPoints.map((point, i) => (
            <article className="pain-card" key={point.title}>
              <span className="pain-number">0{i + 1}</span>
              <Icon name={point.icon} />
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
        <p className="section-footnote">
          <span className="small-gold-line" />
          Se você se identificou, existe uma maneira mais organizada de começar
          a evoluir.
        </p>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="section dark-section method-section" id="metodo">
      <div className="container">
        <div className="split-heading">
          <SectionHeading
            light
            eyebrow="O MÉTODO JORNADA"
            title={
              <>
                Não é sobre decorar.
                <br />É sobre{" "}
                <span className="gold">construir o seu inglês.</span>
              </>
            }
          />
          <p>
            Conteúdos organizados, prática e acompanhamento.
            <br />
            Uma combinação para você sair do ponto de partida.
          </p>
        </div>
        <div className="method-grid">
          {methodSteps.map((step) => (
            <article className="method-card" key={step.number}>
              <div className="method-card-top">
                <Icon name={step.icon} />
                <span>{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="method-footer">
          <span>
            Seu primeiro passo não precisa ser perfeito.{" "}
            <strong>Só precisa acontecer.</strong>
          </span>
          <a className="text-link gold" href="#conteudo">
            Explore os conteúdos <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ModuleCover({ module }: { module: CourseModule }) {
  return (
    <div className={`module-cover cover-${module.theme}`} aria-hidden="true">
      {module.image ? (
        <Image
          src={module.image}
          alt=""
          fill
          sizes="(max-width: 520px) 90vw, (max-width: 900px) 45vw, 280px"
        />
      ) : (
        <>
          <span className="cover-brand">
            JORNADA<span> / ENGLISH COLLECTION</span>
          </span>
          <div className="cover-decoration">
            <Icon name={module.icon} />
          </div>
          <div className="cover-type">
            {module.title === "Filmes" ? (
              <>
                <span>Movie</span>
                <em>night.</em>
              </>
            ) : module.title === "Séries" ? (
              <>
                <span>One more</span>
                <em>episode.</em>
              </>
            ) : module.theme === "travel" ? (
              <>
                <span>Next</span>
                <em>destination.</em>
              </>
            ) : module.theme === "conversation" ? (
              <>
                <span>Let’s</span>
                <em>talk.</em>
              </>
            ) : module.theme === "foundation" ? (
              <>
                <span>Your first</span>
                <em>hello.</em>
              </>
            ) : module.theme === "audio" ? (
              <>
                <span>Listen.</span>
                <em>Discover.</em>
              </>
            ) : module.theme === "suits" ? (
              <>
                <span>Make</span>
                <em>your move.</em>
              </>
            ) : (
              <>
                <span>Learn.</span>
                <em>Have fun.</em>
              </>
            )}
          </div>
          <span className="cover-caption">
            {module.caption}
            <ArrowUpRight size={14} />
          </span>
        </>
      )}
    </div>
  );
}

function CurriculumSection() {
  const [filter, setFilter] = useState("Todos");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<CourseModule | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const categories = ["Todos", "Fundamentos", "Entretenimento", "Vida real"];
  const filtered =
    filter === "Todos"
      ? modules
      : modules.filter((module) => module.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, 8);
  function showModule(module: CourseModule) {
    setSelected(module);
    dialog.current?.showModal();
  }
  return (
    <section className="section curriculum-section" id="conteudo">
      <div className="container">
        <div className="split-heading">
          <SectionHeading
            eyebrow="SEU INGLÊS GANHA NOVOS CAPÍTULOS"
            title={
              <>
                Aprender pode ser
                <br />
                <span className="serif-emphasis">muito mais interessante.</span>
              </>
            }
          />
          <p>
            Do primeiro “hello” à próxima viagem.
            <br />
            Explore o inglês nas coisas que fazem parte da sua vida.
          </p>
        </div>
        <div className="curriculum-toolbar">
          <div
            className="filter-group"
            role="group"
            aria-label="Filtrar conteúdos"
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                aria-pressed={filter === category}
                className={filter === category ? "filter active" : "filter"}
                onClick={() => {
                  setFilter(category);
                  setExpanded(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="module-count" aria-live="polite">
            {filtered.length} conteúdos para explorar
          </span>
        </div>
        <div className="curriculum-grid" id="module-grid">
          {visible.map((module) => (
            <button
              className="module-card"
              type="button"
              key={module.title}
              onClick={() => showModule(module)}
              aria-label={`Conhecer ${module.title}`}
            >
              <ModuleCover module={module} />
              <span className="module-card-meta">
                <span>
                  <small>{module.category}</small>
                  <strong>{module.title}</strong>
                </span>
                <span className="module-arrow">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </span>
            </button>
          ))}
        </div>
        {filtered.length > 8 && (
          <div className="curriculum-expand">
            <button
              type="button"
              className="outline-button"
              aria-expanded={expanded}
              aria-controls="module-grid"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Mostrar menos conteúdos"
                : `Ver todos os ${filtered.length} conteúdos`}
              <ChevronDown
                size={17}
                aria-hidden="true"
                className={expanded ? "rotate" : ""}
              />
            </button>
            <p>Uma jornada. Muitas formas de aprender.</p>
          </div>
        )}
        <div className="platform-note">
          <span className="platform-note-icon">
            <BookOpen size={26} aria-hidden="true" />
          </span>
          <div>
            <h3>Seu próximo capítulo, em um só lugar.</h3>
            <p>
              Explore a proposta da plataforma de aulas na página oficial do
              curso.
            </p>
          </div>
          <a
            href={siteConfig.officialPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Conhecer o curso <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="content-dialog"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        aria-labelledby="module-dialog-title"
      >
        <button
          type="button"
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Fechar detalhes do módulo"
        >
          <X />
        </button>
        {selected && (
          <>
            <span className="eyebrow">{selected.category}</span>
            <h2 id="module-dialog-title">{selected.title}</h2>
            <p>
              Conteúdo identificado na página original da Jornada do Zero à
              Fluência.
            </p>
            {selected.title === "Acompanhamento Vitalício Comigo" && (
              <p className="pending-note">
                Este é o nome do módulo na referência. Formato, frequência e
                condições do acompanhamento precisam de confirmação.
              </p>
            )}
            {selected.title === "Inglês em 10 dias" && (
              <p className="pending-note">
                Este é o título do conteúdo original, e não uma promessa de
                fluência em dez dias.
              </p>
            )}
            <p>
              Confira a programação detalhada e as condições de acesso com o
              Teacher Murilo antes da inscrição.
            </p>
            <CTAButton
              onClick={() => {
                dialog.current?.close();
                document.getElementById("oferta")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "auto"
                    : "smooth",
                });
              }}
            >
              Conhecer a oferta
            </CTAButton>
          </>
        )}
      </dialog>
    </section>
  );
}

function MentorshipSection() {
  return (
    <section
      className="section dark-section mentorship-section"
      id="acompanhamento"
    >
      <div className="container mentorship-grid">
        <div className="mentorship-visual">
          {siteConfig.teacherImage ? (
            <Image
              src={siteConfig.teacherImage}
              alt="Teacher Murilo, professor de inglês"
              width={550}
              height={600}
              className="teacher-portrait"
              unoptimized
            />
          ) : (
            <div className="mentor-art">
              <span className="mentor-art-label">TEACHER MURILO / JORNADA</span>
              <span className="mentor-quote-mark" aria-hidden="true">
                <MessageCircle size={32} strokeWidth={1.2} />
              </span>
              <div className="mentor-art-quote">
                O próximo
                <br />
                <span>hello</span> pode
                <br />
                abrir uma
                <br />
                nova porta.
              </div>
              <div className="mentor-art-signature">
                Teacher Murilo<span>JORNADA DO ZERO À FLUÊNCIA</span>
              </div>
              <MessageCircle
                className="mentor-outline"
                strokeWidth={0.5}
                aria-hidden="true"
              />
            </div>
          )}
          <div className="mentor-caption">
            <span className="mentor-caption-icon">
              <Users size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Aprender é uma jornada.</strong>
              <span>Ter uma direção faz diferença.</span>
            </div>
          </div>
        </div>
        <div className="mentorship-copy">
          <SectionHeading
            light
            eyebrow="ACOMPANHAMENTO QUE FAZ PARTE"
            title={
              <>
                Você não precisa
                <br />
                aprender inglês{" "}
                <span className="gold serif-emphasis">sozinho.</span>
              </>
            }
            description="Além das aulas, conheça a proposta de acompanhamento do Teacher Murilo durante sua jornada."
          />
          <div className="mentor-benefits">
            <div>
              <span>01</span>
              <div>
                <h3>Uma direção para seus estudos</h3>
                <p>
                  Conheça como o professor orienta o percurso de aprendizagem.
                </p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Espaço para suas dúvidas</h3>
                <p>
                  Consulte o canal e o formato de suporte disponíveis na sua
                  inscrição.
                </p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Incentivo para continuar</h3>
                <p>Prática, conteúdo e acompanhamento na mesma proposta.</p>
              </div>
            </div>
          </div>
          <CTAButton>Quero aprender com acompanhamento</CTAButton>
          <p className="mentorship-terms">
            Formato, frequência e condições do acompanhamento sujeitos à
            confirmação na oferta oficial.
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section benefits-section">
      <div className="container">
        <SectionHeading
          eyebrow="O APRENDIZADO VAI ALÉM"
          title={
            <>
              Muito mais do que
              <br />
              <span className="serif-emphasis">aulas de inglês.</span>
            </>
          }
          description="Conteúdos e recursos apresentados na oferta original para acompanhar sua evolução."
          align="center"
        />
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <span className="benefit-icon">
                <Icon name={benefit.icon} />
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="depoimentos">
      <div className="container">
        <div className="testimonials-layout">
          <SectionHeading
            eyebrow="HISTÓRIAS DE QUEM APRENDE"
            title={
              <>
                Cada jornada tem
                <br />
                <span className="serif-emphasis">uma história.</span>
              </>
            }
            description="Quem começou essa jornada tem histórias para contar."
          />
          {testimonials.length ? (
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="testimonial-card">
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption>{testimonial.name}</figcaption>
                  {testimonial.image && (
                    <Image
                      src={testimonial.image}
                      alt={`Depoimento de ${testimonial.name}`}
                      width={400}
                      height={300}
                      unoptimized
                    />
                  )}
                  {testimonial.videoUrl && (
                    <a
                      href={testimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Assistir ao depoimento{" "}
                      <span className="sr-only">
                        de {testimonial.name} (abre em nova aba)
                      </span>
                    </a>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="testimonials-pending">
              <span className="testimonial-symbol" aria-hidden="true">
                “
              </span>
              <div>
                <h3>Espaço para histórias reais.</h3>
                <p>
                  Os depoimentos originais serão apresentados aqui após o
                  recebimento dos materiais e a autorização de uso.
                </p>
                <span className="status-label">CONTEÚDO PENDENTE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  const dialog = useRef<HTMLDialogElement>(null);
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(siteConfig.price);
  return (
    <section className="section offer-section" id="oferta">
      <div className="container offer-grid">
        <div className="offer-copy">
          <SectionHeading
            eyebrow="O SEU PRÓXIMO PASSO"
            title={
              <>
                Um novo idioma.
                <br />
                Novas possibilidades.
                <br />
                <span className="serif-emphasis">A sua jornada.</span>
              </>
            }
            description="Comece sua Jornada do Zero à Fluência e encontre um caminho mais organizado para aprender, praticar e evoluir."
          />
          <div className="offer-summary">
            <div>
              <Check />
              <span>Conteúdo do curso em uma proposta organizada</span>
            </div>
            <div>
              <Check />
              <span>Inglês com filmes, séries e situações reais</span>
            </div>
            <div>
              <Check />
              <span>Conteúdos de conversação e viagem</span>
            </div>
            <div>
              <Check />
              <span>Acompanhamento previsto na oferta</span>
            </div>
          </div>
          <div className="offer-copy-note">
            <Compass size={29} aria-hidden="true" />
            <p>
              O primeiro passo para ir mais longe
              <br />
              <strong>pode começar com um “hello”.</strong>
            </p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-label">
            <span>SUA PRÓXIMA JORNADA</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </div>
          <Logo />
          <h3>
            Do zero à fluência.
            <br />
            Com Teacher Murilo.
          </h3>
          <div className="offer-price-block">
            {siteConfig.previousPrice !== null && siteConfig.priceConfirmed && (
              <del>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(siteConfig.previousPrice)}
              </del>
            )}
            <span className="price-intro">
              {siteConfig.priceConfirmed
                ? "INVESTIMENTO"
                : "VALOR DE REFERÊNCIA"}
            </span>
            <div className="offer-price">
              <span>R$</span>
              <strong>{price.replace("R$", "").trim().split(",")[0]}</strong>
              <span>,{price.split(",")[1]}</span>
            </div>
            <p>
              {siteConfig.priceConfirmed
                ? "Confira as condições no checkout oficial."
                : "Valor apresentado na página original. Sujeito à confirmação."}
            </p>
          </div>
          {siteConfig.checkoutUrl ? (
            <CTAButton href={siteConfig.checkoutUrl}>
              Quero garantir minha vaga
            </CTAButton>
          ) : (
            <CTAButton onClick={() => dialog.current?.showModal()}>
              Quero garantir minha vaga
            </CTAButton>
          )}
          <div className="checkout-status">
            <span className="status-dot" />
            {siteConfig.checkoutUrl
              ? "Você será direcionado ao checkout oficial."
              : "Checkout oficial pendente de configuração"}
          </div>
          <div className="offer-card-bottom">
            <span>Antes de se inscrever</span>
            <p>
              Confira o prazo de acesso, o acompanhamento, as formas de
              pagamento e a garantia na oferta oficial.
            </p>
            {siteConfig.guarantee && <p>{siteConfig.guarantee}</p>}
            {siteConfig.accessDuration && <p>{siteConfig.accessDuration}</p>}
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="content-dialog checkout-dialog"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        aria-labelledby="checkout-dialog-title"
      >
        <button
          type="button"
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Fechar aviso de inscrição"
        >
          <X />
        </button>
        <span className="dialog-compass">
          <Compass size={32} aria-hidden="true" />
        </span>
        <span className="eyebrow">SUA JORNADA ESTÁ POR COMEÇAR</span>
        <h2 id="checkout-dialog-title">O checkout ainda não foi conectado.</h2>
        <p>
          Esta é a versão de redesign da página. O link oficial de pagamento e
          as condições comerciais precisam ser confirmados antes de habilitar a
          compra.
        </p>
        <a
          className="cta"
          href={siteConfig.officialPageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar a página oficial{" "}
          <ArrowUpRight size={19} aria-hidden="true" />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <button
          className="dialog-back"
          type="button"
          onClick={() => dialog.current?.close()}
        >
          Continuar explorando
        </button>
      </dialog>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section faq-section" id="duvidas">
      <div className="container faq-grid">
        <div>
          <SectionHeading
            eyebrow="VAMOS DEIXAR TUDO CLARO"
            title={
              <>
                Ainda tem
                <br />
                alguma <span className="serif-emphasis">dúvida?</span>
              </>
            }
            description="O primeiro passo fica mais leve quando você sabe o que esperar."
          />
          <span className="faq-decoration" aria-hidden="true">
            ?
          </span>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span className="faq-number">0{index + 1}</span>
                <h3>{faq.question}</h3>
                <Plus className="faq-plus" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta dark-section">
      <div className="container">
        <span className="eyebrow">
          TODO DESTINO COMEÇA COM UM PRIMEIRO PASSO
        </span>
        <h2>
          Sua jornada com o inglês
          <br />
          pode começar <span className="gold serif-emphasis">agora.</span>
        </h2>
        <p>
          Aprenda, pratique e descubra novas possibilidades.
          <br />
          Um passo de cada vez, com uma direção para seguir.
        </p>
        <CTAButton>Quero começar agora</CTAButton>
        <div className="final-route" aria-hidden="true">
          <span />
          <span />
          <Plane size={25} />
          <span />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a
            className="brand-link"
            href="#inicio"
            aria-label="Jornada — voltar ao início"
          >
            <Logo />
          </a>
          <p>
            Um novo idioma.
            <br />
            Um mundo de possibilidades.
          </p>
          <a href="#inicio" className="footer-top-link">
            VOLTAR AO TOPO <MoveUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.courseName}. Teacher
            Murilo.
          </span>
          <div>
            {siteConfig.privacyUrl && (
              <a href={siteConfig.privacyUrl}>Privacidade</a>
            )}
            {siteConfig.termsUrl && (
              <a href={siteConfig.termsUrl}>Termos de uso</a>
            )}
            {siteConfig.contactUrl && (
              <a href={siteConfig.contactUrl}>Contato</a>
            )}
            <a
              href={siteConfig.officialPageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Página oficial <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <a href="#principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="principal">
        <HeroSection />
        <JourneyStrip />
        <PainPointsSection />
        <MethodSection />
        <CurriculumSection />
        <MentorshipSection />
        <BenefitsSection />
        <TestimonialsSection />
        <OfferSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
