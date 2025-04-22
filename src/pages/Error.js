import { Button } from "../components/common/Button.js";
import { Router } from "../services/router.js";
import { html, P, DIV, H } from "../services/DOMConstructor.js";
export const Error = () => {
  const h1 = H("h1", {
    clasS: "xxl",
    text: "404 Lost in Cyberspace",
  });

  const p = P({
    clasS: "xl",
    text: "Looks like you're lost in the void. Here, take this wormhole instead!",
  });

  const back = Button({
    text: "warp",
    icon: "warp",
    onClick: () => Router.go("/"),
  });

  return html({
    el: "section",
    clasS: "page",
    children: [DIV([h1, p, back], "flex col align-c gap-2")],
  });
};
