import {
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import { content } from "../config/site";
import { SectionTitle, Arrow } from "./UI";
import { Reveal } from "./Reveal";
export function PracticeExplorer() {
  const c = content.practice;
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const navigate = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(e.key))
      next = (index + 1) % c.items.length;
    else if (["ArrowUp", "ArrowLeft"].includes(e.key))
      next = (index + c.items.length - 1) % c.items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = c.items.length - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };
  return (
    <section
      id="atuacao"
      className="section practice"
      aria-labelledby="practice-title"
    >
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <SectionTitle {...c} id="practice-title" />
          </div>
          <p className="intro">{c.description}</p>
        </Reveal>
        <div
          className="practice-explorer"
          style={
            {
              "--area-index": selected,
              "--hover-index": hovered ?? selected,
              "--hover-visible": hovered === null ? 0 : 1,
            } as CSSProperties
          }
        >
          <div className="explorer-navigation">
            <p className="explorer-instruction">Explore as áreas de atuação</p>
            <div
              className="explorer-tabs"
              role="tablist"
              aria-label="Áreas de atuação"
              aria-orientation="vertical"
              onPointerLeave={() => setHovered(null)}
            >
              <span className="explorer-hover-indicator" aria-hidden="true" />
              <span className="explorer-active-line" aria-hidden="true" />
              {c.items.map((area, i) => (
                <button
                  key={area.title}
                  type="button"
                  role="tab"
                  id={`area-tab-${i}`}
                  aria-controls={`area-panel-${i}`}
                  aria-selected={selected === i}
                  tabIndex={selected === i ? 0 : -1}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  onClick={() => setSelected(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setHovered(i);
                  }}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => navigate(e, i)}
                >
                  <span className="explorer-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="explorer-category">
                      {i === 0
                        ? "Investigação e processo"
                        : "Cumprimento da pena"}
                    </span>
                    <strong>{area.title}</strong>
                  </span>
                  <Arrow />
                </button>
              ))}
            </div>
            <p className="explorer-note">
              Escolha uma área para conhecer a atuação do escritório.
            </p>
          </div>
          <div className="explorer-panels">
            {c.items.map((area, i) => (
              <article
                key={area.title}
                className="practice-panel"
                id={`area-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`area-tab-${i}`}
                tabIndex={0}
                hidden={selected !== i}
              >
                <div className="panel-heading">
                  <span className="eyebrow">{`0${i + 1} / Atuação`}</span>
                  <h3>{area.title}</h3>
                  <p>{area.subtitle}</p>
                </div>
                <ul className="services">
                  {area.items.map((item) => (
                    <li key={item}>
                      <span className="service-marker" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
