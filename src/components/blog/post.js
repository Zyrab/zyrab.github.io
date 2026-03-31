import Domo from "@zyrab/domo";
import Router from "@zyrab/domo-router";
import { fetchText } from "../../services/fetch.js";
import { parseBlocks } from "../../services/markdown/parse-blocks.js";
import { copyCode } from "../../handlers/handle-copy-code.js";

export default async function createPost(props) {
  const { slug } = props;

  const post = await fetchText(`/public/data/${Router.base()}/${slug}.txt`);

  return Domo("article")
    .cls("flex col g-2 p-1 lg:py-6 m-auto max-w-40")
    .id("article-click")
    .onClosest("click", { ".copyCode": copyCode })
    .child([parseBlocks(post)]);
}
