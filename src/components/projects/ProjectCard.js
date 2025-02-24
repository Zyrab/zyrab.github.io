import { html, DIV, H, P, IMG } from "../../services/DOMConstructor.js";
import { onReplace } from "../../services/DOMDinamic.js";
import { Button } from "../common/Button.js";
import { EmbdedVideo } from "./EmbdedVideo.js";
import { ProjectImage } from "./ProjectImage.js";
import { Icons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  const video = EmbdedVideo("yq6jek2JwTw?si=tAYid23nNqzBKMs4");

  const title = H("h1", { clasS: "xxl", text: project.title });
  const date = P({ clasS: "md right", text: project.date });
  const description = P({ clasS: "md h-60", text: project.description });
  const button = Button({ text: project.buttonText, icon: project.icon });

  const onImageClick = {
    event: "click",
    callback: (e) => onReplace(e, ".toChange", video),
  };

  return html({
    clasS: "project-card",
    events: [onImageClick],
    children: [
      DIV(
        [ProjectImage(project, project.video ? true : false)],
        (project.video ? "toChange" : "") + " w-100 h-50"
      ),
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
