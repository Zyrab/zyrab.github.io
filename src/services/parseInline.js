import { Domo } from "@zyrab/domo";
export function parseInline(text) {
  // Return early for nullish input to avoid errors
  if (text === null || text === undefined) {
    return [];
  }
  // Handle empty string input specifically
  if (text === "") {
    return [{ type: "text", content: "" }];
  }

  // Define patterns using named capture groups for easier identification and content extraction.
  // Order matters: Put more specific patterns (like tagWithType) before more general ones (highlightTag).
  const patterns = [
    // {{Name::Type}}
    /(?<tagWithType>\{\{(?<tagWithType_name>.+?)::(?<tagWithType_type>.+?)\}\})/,
    // {{HighlightTag}} - Negative lookahead ensures it doesn't match the Name::Type pattern
    /(?<highlightTag>\{\{(?!.+::)(?<highlightTag_content>.+?)\}\})/,
    // [[InternalLink]]
    /(?<internalLink>\[\[(?<internalLink_content>.+?)\]\])/,
    // **Bold**
    /(?<bold>\*\*(?<bold_content>.+?)\*\*)/,
    // __Underline__
    /(?<underline>__(?<underline_content>.+?)__)/,
    // ~~Strike~~
    /(?<strike>~~(?<strike_content>.+?)~~)/,
    // ^^Highlight^^
    /(?<highlight>\^\^(?<highlight_content>.+?)\^\^)/,
    // `Inline Code` (Note: Doesn't handle escaped backticks or nested backticks)
    /(?<inlineCode>\`(?<inlineCode_content>.+?)\`)/,
    // *Italic* - Tries to avoid matching '*' used in bold markers or spaces right next to markers.
    // This can be complex. This version looks for a non-* non-space character after the opening *
    // and before the closing *.
    /(?<italic>\*(?![*\s])(?<italic_content>.+?)(?<![*\s])\*)/,
  ];

  // Combine all patterns into a single global regex
  const combinedRegex = new RegExp(
    patterns.map((r) => r.source).join("|"),
    "g"
  );

  const results = [];
  let lastIndex = 0;
  let match;

  // Iterate through all matches found in the text
  while ((match = combinedRegex.exec(text)) !== null) {
    // 1. Capture the plain text segment before the current match (if any)
    if (match.index > lastIndex) {
      results.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    // 2. Identify the type of match using the named capture groups
    const groups = match.groups;
    if (groups.tagWithType !== undefined) {
      // Type: {{Name::Type}}
      results.push({
        type: "tag",
        name: groups.tagWithType_name,
        tagType: groups.tagWithType_type,
      });
    } else if (groups.highlightTag !== undefined) {
      // Type: {{HighlightTag}}
      results.push({
        type: "highlight-tag",
        content: groups.highlightTag_content,
      });
    } else if (groups.internalLink !== undefined) {
      // Type: [[InternalLink]]
      results.push({
        type: "internal-link",
        content: groups.internalLink_content,
      });
    } else if (groups.bold !== undefined) {
      // Type: **Bold**
      results.push({ type: "bold", content: groups.bold_content });
    } else if (groups.underline !== undefined) {
      // Type: __Underline__
      results.push({ type: "underline", content: groups.underline_content });
    } else if (groups.strike !== undefined) {
      // Type: ~~Strike~~
      results.push({ type: "strikethrough", content: groups.strike_content });
    } else if (groups.highlight !== undefined) {
      // Type: ^^Highlight^^
      results.push({ type: "highlight", content: groups.highlight_content });
    } else if (groups.inlineCode !== undefined) {
      // Type: `Inline Code`
      results.push({ type: "inline-code", content: groups.inlineCode_content });
    } else if (groups.italic !== undefined) {
      // Type: *Italic*
      results.push({ type: "italic", content: groups.italic_content });
    }
    // else: This case should ideally not be reached if the regex is comprehensive

    // 3. Update the position for the next search start
    lastIndex = combinedRegex.lastIndex;
  }

  // 4. Capture any remaining plain text after the last match
  if (lastIndex < text.length) {
    results.push({ type: "text", content: text.substring(lastIndex) });
  }

  // 5. If the input string was non-empty but resulted in no segments (e.g., only matches found),
  // or if no matches were found at all, ensure we return at least the original text.
  if (results.length === 0 && text.length > 0) {
    return [{ type: "text", content: text }];
  }

  return results;
}

// --- How to use it with parseBlocks ---

/* Assuming you have the 'parseBlocks' function from the previous example */
/* const markdownInput = `... your markdown text ...`; */
/* const blocks = parseBlocks(markdownInput); */

/* const processedBlocks = blocks.map(block => {
    // Only process inline content for blocks that are NOT code blocks
    if (block.type !== 'code' && block.content) {
        // Replace the raw content string with the parsed inline structure
        return { ...block, parsedContent: parseInline(block.content) };
    } else {
        // Keep code blocks or blocks without content as they are
        return block;
    }
}); */

// console.log(JSON.stringify(processedBlocks, null, 2));

// --- Example Usage ---

// const exampleText =
//   "This has **bold text**, `inline code`, *italic text*, [[a link]], {{highlight}}, {{name::type}}, ^^marker^^, __underline__, and ~~strike~~.";
// const parsedInlineContent = parseInline(exampleText);
// console.log(JSON.stringify(parsedInlineContent, null, 2));

/* Expected Output:
[
  { "type": "text", "content": "This has " },
  { "type": "bold", "content": "bold text" },
  { "type": "text", "content": ", " },
  { "type": "inline-code", "content": "inline code" },
  { "type": "text", "content": ", " },
  { "type": "italic", "content": "italic text" },
  { "type": "text", "content": ", " },
  { "type": "internal-link", "content": "a link" },
  { "type": "text", "content": ", " },
  { "type": "highlight-tag", "content": "highlight" },
  { "type": "text", "content": ", " },
  { "type": "tag", "name": "name", "tagType": "type" },
  { "type": "text", "content": ", " },
  { "type": "highlight", "content": "marker" },
  { "type": "text", "content": ", " },
  { "type": "underline", "content": "underline" },
  { "type": "text", "content": ", and " },
  { "type": "strikethrough", "content": "strike" },
  { "type": "text", "content": "." }
]
*/
