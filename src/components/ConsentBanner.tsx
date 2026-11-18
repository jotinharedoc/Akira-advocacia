import { useEffect, useState } from "react";
import {
  analyticsEnabled,
  initAnalytics,
  setConsent,
  storedConsent,
} from "../lib/analytics";

// Aviso de cookies de medição. Aparece só quando a medição de anúncios está configurada.
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!analyticsEnabled) return;
    initAnalytics();
    // Lido só no navegador, depois da hidratação, para o HTML pré-renderizado continuar igual.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(storedConsent() === null);
  }, []);
  if (!visible) return null;
  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };
  return (
    <div className="consent-banner" role="region" aria-label="Aviso de cookies">
      <p>
        Usamos cookies de medição para saber quais anúncios trazem visitas ao
        site. Nenhuma informação do seu caso é coletada.{" "}
        <a href="/privacidade.html">Privacidade</a>
      </p>
      <div>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="consent-secondary"
        >
          Recusar
        </button>
        <button type="button" onClick={() => choose("granted")}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
