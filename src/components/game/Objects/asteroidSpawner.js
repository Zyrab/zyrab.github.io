import { asteroid } from "./asteroid.js";
import { addAnimation } from "../canvas2d.js";

export const asteroidSpawner = (w, h, projectiles, spaceCraft) => {
  let interval = 100;
  let time = 0;
  let count = 2;
  return {
    update(ctx, dt) {
      time += dt;
      if (time > interval) {
        time = 0;
        if (interval > 20) interval -= 0.1;
        for (let i = 0; i < count; i++) {
          addAnimation(asteroid(w, h, projectiles, spaceCraft), ctx);
        }
        count = Math.random() * 2 + 1;
      }
      if (spaceCraft.destroyed) return false;
      return true;
    },
  };
};
