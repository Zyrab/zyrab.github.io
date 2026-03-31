// domo.config.js
export default {
  outDir: "./public",
  routesFile: "./src/pages/index.js",
  layout: "./src/components/layout/static-layout.js",
  author: "Zyrab",
  baseUrl: "https://www.zyrab.dev",
  lang: "en",
  theme: "dark",
  exclude: ["js", "css", "app-ads.txt", "assets", "data"],
  assetsDir: [
    { current: "./styles", final: "css" },
    { current: "./assets", final: "assets" },
    { current: "./data", final: "data" },
    { current: "./app-ads.txt", final: "app-ads.txt" },
    { current: "./game.js", final: "js/game.js" },
  ],
  assets: {
    styles: ["base.css", "utils.css"],
    fonts: [{ href: "cutivemono.woff2", preload: true }],
    favicon: "favicon.ico",
  },
};
