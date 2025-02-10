import { com } from "../../services/builder.js";
import { Icons8 } from "./Icons8.js";

export const Button = ({ icon, atr = {}, text, onClick }) => {
  let listener = onClick ? { event: "click", callback: onClick } : "";
  return com({
    el: "button",
    atr: [
      {
        name: "class",
        value: "btn-default",
      },
      { name: "type", value: "button" },
      atr && atr,
    ],
    listeners: [listener],
    children: [
      icon && Icons8({ icon }),
      com({
        atr: [{ name: "class", value: "sm center" }],
        el: "span",
        text: text,
      }),
    ],
  });
};
