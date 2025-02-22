import { html, DIV, H, P, IMG } from "../../services/DOMConstructor.js";
import { Button } from "../common/Button.js";
import { EmbdedVideo } from "../common/EmbdedVideo.js";
import { Icons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  const video = html({
    clasS: "w-100 h-40",
    children: [
      "video",
      // EmbdedVideo(
      //   "https://www.youtube.com/embed/yq6jek2JwTw?si=tAYid23nNqzBKMs4"
      // ),
    ],
  });

  const title = H("h1", { clasS: "xxl", text: project.title });
  const date = P({ clasS: "md right", text: project.date });
  const description = P({ clasS: "md h-60", text: project.description });
  const button = Button({ text: project.buttonText, icon: project.icon });
  const image = IMG({
    src: "assets/numbero.png",
    alt: project.title,
    ID: project.id,
    clasS: "w-100 h-100",
  });
  const onImageClick = {
    event: "click",
    callback: (e) => {
      let image = e.target.closest(".toChange");
      if (image) {
        console.log(e.target);
        image.replaceChildren();
        image.classList.remove("toChange");
        image.append(video);
      }
    },
  };

  return html({
    clasS: "project-card",
    events: [onImageClick],
    children: [
      DIV([image], "toChange w-100 h-40"),
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
