import Domo from "@zyrab/domo";
import { fetchJson } from "../../services/fetch.js";
import createCard from "../../components/blog/card.js";
import createIntros from "../../components/common/intro.js";
export default async function createBlog() {
  const intro = [
    "I write what I learn.",
    "Not tutorials",
    "more like breadcrumbs",
    "through the mess of figuring things out.",
  ];
  const blogList = await fetchJson("/public/data/blog-list.json");

  return Domo("section")
    .cls("flex col g-2 py-3 px-1 lg:py-6 min-h-100vh")
    .id("blog-page-click")
    .child([
      createIntros(intro),
      Domo("div")
        .cls("flex wrap jc-s g-3 m-auto max-w-65")
        .child(blogList.map((list) => createCard(list))),
    ]);
}
