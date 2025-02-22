import { H, html, INPUT, IMG, TEXTAREA } from "../services/DOMConstructor.js";
import { Button } from "../components/common/Button.js";
import { Icons8 } from "../components/common/Icons8.js";
export const Contact = () => {
  return html({
    el: "section",
    children: [
      html({
        el: "form",
        clasS: "form",
        ID: "contact-form",
        children: [
          H("h2", {
            clasS: "xxxl center p-1",
            ID: "title",
            text: "Get in Touch",
          }),
          INPUT({
            placeholder: "Your Name",
            name: "name",
            id: "name",
            type: "text",
            clasS: "form-input",
          }),
          INPUT({
            placeholder: "Your Email",
            name: "email",
            id: "email",
            type: "email",
            clasS: "form-input",
          }),
          TEXTAREA({
            placeholder: "Your Message",
            name: "message",
            id: "message",
            clasS: "form-input",
            rows: "5",
          }),
          Button({ text: "Send" }),
        ],
      }),
      html({
        clasS: "flex col gap-2 p-2",
        children: [
          IMG({
            clasS: "w-100",
            alt: "Zyrab",
            src: "assets/Zyrab.png",
          }),
          html({
            clasS: "flex just-center gap-1",
            children: [
              Icons8({
                icon: "github",
                size: "2rem",
                link: "https://github.com/Zyrab",
                custum: "ios-glyphs/30/",
              }),
              Icons8({
                icon: "linkedin",
                size: "2rem",
                link: "https://github.com/Zyrab",
              }),
              Icons8({
                icon: "gmail--v1",
                size: "2rem",
                link: "https://github.com/Zyrab",
              }),
              Icons8({
                icon: "phone",
                size: "2rem",
                link: "https://github.com/Zyrab",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
