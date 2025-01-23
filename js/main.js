import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { router, handleRouting } from "./router.js";

const initializeApp = () => {
  const app = document.getElementById("app");
  app.appendChild(Header());
  app.appendChild(router());
  app.appendChild(Footer());

  handleRouting();
};

initializeApp();
