import createHome from "./main/home.js";
import createProjects from "./main/projects.js";
import createBlog from "./main/blog.js";
import createBugs from "./main/bugs.js";
import createPost from "../components/blog/post.js";
import Legal from "./system/legal.js";
import createGame from "./main/game.js";
import createError from "./system/error.js";

import { fetchJson } from "../services/fetch.js";

const routes = {
  "/": {
    component: createHome,
    meta: {
      title: "Zyrab - Dev, Builder, Curious soul",
      description:
        "Zyrab is a developer building indie tools, mobile Apps, and more. Explore projects built with code-first precision.",
      ogdescription: "Explore the work of Zyrab - tools, apps, and ideas, all in one place.",
    },
  },
  "/star-defence": {
    component: createGame,
    scripts: ["game.js"],
    styles: ["game.css"],
    meta: {
      title: "Star Defence - Zyrab ",
      description: 'a min game that i created out of curiosity. "-can i make a game ? "',
    },
  },
  "/projects": {
    component: createProjects,
    meta: {
      title: "Projects - Zyrab",
      description:
        "A collection of experiments, apps, and tools I've built. Code-driven, design-conscious, and always in motion.",
    },
  },
  "/blog": {
    component: createBlog,
    meta: {
      title: "Blog - Zyrab",
      description: "Thoughts on dev, design, systems, and everything in between. Less fluff, more substance.",
    },
    "/:slug": {
      routeParams: async () => await fetchJson("/public/data/blog-list.json"),
      component: createPost,
      styles: ["markdown.css"],
      fonts: [{ href: "vt323.woff2", preload: true }],
      meta: { title: "Blog", description: "Blog", type: "article" },
    },
  },
  "/bugs": {
    component: createBugs,
    meta: {
      title: "Bugs - Zyrab",
      description:
        "Not everything goes right. A transparent collection of bugs, breakdowns, and what I learned fixing them.",
    },
    "/:slug": {
      routeParams: async () => await fetchJson("/public/data/bug-list.json"),
      component: createPost,
      styles: ["markdown.css"],
      fonts: [{ href: "vt323.woff2", preload: true }],
      meta: { title: "Bugs", description: "Blog", type: "article" },
    },
  },
  // "/legal": {
  //   component: Legal,
  //   "/:legal": {
  //     "/:app": {
  //       component: Legal,
  //       meta: {
  //         title: "Privacy Policy – Zyrab",
  //         description: "The legal stuff. Learn how I handle data and privacy across my projects.",
  //       },
  //     },
  //   },
  // },
  "*": {
    component: createError,
    meta: {
      title: "404 - Page Not Found",
      description: "The page you're looking for doesn't exist. Maybe check out some projects instead?",
    },
  },
};

export { routes };
