import { H, html, INPUT, IMG, TEXTAREA } from "../services/DOMConstructor.js";
import { Button } from "../components/common/Button.js";
import { Icons8 } from "../components/common/Icons8.js";
export const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.forEach((value, name) => {
      console.log(name, value);
    });
  };
  return html({
    el: "section",
    clasS: "page",
    children: [
      html({
        el: "form",
        clasS: "form",
        ID: "contact-form",
        events: { submit: handleFormSubmit },
        children: [
          H("h2", {
            clasS: "xxxl center p-1",
            ID: "title",
            text: "Get in Touch",
          }),
          INPUT({
            placeholder: "name",
            name: "name",
            id: "name",
            type: "text",
            clasS: "form-input",
          }),
          INPUT({
            placeholder: "email",
            name: "email",
            id: "email",
            type: "email",
            clasS: "form-input",
          }),
          TEXTAREA({
            placeholder: "message",
            name: "message",
            id: "message",
            clasS: "form-input",
            rows: "5",
          }),
          Button({ text: "Send", type: "submit" }),
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
                custum: "/fluency-systems-regular/ffffff/32/",
              }),
              Icons8({
                icon: "linkedin",
                size: "2rem",
                link: "https://github.com/Zyrab",
                custum: "/fluency-systems-regular/ffffff/32/",
              }),
              Icons8({
                icon: "gmail",
                size: "2rem",
                link: "https://github.com/Zyrab",
                custum: "/fluency-systems-regular/ffffff/32/",
              }),
              Icons8({
                icon: "phone",
                size: "2rem",
                link: "https://github.com/Zyrab",
                custum: "/fluency-systems-regular/ffffff/32/",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
