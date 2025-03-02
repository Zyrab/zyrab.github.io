import { html, H, P } from "../../services/DOMConstructor.js";
import { CodeJS } from "./CodeJS.js";
import { fetchJson } from "../../services/fetch.js";
export const BlogPost = async (props) => {
  const { slug } = props;

  const handleCopyCode = (e) => {
    let button = e.target.closest(".copycode");
    if (button) {
      let code = button.getAttribute("data-code");
      navigator.clipboard
        .writeText(code)
        .then(() => (button.textContent = "Copied!"));
      setTimeout(() => (button.textContent = "Copy"), 1000);
    }
  };
  const post = await fetchJson(`../../data/blogs/${slug}.json`);
  const title = H("h1", { clasS: "xxxl bege", text: post.title });
  const date = P({ clasS: "md", text: post.date });
  const intro = P({ clasS: "xl", text: post.intro });
  const content = (content) => {
    return content.map((item) => {
      let key = Object.keys(item)[0]; // Extract the first (and only) key
      if (key === "ul") return UL(item.ul);
      else if (key === "code") return CodeJS(item.code, item.syntax);
      else return paragraph(item.p);
    });
  };
  const paragraph = (text) => P({ clasS: "lg", text: text });
  const UL = (list) => {
    console.log(list);
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
