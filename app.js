import { Header } from "./components/common/Header.js";
import { Footer } from "./components/common/Footer.js";
import { createLightSpeedAnimation } from "./components/common/LightSpeed.js";
import { router, initializeRouter } from "./services/router.js";

const initializeApp = () => {
  const app = document.getElementById("app");
  app.appendChild(Header());
  app.appendChild(router());
  app.appendChild(Footer());

  const cleanup = createLightSpeedAnimation(app);
  initializeRouter();
};

initializeApp();
