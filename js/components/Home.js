import { com } from "../builder.js";
export const Home = () => {
  return com({
    el: "section",
    atr: [{ name: "class", value: "home" }],
    children: [
      com({ el: "div", atr: [{ name: "class", value: "home-circle" }] }),
      com({
        el: "div",
        atr: [{ name: "class", value: "home-hero" }],
        children: [
          com({
            el: "h2",
            atr: [{ name: "class", value: "h-lg" }],
            text: "Plan, Design, Build",
          }),
          com({
            el: "h1",
            atr: [{ name: "class", value: "h-md" }],
            text: "I bring your Ideas to Life, with no boundaries",
          }),
        ],
      }),
    ],
  });
};
