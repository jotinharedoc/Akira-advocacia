import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFamilyWhatsappLink } from "../src/lib/family-whatsapp.ts";
import { content, site } from "../src/config/site.ts";
export const intro =
  "Olá! Vim pelo site do Dr. Akira e gostaria de orientação sobre a situação de uma pessoa presa.";
export const closing =
  "Gostaria de saber como podemos prosseguir com o atendimento.";
export const heading =
  "Para facilitar o atendimento, já tenho as seguintes informações:";
const A = "• Nome completo e matrícula da pessoa presa:";
const B = "• Unidade prisional onde ela está:";
const C = "• Número do processo ou da execução:";
const D = "• Documentos que a família já recebeu:";
const fixtures = [
  null,
  A,
  B,
  `${A}\n\n${B}`,
  C,
  `${A}\n\n${C}`,
  `${B}\n\n${C}`,
  `${A}\n\n${B}\n\n${C}`,
  D,
  `${A}\n\n${D}`,
  `${B}\n\n${D}`,
  `${A}\n\n${B}\n\n${D}`,
  `${C}\n\n${D}`,
  `${A}\n\n${C}\n\n${D}`,
  `${B}\n\n${C}\n\n${D}`,
  `${A}\n\n${B}\n\n${C}\n\n${D}`,
];
export const cases = fixtures.map((lines, mask) => ({
  mask,
  expected: `${intro}\n\n${lines === null ? "Ainda não consegui reunir as informações e documentos da lista." : `${heading}\n\n${lines}`}\n\n${closing}`,
}));
for (const { mask, expected } of cases)
  test(`WhatsApp: combinação ${mask.toString(2).padStart(4, "0")}`, () => {
    const selected = content.family.checklist
      .filter((_, i) => mask & (1 << i))
      .reverse();
    const link = buildFamilyWhatsappLink(selected);
    const url = new URL(link);
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, new URL(site.whatsapp).pathname);
    assert.equal(url.searchParams.get("text"), expected);
    assert.ok(link.includes("%0A%0A"));
    assert.ok(!link.includes("\n"));
    for (const line of expected.split("\n").filter((v) => v.startsWith("• "))) {
      assert.ok(line.endsWith(":"));
      assert.ok(!line.endsWith("."));
    }
  });
