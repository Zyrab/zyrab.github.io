import { com } from "../builder.js";
export const Contact = () => {
  return com({
    el: "section",
    atr: [{ name: "class", value: "contact" }],
    children: [
      com({
        el: "form",
        atr: [{ name: "id", value: "contact-form" }],
        children: [
          com({
            el: "h2",
            atr: [{ name: "id", value: "title" }],
            text: "Get in Touch",
          }),
          com({
            el: "input",
            atr: [
              { name: "type", value: "text" },
              { name: "placeholder", value: "Your Name" },
            ],
          }),
          com({
            el: "input",
            atr: [
              { name: "type", value: "email" },
              { name: "placeholder", value: "Email" },
            ],
          }),
          com({
            el: "textarea",
            atr: [
              { name: "rows", value: "5" },
              { name: "placeholder", value: "Message" },
            ],
          }),
          com({
            el: "button",
            atr: [{ name: "class", value: "btn-default" }],
            text: "Send",
            listeners: [
              {
                event: "click",
                callback: (e) => {
                  e.preventDefault();
                  counter("title");
                },
              },
            ],
          }),
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
