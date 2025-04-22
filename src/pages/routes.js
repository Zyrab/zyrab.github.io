import { Home } from "./Home.js";
import { Blog } from "./Blog.js";
import { BlogPost } from "../components/blog/BlogPost.js";
import { Projects } from "./Projects.js";
import { ProjectPage } from "../components/projects/ProjectPage.js";
import { Legal } from "./Legal.js";
import { Error } from "./Error.js";

const routes = {
  "/": {
    component: Home,
    meta: { title: "Home", description: "Home" },
  },
  "/projects": {
    children: {
      "/:id": {
        component: ProjectPage,
        meta: { title: "Projects", description: "Project" },
      },
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
