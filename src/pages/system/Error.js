import { Domo, Router } from "@zyrab/domo";
import { createButton } from "../../components/common/Button.js";
const Error = () => {
  return Domo("section")
    .cls("page just-c align-c")
    .child([
      Domo()
        .cls("flex col align-c gap-2")
        .child([
          Domo("h1").cls("xxl").txt("404 Lost in Cyberspace").build(),
          Domo("p")
            .cls("xl")
            .txt(
              "Looks like you're lost in the void. Here, take this wormhole instead!"
            )
            .build(),
          createButton({
            text: "warp",
            icon: "warp",
            onClick: () => Router.goTo("/"),
          }),
        ]),
    ])
    .build();
};

export default Error;
