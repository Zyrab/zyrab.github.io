import { ProjectCard } from "./ProjectCard.js";
import { com } from "../builder.js";
export const Projects = async () => {
  // Fetch the JSON file
  const response = await fetch("../../assets/projects.json");
  const projects = await response.json();
  // Map over the projects and generate HTML

  return com({
    el: "section",
    atr: [{ name: "class", value: "projects" }],
    children: projects.map((project) => ProjectCard(project)),
  });
};
