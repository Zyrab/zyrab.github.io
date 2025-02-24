import { html, DIV, H, P, SWAPPER } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";
import { ProjectImage } from "./ProjectImage.js";
import { Icons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  const title = H("h1", { clasS: "xxl", text: project.title });
  const date = P({ clasS: "md right", text: project.date });
  const description = P({ clasS: "md h-60", text: project.description });
  const button = Button({ text: project.buttonText, icon: project.icon });

  return html({
    clasS: "project-card",
    children: [
      SWAPPER({
        children: [ProjectImage(project)],
        clasS: (project.video ? "toChange" : "") + " w-100 h-50",
        data: project.video,
      }),
      html({
        clasS: "flex col just-sb gap-1 h-60 p-1",
        children: [
          DIV([title, date]),
          description,
          html({
            clasS: "flex just-sb",
            children: [
              html({
                clasS: "flex col just-sb",
                children: [
                  P({ clasS: "md", text: "Tech" }),
                  DIV(
                    project.tech.map((tech) => Icons8({ icon: tech })),
                    "flex gap-05 pt-05 pb-05"
                  ),
                ],
              }),
              DIV([P({ clasS: "md", text: "Live On" }), button]),
            ],
          }),
        ],
      }),
    ],
  });
};
