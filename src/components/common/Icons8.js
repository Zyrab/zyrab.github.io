import { com } from "../../services/builder.js";

export const Icons8 = ({ icon }) => {
  return com({
    el: "img",
    style: { width: "20px", height: "20px" },
    atr: [
      {
        name: "src",
        value: "https://img.icons8.com/color/48/" + icon + ".png",
      },
      { name: "alt", value: icon },
    ],
  });
};
