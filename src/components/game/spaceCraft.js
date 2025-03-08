import { cacheShapes, drawShape } from "./canvas2d.js";

// Example Usage:

export const SpaceCraft = (center) => {
  const shapes = cacheShapes(spaceCraftPath, center, 10);
  const hitZone = getRelativeHitZone(center, 10);
  const hp = 5000;
  console.log(hitZone);
  return {
    shapes,
    hitZone,
    hp,
    update(ctx) {
      drawShape(ctx, shapes);
      ctx.beginPath();
      ctx.rect(ctx.canvas.width - 170, 5, 150, 20);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.rect(ctx.canvas.width - 170, 6, (150 * this.hp) / hp, 18);
      ctx.fillStyle = "red";
      ctx.fill();

      return true;
    },
  };
};
const hitZone = [
  { y: -7, zoneX: [-3.8, 0] },
  { y: 0, zoneX: [-27, -21.3] },
  { y: -1, zoneX: [-21.3, -13.8] },
  { y: -2, zoneX: [-13.8, -3.8] },
  { y: -4.5, zoneX: [0, 11.6] },
  { y: -2, zoneX: [11.6, 22.9] },
  { y: 0, zoneX: [22.9, 27] },
];
const getRelativeHitZone = (center, scale) => {
  const { cx, cy } = center;
  return hitZone.map(({ y, zoneX }) => ({
    y: y * scale + cy,
    zoneX: zoneX.map((x) => x * scale + cx),
  }));
};
const spaceCraftPath = [
  //corpus
  { x: -27.5, y: 0, c: "moveTo", bp: true },
  { x: -21.5, y: 0.5, c: "lineTo" },
  { x: -21.3, y: 0.9, c: "lineTo" },
  { x: -13.8, y: 2.5, c: "lineTo" },
  { x: -2.3, y: 3, c: "lineTo" },
  { x: -5.3, y: 8, c: "lineTo" },
  { x: -2.8, y: 8, c: "lineTo" },
  { x: 3.2, y: 5, c: "lineTo" },
  { x: 11.6, y: 4.7, c: "lineTo" },
  { x: 14, y: 2.9, c: "lineTo" },
  { x: 18.3, y: 2.7, c: "lineTo" },
  { x: 22.9, y: 2.1, c: "lineTo" },
  { x: 25.5, y: 1.3, c: "lineTo" },
  { x: 27.5, y: 0, c: "lineTo" },
  { x: 25.5, y: -1.3, c: "lineTo" },
  { x: 22.9, y: -2.1, c: "lineTo" },
  { x: 18.3, y: -2.7, c: "lineTo" },
  { x: 14, y: -2.9, c: "lineTo" },
  { x: 11.6, y: -4.7, c: "lineTo" },
  { x: 3.2, y: -5, c: "lineTo" },
  { x: -2.8, y: -8, c: "lineTo" },
  { x: -5.3, y: -8, c: "lineTo" },
  { x: -2.3, y: -3, c: "lineTo" },
  { x: -13.8, y: -2.5, c: "lineTo" },
  { x: -21.3, y: -0.9, c: "lineTo" },
  { x: -21.5, y: -0.5, c: "lineTo" },
  { x: -27.5, y: 0, c: "lineTo", fs: "grey" },
  //lines
  { x: -27.5, y: 0, c: "moveTo", bp: true },
  { x: -20, y: 0, c: "lineTo" },
  { x: 16, y: 0, c: "moveTo" },
  { x: 23, y: 0, c: "lineTo" },
  { x: -17, y: -1.5, c: "moveTo" },
  { x: 13.5, y: -2.5, c: "lineTo" },
  { x: 14.6, y: -1.3, c: "lineTo" },
  { x: 14.8, y: 0, c: "lineTo" },
  { x: 14.6, y: 1.3, c: "lineTo" },
  { x: 13.5, y: 2.5, c: "lineTo" },
  { x: -17, y: 1.5, c: "lineTo" },
  { x: 14.6, y: -1.3, c: "moveTo" },
  { x: 25.3, y: -1.3, c: "lineTo" },
  { x: 14.6, y: 1.3, c: "moveTo" },
  { x: 25.3, y: 1.3, c: "lineTo" },
  { x: 3.2, y: -5, c: "moveTo" },
  { x: 5.35, y: -2.44, c: "lineTo" },
  { x: 3.2, y: 5, c: "moveTo" },
  { x: 5.35, y: 2.44, c: "lineTo", st: "rgb(81,91,81)", stw: 0.3 },
  //largger inside parts
  { x: -20, y: 0, c: "moveTo", bp: true },
  { x: -18.8, y: -0.75, c: "lineTo" },
  { x: -6.7, y: -1.2, c: "lineTo" },
  { x: -6.7, y: 1.2, c: "lineTo" },
  { x: -18.8, y: 0.75, c: "lineTo" },
  { x: -20, y: 0, c: "lineTo" },
  { x: 7.5, y: -1.2, c: "moveTo" },
  { x: 11.85, y: -1.95, c: "lineTo" },
  { x: 12.25, y: -1.2, c: "lineTo" },
  { x: 12.55, y: 0, c: "lineTo" },
  { x: 12.25, y: 1.2, c: "lineTo" },
  { x: 11.85, y: 1.95, c: "lineTo" },
  { x: 7.5, y: 1.2, c: "lineTo", fs: "rgb(81,91,81)" },
  //smaller inside parts
  { x: -10, y: -0.5, c: "moveTo", bp: true },
  { x: -7.3, y: -0.8, c: "lineTo" },
  { x: -7.3, y: 0.8, c: "lineTo" },
  { x: -10, y: 0.5, c: "lineTo", fs: "black" },
  //wings
  { x: -5.3, y: -8, c: "moveTo", bp: true },
  { x: -2.8, y: -6.65, c: "lineTo" },
  { x: -0.6, y: -3, c: "lineTo" },
  { x: -2.3, y: -3, c: "lineTo" },
  { x: -5.3, y: -8, c: "lineTo" },
  { x: -5.3, y: 8, c: "moveTo" },
  { x: -2.8, y: 6.65, c: "lineTo" },
  { x: -0.6, y: 3, c: "lineTo" },
  { x: -2.3, y: 3, c: "lineTo" },
  { x: -5.3, y: 8, c: "lineTo", fs: "#885580" },
];
