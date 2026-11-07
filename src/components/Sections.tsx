import { useState } from "react";
import { site, content, navigation } from "../config/site";
import { Reveal } from "./Reveal";
import { BrandSignature } from "./BrandSignature";
import { Button, Photo, SectionTitle } from "./UI";
import { buildFamilyWhatsappLink } from "../lib/family-whatsapp";
export function Hero() {
  const c = content.hero;
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <img
        className="hero-symbol"
        src="/brand/simbolo-k.svg"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{c.label}</p>
          <h1 id="hero-title">
            <span className="hero-title-row">
              <span className="hero-title-fragment">{c.title}</span>
            </span>
            <strong className="hero-title-row">
              <span className="hero-title-fragment">{c.accent}</span>
            </strong>
          </h1>
          <p className="hero-description">{c.description}</p>
          <div className="hero-actions">
            <Button href={site.whatsapp}>Falar com o escritório</Button>
            <a className="text-link" href="#familia">
              Tenho um familiar preso <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-meta">
            <span>{site.oab}</span>
            <span>Atendimento sigiloso</span>
            <span>Presencial e a distância</span>
          </div>
        </div>
        <div className="hero-image">
          <Photo
            name="hero"
            alt="Akira Kobayashi de terno marinho, com as mãos apoiadas no encosto de um sofá de couro"
          />
          <div className="photo-caption">
            <span>Akira Chiarelli Kobayashi</span>
            <span>Advogado</span>
          </div>
        </div>
      </div>
      <div className="values-band">
        <div className="wrap">
          <span className="band-label">Raízes firmes. Presença constante.</span>
          <div>
            {content.values.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { PracticeExplorer as PracticeAreas } from "./PracticeExplorer";
export function Family() {
  const c = content.family;
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <section
      id="familia"
      className="section family"
      aria-labelledby="family-title"
    >
      <div className="wrap family-grid">
        <Reveal className="family-visual">
          <Photo
            name="familia"
            alt="Akira Kobayashi sentado no sofá, com caderno e caneta nas mãos, olhando para o lado"
          />
          <p className="visual-caption">
            <span aria-hidden="true">01 —</span> Escuta, antes de tudo.
          </p>
        </Reveal>
        <Reveal className="family-copy">
          <SectionTitle {...c} id="family-title" />
          <p className="body-copy">{c.description}</p>
          <fieldset className="family-checklist">
            <legend>O que ajuda ter em mãos</legend>
            <p className="checklist-hint">
              Marque o que você já tem. Só para sua organização.
            </p>
            {c.checklist.map((item, i) => (
              <label
                className={`check-row ${checked.includes(item) ? "checked" : ""}`}
                key={item}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={(e) =>
                    setChecked(
                      e.target.checked
                        ? [...checked, item]
                        : checked.filter((v) => v !== item),
                    )
                  }
                />
                <span className="check-number" aria-hidden="true">
                  {checked.includes(item) ? "✓" : `0${i + 1}`}
                </span>
                <span>{item}</span>
              </label>
            ))}
            <div className="checklist-end">
              <p>{c.note}</p>
              <span aria-live="polite">{checked.length}/4</span>
            </div>
          </fieldset>
          <Button
            href={site.whatsapp}
            light
            onClick={(event) => {
              event.currentTarget.href = buildFamilyWhatsappLink(checked);
            }}
          >
            Falar com o escritório
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
export { MethodJourney as Method } from "./MethodJourney";
export function AboutOffice() {
  const c = content.office;
  return (
    <section
      id="escritorio"
      className="section office"
      aria-labelledby="office-title"
    >
      <div className="wrap office-grid">
        <Reveal className="office-visual">
          <Photo
            name="escritorio"
            alt="Akira Kobayashi sentado, com o celular nas mãos, olhando para a câmera"
          />
          <p className="visual-caption">
            Akira Chiarelli Kobayashi <span>{site.oab}</span>
          </p>
        </Reveal>
        <Reveal className="office-copy">
          <SectionTitle {...c} id="office-title" />
          <p className="body-copy">{c.description}</p>
          <div className="roots">
            <span lang="ja" className="kanji">
              小林
            </span>
            <div>
              <p className="eyebrow">Raízes que orientam</p>
              <p>{c.roots}</p>
            </div>
          </div>
          <blockquote>
            {c.quote} <strong>{c.quoteAccent}</strong>
          </blockquote>
          <p className="signature">
            {site.name}
            <span>Advogado · {site.oab}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
export function FAQ() {
  const c = content.faq;
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <Reveal className="faq-heading">
          <SectionTitle {...c} id="faq-title" />
          <p>Respostas para começar a compreender o caminho.</p>
          <img
            className="faq-monogram"
            src="/brand/simbolo-k.svg"
            alt=""
            aria-hidden="true"
            width="180"
            height="180"
          />
        </Reveal>
        <Reveal className="faq-list">
          {c.items.map((item, i) => (
            <details key={item.question} name="duvidas" open={i === 0}>
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <span>{item.question}</span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
export function Contact() {
  const c = content.contact;
  return (
    <section
      id="contato"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <img
        src="/brand/simbolo-k.svg"
        className="contact-symbol"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap contact-grid">
        <Reveal>
          <SectionTitle {...c} id="contact-title" />
          <p className="contact-description">{c.description}</p>
          <Button href={site.whatsapp}>Conversar pelo WhatsApp</Button>
        </Reveal>
        <Reveal className="contact-channels">
          <BrandSignature />
          <p className="eyebrow">Canais diretos do escritório</p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="channel"
          >
            <span>WhatsApp</span>
            <strong>{site.phone}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="channel"
          >
            <span>Instagram</span>
            <strong>@adv_akira</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="confidential">
            <span aria-hidden="true">◇</span> Atendimento sob sigilo
            profissional.
          </p>
          <p className="contact-note">
            Prisão em flagrante? Informe essa situação já no primeiro contato.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <>
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
                {site.name} · {site.oab}
              </p>
              <p>Sociedade Individual de Advocacia · {site.society}</p>
            </div>
            <div>
              <p className="eyebrow">Navegação</p>
              {navigation.map((link) => (
                <a href={`/${link.href}`} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <p className="eyebrow">Contato</p>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.phone} ↗
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram @adv_akira ↗
              </a>
              <a href="/privacidade.html">Privacidade</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{content.legal}</p>
            <a href="/#inicio">Voltar ao início ↑</a>
            <span>© 2026 Akira Kobayashi Advogados</span>
          </div>
        </div>
      </footer>
      <div className="mobile-contact">
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
