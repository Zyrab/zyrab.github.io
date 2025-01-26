import { Home } from "./components/Home.js";
import { Projects } from "./components/Projects.js";
import { ProjectPage } from "./components/ProjectPage.js";
import { Contact } from "./components/Contact.js";
import { Error } from "./components/Error.js";

const routes = {
  "/": Home,
  "/projects": Projects,
  "/projects:": ProjectPage,
  "/contact": Contact,
  "*": Error,
};

export const router = () => {
  const main = document.createElement("main");
  main.id = "main";
  return main;
};

export const initializeRouter = () => {
  ["DOMContentLoaded", "popstate"].forEach((event) =>
    window.addEventListener(event, initRouter)
  );
};

export const navigateTo = async (path, props) => {
  const basePath = "/Zyrab.dev";

  let link = checkForDinamicRoute(path);
  let newPath = link.parent + link.child;
  if (window.location.pathname + window.location.hash !== basePath + newPath) {
    history.pushState(null, null, basePath + newPath);
  }
  setActiveNav(link.parent);
  await renderPage(link.toRender, props);
};

export const goBack = () => history.back();

const initRouter = async () => {
  const fullPath = window.location.pathname + window.location.hash;
  console.log("fullPath: ", fullPath);

  // Extract the hash-based route if it exists
  const basePath = "/Zyrab.dev"; // e.g., the base path for your SPA
  const hashPath = fullPath.substring(basePath.length).split("#")[1]; // Get content after #
  console.log("hashPath: ", hashPath);

  // Determine the active path (use "/" if no hash or path is provided)
  const activePath =
    hashPath.substring(basePath.length) ||
    fullPath.substring(basePath.length) ||
    "/";

  // Parse dynamic route
  let link = checkForDinamicRoute(activePath);
  console.log("link: ", link);

  // Only push a new state if the current path is different
  const newPath = link.parent + link.child;
  if (window.location.pathname + window.location.hash !== basePath + newPath) {
    history.pushState(null, null, basePath + newPath);
  }

  // Update navigation and render the page
  setActiveNav(link.parent);
  await renderPage(link.toRender, link.child);
};

const setActiveNav = (route) => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const svg = link.children[0];
    svg &&
      svg.classList.toggle(
        "current",
        link.getAttribute("data-route") === route
      );
  });
};

const renderPage = async (path, props) => {
  const main = document.getElementById("main");
  try {
    const Component = routes[path] || routes["*"];
    const content = await Component(props);
    // Ensure the main container is cleared before rendering new content
    main.replaceChildren();

    if (content instanceof HTMLElement) {
      // If the component returns a DOM element, append it directly
      main.appendChild(content);
    } else if (typeof content === "string") {
      // If the component returns a string, create a text node to prevent XSS
      const wrapper = document.createElement("div");
      wrapper.textContent = content; // Set content as plain text
      main.appendChild(wrapper);
    } else {
      throw new Error("Unsupported component output type");
    }
  } catch (error) {
    console.error("Rendering error:", error);

    // Render a fallback error message safely
    main.replaceChildren();
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Something went wrong. Please try again later.";
    main.appendChild(errorMessage);
  }
};

const checkForDinamicRoute = (path) => {
  let index = path.indexOf(":");
  let isDinamic = index !== -1;
  return {
    parent: isDinamic ? path.substring(0, index) : path,
    child: isDinamic ? path.substring(index + 1) : "",
    toRender: isDinamic ? path.substring(0, index + 1) : path,
  };
};
