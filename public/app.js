import { createLightSpeedAnimation } from "../src/components/common/LightSpeed.js";
import { Router } from "@zyrab/domo";
import { routes } from "../src/services/routes.js";
import { createHeader } from "../src/components/layout/Header.js";
import { Footer } from "../src/components/layout/Footer.js";

const initializeApp = () => {
  const app = document.getElementById("app");

  const fragment = document.createDocumentFragment();
  fragment.appendChild(createHeader());
  fragment.appendChild(Router.mount());
  fragment.appendChild(Footer());

  app.appendChild(fragment); // only one reflow triggered here

  const cleanup = createLightSpeedAnimation(app);
  Router.routes(routes);
  Router.init();
};

initializeApp();
