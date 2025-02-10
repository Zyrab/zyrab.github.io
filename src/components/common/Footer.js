import { com } from "../../services/builder.js";
export const Footer = () => {
  let link = "https://github.com/Zyrab";
  let linkText = "icons by Zyrab";

  let copyright = "© 2023 Zyrab";

  return com({
    el: "footer",
    children: [
      com({ el: "p", text: copyright }),
      com({
        el: "a",
        atr: [
          { name: "href", value: link },
          { name: "target", value: "_blank" },
        ],
        text: linkText,
      }),
    ],
  });
};
