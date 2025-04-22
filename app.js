import { Header } from "./src/components/common/Header.js";
import { Footer } from "./src/components/common/Footer.js";
import { createLightSpeedAnimation } from "./src/components/common/LightSpeed.js";
import { Router } from "./src/services/router.js";
import { routes } from "./src/pages/routes.js";

const initializeApp = () => {
  const app = document.getElementById("app");

  const fragment = document.createDocumentFragment();
  fragment.appendChild(Header());
  fragment.appendChild(Router.mount());
  fragment.appendChild(Footer());

  app.appendChild(fragment); // only one reflow triggered here

  const cleanup = createLightSpeedAnimation(app);
  Router.routes(routes);
  Router.init();
};

initializeApp();
