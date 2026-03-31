export function copyCode(copy) {
  let code = copy.getAttribute("data-code");
  navigator.clipboard.writeText(code).then(() => (copy.textContent = "Copied!"));
  setTimeout(() => (copy.textContent = "Copy"), 1000);
}
