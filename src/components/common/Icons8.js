import { A, IMG } from "../../services/DOMConstructor.js";

export const Icons8 = ({ icon, link, size = "20px" }) => {
  return A({
    href: link,
    target: "_blank",
    clasS: "flex just-c",
    child: IMG({
      style: { width: size, height: size },
      src: "https://img.icons8.com/" + icon + ".png",
      alt: icon,
    }),
  });
};
