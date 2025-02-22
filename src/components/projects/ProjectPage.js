import { html } from "../../services/DOMConstructor.js";
import { goBack } from "../../services/router.js";
import { Button } from "../common/Button.js";
export const ProjectPage = (props) => {
  return html({
    el: "section",
    clasS: "project-page",
    children: [
      Button({ icon: "arrow", text: "Back", onClick: () => goBack() }),
    ],
  });
};
