import Domo from "@zyrab/domo";
import Router from "@zyrab/domo-router";
import { fetchText } from "../../services/fetch.js";
import { parseBlocks } from "../../services/markdown/parseBlocks.js";

export default async function createPost(props) {
  const { slug } = props;

  const handleCopyCode = (e) => {
    let copy = e.target.closest(".copyCode");
    if (copy) {
      let code = copy.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => (copy.textContent = "Copied!"));
      setTimeout(() => (copy.textContent = "Copy"), 1000);
    }
  };
  const post = await fetchText(
    `https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main${Router.base()}/${slug}.txt`
  );

  return Domo("article")
    .cls("flex col g-2 py-3 px-1 lg-py-6 m-auto max-w-40 ")
    .id("article-click")
    .on("click", handleCopyCode)
    .child([parseBlocks(post)]);
}
