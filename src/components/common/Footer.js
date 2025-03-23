import { A, html, P, DIV } from "../../services/DOMConstructor.js";
import { Icons8 } from "./Icons8.js";
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const data = [
    {
      icon: "gh",
      link: "https://github.com/Zyrab",
      text: "github.com/Zyrab",
    },
    {
      icon: "lnkdn",
      link: "https://www.linkedin.com/in/zurakruashvili/",
      text: "/in/Zyrab/",
    },
    { icon: "gmail", link: "mailto:hello@zyrab.dev", text: "hello@zyrab.dev" },
  ];
  const links = ({ icon, link, text }) =>
    DIV(
      [
        Icons8({ icon, link }),
        A({
          clasS: "sm hover-white decoration-none inherit",
          href: link,
          target: "_blank",
          text,
        }),
      ],
      "flex align-c gap-05"
    );
  return html({
    el: "footer",
    clasS: "flex col just-c",
    children: [
      DIV(
        [
          P({ text: "\u00A9 " + currentYear + " Zyrab," }),
          A({
            clasS: "md hover-white italic decoration-none inherit",
            href: "https://icons8.com",
            target: "_blank",
            text: "icons by icons8",
          }),
        ],
        "flex align-c gap-1 "
      ),
      DIV(data.map(links), "flex align-c gap-1 p-1"),
    ],
  });
};
