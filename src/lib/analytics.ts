// Medição para Google Ads e GA4. Só existe com IDs configurados e só carrega depois do aceite (LGPD).
// VITE_GOOGLE_ADS_ID (AW-...), VITE_GOOGLE_ADS_CONVERSION_LABEL (rótulo da conversão) e VITE_GA4_ID (G-...).
const ADS = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
const LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL as
  string | undefined;
const GA4 = import.meta.env.VITE_GA4_ID as string | undefined;
const KEY = "akira-consent";
export const analyticsEnabled = Boolean(ADS || GA4);

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function storedConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

let started = false;
function start() {
  if (started || !analyticsEnabled) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  // Mesmo formato do gtag oficial: empilha os argumentos no dataLayer.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  for (const id of [ADS, GA4].filter(Boolean)) window.gtag("config", id);
  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent((ADS || GA4)!);
  document.head.appendChild(script);
  // Conversão: clique para falar com o escritório (WhatsApp ou telefone).
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const method = href.startsWith("https://wa.me")
        ? "whatsapp"
        : href.startsWith("tel:")
          ? "telefone"
          : null;
      if (!method || !window.gtag) return;
      if (ADS && LABEL)
        window.gtag("event", "conversion", { send_to: ADS + "/" + LABEL });
      if (GA4) window.gtag("event", "generate_lead", { method });
    },
    { capture: true },
  );
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* Sem armazenamento: vale só para esta visita. */
  }
  if (value === "granted") start();
}

export function initAnalytics() {
  if (storedConsent() === "granted") start();
}
