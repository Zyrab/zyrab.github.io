import { com } from "../builder.js";
export const Error = () => {
  return com({
    el: "section",
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    children: [
      com({
        el: "h1",
        text: "404 Not Found",
      }),
    ],
  });
};
