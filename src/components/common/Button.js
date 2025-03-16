import { html, P } from "../../services/DOMConstructor.js";
import { Icons8 } from "./Icons8.js";

export const Button = ({
  icon,
  atr = {},
  text,
  data,
  onClick,
  type = "button",
}) => {
  let listener = onClick ? { click: onClick } : "";
  return html({
    el: "button",
    clasS: "btn-default",
    attributes: { type, ...atr, "data-btn": data || "" },

    events: listener,
    children: [
      icon ? Icons8({ icon }) : "",
      text
        ? P({
            clasS: "md center",
            text,
          })
        : "",
    ],
  });
};
