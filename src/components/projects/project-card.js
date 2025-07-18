import Domo from "@zyrab/domo";
import createButton from "../common/button.js";
import createIcon from "../common/icon.js";
export default function createProjectCard(project) {
  const btn = project?.btn || "";
  const raw = "/assets/project-icons/";

  return Domo("article")
    .cls("flex col g-1 p-1 bg-pprim max-w-25")
    .attr({ "aria-labelledby": `project-title-${project.id}` })
    .child([
      Domo()
        .cls("flex g-1 ai-c")
        .child([
          Domo("img")
            .cls("w-2.125r h-2.125r")
            .attr({ loading: "lazy", src: raw + project.img, alt: "" }),
          Domo("h3").cls("xxl").id(`project-title-${project.id}`).txt(project.ttl),
        ]),
      Domo("p").cls("md italic").txt(project.date),
      Domo("p").cls("lg").txt(project.description),
      Domo()
        .cls("flex jc-sb")
        .child([
          Domo()
            .cls("flex g-0.5 py-0.5")
            .child(project.tech.map((tech) => createIcon({ icon: tech }))),
          createButton({
            text: btn ? btn[0] : "",
            icon: btn ? btn[1] : "",
            data: btn ? btn[2] : "",
          }).if(btn),
        ]),
    ]);
}
