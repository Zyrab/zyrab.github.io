import { html, H, P } from "../services/DOMConstructor.js";
import { fetchJson } from "../services/fetch.js";
import { BlogCard } from "../components/blog/BlogCard.js";
import { Router } from "../services/router.js";
export const Blog = async () => {
  const blogList = await fetchJson(
    "https://raw.githubusercontent.com/Zyrab/dataZ/refs/heads/main/blogs/blogList.json"
  );
  const handleClick = (e) => {
    e.preventDefault();
    let button = e.target.closest(".blog-card");
    if (button) {
      let slug = button.getAttribute("data-slug");
      Router.go(`/blog/${slug}`);
    }
  };
  return html({
    el: "section",
    clasS: "page",
    events: { click: handleClick },
    children: blogList.map((list) => BlogCard(list)),
  });
};
