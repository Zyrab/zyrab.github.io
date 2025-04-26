import { Domo } from "@zyrab/domo";

export const createIcons8 = ({ icon, link, size = "20px" }) => {
  return Domo("a")
    .cls("flex just-c")
    .attr({ href: link, target: "_blank" })
    .child([
      Domo("img")
        .css({ width: size, height: size })
        .attr({
          src: "https://img.icons8.com/" + icons[icon] + ".png",
          alt: icon,
        })
        .build(),
    ]);
};

const icons = {
  gh: "3d-fluency/20/github",
  gmail: "color/20/gmail-new",
  glxy: "flat-round/20/galaxy",
  exp: "ffffff/ios-filled/20/expo",
  frb: "color/20/firebase",
  rn: "color/20/react-native",
  fg: "color/20/figma--v1",
  gglplay: "color/20/google-play",
  dmn: "fluency/20/domain",
  vue: "color/20/vue-js",
  tlwcss: "color/20/tailwindcss",
  admb: "color/20/google-admob",
  close: "color/20/delete-sign--v1",
  play: "color/20/play",
  pause: "color/20/pause",
  replay: "color/20/replay",
  warp: "color/20/black-hole",
  dwnld: "color/20/download--v1",
  unt: "fluency/20/unity",
  cshrp: "color/20/c-sharp-logo-2",
  css: "color/20/css3",
  js: "color/20/javascript--v1",
  html: "color/20/html-5--v1",
  lnkdn: "color/20/linkedin",
  npm: "color/20/npm",
  html5: "color/20/html-5--v1",
};
