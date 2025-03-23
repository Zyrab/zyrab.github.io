const TWO_PI = Math.PI * 2;
export const explosion = (x, y, count, size = 4) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * TWO_PI;
    const speed = Math.random() * 1 + 0.7;
    particles.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: Math.random() * count * 2,
      size: Math.random() * size + 1,
      opacity: 1,
    });
  }
  return {
    particles,
    update(ctx, dt) {
      this.particles.forEach((p) => {
        p.x += p.dx * dt;
        p.y += p.dy * dt;
        p.life--;
        if (p.size > 1) {
          p.size -= 0.01;
        }
        p.opacity = p.life / 90;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TWO_PI);
        ctx.fillStyle = `rgba(204, 204, 204, ${p.opacity})`;
        ctx.fill();
        if (p.life <= 0) {
          this.particles = this.particles.filter((p) => p.life > 0);
        }
      });
      return this.particles.length > 0;
    },
  };
};
