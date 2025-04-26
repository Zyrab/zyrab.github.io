import { codeParser } from "../../services/codeParser.js";
import { Domo } from "@zyrab/domo";
export const CodeJS = (code, name) => {
  return Domo().child([
    Domo()
      .cls("flex just-sb p-05 bg-greysh")
      .child([
        Domo("p").cls("md").txt(name),
        Domo("span").cls("sm pointer bege copyCode").data({ code }).txt("Copy"),
      ]),
    Domo("pre")
      .cls("p-1 bg-black overflowX-auto md")
      .child([Domo("code").child([codeParser(code, name)])]),
  ]);
};
