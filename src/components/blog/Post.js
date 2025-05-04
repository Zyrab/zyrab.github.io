import { Domo, Router } from "@zyrab/domo";
import { fetchText } from "../../services/fetch.js";
import { parseBlocks } from "../../services/markdown/parseBlocks.js";
import { NotFound } from "./NotFound.js";
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
  const post = await fetchText(
    `https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main${Router.base()}/${slug}.txt`
  );
  const notFound = post === "404: Not Found";
  return Domo("article")
    .cls("blog-post")
    .on("click", handleCopyCode)
    .child([notFound ? NotFound() : parseBlocks(post)])
    .build();
};
