import { Header } from "./components/HeaderHero";
import {
  Hero,
  PracticeAreas,
  Family,
  Method,
  AboutOffice,
  FAQ,
  Contact,
  Footer,
} from "./components/Sections";
import { Privacy } from "./components/Privacy";
export default function App({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      {privacy ? (
        <Privacy />
      ) : (
        <main id="conteudo">
          <Hero />
          <PracticeAreas />
          <Family />
          <Method />
          <AboutOffice />
          <FAQ />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  );
}
