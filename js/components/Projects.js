import { ProjectCard } from "./ProjectCard.js";
import { com } from "../builder.js";
import { navigateTo } from "../router.js";
export const Projects = async () => {
  // Fetch the JSON file
  const response = await fetch("assets/projects.json");
  const projects = await response.json();
  // Map over the projects and generate HTML

  return com({
    el: "section",
    atr: [{ name: "class", value: "projects" }],
    listeners: [
      {
        event: "click",
        callback: (e) => {
          e.preventDefault();
          let route =
            "/projects/" +
            e.target.closest("button").getAttribute("data-route");
          navigateTo(route);
        },
      },
    ],
    children: projects.map((project) => ProjectCard(project)),
  });
};
