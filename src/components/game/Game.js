import { html } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";
import { onShow, onClass } from "../../services/DinamicDOM.js";
import { initGame } from "./game2d.js";
import { initstartTreck } from "./starGL.js";
import { stopAnimationLoop } from "./canvas2d.js";
export const Game = (placeHolder) => {
  let cleanupStartTreck, cleanupGame;
  const paus = Button({
    icon: "color/20/pause",
    onClick: () => {
      stopAnimationLoop();
    },
  });

  const closeButton = html({
    style: { position: "absolute", top: 0, right: 0 },
    children: [
      Button({
        icon: "color/20/delete-sign--v1",
        text: "Close",
        onClick: () => {
          onClass("game", { remove: "active" });

          setTimeout(() => {
            cleanupStartTreck?.(); // Stop animations & WebGL
            cleanupGame?.(); // Remove event listeners & intervals
            onShow(game, placeHolder);
          }, 1000);
        },
      }),
      paus,
    ],
  });
  const game = html({
    el: "div",
    clasS: "game",
    ID: "game",
    children: [closeButton],
  });

  cleanupStartTreck = initstartTreck(game);
  cleanupGame = initGame(game);

  return game;
};
