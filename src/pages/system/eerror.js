import Domo from "@zyrab/domo";
import createButton from "../../components/common/button.js";
export default function createError() {
  return Domo("section")
    .cls("flex jc-c ai-c g-3.5 p-1 min-h-100vh")
    .child([
      Domo()
        .cls("flex col ai-c g-2")
        .child([
          Domo("h1").cls("xxl").txt("404 Lost in Cyberspace"),
          Domo("p").cls("xl").txt("Looks like you're lost in the void. Here, take this wormhole instead!"),
          createButton({
            text: "warp",
            icon: "warp",
            href: "/",
          }),
        ]),
    ]);
}
