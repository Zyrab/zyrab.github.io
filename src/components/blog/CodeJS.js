import { html, DIV, P } from "../../services/DOMConstructor.js";
import { codeParser } from "./codeParser.js";
export const CodeJS = (code, name) => {
  return DIV([
    DIV(
      [
        P({ text: name, clasS: "md bege" }),
        html({
          children: ["Copy"],

          clasS: "copycode sm pointer bege",
          attributes: { "data-code": code },
        }),
      ],
      "flex just-sb p-05 bg-greysh"
    ),
    html({
      el: "pre",
      clasS: "p-1 bg-black overflowX-auto md",
      children: [
        html({
          el: "code",
          children: [codeParser(code, name)],
        }),
      ],
    }),
  ]);
};
