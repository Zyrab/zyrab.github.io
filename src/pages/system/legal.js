import Domo from "@zyrab/domo";
import { fetchJson } from "../../services/fetch.js";
import createCard from "../../components/blog/card.js";
import createIntros from "../../components/common/intro.js";

export default async function createBugs() {
  const intro = ["Choose an App name", "You want to see a Privacy Policy for,"];
  const privacyList = await fetchJson("/public/data/privacy-policy.json");

  return Domo("section")
    .cls("flex col ai-c jc-c g-2 min-h-100vh p-1 lg:py-6")
    .id("pivacy-page-click")
    .child([
      createIntros(intro),
      Domo()
        .cls("flex col ai-c g-3.5")
        .child(privacyList.map((list) => createCard(list, "privacy-policy"))),
    ]);
}
