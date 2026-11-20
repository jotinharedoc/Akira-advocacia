import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/site.css";
const root = document.getElementById("root")!;
// A 404 vem marcada no HTML pré-renderizado (data-page), pois o endereço pode ser qualquer um.
const app = (
  <App
    privacy={location.pathname.startsWith("/privacidade")}
    notFound={root.dataset.page === "404"}
  />
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);
