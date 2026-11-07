import { site } from "../config/site";
export function Privacy() {
  return (
    <main className="privacy" id="conteudo">
      <section className="section">
        <div className="wrap">
          <article>
            <a href="/" className="back-link">
              ← Voltar ao site
            </a>
            <p className="eyebrow">Privacidade e canais digitais</p>
            <h1>Respeito à sua informação.</h1>
            <p className="privacy-meta">Atualizado em 6 de novembro de 2026</p>
            <p>
              Este site é mantido por Akira Chiarelli Kobayashi Sociedade
              Individual de Advocacia, {site.society}. O atendimento jurídico
              está sob responsabilidade de {site.name}, {site.oab}.
            </p>
            <h2>Informações neste site</h2>
            <p>
              Esta página não tem formulário de contato, ferramenta de análise
              de visitas ou publicidade de terceiros. O checklist da seção “Para
              a família” funciona apenas durante a visita: as marcações não são
              enviadas ao escritório nem salvas ao sair ou recarregar a página.
            </p>
            <h2>Contato pelo WhatsApp e Instagram</h2>
            <p>
              Ao acessar um desses canais, você sai deste site e passa a
              utilizar uma plataforma externa, com suas próprias práticas de
              privacidade. Os dados que você enviar ao escritório são utilizados
              para responder ao contato e para a prestação de serviços
              jurídicos, sob sigilo profissional.
            </p>
            <h2>Hospedagem</h2>
            <p>
              O site é hospedado na Vercel. A infraestrutura de hospedagem pode
              processar informações técnicas necessárias à entrega e à segurança
              das páginas, como endereço IP e dados da requisição. Consulte a{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidade da Vercel
              </a>
              .
            </p>
            <h2>Fale com o escritório</h2>
            <p>
              Para dúvidas sobre o tratamento dos seus dados ou solicitações de
              acesso, correção ou exclusão, entre em contato pelo{" "}
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.phone}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
