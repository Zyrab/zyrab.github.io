import Domo from "@zyrab/domo";
import createIcon from "./icon.js";

export default function createButton({
  icon = null,
  text = null,
  data = "",
  href = null,
  aria = null,
  type = "button",
}) {
  if (!text && icon && !aria) {
    console.warn("[Domo/button] When using only an icon, 'aria-label' should be set.");
  }
  const isLink = Boolean(href);
  const isExternal = href && /^https?:\/\//.test(href);

  return Domo(isLink ? "a" : "button")
    .cls("flex jc-c ai-c g-0.5 p-0.5 b-accent bg-accent trans:bg-0.3 hv:bg-pprim pointer")
    .attr({
      ...(isLink ? {} : { type }),
      ...(aria ? { "aria-label": aria } : {}),
      ...(isLink ? { href } : {}),
      ...(isLink && isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    })
    .data({ btn: data })
    .child([createIcon({ icon }).if(icon), Domo("span").cls("md").if(text).txt(text)]);
}
