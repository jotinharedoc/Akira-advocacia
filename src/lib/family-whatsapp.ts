import { content, site } from "../config/site.ts";

const whatsappFields = [
  "Nome completo e matrícula da pessoa presa",
  "Unidade prisional onde ela está",
  "Número do processo ou da execução",
  "Documentos que a família já recebeu",
] as const;

/** Preenche um rascunho; o visitante confirma o envio dentro do WhatsApp. */
export function buildFamilyWhatsappLink(selected: readonly string[]): string {
  const lines = content.family.checklist.flatMap((option, index) =>
    selected.includes(option) ? [`• ${whatsappFields[index]}:`] : [],
  );
  const introduction =
    "Olá! Vim pelo site do Dr. Akira e gostaria de orientação sobre a situação de uma pessoa presa.";
  const information = lines.length
    ? `Para facilitar o atendimento, já tenho as seguintes informações:\n\n${lines.join("\n\n")}`
    : "Ainda não consegui reunir as informações e documentos da lista.";
  const closing =
    "Gostaria de saber como podemos prosseguir com o atendimento.";
  const message = `${introduction}\n\n${information}\n\n${closing}`;
  const configured = new URL(site.whatsapp);
  return `${configured.origin}${configured.pathname}?text=${encodeURIComponent(message)}`;
}
