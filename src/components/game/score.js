let score = 0;
export const Score = () => {
  // Draw updated score

  return {
    score,
    update(ctx) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${score}`, 10, 30);
      return true;
    },
  };
};

export const updateScore = (points) => (score += points);
export const resetScore = () => (score = 0);
