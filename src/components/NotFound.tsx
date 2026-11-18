import { site } from "../config/site";
import { Button } from "./UI";

// Página 404: mesma identidade do site, com caminho de volta e contato direto.
export function NotFound() {
  return (
    <main className="privacy" id="conteudo">
      <section className="section">
        <div className="wrap">
          <article>
            <p className="eyebrow">Página não encontrada</p>
            <h1>Este endereço não existe.</h1>
            <p>
              O link pode estar incompleto ou a página pode ter mudado de lugar.
              Volte ao início ou fale direto com o escritório.
            </p>
            <p className="not-found-actions">
              <a href="/" className="back-link">
                ← Voltar ao site
              </a>
            </p>
            <Button href={site.whatsapp}>Falar com o escritório</Button>
          </article>
        </div>
      </section>
    </main>
  );
}
