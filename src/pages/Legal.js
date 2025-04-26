import { Domo } from "@zyrab/domo";
import { fetchJson } from "../services/fetch.js";

export const Legal = async (props) => {
  const dynamicText = (text, placeholders) => {
    return text.replace(/\${(.*?)}/g, (_, key) => placeholders[key] || "");
  };
  console.log(props.legal, props.app);

  const legals = await fetchJson(`../../data/${props.legal}.json`);
  const thisApp = legals[props.app];

  return Domo("section")
    .cls("page")
    .child([
      Domo()
        .cls("w-100 p-1 left flex col gap-2 legal")
        .child([
          Domo("h1").cls("xxl").txt(legals.title),
          Domo("hr"),
          Domo("p")
            .cls("xl")
            .txt(
              dynamicText(legals.intro, {
                "app-name": thisApp.name,
                "app-type": thisApp.type,
              })
            ),
          thisApp.text.map((item) => content(item)),
          Domo("hr").css({
            border: "none",
            borderTop: "1px dashed ",
            width: "100%",
          }),
          Domo("p")
            .cls("xl")
            .txt(
              dynamicText(legals.contact, {
                "app-name": thisApp.name,
              })
            ),
          Domo("p")
            .cls("xl")
            .txt(
              dynamicText(legals.conclusion, {
                "app-name": thisApp.name,
              })
            ),
        ]),
    ])
    .build();
};

const content = (con) =>
  Domo()
    .cls("flex col gap-1")
    .child([
      Domo("h3").cls("xl").txt(con.title),
      Domo("hr").css({
        border: "none",
        borderTop: "1px dashed ",
        width: "100%",
      }),
      Domo("p").cls("lg").txt(con.text),
    ]);
