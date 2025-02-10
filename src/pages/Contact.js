import { com } from "../services/builder.js";
import { Button } from "../components/common/Button.js";
export const Contact = () => {
  return com({
    el: "section",
    children: [
      com({
        el: "form",
        atr: [
          { name: "id", value: "contact-form" },
          { name: "class", value: "form" },
        ],
        children: [
          com({
            el: "h2",
            atr: [
              { name: "id", value: "title" },
              { name: "class", value: "xxxl center p-1" },
            ],
            text: "Get in Touch",
          }),
          com({
            el: "input",
            atr: [
              { name: "type", value: "text" },
              { name: "placeholder", value: "Your Name" },
              { name: "name", value: "name" },
              { name: "id", value: "name" },
              { name: "class", value: "form-input" },
            ],
          }),
          com({
            el: "input",
            atr: [
              { name: "type", value: "text" },
              { name: "placeholder", value: "Email" },
              { name: "name", value: "email" },
              { name: "id", value: "email" },
              { name: "class", value: "form-input" },
            ],
          }),
          com({
            el: "textarea",
            atr: [
              { name: "rows", value: "5" },
              { name: "placeholder", value: "Message" },
              { name: "name", value: "message" },
              { name: "id", value: "message" },
              { name: "class", value: "form-input" },
            ],
          }),
          Button({ text: "Send" }),
        ],
      }),
      com({
        el: "div",
        atr: [{ name: "class", value: "contact-info" }],
        children: [
          com({ el: "p", dot: [{ name: "textContent", value: "Address" }] }),
          com({ el: "p", dot: [{ name: "textContent", value: "Email" }] }),
          com({ el: "p", dot: [{ name: "textContent", value: "Phone" }] }),
        ],
      }),
    ],
  });
};

const counter = (id) => {
  console.log(id);

  const count = document.getElementById(id);
  const isNumber = !isNaN(Number(count.textContent));
  console.log(isNumber); // true if the value is a valid number, false otherwise
  if (!isNumber) count.textContent = 0;
  count && (count.textContent = Number(count.textContent) + 1);
};

// <div class="contact">
//   <form id="contact-form">
//     <h2>Get in Touch</h2>
//     <input type="text" id="name" placeholder="Your Name" name="name" required>
//     <input type="email" id="email" name="email" required>
//     <textarea id="message" name="message" rows="5" required></textarea>
//     <button class="btn-default" type="submit">Send</button>
//   </form>
//   <div class="contact-info">
//     <p>Address</p>
//     <p>Phone</p>
//     <p>Email</p>
//   </div>
// </div>
