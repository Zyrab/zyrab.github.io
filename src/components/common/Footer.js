import { A, html, P } from "../../services/DOMConstructor.js";
export const Footer = () => {
  let link = "https://github.com/Zyrab";
  let linkText = "icons by icons8";
  const currentYear = new Date().getFullYear();
  let copyright = "\u00A9 " + currentYear + " Zyrab,";

  return html({
    el: "footer",
    children: [
      P({ text: copyright }),
      A({
        style: {
          color: "inherit",
          textDecoration: "none",
          fontStyle: "italic",
        },
        clasS: "md",
        href: link,
        target: "_blank",
        text: linkText,
      }),
    ],
  });
};
