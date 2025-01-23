export const Contact = () => {
  return `
    <div class="contact">
      <form id="contact-form">
        <h2>Get in Touch</h2>
        <input type="text" id="name" placeholder="Your Name" name="name" required>
        <input type="email" id="email" name="email" required>
        <textarea id="message" name="message" rows="5" required></textarea>
        <button class="btn-default" type="submit">Send</button>
      </form>
      <div class="contact-info">
        <p>Address</p>
        <p>Phone</p>
        <p>Email</p>
      </div>
    </div>
  `;
};
