import { ProjectCard } from "../components/projects/ProjectCard.js";
import { html } from "../services/DOMConstructor.js";
export const Projects = async () => {
  // Fetch the JSON file
  const response = await fetch("data/projects.json");
  const projects = await response.json();
  // Map over the projects and generate HTML

  return html({
    el: "section",
    clasS: "projects",
    children: projects.map((project) => ProjectCard(project)),
  });
};
