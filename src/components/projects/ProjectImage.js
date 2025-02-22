import { IMG, DIV } from "../../services/DOMConstructor";

export const ProjectImage = ({ src, alt }) =>
  DIV([IMG({ src, alt })], "w-100 h-100");
