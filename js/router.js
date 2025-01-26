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

  let link = checkForDinamicRoute(basePath + path);
  setActiveNav(link.parent);
  await renderPage(link.toRender, props);
};

export const goBack = () => history.back();

const initRouter = async () => {
  const fullPath = window.location.pathname + window.location.hash;

  // Extract the base path (e.g., /mySite.dev/)
  const basePath = "/Zyrab.dev";

  // If the path starts with the base path, extract the hash-based route
  if (fullPath.startsWith(basePath)) {
    const hashPath = fullPath.substring(basePath.length).split("#")[1]; // Get content after #

    // Default to "/" if no hashPath is provided
    const activePath = hashPath ? hashPath : "/";
    let link = checkForDinamicRoute(activePath);

    // Push the cleaned hashPath into the history

    // Set the active navigation and render the page
    setActiveNav(link.parent);
    await renderPage(link.toRender, link.child);
  } else {
    // If the base path is incorrect, redirect to the base path
    history.replaceState(null, null, basePath);
    setActiveNav("/");
    await renderPage("/");
  }
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
  let route = {
    parent: isDinamic ? path.substring(0, index) : path,
    child: isDinamic ? path.substring(index + 1) : "",
    toRender: isDinamic ? path.substring(0, index + 1) : path,
  };
  history.pushState(null, null, route.parent + route.child);
  return route;
};
