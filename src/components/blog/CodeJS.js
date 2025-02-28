import { html, DIV, P } from "../../services/DOMConstructor.js";
import { codeParser } from "./codeParser.js";
export const CodeJS = (code, name) => {
  return DIV([
    DIV(
      [P({ text: name }), P({ text: "Copy" })],
      "flex just-sb p-05 bg-greysh"
    ),
    html({
      el: "pre",
      clasS: "p-1 bg-black overflowX-auto",
      children: [
        html({
          el: "code",
          children: [codeParser(code, name)],
        }),
      ],
    }),
  ]);
};
