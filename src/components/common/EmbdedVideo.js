import { com } from "../../services/builder.js";
// https://www.youtube.com/embed/yq6jek2JwTw?si=tAYid23nNqzBKMs4
export const EmbdedVideo = (src) => {
  return com({
    el: "iframe",
    style: { width: "100%", height: "100%" },
    atr: [
      {
        name: "src",
        value: src,
      },
      { name: "frameborder", value: "0" },
      {
        name: "allow",
        value:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      },
      { name: "allowfullscreen", value: "true" },
      { name: "referrerpolicy", value: "strict-origin-when-cross-origin" },
      { name: "title", value: "YouTube video player" },
    ],
  });
};
