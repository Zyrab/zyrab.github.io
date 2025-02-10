import { com } from "../services/builder.js";

export const Legal = async (props) => {
  const dynamicText = (text, placeholders) => {
    return text.replace(/\${(.*?)}/g, (_, key) => placeholders[key] || "");
  };
  const response = await fetch(`../../data/${props.legal}.json`);
  const legals = await response.json();
  const thisApp = legals[props.app];
  return com({
    el: "section",
    children: [
      com({
        atr: [{ name: "class", value: "w-100 p-2 left flex col gap-1" }],
        children: [
          com({
            el: "h1",
            atr: [{ name: "class", value: "xxxl" }],
            text: legals.title,
          }),
          com({
            el: "hr",
          }),
          com({
            el: "p",
            atr: [{ name: "class", value: "xxl" }],
            text: dynamicText(legals.intro, {
              "app-name": thisApp.name,
              "app-type": thisApp.type,
            }),
          }),
          com({
            children: thisApp.text.map((item) => content(item)),
          }),
          com({
            el: "hr",
            style: { border: "none", borderTop: "1px dashed ", width: "100%" },
          }),
          com({
            el: "p",
            atr: [{ name: "class", value: "xl" }],
            text: dynamicText(legals.contact, {
              "app-name": thisApp.name,
            }),
          }),
          com({
            el: "p",
            atr: [{ name: "class", value: "xxl" }],
            text: dynamicText(legals.conclusion, {
              "app-name": thisApp.name,
            }),
          }),
        ],
      }),
    ],
  });
};

const content = (content) => {
  return com({
    atr: [{ name: "class", value: "flex col gap-1" }],
    children: [
      com({
        el: "h3",
        atr: [{ name: "class", value: "xxl" }],
        text: content.title,
      }),
      com({
        el: "hr",
        style: { border: "none", borderTop: "1px dashed ", width: "100%" },
      }),
      com({
        el: "p",
        atr: [{ name: "class", value: "xl" }],
        text: content.text,
      }),
    ],
  });
};
