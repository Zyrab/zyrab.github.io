import { Planet } from "../components/Planet.js";
import { com } from "../services/builder.js";
import { Button } from "../components/common/Button.js";
import { navigateTo } from "../services/router.js";
export const Home = () => {
  return com({
    el: "section",
    atr: [{ name: "class", value: "home" }],
    children: [
      Planet(),
      Button({
        icon: "arrow",
        text: "Privacy Policy",
        onClick: () => navigateTo("/legal/privacy-policy/numbero"),
      }),
      com({
        el: "div",
        atr: [{ name: "class", value: "home-hero" }],
        children: [
          com({
            el: "h2",
            atr: [{ name: "class", value: "xxxl" }],
            text: "Plan, Design, Build",
          }),
          com({
            el: "h1",
            atr: [{ name: "class", value: "xxl" }],
            text: "I bring your Ideas to Life, with no boundaries",
          }),
        ],
      }),
    ],
  });
};
