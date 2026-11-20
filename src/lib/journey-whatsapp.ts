import { site } from "../config/site.ts";

/** Rascunho de mensagem que já diz em que fase o caso está; o visitante revisa e envia no WhatsApp. */
export function buildJourneyWhatsappLink(phaseName: string): string {
  const message = `Olá! Vim pelo site do Dr. Akira e gostaria de conversar sobre um caso. Ele está na fase: ${phaseName}.`;
  const configured = new URL(site.whatsapp);
  return `${configured.origin}${configured.pathname}?text=${encodeURIComponent(message)}`;
}
