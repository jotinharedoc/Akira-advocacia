import { useEffect, useRef, useState } from "react";
import { content } from "../config/site";
import { Photo, SectionTitle } from "./UI";
export function MethodJourney() {
  const c = content.method;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const steps = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    el.dataset.enhanced = "true";
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const mobile = matchMedia("(max-width: 800px)").matches;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const index = Number((entry.target as HTMLElement).dataset.step);
              setActive((current) => (current === index ? current : index));
            }
          }
        },
        {
          rootMargin: `${-Math.round(innerHeight * (mobile ? 0.58 : 0.3))}px 0px ${-Math.round(innerHeight * (mobile ? 0.12 : 0.35))}px 0px`,
          threshold: 0,
        },
      );
      steps.current.forEach((step) => {
        const trigger = step?.querySelector(".story-trigger");
        if (trigger) observer.observe(trigger);
      });
    };
    observe();
    let resizeFrame = 0;
    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(observe);
    };
    addEventListener("resize", resize, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("resize", resize);
      cancelAnimationFrame(resizeFrame);
      delete el.dataset.enhanced;
    };
  }, []);
  const go = (i: number) => {
    const step = steps.current[i];
    if (!step) return;
    const rect = step.getBoundingClientRect();
    const mobile = matchMedia("(max-width: 800px)").matches;
    const offset = mobile
      ? Math.round(innerHeight * 0.65)
      : Math.round(innerHeight * 0.48);
    const top = scrollY + rect.top + rect.height * 0.5 - offset;
    scrollTo({
      top,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section
      id="como"
      className="section method method-journey"
      aria-labelledby="method-title"
      ref={root}
    >
      <div className="wrap">
        <div className="journey-heading">
          <SectionTitle {...c} id="method-title" />
          <p>Um caminho claro, construído etapa por etapa.</p>
        </div>
        <div className="journey-grid">
          <div className="journey-stage">
            <Photo
              name="metodo"
              alt="Akira Kobayashi olhando para o caderno e sorrindo enquanto faz anotações"
            />
            <div className="journey-caption">
              <span className="journey-caption-index">
                {`0${active + 1}`}
                <span> / 04</span>
              </span>
              <p key={active}>{c.steps[active].title}</p>
            </div>
            <nav
              className="journey-controls"
              aria-label="Etapas do atendimento"
            >
              {c.steps.map((step, i) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para etapa 0${i + 1}: ${step.title}`}
                  aria-current={active === i ? "step" : undefined}
                >
                  <span>{`0${i + 1}`}</span>
                  <span className="journey-progress-track" aria-hidden="true">
                    <span className={i <= active ? "complete" : ""} />
                  </span>
                </button>
              ))}
            </nav>
            <p className="journey-hint">
              Role para acompanhar ou selecione uma etapa.
            </p>
          </div>
          <div className="journey-story">
            {c.steps.map((step, i) => (
              <article
                className={`story-step ${active === i ? "is-active" : ""}`}
                key={step.title}
                id={`etapa-${i + 1}`}
                data-step={i}
                ref={(el) => {
                  steps.current[i] = el;
                }}
              >
                <span
                  className="story-number"
                  aria-hidden="true"
                >{`0${i + 1}`}</span>
                <span
                  className="story-trigger"
                  data-step={i}
                  aria-hidden="true"
                />
                <p className="eyebrow">{`Etapa 0${i + 1}`}</p>
                <h3>{step.title}</h3>
                <p className="story-description">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
