import { Home } from "./components/Home.js";
import { Projects } from "./components/Projects.js";
import { Contact } from "./components/Contact.js";
import { Error } from "./components/Error.js";

const routes = {
  "/": Home,
  "/projects": Projects,
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

export const navigateTo = async (path) => {
  let githubPath = "/Zyrab.dev" + path
  history.pushState(null, null, githubPath);
  await renderPage(path);
};

const initRouter = async () => {
  const path = window.location.pathname;
  setActiveNav('/');
  await renderPage('/');
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

const renderPage = async (path) => {
  const main = document.getElementById("main");
  try {
    const Component = routes[path] || routes["*"];
    const content = await Component();

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
