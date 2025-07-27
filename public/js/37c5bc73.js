document.getElementById("article-click").addEventListener("click", function(e) {
  let copy = e.target.closest(".copyCode");
      if (copy) {
        let code = copy.getAttribute("data-code");
        navigator.clipboard.writeText(code).then(() => (copy.textContent = "Copied!"));
        setTimeout(() => (copy.textContent = "Copy"), 1000);
      }
});