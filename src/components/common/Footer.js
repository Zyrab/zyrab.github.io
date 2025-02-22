import { A, html, P } from "../../services/DOMConstructor.js";
export const Footer = () => {
  let link = "https://github.com/Zyrab";
  let linkText = "icons by icons8";

  let copyright = "© 2023 Zyrab";

  return html({
    el: "footer",
    children: [
      P({ text: copyright }),
      A({
        style: { color: "inherit", uderline: "1px" },
        clasS: "sm",
        href: link,
        target: "_blank",
        text: linkText,
      }),
    ],
  });
};
