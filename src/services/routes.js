import { Home } from "../pages/Home.js";
import { Blog } from "../pages/Blog.js";
import { Post as BlogPost } from "../components/blog/Post.js";
import { Projects } from "../pages/Projects.js";
import { Legal } from "../pages/Legal.js";
import { Error } from "../pages/Error.js";

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
