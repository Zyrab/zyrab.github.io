export const com = ({
  el = "div",
  atr = [],
  ns = null, // Add `ns` prop for namespace
  listeners = [],
  style = {},
  text = "",
  value = "",
  children = [],
}) => {
  // Create the element with or without namespace
  let element;
  try {
    element = ns
      ? document.createElementNS(ns, el) // Use namespace if provided
      : document.createElement(el); // Fallback to normal element
  } catch (error) {
    console.error(`Error creating element: ${el}`, error);
    return null;
  }

  // Set attributes
  atr.forEach(({ name, value }) => {
    if (name && value !== undefined) element.setAttribute(name, value);
  });
  // Set text content
  if (text) element.textContent = text;
  if (value) element.value = value;

  // Add styles
  Object.assign(element.style, style);

  // Append children
  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child); // Append any valid DOM node (HTMLElement, SVGElement, Text, etc.)
    } else if (typeof child === "string" || typeof child === "number") {
      element.appendChild(document.createTextNode(child)); // Convert strings or numbers into text nodes
    } else {
      console.warn("Skipping invalid child:", child); // Warn if the child is not a valid node
    }
  });

  // Add event listeners
  listeners.forEach(({ event, callback, options }) => {
    if (event && typeof callback === "function") {
      element.addEventListener(event, callback, options);
    }
  });
  return element;
};
