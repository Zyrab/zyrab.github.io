import { Domo, Router } from "@zyrab/domo";
import { fetchJson } from "../../services/fetch.js";
import { Card } from "../../components/blog/Card.js";
import { createIntros } from "../../components/common/Intros.js";
const Blog = async () => {
  const intro = [
    "I write what I learn.",
    "Not tutorials",
    "more like breadcrumbs",
    "through the mess of figuring things out.",
  ];
  const blogList = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/blog/blogList.json"
  );
  const handleClick = (e) => {
    e.preventDefault();
    let button = e.target.closest("article");
    if (button) {
      let slug = button.getAttribute("data-slug");
      Router.goTo(`/blog/${slug}`);
    }
  };
  return Domo("section")
    .cls("page flex col")
    .on("click", handleClick)
    .child([
      createIntros(intro),
      Domo()
        .cls("flex wrap just-c align-content-s gap-35")
        .child(blogList.map((list) => Card(list))),
    ])
    .build();
};

export default Blog;
