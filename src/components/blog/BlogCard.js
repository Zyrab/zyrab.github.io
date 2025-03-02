import { DIV, P, H, html } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";

export const BlogCard = (list) => {
  return html({
    clasS: "bg-greysh p-1 flex col gap-05 max-w-550 pointer blog-card",
    attributes: { ["data-slug"]: list.slug },
    children: [
      H("h1", { text: list.title, clasS: "xxl" }),
      P({ text: list.date, clasS: "sm right" }),
      P({ text: list.intro, clasS: "md" }),
      // Button({
      //   text: "Read",
      // }),
    ],
  });
};
