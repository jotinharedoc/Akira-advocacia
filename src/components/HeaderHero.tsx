import { useEffect, useRef, useState } from "react";
import { navigation, site } from "../config/site";
import { WhatsappIcon } from "./UI";

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const ref = useRef<HTMLElement>(null);

  // Marca no menu a seção que está na tela.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          nav.current
            ?.querySelectorAll<HTMLAnchorElement>('a[href^="/#"]')
            .forEach((link) => {
              if (link.hash === `#${entry.target.id}`)
                link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
        }
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu do celular: Esc fecha e devolve o foco, toque fora fecha, a página não rola por trás.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  // Cabeçalho compacto e com fundo depois que o topo sai da tela.
  useEffect(() => {
    let frame = 0;
    let compact = false;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = scrollY > 24;
        if (next !== compact && ref.current) {
          compact = next;
          ref.current.dataset.compact = String(next);
        }
      });
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="header" ref={ref} data-open={open}>
      <div className="wrap header-inner">
        <a href="/#inicio" className="brand" aria-label="Akira Kobayashi, início">
          <img
            src="/brand/logo-horizontal-creme.svg"
            alt="Akira Kobayashi Advogados"
            width="176"
            height="41"
          />
        </a>
        <nav
          id="navegacao"
          className="nav"
          ref={nav}
          aria-label="Navegação principal"
        >
          {navigation.map((link) => (
            <a key={link.href} href={`/${link.href}`} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon />
            Conversar pelo WhatsApp
          </a>
        </nav>
        <button
          className="menu"
          ref={button}
          type="button"
          aria-controls="navegacao"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="menu-label">{open ? "Fechar" : "Menu"}</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
