import { ProjectCard } from "../components/projects/ProjectCard.js";
import { html } from "../services/DOMConstructor.js";
import { fetchJson } from "../services/fetch.js";
export const Projects = async () => {
  const projects = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/projects/projects.json"
  );
  const handleProjectLink = (e) => {
    e.preventDefault();
    let button = e.target.closest("button");
    if (button) {
      let link = button.getAttribute("data-btn");
      if (link) {
        window.open(link, "_blank");
      }
    }
  };
  return html({
    el: "section",
    clasS: "page",
    events: { click: handleProjectLink },
    children: projects.map((project) => ProjectCard(project)),
  });
};
