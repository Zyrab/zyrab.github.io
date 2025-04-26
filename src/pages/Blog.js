import { Domo, Router } from "@zyrab/domo";
import { fetchJson } from "../services/fetch.js";
import { Card } from "../components/blog/Card.js";
export const Blog = async () => {
  const blogList = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/blogs/blogList.json"
  );
  const handleClick = (e) => {
    e.preventDefault();
    let button = e.target.closest(".blog-card");
    if (button) {
      let slug = button.getAttribute("data-slug");
      Router.goTo(`/blog/${slug}`);
    }
  };
  return Domo("section")
    .cls("page")
    .on("click", handleClick)
    .child(blogList.map((list) => Card(list)))
    .build();
};
