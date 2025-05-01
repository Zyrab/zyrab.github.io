import { Domo } from "@zyrab/domo";
export const Card = (list) => {
  function formatDate(dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return Domo("article")
    .cls("bg-greysh p-1 flex col gap-05 max-w-550 pointer blog-card")
    .data({ slug: list.slug })
    .child([
      Domo("h3").cls("xl").txt(list.title),
      Domo("aside")
        .cls("flex gap-05 align-c")
        .child([
          Domo("time")
            .cls("md boolean")
            .attr({ datetime: list.date })
            .txt(formatDate(list.date)),
          Domo("span").txt("•"),
          Domo("span").cls("md doctype").txt(list.readTime),
        ]),
      Domo("p").cls("md").txt(list.intro),
    ]);
};
