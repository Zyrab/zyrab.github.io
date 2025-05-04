import { Domo } from "@zyrab/domo";

export const Card = (list) => {
  function formatDate(dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const colors = [
    "#00FFFF",
    "#3498db",
    "#ffd700",
    "#ee82ee",
    "#66BB6A",
    "#EB4888",
  ];
  const i = Math.floor(Math.random() * colors.length);

  const detailUrl = `/${list.intro ? "blog" : "bugs"}/${list.slug}`;
  return Domo("article")
    .cls("bg-greysh p-1 flex col gap-05 max-w-550")
    .child([
      Domo("a")
        .cls("und xl link")
        .css({ textDecorationColor: colors[i] })
        .attr({ href: detailUrl })
        .txt(list.title),
      Domo("aside")
        .cls("flex gap-05 align-c")
        .child([
          Domo("time")
            .cls("md boolean")
            .attr({ datetime: list.date })
            .txt(formatDate(list.date)),
          Domo("span").txt("•"),
          Domo("span").cls("md doctype").if(list.readTime).txt(list.readTime),
        ]),
      Domo("p").cls("md").if(list.intro).txt(list.intro),
    ]);
};
