import { createIntros } from "../../components/common/Intros.js";
import { ProjectCard } from "../../components/projects/ProjectCard.js";
import { fetchJson } from "../../services/fetch.js";
import { Domo } from "@zyrab/domo";
const Projects = async () => {
  const intro = [
    "I make things.",
    "Sometimes tools.",
    "Sometimes games.",
    "Sometimes just an idea that needed to exist.",
  ];
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

  return Domo("section")
    .cls("page col ")
    .child([
      createIntros(intro),
      Domo()
        .cls("flex wrap just-c  gap-35")
        .child(projects.map((project) => ProjectCard(project))),
    ])
    .on("click", handleProjectLink)
    .build();
};

export default Projects;
