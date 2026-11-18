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
import { ConsentBanner } from "./components/ConsentBanner";
import { NotFound } from "./components/NotFound";
export default function App({
  privacy = false,
  notFound = false,
}: {
  privacy?: boolean;
  notFound?: boolean;
}) {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      {notFound ? (
        <NotFound />
      ) : privacy ? (
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
      <ConsentBanner />
    </>
  );
}
