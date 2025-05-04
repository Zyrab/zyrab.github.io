import Home from "./main/Home.js";
import Projects from "./main/Projects.js";
import Blog from "./main/Blog.js";
import Bugs from "./main/Bug.js";
import { Post as BlogPost } from "../components/blog/Post.js";
import Legal from "./system/Legal.js";
import Error from "./system/Error.js";

const routes = {
  "/": {
    component: Home,
    meta: { title: "Home", description: "Home" },
  },
  "/projects": {
    children: {
      "/": {
        component: Projects,
        meta: { title: "Projects", description: "Projects" },
      },
    },
  },
  "/blog": {
    children: {
      "/:slug": {
        component: BlogPost,
        meta: { title: "Blog", description: "Blog" },
      },
      "/": {
        component: Blog,
        meta: { title: "Blog", description: "Blog" },
      },
    },
  },
  "/bugs": {
    children: {
      "/:slug": {
        component: BlogPost,
        meta: { title: "Bugs", description: "Blog" },
      },
      "/": {
        component: Bugs,
        meta: { title: "Bugs", description: "Bugs" },
      },
    },
  },
  "/legal": {
    children: {
      "/:legal": {
        children: {
          "/:app": {
            component: Legal,
            meta: {
              title: "Privacy Policy",
              description: "Privacy Policy",
            },
          },
        },
      },
      "/": {
        component: Legal,
      },
    },
  },
  "*": {
    component: Error,
    meta: {
      title: "Error",
      description: "Page you are looking for does not exist",
    },
  },
};

export { routes };
