import { setClassList } from "./DOMConstructor.js";
export const onStyle = (id, style) => {
  let element = document.getElementById(id);
  Object.assign(element.style, style);
};

export const onClass = (id, { add, remove, toggle, delay = false }) => {
  if (!id) return;

  const element = id instanceof HTMLElement ? id : document.getElementById(id);
  if (!element) return;

  const applyClasses = () => {
    if (add) setClassList(element, add);
    if (remove) setClassList(element, remove, true);
    if (toggle) element.classList.toggle(toggle);
  };

  delay ? setTimeout(applyClasses, delay) : applyClasses();
};

export const onReplace = (e, targetClass, replaceWith, newClass) => {
  let targetContainer = e.target.closest(targetClass);

  if (targetContainer) {
    const props = targetContainer.dataset.props
      ? JSON.parse(targetContainer.dataset.props)
      : {};
    targetContainer.replaceChild(replaceWith(props.data), targetContainer);
    targetContainer.classList.remove(targetClass);
    newClass && targetContainer.classList.add(newClass);
  }
};

export const onShow = (placeHolder, element) => {
  placeHolder.replaceWith(element);
};
