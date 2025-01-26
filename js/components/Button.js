import { com } from "../builder.js";

export const Button = ({ icon, rout }) => {
  return com({
    el: "button",
    atr: [
      {
        name: "class",
        value: "btn-default",
      },
      { name: "type", value: "button" },
      rout && { name: "data-route", value: rout },
    ],
    children: [
      // icon && com({ el: "img", atr: [{ name: "class", value: icon }] }),
      com({
        el: "span",
        text: "Learn More",
      }),
    ],
  });
};
