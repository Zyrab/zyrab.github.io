import { Domo, Router } from "@zyrab/domo";
import { fetchJson } from "../../services/fetch.js";
import { Card } from "../../components/blog/Card.js";
import { createIntros } from "../../components/common/Intros.js";

const Bugs = async () => {
  const intro = [
    "Not everything works the first time.",
    "These are the breaks,",
    "the bugs,",
    "the better-next-times.",
  ];
  const blogList = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/bugs/bugList.json"
  );

  const handleClick = (e) => {
    e.preventDefault();
    let button = e.target.closest(".link");
    if (button) {
      let slug = button.getAttribute("href");
      Router.goTo(slug);
    }
  };

  return Domo("section")
    .cls("page flex col")
    .on("click", handleClick)
    .child([
      createIntros(intro),
      Domo()
        .cls("flex col align-c gap-35")
        .child(blogList.map((list) => Card(list))),
    ])
    .build();
};

export default Bugs;
