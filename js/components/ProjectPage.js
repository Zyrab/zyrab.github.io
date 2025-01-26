import { com } from "../builder.js";
import { goBack } from "../router.js";

export const ProjectPage = (props) => {
  return com({
    el: "section",
    atr: [{ name: "class", value: "project-page" }],
    children: [
      com({
        el: "button",
        atr: [{ name: "class", value: "btn-default" }],
        text: "Back",
        listeners: [{ event: "click", callback: goBack }],
      }),
      com({ el: "h1", text: "hello there" }),
    ],
  });
};
