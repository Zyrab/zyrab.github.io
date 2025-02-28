import { DIV, P, H } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";

export const BlogCard = (list) => {
  return DIV(
    [
      H("h1", { text: list.title, clasS: "xxl" }),
      P({ text: list.date, clasS: "sm right" }),
      P({ text: list.intro, clasS: "md" }),
      Button({
        text: "Read",
        atr: { ["data-slug"]: list.slug },
      }),
    ],
    "bg-greysh p-05 flex col  gap-05 max-w-550"
  );
};
