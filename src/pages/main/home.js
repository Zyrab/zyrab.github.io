import Domo from "@zyrab/domo";
import createIcon from "../../components/common/icon.js";
import createButton from "../../components/common/button.js";

export default function createHome() {
  return Domo("section")
    .cls("flex col ai-c jc-c g-2 min-h-100vh p-1")
    .child([
      Domo()
        .cls("flex col g-1 max-w-35")
        .child([
          Domo("h1").cls("lg").txt(texts.title),
          Domo("p").cls("xl").txt(texts.description1),
          Domo("p").cls("xl").txt(texts.description2),
          Domo("address")
            .cls("flex g-0.5 py-0.5")
            .child([
              createIcon({ icon: "gmail" }),
              Domo("a")
                .cls("md italic hv:txt-psec")
                .attr({ href: texts.emailLink, target: "_blank", rel: "noopener noreferrer" })
                .txt(texts.email),
            ]),
          Domo("p").cls("lg").txt(texts.ideas),
          Domo("p").cls("xl").txt(texts.gameInvite),
          Domo()
            .cls("flex g-0.5 py-0.5 ai-c")
            .child([
              createButton({
                text: "Fight!",
                icon: "glxy",
                href: "/star-defence",
              }),
              createIcon({ icon: "gh" }),
              Domo("a")
                .cls("md italic hv:txt-psec")
                .attr({ href: texts.sourceCode, target: "_blank", rel: "noopener noreferrer" })
                .txt(texts.sourceCodeText),
            ]),
        ]),
    ]);
}

const texts = {
  title: "Welcome to my space.",
  description1: "Here, you'll find my projects, thoughts, and things I'm building.",
  description2: "If you're here to connect or collaborate, feel free to reach out.",
  email: "hello@zyrab.dev",
  emailLink: "mailto:hello@zyrab.dev",
  ideas: "I'm always up for cool ideas.",
  gameInvite:
    "Or if you're just passing through, why not play a quick game? I built it with passion—think you can beat my score?",
  sourceCodeText: "See the game's source code here",
  sourceCode: "https://github.com/Zyrab/zyrab.github.io/tree/main/src/components/game",
};
