import Domo from "@zyrab/domo";
import createButton from "../../components/common/button.js";

export default function createGame() {
  const buttons = ["pause", "play", "replay", "close"];

  return Domo("section")
    .cls("game")
    .id("game")
    .child([
      Domo()
        .cls("abs flex g-0,5 top-0")
        .css({ zIndex: 35 })
        .child(buttons.map((i) => createButton({ icon: i, data: i, aria: i }))),
      Domo("canvas").id("webglCanvas"),
      Domo("canvas").id("canvas2D"),
    ]);
}
