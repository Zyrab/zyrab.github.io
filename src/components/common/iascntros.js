import Domo from "@zyrab/domo";

export default function createIntros(arr) {
  return Domo("section")
    .cls("ta-c")
    .child([
      Domo("h1").cls("md").txt(arr[0]),
      Domo("h2").cls("xl").txt(arr[1]),
      Domo("p").cls("lg").txt(arr[2]),
      Domo("p").cls("lg").txt(arr[3]),
    ]);
}
