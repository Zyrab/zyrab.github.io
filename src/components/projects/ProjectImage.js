import { IMG, DIV, SPAN } from "../../services/DOMConstructor.js";

export const ProjectImage = (project) => {
  return DIV(
    [
      IMG({
        src: "assets/projects/" + (project.image || "numbero-thumb.png"),
        alt: project.title,
        ID: project.id,
        clasS: "w-100 h-100",
      }),
      project.video
        ? SPAN({
            clasS: "play-button",
            style: {
              background: "rgba(0, 0, 0, 0.5)",
              width: "50px",
              height: "50px",
              position: "absolute",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            children: [
              SPAN({
                style: {
                  marginLeft: "5px",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "16px solid red",
                  transform: "rotate(90deg)",
                },
              }),
            ],
          })
        : "",
    ],
    "w-100 h-100 relative flex just-c align-c"
  );
};
