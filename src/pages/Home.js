import { html, H, P, DIV, A, SWAPPER } from "../services/DOMConstructor.js";
import { Icons8 } from "../components/common/Icons8.js";
import { Button } from "../components/common/Button.js";
import { Game } from "../components/game/Game.js";
import { onClass, onShow } from "../services/DinamicDOM.js";
export const Home = () => {
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

  let game = SWAPPER({ clasS: "game" });
  return html({
    el: "section",
    clasS: "flex col align-c just-c gap-2 min-h-100 p-1",
    children: [
      DIV(
        [
          game,
          ,
          H("h2", { clasS: "lg", text: texts.title }),
          P({ clasS: "xl", text: texts.description1 }),
          P({ clasS: "xl", text: texts.description2 }),
          DIV(
            [
              Icons8({
                icon: "gmail",
                link: texts.emailLink,
                size: "20px",
              }),
              A({
                href: texts.emailLink,
                target: "_blank",
                text: texts.email,
                clasS: "md inherit italic decoration-none hover-white",
              }),
            ],
            "flex gap-05 p-05"
          ),
          P({ clasS: "lg", text: texts.ideas }),
          P({ clasS: "xl", text: texts.gameInvite }),
          DIV(
            [
              Button({
                text: "Fight!",
                icon: "glxy",
                onClick: () => {
                  onShow(game, Game(game));
                  onClass("game", { add: "active", delay: 1 });
                },
              }),
              Icons8({
                icon: "gh",
                link: texts.sourceCode,
                size: "20px",
              }),
              A({
                href: texts.sourceCode,
                target: "_blank",
                text: texts.sourceCode,
                clasS: "md inherit italic decoration-none hover-white",
              }),
            ],
            "flex gap-05 p-05 align-c"
          ),
        ],
        "flex col gap-1 max-w-550"
      ),
    ],
  });
};
