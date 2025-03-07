import { html } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";
import { onShow, onClass } from "../../services/DinamicDOM.js";
import { initGame } from "./game2d.js";
import { initstartTreck } from "./starGL.js";

export const Game = (placeHolder) => {
  let cleanupStartTreck, cleanupGame;

  const pauseButton = Button({
    icon: "color/20/pause",
    onClick: () => cleanupGame.pause(),
  });

  const resumeButton = Button({
    icon: "color/20/play",
    onClick: () => cleanupGame.resume(),
  });

  const restartButton = Button({
    icon: "color/20/restart",
    onClick: () => cleanupGame.restart(),
  });

  const closeButton = Button({
    icon: "color/20/delete-sign--v1",
    onClick: () => {
      onClass("game", { remove: "active" });

      setTimeout(() => {
        cleanupStartTreck?.(); // Stop animations & WebGL
        cleanupGame?.destroy(); // Remove event listeners & intervals
        onShow(game, placeHolder);
      }, 1000);
    },
  });

  const controls = html({
    el: "div",
    clasS: "absolute flex gap-05 top-0",
    style: {
      zIndex: 35,
    },
    children: [pauseButton, resumeButton, restartButton, closeButton],
  });

  const game = html({
    el: "div",
    clasS: "game",
    ID: "game",
    children: [controls],
  });

  cleanupStartTreck = initstartTreck(game);
  cleanupGame = initGame(game);
  cleanupGame.start();

  return game;
};
