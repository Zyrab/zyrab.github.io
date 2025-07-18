import createIntros from "../../components/common/intro.js";
import createProjectCard from "../../components/projects/project-card.js";
import { fetchJson } from "../../services/fetch.js";
import Domo from "@zyrab/domo";

export default async function createProjects() {
  const intro = [
    "I make things.",
    "Sometimes tools.",
    "Sometimes games.",
    "Sometimes just an idea that needed to exist.",
  ];
  const projects = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/projects/projects.json"
  );

  return Domo("section")
    .cls("flex col ai-c jc-c g-2 min-h-100vh p-1 lg:py-6")
    .child([
      createIntros(intro),
      Domo()
        .cls("flex wrap jc-c g-3 m-auto max-w-81")
        .child(projects.map((project) => createProjectCard(project))),
    ]);
}
