import { ProjectCard } from "./ProjectCard.js";

export const Projects = async () => {
  // Fetch the JSON file
  const response = await fetch("../../assets/projects.json");
  const projects = await response.json();
  // Map over the projects and generate HTML

  const projectsContainer = document.createElement("section");
  projectsContainer.classList.add("projects");

  const projectCards = projects.map((project) =>
    projectsContainer.appendChild(ProjectCard(project))
  );
  return projectsContainer;
};
