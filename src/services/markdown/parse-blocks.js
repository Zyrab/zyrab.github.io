import Domo from "@zyrab/domo";
import { parseInline } from "./parse-inline.js";
import { parseCode } from "./parse-code.js";
import { readingTime } from "./reading-time.js";

// --- Code Block: ```lang ... ``` ---
// --- Custom Block: ::: type ... ::: ---
// --- Heading: # to ###### ---
// --- Horizontal Rule: --- or *** ---
// --- Blockquote: > ... ---
// --- Unordered List Item: -/*/+ ... ---
// --- Ordered List Item: 1./) ... ---
// --- Paragraph Line or Blank Line ---

export function parseBlocks(markdown) {
  // console.log(readingTime(markdown));
  // Normalize line endings and split into lines
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let currentParagraphLines = [];
  let ulList = [];
  let olList = [];

  const pushPendingParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const paragraphText = currentParagraphLines.join("\n");
      blocks.push(Domo("p").cls("md-p").child(parseInline(paragraphText)));
      currentParagraphLines = [];
    }
  };
  const pushUlList = () => {
    if (ulList.length > 0) {
      blocks.push(Domo("ul").cls("md-ul").child(ulList));
      ulList = [];
    }
  };
  const pushOlList = () => {
    if (olList.length > 0) {
      blocks.push(Domo("ol").cls("md-ol").child(olList));
      olList = [];
    }
  };
  // Main loop iterating through each line
  while (i < lines.length) {
    const line = lines[i];
    let match; // Reusable variable for regex matches

    // --- Code Block: ```lang ... ``` ---
    match = line.match(/^```(\w*)\s*$/);
    if (match) {
      pushUlList();
      pushOlList();
      pushPendingParagraph(); // Finalize preceding paragraph
      const lang = match[1] || null;
      const contentLines = [];
      i++; // Move past the opening fence
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        contentLines.push(lines[i]);
        i++;
      }
      // Use the dedicated CodeJS component for code blocks
      blocks.push(parseCode(contentLines.join("\n"), lang));
      i++; // Skip the closing fence line
      continue; // Move to next line
    }

    // --- Custom Block: ::: type ... ::: ---
    match = line.match(/^:::\s*(\w+)\s*$/);
    if (match) {
      pushUlList();
      pushOlList();
      pushPendingParagraph();
      const blockType = match[1];
      const contentLines = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        contentLines.push(lines[i]);
        i++;
      }
      const content = contentLines.join("\n");
      // Create a <div>, parse its content for inline styles for consistency
      blocks.push(
        Domo("div")
          .cls(["custom-block", `custom-${blockType}`]) // Base and specific class
          .child(parseInline(content)) // Assume inline parsing for content
      );
      i++;
      continue;
    }

    // --- Heading: # to ###### ---
    match = line.match(/^(#{1,6})\s+(.*\S.*)/);
    if (match) {
      pushUlList();
      pushOlList();
      pushPendingParagraph();
      const level = match[1].length;
      const headingTag = `h${level}`; // h1, h2, etc.
      const content = match[2];
      blocks.push(
        Domo(headingTag)
          .cls(`md-${headingTag}`) // Add base class (md-h1) and size class
          .child(parseInline(content)) // Parse inline content
      );
      i++;
      continue;
    }

    // --- Horizontal Rule: --- or *** ---
    if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      pushUlList();
      pushOlList();
      pushPendingParagraph();
      blocks.push(Domo("hr").cls("md-hr")); // Add base class
      i++;
      continue;
    }
    // --- Blockquote: > ... ---
    // Groups consecutive lines starting with ">"
    match = line.match(/^ {0,3}>\s?(.*)/);
    if (match) {
      pushUlList();
      pushOlList();
      pushPendingParagraph();
      const quoteLines = [];
      // Consume all consecutive blockquote lines
      while (i < lines.length) {
        const quoteMatch = lines[i].match(/^ {0,3}>\s?(.*)/);
        if (quoteMatch) {
          quoteLines.push(quoteMatch[1]); // Add content line (without the '>')
          i++;
        } else {
          break; // Stop if the line doesn't start with ">"
        }
      }
      // Join lines with newline, parse inline content, create blockquote
      const quoteContent = quoteLines.join("\n");
      blocks.push(
        Domo("blockquote")
          .cls("md-blockquote") // Add base class
          .child(parseInline(quoteContent))
      );
      // 'i' is already advanced past the last quote line by the inner loop
      continue; // Continue the outer loop
    }

    // --- Unordered List Item: -/*/+ ... ---
    // NOTE: This pushes an individual <li> for each line.
    // It does NOT automatically wrap consecutive items in <ul>.
    // It does NOT handle nested lists based on indentation.
    match = line.match(/^(\s*)([-*+])\s+(.*)/);
    if (match) {
      pushOlList();
      pushPendingParagraph();
      // const indent = match[1].length; // Indentation level (captured but not used for nesting)
      const content = match[3].trim();
      if (content) {
        ulList.push(
          Domo("li")
            .cls("md-li") // Base li class + ul-specific li class
            .child(parseInline(content))
        );
      }
      // If content is empty (e.g., "- "), we just skip adding the li
      i++;
      continue;
    }

    // --- Ordered List Item: 1./) ... ---
    // NOTE: This pushes an individual <li> for each line.
    // It does NOT automatically wrap consecutive items in <ol>.
    // It does NOT handle nesting or use the starting number.
    match = line.match(/^(\s*)(\d+)[.)]\s+(.*)/);
    if (match) {
      pushUlList();
      pushPendingParagraph();
      // const indent = match[1].length; // Indentation level (captured but not used)
      // const startNum = parseInt(match[2], 10); // Start number (captured but not used)
      const content = match[3].trim();
      if (content) {
        olList.push(
          Domo("li")
            .cls("md-li") // Base li class + ol-specific li class
            .child(parseInline(content))
        );
      }
      // If content is empty (e.g., "1. "), we just skip adding the li
      i++;
      continue;
    }

    // --- Paragraph Line or Blank Line ---
    const trimmedLine = line.trim();
    if (trimmedLine) {
      // Line has content and wasn't caught by other rules: add to paragraph buffer
      currentParagraphLines.push(line);
    } else {
      // Empty line: signifies a break, finalize and push any pending paragraph
      pushUlList();
      pushOlList();
      pushPendingParagraph();
    }
    i++; // Move to the next line
  }

  // End of input: Push any remaining paragraph lines
  pushPendingParagraph();

  return blocks; // Return the array of Domo elements/components
}
