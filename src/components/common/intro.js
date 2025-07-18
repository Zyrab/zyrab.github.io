import Domo from "@zyrab/domo";

export default function createIntros(arr) {
  return Domo()
    .cls("flex col g-0.5 ta-c")
    .child([
      Domo("h1").cls("md").attr({ id: "intro-heading" }).txt(arr[0]),
      Domo("h2").cls("xl").txt(arr[1]),
      Domo("h2").cls("lg").txt(arr[2]),
      Domo("h2").cls("lg").txt(arr[3]),
    ]);
}
