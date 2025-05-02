import { Domo, Router } from "@zyrab/domo";
import { createButton } from "../common/Button.js";

export const NotFound = () => {
  return Domo()
    .cls("flex col align-c just-c gap-2")
    .css({ height: "90vh" })
    .child([
      Domo("h1").cls("xxl").txt("404 Lost in Cyberspace").build(),
      Domo("p")
        .cls("xl center")
        .txt(
          "Hmm the Blog you are looking for is lost in the void. Here, take this wormhole instead!"
        )
        .build(),
      createButton({
        text: "warp",
        icon: "warp",
        onClick: () => Router.back(),
      }),
    ]);
};
