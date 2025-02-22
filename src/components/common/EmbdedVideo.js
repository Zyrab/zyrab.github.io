import { html } from "../../services/DOMConstructor.js";
// https://www.youtube.com/embed/yq6jek2JwTw?si=tAYid23nNqzBKMs4
export const EmbdedVideo = (src) => {
  return html({
    el: "iframe",
    style: { width: "100%", height: "100%" },
    attributes: {
      src: src,
      frameborder: "0",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: "true",
      referrerpolicy: "strict-origin-when-cross-origin",
      title: "YouTube video player",
    },
  });
};
