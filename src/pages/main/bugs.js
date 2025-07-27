import Domo from "@zyrab/domo";
import { fetchJson } from "../../services/fetch.js";
import createCard from "../../components/blog/card.js";
import createIntros from "../../components/common/intro.js";

export default async function createBugs() {
  const intro = [
    "Not everything works the first time.",
    "These are the breaks,",
    "the bugs,",
    "the better-next-times.",
  ];
  const blogList = await fetchJson("/public/data/bug-list.json");

  return Domo("section")
    .cls("flex col ai-c jc-c g-2 min-h-100vh p-1 lg:py-6")
    .id("bug-page-click")
    .child([
      createIntros(intro),
      Domo()
        .cls("flex col ai-c g-3.5")
        .child(blogList.map((list) => createCard(list))),
    ]);
}
