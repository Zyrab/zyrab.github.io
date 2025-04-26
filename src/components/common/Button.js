import { Domo } from "@zyrab/domo";
import { createIcons8 } from "../common/Icons8.js";

export const createButton = ({
  icon = "",
  attr = {},
  text = "",
  data = "",
  onClick,
  type = "button",
}) => {
  return Domo("button")
    .cls("btn-default")
    .attr({ type, ...attr })
    .data({ btn: data })
    .on(onClick && "click", onClick)
    .child([
      createIcons8({ icon }).if(icon !== ""),
      Domo("p")
        .cls("md center")
        .if(text !== "")
        .txt(text),
    ]);
};
