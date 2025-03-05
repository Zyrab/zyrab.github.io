import { html, H } from "../services/DOMConstructor.js";
import { initGame } from "../components/game/game2d.js";
import { initstartTreck } from "../components/game/starGL.js";
export const Home = () => {
  const game = html({
    el: "div",
    ID: "game",
    style: { position: "relative", border: "1px solid black" },
  });
  initGame(game);
  initstartTreck(game);
  return html({
    el: "section",
    clasS: "page",
    children: [
      game,
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
