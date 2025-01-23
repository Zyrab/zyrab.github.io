export const builder = (component) => {
  component.map(
    (element) => (document.getElementById("app").innerHTML += element)
  );
};

{
  /* <div class="home">
  <div class="home-circle"></div>
  <div class="home-hero">
    <h1>Plan, Design, Build</h1>
    <h2>I bring your Ideas to Life, with no boundaries</h2>
  </div>
</div>; */
}

function parseAndCategorize(input) {
  const result = {
    speaking: [], // For "_"
    thinking: [], // For "-"
    replying: [], // For "="
  };

  // Split the input by commas
  const parts = input.split(",");

  // Loop through each part and categorize based on the first character
  for (const part of parts) {
    const trimmedPart = part.trim(); // Remove extra spaces

    if (trimmedPart.startsWith("_")) {
      result.speaking.push(trimmedPart.slice(1).trim()); // Remove the symbol and add to speaking
    } else if (trimmedPart.startsWith("-")) {
      result.thinking.push(trimmedPart.slice(1).trim()); // Remove the symbol and add to thinking
    } else if (trimmedPart.startsWith("=")) {
      result.replying.push(trimmedPart.slice(1).trim()); // Remove the symbol and add to replying
    }
  }

  return result;
}

// Example usage:
const input =
  "_hi, _how are you, -he said to himself, =i am fine, =and how are u";
const categorizedText = parseAndCategorize(input);
console.log(categorizedText);
