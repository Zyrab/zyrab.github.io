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
            dot: [
              { name: "textContent", value: "Get in Touch" },
              { name: "id", value: "title" },
            ],
          }),
          com({
            el: "input",
            atr: [{ name: "type", value: "text" }],
            dot: [{ name: "placeholder", value: "Your Name" }],
          }),
          com({
            el: "input",
            atr: [{ name: "type", value: "email" }],
            dot: [{ name: "placeholder", value: "Email" }],
          }),
          com({
            el: "textarea",
            atr: [{ name: "rows", value: "5" }],
            dot: [{ name: "placeholder", value: "Message" }],
          }),
          com({
            el: "button",
            atr: [{ name: "class", value: "btn-default" }],
            listener: {
              event: "click",
              callback: (e) => {
                e.preventDefault();
                counter("title");
              },
            },
            dot: [{ name: "textContent", value: "Send" }],
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
const com = ({
  el = "div",
  atr = [{ name: null, value: null }],
  children = [],
  listener = { event: null, callback: null },
  dot = [{ name: null, value: null }],
}) => {
  const element = document.createElement(el);
  atr && atr.forEach(({ name, value }) => element.setAttribute(name, value));
  dot && dot.forEach(({ name, value }) => (element[name] = value));
  children && children.forEach((child) => element.appendChild(child));
  listener && element.addEventListener(listener.event, listener.callback);
  return element;
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
