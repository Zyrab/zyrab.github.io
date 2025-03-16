import { A, html, SVG } from "../../services/DOMConstructor.js";
import { navigateTo } from "../../services/router.js";
export const Header = () => {
  const handaleNavigation = (e) => {
    let navLink = e.target.closest(".nav-link");
    if (navLink) {
      let route = navLink.getAttribute("data-route");
      navigateTo(route);
    }
  };

  return html({
    el: "header",
    children: [
      html({
        el: "nav",
        events: { click: (e) => handaleNavigation(e) },
        children: navData.map(({ route, iPath }) =>
          A({
            clasS: "nav-link",
            data: route,
            child: SVG("svg", {
              clasS: "nav-icon",
              viewBox: "0 0 17 17",
              children: [
                SVG("path", {
                  stroke: "#fff",
                  d: iPath,
                }),
              ],
            }),
          })
        ),
      }),
    ],
  });
};

const navData = [
  {
    route: "/",
    iPath:
      "M3.94446 8.33342v-.5H2.7474l6.03039-5.42757 6.03041 5.42757h-1.1971v5.99998h-3V9.83342H6.94446v3.99998h-3V8.33342Z",
  },
  {
    route: "/projects",
    iPath:
      "M2.81819 3.5h2.15317l1.78145 1.08-1.34375 1.11979-.36826.13354H1.61108V4.70711L2.81819 3.5Zm6.35538 1.66667h4.77083v8.00003H1.61108V7.83333H5.21646l.08255-.02991 1.17318-.42513.08236-.02985.06732-.05607 2.5517-2.1257Z",
  },
  {
    route: "/blog",
    iPath:
      "m7.86936 10.3275-.14614.1461-.0003.2067-.00388 2.6492-.00073.5.5.0007 2.65399.0039.2076.0003.1467-.1467 2.1206-2.1209v2.5166H3.09717V2.58337H13.3472V4.8494L8.72217 9.4746V7.83337h-4.125V10.0834h3.51626l-.24407.2441Zm2.72784-4.49413v-.5H4.59717v2.25h6.00003v-1.75Zm-.62534 5.57353 4.36164-4.36166.1768.17676-4.3611 4.3611-.1776-.0003.00026-.1759Z",
  },
];
