export const createExplosion = (x, y, count, size = 4) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.8 + 0.4;
    particles.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: Math.random() * 40 + 10,
      size: Math.random() * size + 1,
      opacity: 1,
    });
  }
  return {
    particles,
    update(ctx) {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        p.opacity = p.life / 60;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 204, 204, ${p.opacity})`;
        ctx.fill();
        if (p.life <= 0) {
          particles.splice(particles.indexOf(p), 1);
        }
      });
      return particles.length > 0;
    },
  };
};
