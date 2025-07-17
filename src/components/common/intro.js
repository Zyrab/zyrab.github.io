const headingId = "intro-heading";

return Domo("section")
  .attr({ "aria-labelledby": "intro-heading" })
  .cls("ta-c")
  .child([
    Domo("h1").cls("md").attr({ id: "intro-heading" }).txt(arr[0]),
    Domo("h2").cls("xl").txt(arr[1]),
    Domo("p").cls("lg").txt(arr[2]),
    Domo("p").cls("lg").txt(arr[3]),
  ]);
