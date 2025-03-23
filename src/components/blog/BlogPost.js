import { html, H, P } from "../../services/DOMConstructor.js";
import { CodeJS } from "./CodeJS.js";
import { fetchJson } from "../../services/fetch.js";
export const BlogPost = async (props) => {
  const { slug } = props;

  const handleCopyCode = (e) => {
    let copy = e.target.closest(".copycode");
    if (copy) {
      let code = copy.getAttribute("data-code");
      navigator.clipboard
        .writeText(code)
        .then(() => (copy.textContent = "Copied!"));
      setTimeout(() => (copy.textContent = "Copy"), 1000);
    }
  };
  const post = await fetchJson(
    `https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/blogs/${slug}.json`
  );
  const title = H("h1", { clasS: "xxxl bege", text: post.title });
  const date = P({ clasS: "md", text: post.date });
  const intro = P({ clasS: "xl", text: post.intro });
  const content = (content) => {
    return content.map((item) => {
      let key = Object.keys(item)[0];
      if (key === "ul") return UL(item.ul);
      else if (key === "code") return CodeJS(item.code, item.syntax);
      else return paragraph(item.p);
    });
  };
  const paragraph = (text) => P({ clasS: "lg", text: text });
  const UL = (list) => {
    return html({
      el: "ul",
      children: list.map((item) => {
        return html({ el: "li", children: [paragraph(item)] });
      }),
    });
  };

  const sections = post.sections.map((section) => {
    return html({
      clasS: "flex col gap-1",
      children: [
        H("h2", { clasS: "xl bege", text: section.title }),
        content(section.content),
      ],
    });
  });

  return html({
    el: "article",
    clasS: "blog-post",
    events: { click: handleCopyCode },
    children: [title, date, intro, sections],
  });
};

const post = {
  title: "ttl",
  intro: "intro",
  sections: [
    {
      title: "sec1",
      content: [
        {
          p: "p1",
        },
        {
          p: "p2",
        },
      ],
    },
    {
      title: "sec2",
      content: [
        {
          p: "",
        },
        { code: "", syntax: "html" },
        {
          ul: ["itm1", "itm2", "itm3"],
        },
        {
          code: 'document.addEventListener("click", (e) => {\n\tconst navLink = e.target.closest(".nav-link");\n\tif (navLink) {\n\t\te.preventDefault(); // Stop full-page reload\n\t\tconst route = navLink.getAttribute("data-route");\n\t\tnavigateTo(route);\n\t}\n});',
          syntax: "js",
        },

        { p: "" },
      ],
    },
  ],
};
