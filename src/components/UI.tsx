import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEventHandler,
} from "react";
function revealHeroImage(image: HTMLImageElement) {
  if (
    !image.naturalWidth ||
    image.dataset.introPlayed ||
    typeof image.animate !== "function" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  image.dataset.introPlayed = "true";
  const desktop = matchMedia("(min-width: 801px) and (pointer: fine)").matches;
  image.animate(
    [
      {
        opacity: desktop ? 0.9 : 0.96,
        transform: `translateY(${desktop ? 7 : 4}px) scale(1.008)`,
        ...(desktop ? { filter: "blur(1px)" } : {}),
      },
      {
        opacity: 1,
        transform: "none",
        ...(desktop ? { filter: "blur(0px)" } : {}),
      },
    ],
    { duration: desktop ? 420 : 280, easing: "cubic-bezier(.22,1,.36,1)" },
  );
}
export function Photo({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (name === "hero" && image.current?.complete)
      revealHeroImage(image.current);
  }, [name]);
  return (
    <figure className={`portrait ${className}`}>
      <img
        ref={image}
        onLoad={
          name === "hero"
            ? (event) => revealHeroImage(event.currentTarget)
            : undefined
        }
        src={`/photos/${name}-1440.webp`}
        srcSet={`/photos/${name}-720.webp 720w, /photos/${name}-1440.webp 1440w`}
        sizes="(max-width: 800px) calc(100vw - 48px), 45vw"
        width={1440}
        height={name === "familia" ? 960 : 2160}
        alt={alt}
        loading={name === "hero" ? "eager" : "lazy"}
        fetchPriority={name === "hero" ? "high" : "auto"}
        decoding="async"
      />
    </figure>
  );
}
export function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      ↗
    </span>
  );
}
export function Button({
  children,
  href,
  light = false,
  onClick,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : ""}`}
      href={href}
      onClick={onClick}
      {...(href.startsWith("https:")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
const chapters: Record<string, string> = {
  "Áreas de atuação": "01",
  "Para a família": "02",
  "Como trabalhamos": "03",
  "O escritório": "04",
  "Dúvidas frequentes": "05",
  "Vamos conversar": "06",
};
export function SectionTitle({
  label,
  title,
  accent,
  id,
}: {
  label: string;
  title: string;
  accent: string;
  id?: string;
}) {
  return (
    <>
      <div className="section-kicker">
        {chapters[label] && (
          <span className="chapter-number" aria-hidden="true">
            {chapters[label]}
          </span>
        )}
        <p className="eyebrow">{label}</p>
      </div>
      <h2 id={id}>
        {title} <strong>{accent}</strong>
      </h2>
    </>
  );
}
