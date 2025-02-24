export const html = ({
  el = "div",
  clasS,
  ID,
  attributes = {},
  events = [],
  style = {},
  ns = null, // Add `ns` prop for namespace
  children = [],
}) => {
  let element = createElement(el, ns);
  setClassList(element, clasS);
  ID && (element.id = ID);
  setAttributes(element, attributes);
  addEventListeners(element, events);
  appendChildren(element, children);
  Object.assign(element.style, style);
  return element;
};

export const DIV = (children = [], clasS) => html({ clasS, children });
export const SPAN = ({ children = [], style = {}, clasS }) =>
  html({ el: "span", style, clasS, children });
export const P = ({ text, clasS, ID }) =>
  html({ el: "p", clasS, ID, children: [text] });
export const H = (el, { text, clasS, ID }) =>
  html({ el, clasS, ID, children: [text] });
export const IMG = ({ src, alt, clasS, ID, style }) =>
  html({ el: "img", clasS, ID, style, attributes: { src, alt } });
export const SVG = (
  el,
  { viewBox, stroke, d, src, alt, clasS, ID, style, children }
) =>
  html({
    el,
    clasS,
    ID,
    style,
    ns: "http://www.w3.org/2000/svg",
    attributes: { viewBox, src, alt, d, stroke },
    children,
  });
export const A = ({ href, target, data, style, text, clasS, ID, child }) => {
  return html({
    el: "a",
    clasS,
    style,
    ID,
    attributes: { href, target, "data-route": data }, // Only includes href and target if they exist
    children: [text || "", child || ""],
  });
};

export const FORM = ({ action, method, children }) =>
  html({ el: "form", attributes: { action, method }, children });
export const INPUT = ({ type = "text", placeholder, name, id, value, clasS }) =>
  html({
    el: "input",
    clasS,
    attributes: { type, placeholder, name, id, value },
  });
export const TEXTAREA = ({ placeholder, name, id, value, clasS, rows, cols }) =>
  html({
    el: "textarea",
    clasS,
    attributes: { placeholder, name, id, value, rows, cols },
  });

export const setClassList = (element, classes, remove = false) => {
  if (!classes) return;
  let action = remove ? "remove" : "add";
  let classList = classes.split(" ").filter(Boolean);
  classList.forEach((className) => {
    element.classList[action](className);
  });
};
const createElement = (el, ns) => {
  let element;
  try {
    element = ns
      ? document.createElementNS(ns, el) // Use namespace if provided
      : document.createElement(el); // Fallback to normal element
    return element;
  } catch (error) {
    console.error(`Error creating element: ${el}`, error);
    return null;
  }
};

const setAttributes = (element, atrs) => {
  Object.keys(atrs).forEach((key) => {
    const value = atrs[key];
    if (key.toLowerCase().startsWith("on")) {
      console.warn("You can't set events from atributes", key);
      return;
    }
    if (!atrs[key]) {
      return;
    }
    element.setAttribute(key, value);
  });
};

const addEventListeners = (element, listeners) => {
  listeners.forEach(({ event, callback, options }) => {
    if (event && typeof callback === "function") {
      element.addEventListener(event, callback, options);
    }
  });
};

const appendChildren = (parent, children) => {
  const flattenedChildren = children.flat();
  flattenedChildren.forEach((child) => {
    if (child instanceof Node) {
      parent.appendChild(child);
    } else if (typeof child === "string" || typeof child === "number") {
      parent.appendChild(document.createTextNode(child));
    } else {
      console.warn("Skipping invalid child:", child);
    }
  });
};
