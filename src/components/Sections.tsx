import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { site, content, navigation } from "../config/site";
import { ArrowIcon, Button, Photo, WhatsappIcon } from "./UI";
import { buildFamilyWhatsappLink } from "../lib/family-whatsapp";
import { buildJourneyWhatsappLink } from "../lib/journey-whatsapp";

export function Hero() {
  const c = content.hero;
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <Photo
          name="retrato"
          eager
          sizes="(max-width: 860px) 100vw, 52vw"
          alt="Akira Kobayashi de terno azul-marinho e gravata, em fundo escuro, olhando para a câmera"
        />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-area">Advocacia criminal e execução penal</p>
          <h1 id="hero-title">
            <span className="line">{c.title}</span>{" "}
            <span className="line">{c.accent}</span>
          </h1>
          <p className="hero-description">{c.description}</p>
          <div className="hero-actions">
            <Button href={site.whatsapp}>Conversar pelo WhatsApp</Button>
            <a className="quiet-link" href="#familia">
              Tenho um familiar preso
              <ArrowIcon direction="down" />
            </a>
          </div>
          <ul className="hero-facts" aria-label="Sobre o atendimento">
            <li>
              <strong>{site.oab}</strong>
            </li>
            <li>Atendimento sigiloso</li>
            <li>Presencial e a distância</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PracticeAreas() {
  const c = content.journey;
  const phases = c.phases;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const phase = phases[active];
  const penalCount = phases.filter((p) => p.area === "Direito Penal").length;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next = active;
    if (event.key in keys) next = (active + keys[event.key] + phases.length) % phases.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = phases.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="atuacao" className="section journey" aria-labelledby="practice-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="practice-title">{c.title}</h2>
          <div className="section-intro">
            <p>{content.practice.description}</p>
            <p className="muted">{c.description}</p>
          </div>
        </div>

        <div
          className="journey-track"
          style={{ "--active": active, "--count": phases.length } as CSSProperties}
        >
          <div className="journey-areas" aria-hidden="true">
            <span style={{ gridColumn: `1 / span ${penalCount}` }}>Direito Penal</span>
            <span style={{ gridColumn: `${penalCount + 1} / span ${phases.length - penalCount}` }}>
              Execução Penal
            </span>
          </div>
          <div
            className="journey-stops"
            role="tablist"
            aria-label="Fases do caso"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
          >
            <span className="journey-rail" aria-hidden="true">
              <span className="journey-rail-fill" />
            </span>
            {phases.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${p.id}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className="journey-stop"
                data-past={i < active}
                onClick={() => setActive(i)}
              >
                <span className="journey-dot" aria-hidden="true" />
                <span className="journey-stop-name">{p.name}</span>
                <span className="journey-stop-area">{p.area}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="journey-panel"
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${phase.id}`}
          key={phase.id}
        >
          <div className="journey-panel-head">
            <p className="journey-panel-area">{phase.area}</p>
            <h3>{phase.title}</h3>
            <p className="journey-when">{phase.when}</p>
            {"note" in phase && phase.note && (
              <p className="journey-note">
                <span aria-hidden="true" className="note-mark" />
                {phase.note}
              </p>
            )}
          </div>
          <div className="journey-panel-body">
            <p className="list-title">O que o escritório faz nessa fase</p>
            <ul className="journey-list">
              {phase.does.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="text-action"
              href={buildJourneyWhatsappLink(phase.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar sobre esta fase
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Family() {
  const c = content.family;
  const [checked, setChecked] = useState<string[]>([]);
  const link = buildFamilyWhatsappLink(checked);
  const preview = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
  return (
    <section id="familia" className="section family" aria-labelledby="family-title">
      <div className="wrap family-grid">
        <div className="family-copy">
          <h2 id="family-title">
            {c.title} {c.accent}
          </h2>
          <p className="lead">{c.description}</p>
        </div>

        <div className="dossier">
          <fieldset className="dossier-checklist">
            <legend>O que ajuda ter em mãos</legend>
            <p className="dossier-hint">
              Marque o que você já tem. A mensagem abaixo se monta sozinha, e você revisa antes de enviar.
            </p>
            {c.checklist.map((item) => {
              const on = checked.includes(item);
              return (
                <label className="check-row" data-checked={on} key={item}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) =>
                      setChecked(
                        e.target.checked
                          ? c.checklist.filter((v) => v === item || checked.includes(v))
                          : checked.filter((v) => v !== item),
                      )
                    }
                  />
                  <span className="check-box" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </label>
              );
            })}
            <p className="dossier-note">{c.note}</p>
          </fieldset>

          <div className="message-preview" aria-live="polite">
            <p className="list-title">Prévia da mensagem</p>
            <div className="bubble">{preview}</div>
          </div>

          <a className="text-action" href={link} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon />
            Revisar e enviar no WhatsApp
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export function AboutOffice() {
  const c = content.office;
  const steps = content.method.steps;
  return (
    <section id="escritorio" className="section office" aria-labelledby="office-title">
      <div className="wrap office-grid">
        <figure className="office-photo">
          <Photo
            name="advogado"
            sizes="(max-width: 860px) 100vw, 40vw"
            alt="Akira Kobayashi de terno azul, com os braços apoiados, olhando para a câmera"
          />
        </figure>
        <div className="office-copy">
          <h2 id="office-title">{site.name}</h2>
          <p className="office-role">Advogado criminalista</p>
          <p className="lead">{c.description}</p>
          <dl className="credentials">
            <div>
              <dt>Inscrição</dt>
              <dd>{site.oab}</dd>
            </div>
            <div>
              <dt>Formação</dt>
              <dd>Direito, 2011</dd>
            </div>
            <div>
              <dt>Pós-graduação</dt>
              <dd>Direito Público e Direito Tributário</dd>
            </div>
            <div>
              <dt>Tribunais Superiores</dt>
              <dd>Membro sênior da Escola Brasileira de Atuação nos Tribunais Superiores (EBATS)</dd>
            </div>
            <div>
              <dt>OAB Bauru</dt>
              <dd>Presidente da Comissão da Advocacia em Execução Penal, 2025–2027</dd>
            </div>
          </dl>
          <div className="roots">
            <span lang="ja" className="kanji" aria-hidden="true">
              小林
            </span>
            <p>{c.roots}</p>
          </div>
        </div>
      </div>
      <div className="wrap office-method">
        <h3>Como cada caso é conduzido</h3>
        <ol className="steps">
          {steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-number" aria-hidden="true">
                {i + 1}
              </span>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="wrap">
        <blockquote className="office-quote">
          <p>
            {c.quote} {c.quoteAccent}
          </p>
        </blockquote>
      </div>
    </section>
  );
}

export function FAQ() {
  const c = content.faq;
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <h2 id="faq-title">Dúvidas frequentes</h2>
          <p className="muted">Respostas curtas para entender o caminho antes da primeira conversa.</p>
        </div>
        <div className="faq-list">
          {c.items.map((item, i) => (
            <details key={item.question} name="duvidas" open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const c = content.contact;
  return (
    <section id="contato" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div>
          <h2 id="contact-title">Uma conversa sigilosa é o primeiro passo.</h2>
          <p className="lead">{c.description}</p>
        </div>
        <div className="contact-side">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="channel">
            <span className="channel-label">
              <WhatsappIcon /> WhatsApp
            </span>
            <strong>{site.phone}</strong>
            <ArrowIcon />
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="channel">
            <span className="channel-label">Instagram</span>
            <strong>@adv_akira</strong>
            <ArrowIcon />
          </a>
          <p className="urgent">
            <strong>Prisão em flagrante?</strong> Informe essa situação já no primeiro contato.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/#inicio">
              <img
                src="/brand/logo-horizontal-creme.svg"
                alt="Akira Kobayashi Advogados"
                width="200"
                height="47"
                loading="lazy"
              />
            </a>
            <p>Direito Penal e Execução Penal.</p>
            <p>
              {site.name}, {site.oab}
            </p>
            <p>Sociedade Individual de Advocacia, {site.society}</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="footer-title">Navegação</p>
            {navigation.map((link) => (
              <a href={`/${link.href}`} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div>
            <p className="footer-title">Contato</p>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.phone}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram @adv_akira
            </a>
            <a href="/privacidade.html">Privacidade</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{content.legal}</p>
          <span>© 2026 Akira Kobayashi Advogados</span>
        </div>
      </div>
    </footer>
  );
}
