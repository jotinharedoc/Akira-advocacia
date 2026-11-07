import { useEffect, useRef, useState } from "react";
import { navigation, site } from "../config/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const ref = useRef<HTMLElement>(null);
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
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
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
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    let frame = 0;
    let compact = false;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = scrollY > 140;
        if (next !== compact) {
          compact = next;
          if (ref.current) ref.current.dataset.compact = String(next);
        }
        const max = document.documentElement.scrollHeight - innerHeight;
        if (progress)
          progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
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
    <header className="header" ref={ref}>
      <div className="reading-progress" aria-hidden="true" />
      <div className="wrap header-inner">
        <a
          href="/#inicio"
          className="brand"
          aria-label="Akira Kobayashi, início"
        >
          <img
            src="/brand/logo-horizontal-creme.svg"
            alt="Akira Kobayashi Advogados"
            width="188"
            height="44"
          />
        </a>
        <nav
          id="navegacao"
          className={`nav ${open ? "open" : ""}`}
          ref={nav}
          aria-label="Navegação principal"
        >
          {navigation.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com o escritório <span aria-hidden="true">↗</span>
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
          {open ? "Fechar" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
    </header>
  );
}
