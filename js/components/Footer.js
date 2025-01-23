export const Footer = () => {
  const footer = document.createElement("footer");
  const copy = document.createElement("p");
  const link = document.createElement("a");

  link.href = "https://github.com/Zyrab";
  link.target = "_blank";
  link.textContent = "icons by Zyrab";

  copy.textContent = "© 2023 Zyrab";

  footer.appendChild(copy);
  footer.appendChild(link);
  return footer;
};
