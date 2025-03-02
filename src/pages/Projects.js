import { ProjectCard } from "../components/projects/ProjectCard.js";
import { html } from "../services/DOMConstructor.js";
import { onReplace } from "../services/DinamicDOM.js";
import { EmbdedVideo } from "../components/projects/EmbdedVideo.js";
export const Projects = async () => {
  const response = await fetch("data/projects.json");
  const projects = await response.json();
  const handlePlayVideo = (e) => onReplace(e, ".toChange", EmbdedVideo);
  return html({
    el: "section",
    clasS: "page",
    events: { click: handlePlayVideo },
    children: projects.map((project) => ProjectCard(project)),
  });
};
