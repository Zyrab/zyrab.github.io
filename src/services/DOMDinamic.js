import { setClassList } from "./DOMConstructor.js";
export const onStyle = (id, style) => {
  let element = document.getElementById(id);
  Object.assign(element.style, style);
};

export const onClass = (id, { add, remove, toggle }) => {
  let element = document.getElementById(id);
  add && setClassList(element, add);
  remove && setClassList(element, remove, true);
  toggle && element.classList.toggle(toggle);
};

export const onReplace = (event, targetClass, replaceWith, newClass) => {
  let targetContainer = event.target.closest(targetClass);
  if (targetContainer) {
    targetContainer.replaceChildren();
    targetContainer.classList.remove(targetClass);
    replaceWith && targetContainer.classList.add(newClass);
    targetContainer.append(replaceWith);
  }
};
