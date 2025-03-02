import { Button } from "../components/common/Button.js";
import { navigateTo } from "../services/router.js";
import { html, P, DIV, H } from "../services/DOMConstructor.js";
export const Error = (props) => {
  const back = Button({ text: "Back", onClick: () => navigateTo("/") });

  const p = P({
    clasS: "lg",
    text: "The page you are looking for does not exist or has been moved",
  });

  const h1 = H("h1", {
    clasS: "xxxl",
    text: "404 Not Found",
  });

  return html({
    el: "section",
    clasS: "page",
    children: [DIV([h1, p, back], "flex col align-c gap-2")],
  });
};
