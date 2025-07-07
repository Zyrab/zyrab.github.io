import { Domo } from "@zyrab/domo";
import { createIcons8 } from "../common/Icons8.js";
export const createFooter = () => {
  const currentYear = new Date().getFullYear();
  const links = ({ icon, link, text }) =>
    Domo()
      .cls("flex align-c gap-05")
      .child([
        createIcons8({ icon, link }),
        Domo("a").cls("sm hover-white decoration-none inherit").attr({ href: link, target: "_blank" }).txt(text),
      ]);

  return Domo("footer")
    .cls("flex col just-c")
    .child([
      Domo()
        .cls("flex align-c gap-1")
        .child([
          Domo("p")
            .cls("sm")
            .txt("\u00A9 " + currentYear + " Zyrab,"),
          Domo("a")
            .cls("md hover-white italic decoration-none inherit")
            .attr({
              href: "https://icons8.com",
              target: "_blank",
            })
            .txt("icons by icons8")
            .build(),
        ]),
      Domo().cls("flex align-c gap-1 p-1").child(data.map(links)),
    ])
    .build();
};

const data = [
  {
    icon: "gh",
    link: "https://github.com/Zyrab",
    text: "/Zyrab",
  },
  {
    icon: "lnkdn",
    link: "https://www.linkedin.com/in/zurakruashvili/",
    text: "/in/Zyrab/",
  },
  { icon: "gmail", link: "mailto:hello@zyrab.dev", text: "hello@zyrab.dev" },
];
