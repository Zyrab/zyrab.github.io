let score = 0;
export const Score = () => {
  return {
    score,
    update(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${score}`, 10, 30);
      ctx.closePath();
      ctx.restore();
      return true;
    },
  };
};

export const updateScore = (points) => (score += points);
export const resetScore = () => (score = 0);
export const getScore = () => score;
