import { toPath2D, drawShape } from "@zyrab/parsect-renderer";
import { addAnimation } from "../canvas2d.js";
import { explosion } from "./explosion.js";
const scale = 5;
export const spaceCraft = (x, y, gmOv) => {
  let cx = x / 2;
  let cy = y - 100;
  return {
    destroyed: false,
    scale,
    get hitZone() {
      return colliders.map(({ x, y, width, height }) => ({
        x: x * scale + cx - (dims.w * scale) / 2,
        y: y * scale + cy - (dims.h * scale) / 2,
        width: width * scale,
        height: height * scale,
      }));
    },
    update(ctx) {
      ctx.save();
      ctx.translate(0 - (dims.w * scale) / 2, (-dims.h * scale) / 2);
      ctx.translate(cx, cy);
      ctx.scale(this.scale, this.scale);
      drawShape(ctx, engine.shapes);
      drawShape(ctx, shapes);
      ctx.restore();
      if (this.destroyed) {
        addAnimation(gmOv, ctx);
        gmOv.active = true;
        addAnimation(explosion(cx, cy, 300, 10), ctx);
        return false;
      }
      return true;
    },
  };
};

const colliders = [
  {
    x: 0.4375,
    y: 9.0234375,
    width: 19,
    height: 3.625,
  },
  {
    x: 6.4375,
    y: 5.3984375,
    width: 7.125,
    height: 3.375,
  },
  {
    x: 7.5625,
    y: 2.3984375,
    width: 5,
    height: 2.75,
  },
];

const enginePath = [
  {
    svg: {
      width: "20",
      height: "21",
      viewBox: "0 0 20 21",
    },
  },
  {
    path: "M12 16C12 17.8778 10.2 20.4 10 20.4C9.8 20.4 8 17.8778 8 16C8 14.1222 8.89543 14 10 14C11.1046 14 12 14.1222 12 16Z",
    fill: "#C6BABA",
  },
  {
    path: "M11.6 16.4C11.6 17.2837 10.8837 18.6 10 18.6C9.11635 18.6 8.4 17.2837 8.4 16.4C8.4 15.5163 9.11635 14.8 10 14.8C10.8837 14.8 11.6 15.5163 11.6 16.4Z",
    fill: "white",
  },
];
const spaceCraftPath = [
  {
    svg: {
      width: "20",
      height: "21",
      viewBox: "0 0 20 21",
    },
  },
  {
    path: "M5.55 7.31666L10 11.0667V12.5L9.5 13V14.5L10 15V16.5083L5.55 14.9167V7.31666 M8.2 3.21666L7.37299 8.19588L10 10.4167V7.96666L8.75 5.66666L8.65 2.41666L8.2 3.21666Z",
    fill: "#4B5E7F",
  },
  {
    path: "M10 0.0166626L7.35 2.61666L5.74149 6.81666L7.37299 8.19588L8.2 3.21666L8.65 2.41666L9.1 1.61666L10 0.0166626 M9.1 4.11666V1.61666L8.65 2.41666L8.75 5.66666L10 7.96666V6.21666L9.1 4.11666 M10 15V12.5L9.5 13V14.5L10 15 M5.55 7.31666L0 8.91666V12.7167L0.75 13.0167V10.4167L5 12.4667V14.7167L5.55 14.9167V7.31666Z",
    fill: "#253745",
  },
  {
    path: "M5 14.7167V12.4667L0.75 10.4167V13.0167L5 14.7167 M5.55 7.31666L10 11.0667V10.4167L7.37299 8.19588L5.74149 6.81666L5.55 7.31666Z",
    fill: "#304057",
  },

  {
    path: "M10.925 1.61666L10 0.0166626V6.21666L11.05 4.11666L10.925 1.61666Z",
    fill: "#7488AF",
  },
  {
    path: "M10 6.21666V0.0166626L9.1 1.61666V4.11666L10 6.21666Z",
    fill: "#A9BBD5",
  },
  {
    path: "M15 12.4667V14.7167L19.1 13.0767V10.4167L15 12.4667Z",
    fill: "#273349",
  },
  {
    path: "M10 11.0667L14.5 7.31666L14.3011 6.81666L12.6717 8.19588L10 10.4167V11.0667Z",
    fill: "#27334A",
  },
  {
    path: "M10 15L10.5 14.5V13L10 12.5V15 M10.925 1.61666L11.05 4.11666L10 6.21666V7.96666L11.3875 5.66666V2.41666L10.925 1.61666 M20 12.7167V8.91666L14.5 7.31666V14.9167L15 14.7167V12.4667L19.1 10.4167V13.0767L20 12.7167 M12.65 2.66666L10 0.0166626L10.925 1.61666L11.3875 2.41666L11.85 3.21666L12.6717 8.19588L14.3011 6.81666L12.65 2.66666Z",
    fill: "#17242D",
  },
  {
    path: "M10 10.4167L12.6717 8.19588L11.85 3.21666L11.3875 2.41666V5.66666L10 7.96666V10.4167Z",
    fill: "#364761",
  },
  {
    path: "M10 11.0667L14.5 7.31666V14.9167L10 16.5083V15L10.5 14.5V13L10 12.5V11.0667Z",
    fill: "#364765",
  },
];

const { shapes, dims } = toPath2D(spaceCraftPath);
const engine = toPath2D(enginePath);
