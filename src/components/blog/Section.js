import { Domo } from "@zyrab/domo";
import { CodeJS } from "../common/CodeJS.js";

export const Section = (sec) =>
  Domo()
    .cls("flex col gap-1")
    .child([
      Domo("h2").cls("xl bege").txt(sec.title),
      sec.content.map((con) => {
        let key = Object.keys(con)[0];

        if (key === "ul")
          return Domo("ul").child([
            con.ul.map((p) => Domo("li").child([Domo("p").cls("lg").txt(p)])),
          ]);
        else if (key === "code") return CodeJS(con.code, con.syntax);
        else return Domo("p").cls("lg").txt(con.p);
      }),
    ]);
