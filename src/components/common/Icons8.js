import { A, IMG } from "../../services/DOMConstructor.js";

export const Icons8 = ({ icon, link, size = "20px", custum = "color/48/" }) => {
  return A({
    href: link,
    target: "_blank",
    clasS: "flex just-c",
    child: IMG({
      style: { width: size, height: size },
      src: "https://img.icons8.com/" + custum + icon + ".png",
      alt: icon,
    }),
  });
};
