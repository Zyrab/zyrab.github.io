import { getScore } from "./score.js";
export const gameOver = (w, h, restartCallback) => {
  return {
    active: false, // Controls visibility

    show() {
      this.active = true;
    },

    hide() {
      this.active = false;
    },

    update(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
      ctx.closePath();

      // "Game Over" text
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", w / 2, h / 2 - 80);
      ctx.fillText("Score: " + getScore(), w / 2, h / 2 - 30);

      // Replay Button
      ctx.beginPath();
      ctx.rect(w / 2 - 75, h / 2, 150, 50);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();

      // Button Text
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Replay", w / 2, h / 2 + 30);

      ctx.restore();
      return true;
    },

    checkClick(x, y) {
      if (!this.active) return;
      if (x >= w / 2 - 75 && x <= w / 2 + 75 && y >= h / 2 && y <= h / 2 + 50) {
        restartCallback(); // Restart when clicking the replay button
      }
    },
  };
};
