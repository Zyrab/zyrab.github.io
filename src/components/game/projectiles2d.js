import { normalizeSpeed } from "./canvas2d.js";
export const projectile = (x, y, endX, endY, ctx, bulletArray) => {
  const { nx, ny } = normalizeSpeed(5, x, y, endX, endY);
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  return {
    w: w,
    h: h,
    x: x,
    y: y,
    dx: nx,
    dy: ny,
    destroyed: false,
    trail: [],
    update(ctx) {
      if (this.destroyed) return false;
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 10) this.trail.shift();
      if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
        bulletArray.splice(bulletArray.indexOf(this), 1);
        return false;
      }
      this.x += this.dx;
      this.y += this.dy;
      ctx.beginPath();
      for (let i = this.trail.length - 1; i > 0; i--) {
        const prev = this.trail[i];
        const next = this.trail[i - 1];

        const alpha = i / this.trail.length; // Oldest point more faded
        const width = (i / this.trail.length) * 3; // Tail gradually thinner

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = width;
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
      return true;
    },
  };
};
