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

export const onReplace = (e, targetClass, replaceWith, newClass) => {
  let targetContainer = e.target.closest(targetClass);

  if (targetContainer) {
    const props = targetContainer.dataset.props
      ? JSON.parse(targetContainer.dataset.props)
      : {};
    targetContainer.replaceChildren();
    targetContainer.classList.remove(targetClass);
    newClass && targetContainer.classList.add(newClass);
    targetContainer.append(replaceWith(props.data));
  }
};
