import type { ReactNode, MouseEventHandler } from "react";

const photoRatio: Record<string, number> = {
  hero: 2160,
  familia: 960,
  metodo: 2160,
  escritorio: 2160,
  retrato: 2160,
};

export function Photo({
  name,
  alt,
  className = "",
  sizes = "(max-width: 860px) 100vw, 45vw",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={`/photos/${name}-1440.webp`}
      srcSet={`/photos/${name}-720.webp 720w, /photos/${name}-1440.webp 1440w`}
      sizes={sizes}
      width={1440}
      height={photoRatio[name] ?? 2160}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}

/** Ícone do WhatsApp em traço, no mesmo peso dos demais ícones. */
export function WhatsappIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4.5 19.5l1.1-3.9A8 8 0 1 1 8.6 18.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.6.4-3-.3a8.3 8.3 0 0 1-3.6-3.6c-.6-1.3-.6-2.4-.2-2.9z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "down" }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {direction === "down" ? (
        <path d="M12 5v14m0 0l-5-5m5 5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7 17L17 7m0 0H9m8 0v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = "gold",
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: "gold" | "outline" | "ink";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const external = href.startsWith("https:");
  return (
    <a
      className={`button button-${variant}`}
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {href.includes("wa.me") && <WhatsappIcon />}
      <span>{children}</span>
    </a>
  );
}
