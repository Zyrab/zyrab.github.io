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
// --- ![alt](src) ---
// Helpers
const isBlank = (line) => !line.trim();
const parseUntil = (lines, startIndex, isEnd) => {
  const content = [];
  let i = startIndex;
  while (i < lines.length && !isEnd(lines[i])) content.push(lines[i++]);
  return { content, nextIndex: i };
};
const createListItem = (content) => Domo("li").cls("md-li").child(parseInline(content.trim()));

export function parseBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let paragraph = [];
  let ulItems = [];
  let olItems = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push(
        Domo("p")
          .cls("md-p")
          .child(parseInline(paragraph.join("\n")))
      );
      paragraph = [];
    }
  };
  const flushUl = () => {
    if (ulItems.length) {
      blocks.push(Domo("ul").cls("md-ul").child(ulItems));
      ulItems = [];
    }
  };
  const flushOl = () => {
    if (olItems.length) {
      blocks.push(Domo("ol").cls("md-ol").child(olItems));
      olItems = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushUl();
    flushOl();
  };

  while (i < lines.length) {
    const line = lines[i];

    // --- Code Block ---
    let match = line.match(/^```(\w*)\s*$/);
    if (match) {
      flushAll();
      const lang = match[1] || null;
      const { content, nextIndex } = parseUntil(lines, i + 1, (l) => /^```\s*$/.test(l));
      blocks.push(parseCode(content.join("\n"), lang));
      i = nextIndex + 1;
      continue;
    }

    // --- Custom Block ---
    match = line.match(/^:::\s*(\w+)\s*$/);
    if (match) {
      flushAll();
      const type = match[1];
      const { content, nextIndex } = parseUntil(lines, i + 1, (l) => /^:::\s*$/.test(l));
      blocks.push(
        Domo("div")
          .cls(["custom-block", `custom-${type}`])
          .child(parseInline(content.join("\n")))
      );
      i = nextIndex + 1;
      continue;
    }

    // --- Heading ---
    match = line.match(/^(#{1,6})\s+(.*\S.*)/);
    if (match) {
      flushAll();
      const level = match[1].length;
      blocks.push(Domo(`h${level}`).cls(`md-h${level}`).child(parseInline(match[2])));
      i++;
      continue;
    }

    // --- Horizontal Rule ---
    if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      flushAll();
      blocks.push(Domo("hr").cls("md-hr"));
      i++;
      continue;
    }

    // --- Blockquote ---
    if (/^ {0,3}>\s?/.test(line)) {
      flushAll();
      const quoteLines = [];
      while (i < lines.length && /^ {0,3}>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^ {0,3}>\s?/, ""));
        i++;
      }
      blocks.push(
        Domo("blockquote")
          .cls("md-blockquote")
          .child(parseInline(quoteLines.join("\n")))
      );
      continue;
    }

    // --- Image ---
    match = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (match) {
      flushAll();
      const [_, alt, src] = match;
      blocks.push(Domo("img").cls("md-img").attr({ src, alt, loading: "lazy" }));
      i++;
      continue;
    }

    // --- Unordered List Item ---
    match = line.match(/^(\s*)[-*+]\s+(.*)/);
    if (match) {
      flushOl();
      ulItems.push(createListItem(match[2]));
      i++;
      continue;
    }

    // --- Ordered List Item ---
    match = line.match(/^(\s*)(\d+)[.)]\s+(.*)/);
    if (match) {
      flushUl();
      olItems.push(createListItem(match[3]));
      i++;
      continue;
    }

    // --- Paragraph / Blank Line ---
    if (isBlank(line)) {
      flushAll();
    } else {
      paragraph.push(line);
    }

    i++;
  }

  flushAll();
  return blocks;
}
