import { html, H } from "../services/DOMConstructor.js";
import { Button } from "../components/common/Button.js";
import { navigateTo } from "../services/router.js";
export const Home = () => {
  return html({
    el: "section",
    children: [
      Button({
        icon: "arrow",
        text: "Privacy Policy",
        onClick: () => navigateTo("/legal/privacy-policy/numbero"),
      }),
      html({
        clasS: "home-hero",
        children: [
          H("h2", {
            clasS: "xxxl",
            text: "Plan, Design, Build",
          }),
          H("h1", {
            clasS: "xxl",
            text: "I bring your Ideas to Life, with no boundaries",
          }),
        ],
      }),
    ],
  });
};
