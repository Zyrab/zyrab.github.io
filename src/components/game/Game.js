import { Domo } from "@zyrab/domo";
import { createButton } from "../common/Button.js";
import { initGame } from "./game2d.js";
import { initstartTreck } from "./starGL.js";

export const Game = (placeHolder) => {
  let cleanupStartTreck, cleanupGame;

  const pauseButton = createButton({
    icon: "pause",
    onClick: () => cleanupGame.pause(),
  });

  const resumeButton = createButton({
    icon: "play",
    onClick: () => cleanupGame.resume(),
  });

  const restartButton = createButton({
    icon: "replay",
    onClick: () => cleanupGame.restart(),
  });

  const closeButton = createButton({
    icon: "close",
    onClick: () => {
      game.rmvCls("active");
      setTimeout(() => {
        cleanupStartTreck?.();
        cleanupGame?.destroy();
        game.replace(game.element, placeHolder);
      }, 1000);
    },
  });

  const controls = Domo()
    .cls("absolute flex gap-05 top-0")
    .css({ zIndex: 35 })
    .child([pauseButton, resumeButton, restartButton, closeButton])
    .build();

  const game = Domo().cls("game").id("game").child([controls]);

  cleanupStartTreck = initstartTreck(game.element);
  cleanupGame = initGame(game.element);
  cleanupGame.start();

  return game;
};
