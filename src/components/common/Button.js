import { html, P } from "../../services/DOMConstructor.js";
import { Icons8 } from "./Icons8.js";

export const Button = ({ icon, atr = {}, text, onClick }) => {
  let listener = onClick ? { event: "click", callback: onClick } : "";
  return html({
    el: "button",
    clasS: "btn-default",
    attributes: { type: "button", ...atr },

    events: [listener],
    children: [
      icon ? Icons8({ icon }) : "",
      P({
        clasS: "md center",
        text: text,
      }),
    ],
  });
};
