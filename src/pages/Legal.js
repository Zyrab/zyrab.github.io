import { html, H, P } from "../services/DOMConstructor.js";

export const Legal = async (props) => {
  const dynamicText = (text, placeholders) => {
    return text.replace(/\${(.*?)}/g, (_, key) => placeholders[key] || "");
  };
  const response = await fetch(`../../data/${props.legal}.json`);
  const legals = await response.json();
  const thisApp = legals[props.app];
  return html({
    el: "section",
    children: [
      html({
        clasS: "w-100 p-1 left flex col gap-2 legal",
        children: [
          H("h1", { clasS: "xxl", text: legals.title }),
          html({ el: "hr" }),
          P({
            clasS: "xl",
            text: dynamicText(legals.intro, {
              "app-name": thisApp.name,
              "app-type": thisApp.type,
            }),
          }),
          thisApp.text.map((item) => content(item)),
          html({
            el: "hr",
            style: { border: "none", borderTop: "1px dashed ", width: "100%" },
          }),
          P({
            clasS: "lg",
            text: dynamicText(legals.contact, {
              "app-name": thisApp.name,
            }),
          }),
          P({
            clasS: "xl",
            text: dynamicText(legals.conclusion, {
              "app-name": thisApp.name,
            }),
          }),
        ],
      }),
    ],
  });
};

const content = (con) => {
  return html({
    clasS: "flex col gap-1",
    children: [
      H("h3", { clasS: "xl", text: con.title }),
      html({
        el: "hr",
        style: { border: "none", borderTop: "1px dashed ", width: "100%" },
      }),
      P({ clasS: "lg", text: con.text }),
    ],
  });
};
