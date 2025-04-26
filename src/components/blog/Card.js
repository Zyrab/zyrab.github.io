import { Domo } from "@zyrab/domo";
export const Card = (list) => {
  return Domo()
    .cls("bg-greysh p-1 flex col gap-05 max-w-550 pointer blog-card")
    .data({ slug: list.slug })
    .child([
      Domo("h1").cls("xxl").txt(list.title),
      Domo("p").cls("sm right").txt(list.date),
      Domo("p").cls("md").txt(list.intro),
    ]);
};
