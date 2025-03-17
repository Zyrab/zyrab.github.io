import { html, DIV, H, P, IMG } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";
import { Icons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  const raw =
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/projects/icons/";
  const title = H("h1", { clasS: "xxl", text: project.ttl });
  const date = P({ clasS: "md right italic", text: project.date });
  const description = P({ clasS: "md h-60", text: project.description });
  const button = project.btn
    ? Button({
        text: project.btn[0],
        icon: project.btn[1],
        data: project.btn[2],
      })
    : "";
  const img = IMG({
    src: raw + project.img,
    alt: project.ttl,
    clasS: "w35 h35",
  });

  return html({
    clasS: "flex col gap-1 p-1 bg-greysh w400",
    children: [
      DIV([img, title], "flex gap-1 align-c"),
      date,
      description,
      html({
        clasS: "flex just-sb",
        children: [
          DIV(
            project.tech.map((tech) => Icons8({ icon: tech })),
            "flex gap-05 pt-05 pb-05"
          ),
          button,
        ],
      }),
    ],
  });
};
