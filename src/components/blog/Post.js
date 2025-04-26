import { Domo } from "@zyrab/domo";
import { Section } from "./Section.js";
import { fetchJson } from "../../services/fetch.js";
export const Post = async (props) => {
  const { slug } = props;

  const handleCopyCode = (e) => {
    let copy = e.target.closest(".copyCode");
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

  return Domo("article")
    .cls("blog-post")
    .on("click", handleCopyCode)
    .child([
      Domo("h1").cls("xxxl bege").txt(post.title),
      Domo("p").cls("md").txt(post.date),
      Domo("p").cls("xl").txt(post.intro),
      post.sections.map((section) => Section(section)),
    ])
    .build();
};
