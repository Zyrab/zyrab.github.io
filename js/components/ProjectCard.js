import { com } from "../builder.js";
import { Button } from "./Button.js";
export const ProjectCard = (project) => {
  return com({
    el: "div",
    atr: [{ name: "class", value: "project-card" }],
    children: [
      com({
        el: "div",
        atr: [{ name: "class", value: "project-card-video" }],
      }),
      com({
        el: "div",
        atr: [{ name: "class", value: "project-card-info" }],
        children: [
          com({
            el: "div",
            atr: [{ name: "class", value: "project-card-header" }],
            children: [
              com({
                el: "h1",
                atr: [{ name: "class", value: "project-card-title" }],
                text: project.title,
              }),
              com({
                el: "p",
                atr: [{ name: "class", value: "project-card-date" }],
                text: project.date,
              }),
            ],
          }),
          com({
            el: "p",
            atr: [{ name: "class", value: "project-card-description" }],
            text: project.description,
          }),
          Button({ rout: project.title }),
        ],
      }),
    ],
  });
};
