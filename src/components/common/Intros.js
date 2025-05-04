import { Domo } from "@zyrab/domo";

export const createIntros = (arr) => {
  const colors = [
    "#00FFFF",
    "#3498db",
    "#ffd700",
    "#ee82ee",
    "#66BB6A",
    "#EB4888",
  ];
  const i = Math.floor(Math.random() * colors.length);
  return Domo()
    .css({ "align-self": "center" })
    .child([
      Domo("h3").cls("md").txt(arr[0]),
      Domo("h1")
        .cls([
          "xl",
          Math.random() * 2 > 1 ? "highlight-tag" : "brackets-highlight",
        ])
        .css({ color: colors[i] })
        .txt(arr[1]),
      Domo("p").cls("lg center").txt(arr[2]),
      Domo("p").cls("lg").txt(arr[3]),
    ])
    .build();
};
