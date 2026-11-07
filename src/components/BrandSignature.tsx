import { useState } from "react";
// Interação adaptada da referência Uiverse.io, por Smit-Prajapati.
// A arte utilizada é o logotipo oficial fornecido pelo escritório.
export function BrandSignature() {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`brand-signature ${open ? "is-open" : ""}`}
      onClick={() => setOpen(!open)}
      aria-pressed={open}
    >
      <span className="signature-frame" aria-hidden="true" />
      <span className="signature-window" aria-hidden="true">
        <img
          src="/brand/logo-horizontal-dourado.svg"
          width="260"
          height="62"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="signature-values">Verdade · Precisão · Equilíbrio</span>
      <span className="signature-instruction">
        <span className="signature-hint-default">
          Explore a nossa assinatura
        </span>
        <span className="signature-hint-open">Akira Kobayashi Advogados</span>
        <span className="signature-toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </span>
    </button>
  );
}
