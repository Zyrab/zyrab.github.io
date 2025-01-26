import { com } from "../builder.js";
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
          com({
            el: "button",
            atr: [
              {
                name: "class",
                value: "btn-default",
              },
              { value: "data-route", value: project.id },
              { name: "type", value: "button" },
            ],
            text: "View Project",
          }),
        ],
      }),
    ],
  });
};
