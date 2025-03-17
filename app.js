import { Header } from "./src/components/common/Header.js";
import { Footer } from "./src/components/common/Footer.js";
import { createLightSpeedAnimation } from "./src/components/common/LightSpeed.js";
import { router, initializeRouter } from "./src/services/router.js";

const initializeApp = () => {
  const app = document.getElementById("app");
  app.appendChild(Header());
  app.appendChild(router());
  app.appendChild(Footer());

  const cleanup = createLightSpeedAnimation(app);
  initializeRouter();
};

initializeApp();
