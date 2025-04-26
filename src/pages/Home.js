import { Domo } from "@zyrab/domo";
import { createIcons8 } from "../components/common/Icons8.js";
import { createButton } from "../components/common/Button.js";
import { Game } from "../components/game/Game.js";
export const Home = () => {
  let game = Domo();
  return Domo("section")
    .cls("flex col align-c just-c gap-2 min-h-100 p-1")
    .child([
      Domo()
        .cls("flex col gap-1 max-w-550")
        .child([
          game,
          Domo("h2").cls("lg").txt(texts.title),
          Domo("p").cls("xl").txt(texts.description1),
          Domo("p").cls("xl").txt(texts.description2),
          Domo()
            .cls("flex gap-05 p-05")
            .child([
              createIcons8({
                icon: "gmail",
                link: texts.emailLink,
                size: "20px",
              }),
              Domo("a")
                .cls("md inherit italic decoration-none hover-white")
                .attr({ href: texts.emailLink, target: "_blank" })
                .txt(texts.email),
            ]),
          Domo("p").cls("lg").txt(texts.ideas),
          Domo("p").cls("xl").txt(texts.gameInvite),
          Domo()
            .cls("flex gap-05 p-05 align-c")
            .child([
              createButton({
                text: "Fight!",
                icon: "glxy",
                onClick: () => {
                  game.replace(game.element, Game(game));
                  setTimeout(() => game.cls("active"), 10);
                  // onShow(game, Game(game));
                  // onClass("game", { add: "active", delay: 1 });
                },
              }),
              createIcons8({
                icon: "gh",
                link: texts.sourceCode,
                size: "20px",
              }),
              Domo("a")
                .cls("md inherit italic decoration-none hover-white")
                .attr({ href: texts.sourceCode, target: "_blank" })
                .txt(texts.sourceCode),
            ]),
        ]),
    ])
    .build();
};

const texts = {
  title: "Welcome to my space.",
  description1:
    "Here, you'll find my projects, thoughts, and things I'm building.",
  description2:
    "If you're here to connect or collaborate, feel free to reach out.",
  email: "hello@zyrab.dev",
  emailLink: "mailto:hello@zyrab.dev",
  ideas: "I'm always up for cool ideas.",
  gameInvite:
    "Or if you're just passing through, why not play a quick game? I built it with passion—think you can beat my score?",
  sourceCode: "See the game's source code here",
};
