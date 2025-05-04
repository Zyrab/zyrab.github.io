import { Domo } from "@zyrab/domo";
import { createButton } from "../common/Button.js";
import { createIcons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  const btn = project?.btn || "";
  const raw =
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/projects/icons/";

  return Domo()
    .cls("flex col gap-1 p-1 bg-greysh w400")
    .child([
      Domo()
        .cls("flex gap-1 align-c")
        .child([
          Domo("img")
            .cls("w35 h35")
            .attr({ loading: "lazy", src: raw + project.img, alt: project.ttl })
            .build(),
          Domo("h1").cls("xxl").txt(project.ttl),
        ]),
      Domo("p").cls("md italic right").txt(project.date),
      Domo("p").cls("md h-60").txt(project.description),
      Domo()
        .cls("flex just-sb")
        .child([
          Domo()
            .cls("flex gap-05 pt-05 pb-05")
            .child(project.tech.map((tech) => createIcons8({ icon: tech }))),
          createButton({
            text: btn ? btn[0] : "",
            icon: btn ? btn[1] : "",
            data: btn ? btn[2] : "",
          }).if(btn),
        ]),
    ]);
};
