import { html, H, P } from "../services/DOMConstructor.js";
import { fetchJson } from "../services/fetch.js";
import { BlogCard } from "../components/blog/BlogCard.js";
import { navigateTo } from "../services/router.js";
export const Blog = async () => {
  const blogList = await fetchJson("data/blogs/blogList.json");
  const handleClick = (e) => {
    e.preventDefault();
    let button = e.target.closest("button");
    if (button) {
      let slug = button.getAttribute("data-slug");
      navigateTo(`/blog/${slug}`);
    }
  };
  return html({
    el: "section",
    events: { click: handleClick },
    children: blogList.map((list) => BlogCard(list)),
  });
};
