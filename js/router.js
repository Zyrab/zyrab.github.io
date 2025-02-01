import { Home } from "./components/Home.js";
import { Projects } from "./components/Projects.js";
import { ProjectPage } from "./components/ProjectPage.js";
import { Contact } from "./components/Contact.js";
import { Error } from "./components/Error.js";

const routes = {
  "/": { component: Home, meta: { title: "Home", description: "Home" } },
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
  "/contact": {
    component: Contact,
    meta: { title: "Contact", description: "Contact" },
  },
  "*": { component: Error, meta: { title: "Error", description: "Error" } },
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
  const { segments, pureUrl } = parseUrl(path);
  const { routeData, params } = matchNestedRoute(segments);
  pushStateGuard(pureUrl);
  setActiveNav(segments[0]);
  await renderPage(routeData, params);
};

const initRouter = async () => {
  const url = window.location.pathname + window.location.hash;
  const { segments, pureUrl } = parseUrl(url);
  const { routeData, params } = matchNestedRoute(segments);
  pushStateGuard(pureUrl);
  setActiveNav(segments[0]);
  await renderPage(routeData, params);
};

export const goBack = () => history.back();

const pushStateGuard = (url) => {
  if (window.location.pathname + window.location.hash !== url) {
    history.pushState(null, null, url);
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

const renderPage = async (routeData, params) => {
  const { component, meta } = routeData;
  const main = document.getElementById("main");
  try {
    const content = await component(params);
    // Ensure the main container is cleared before rendering new content
    main.replaceChildren();

    if (content instanceof HTMLElement) {
      // If the component returns a DOM element, append it directly
      main.appendChild(content);
      document.title = meta.title;
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", meta.description);
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

const parseUrl = (url) => {
  // Remove the hash from the URL explicitly for githab pages to serve index.html
  const pureUrl = url.includes("#") ? url.split("#")[1] : url;
  //removes '/' if it is last character and Split the URL into segments keepinig '/' for nested routes
  const segments = pureUrl
    .replace(/\/$/, "")
    .split(/(?=\/)/g)
    .filter(Boolean);
  return {
    segments,
    pureUrl,
  };
};

const matchNestedRoute = (segments) => {
  // If there are no segments, return the default route
  if (!segments.length)
    return { routeData: routes["/"] || routes["*"], params: {} };
  let current = routes;
  let params = {};
  // Iterate through the segments
  for (const segment of segments) {
    if (current[segment]) {
      // exact match found go deeper
      current = current[segment].children || current[segment];
    } else {
      // look for dynamic route
      const key = Object.keys(current).find((key) => key.includes(":"));
      if (!key) return { routeData: routes["*"], params: {} };
      // extract param value
      const parmName = key.split(":")[1];
      params = { ...params, [parmName]: segment };
      current = current[key];
      if (current.children) {
        current = current.children;
      }
    }
  }
  // we send for rendering default child if component doesnt exists
  let defaultChild = current.component ? current : current["/"] || routes["*"];

  // Return the matched component and parameters
  return { params, routeData: defaultChild };
};

const log = (t, l) => console.log(t + ":", l);
