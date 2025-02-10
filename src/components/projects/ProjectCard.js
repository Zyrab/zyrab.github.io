import { com } from "../../services/builder.js";
import { Button } from "../common/Button.js";
import { EmbdedVideo } from "../common/EmbdedVideo.js";
import { Icons8 } from "../common/Icons8.js";
export const ProjectCard = (project) => {
  return com({
    el: "div",
    atr: [{ name: "class", value: "project-card" }],
    children: [
      com({
        el: "div",
        atr: [{ name: "class", value: "w-100 h-40" }],
        children: [
          // EmbdedVideo(
          //   "https://www.youtube.com/embed/yq6jek2JwTw?si=tAYid23nNqzBKMs4"
          // ),
        ],
      }),
      com({
        el: "div",
        atr: [{ name: "class", value: "flex col just-sb gap-1 h-60 p-1" }],

        children: [
          com({
            el: "div",
            children: [
              com({
                el: "h1",
                atr: [{ name: "class", value: "xxl" }],
                text: project.title,
              }),
              com({
                el: "p",
                atr: [{ name: "class", value: "md right" }],
                text: project.date,
              }),
            ],
          }),
          com({
            el: "p",
            atr: [{ name: "class", value: "md h-60" }],
            text: project.description,
          }),
          com({
            el: "div",
            atr: [{ name: "class", value: "flex just-sb" }],
            children: [
              com({
                el: "div",
                atr: [{ name: "class", value: "flex col just-sb" }],
                children: [
                  com({
                    el: "p",
                    atr: [{ name: "class", value: "md" }],
                    text: "Tech",
                  }),
                  com({
                    atr: [{ name: "class", value: "flex gap-05" }],

                    children: project.tech.map((tech) =>
                      Icons8({ icon: tech })
                    ),
                  }),
                ],
              }),
              com({
                el: "div",
                children: [
                  com({
                    el: "p",
                    atr: [{ name: "class", value: "md" }],
                    text: "Live On",
                  }),
                  Button({ text: project.buttonText, icon: project.icon }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
