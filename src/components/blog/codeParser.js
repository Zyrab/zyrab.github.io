import { H } from "../../services/DOMConstructor.js";

export const codeParser = (code, name) => {
  let styledCode = [];
  let lastIndex = 0;
  let counter = 0;
  while (lastIndex < code.length) {
    let bestMatch = null;
    let bestPattern = null;

    // Find the first match across all patterns
    for (const pattern of regex[name]) {
      let regex = new RegExp(pattern.pattern, "g");
      regex.lastIndex = lastIndex;
      let match = regex.exec(code);
      console.log(counter++);

      if (match && (!bestMatch || match.index < bestMatch.index)) {
        bestMatch = match;
        bestPattern = pattern;
      }
    }

    // If no match, push remaining text and break
    if (!bestMatch) {
      styledCode.push(H("span", { text: code.slice(lastIndex) }));
      break;
    }

    // Push plain text before the match
    if (bestMatch.index > lastIndex) {
      styledCode.push(
        H("span", { text: code.slice(lastIndex, bestMatch.index) })
      );
    }

    // Push the matched token
    styledCode.push(H("span", { clasS: bestPattern.type, text: bestMatch[0] }));

    // Move index forward
    lastIndex = bestMatch.index + bestMatch[0].length;
  }

  return styledCode;
};

const regex = {
  js: [
    // Comments first to ensure they’re not mistaken for operators.
    { type: "comment", pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
    {
      type: "keyword",
      pattern:
        /\b(let|const|var|if|else|for|while|do|switch|case|break|continue|return|import|export)\b/,
    },
    { type: "string", pattern: /(["'`])(?:(?=(\\?))\2.)*?\1/ },
    { type: "number", pattern: /\b\d+(\.\d+)?\b/ },
    { type: "boolean", pattern: /\b(true|false|null)\b/ },
    { type: "function", pattern: /\b[a-zA-Z_]\w*(?=\s*\()/ },
    {
      type: "operator",
      pattern: /(?!\/\/)(?!\/\*)[%=&|<>!?^~]+/,
    },
    // { type: "class", pattern: /\bclass\s+([A-Z][a-zA-Z0-9_]*)\b/ },
    // { type: "property", pattern: /\b[a-zA-Z_]\w*(?=\s*[:(])/ },
    { type: "object", pattern: /\b[a-zA-Z_]\w*(?=\s*\.)/ },
    // { type: "template-string", pattern: /`(?:\\.|[^`])*`/ },
    // { type: "regex", pattern: /\/(?!\/)(?:\\.|[^\/\r\n])+\/[gimsuy]*/ },
  ],
  html: [
    // 1. HTML Tag (Opening and Closing)
    {
      type: "tag",
      pattern: /<([a-zA-Z0-9]+)>|<([a-zA-Z0-9]+)|>|<\/([a-zA-Z0-9]+)>/,
    },

    // 2. HTML Attribute (e.g., id="value", class="myClass")
    {
      type: "attribute",
      pattern: /(?<=\s)([a-zA-Z]+)(?=\s*=)/g,
    },

    // 3. HTML Comment (e.g., <!-- comment -->)
    {
      type: "comment",
      pattern: /<!--[\s\S]*?-->/g,
    },

    // 4. Quoted Strings (inside attributes)
    {
      type: "string",
      pattern: /(["'])(.*?)\1/g,
    },

    // 5. Doctype Declaration (<!DOCTYPE html>)
    {
      type: "doctype",
      pattern: /<!DOCTYPE\s+[a-zA-Z]+\s*[^>]*>/g,
    },

    // 6. Self-closing Tags (e.g., <img />, <br />)
    {
      type: "self-closing-tag",
      pattern: /<([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)\/>/g,
    },

    // 7. HTML Entity (e.g., &lt;, &amp;)
    {
      type: "entity",
      pattern: /&[a-zA-Z0-9#]+;/g,
    },
  ],
  css: [
    // 1. CSS Comment (/* comment */)
    {
      type: "comment",
      pattern: /\/\*[\s\S]*?\*\//g,
    },

    // 2. CSS Selectors (e.g., .class, #id, element)
    {
      type: "selector",
      pattern: /([a-zA-Z0-9#._-]+)/g,
    },

    // 3. CSS Property (e.g., color, font-size)
    {
      type: "property",
      pattern: /\b([a-zA-Z\-]+)(?=\s*:)/g,
    },

    // 4. CSS Value (e.g., red, 12px, 20%)
    {
      type: "value",
      pattern: /\b([a-zA-Z0-9%\.#\-\(\)]+)(?=\s*;|\s*\})/g,
    },

    // 5. CSS Units (e.g., px, em, %, rem)
    {
      type: "unit",
      pattern: /\b(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|deg|s)\b/g,
    },

    // 6. CSS Color (hex, rgb, rgba, hsl, hsla)
    {
      type: "color",
      pattern:
        /\b(#(?:[0-9a-fA-F]{3}){1,2}|rgb(?:a)?\([0-9, \.\%]+\)|hsl(?:a)?\([0-9, \.\%\°]+\))\b/g,
    },

    // 7. CSS ID selector (#id)
    {
      type: "id",
      pattern: /#([a-zA-Z0-9_-]+)/g,
    },

    // 8. CSS Class selector (.class)
    {
      type: "class",
      pattern: /\.([a-zA-Z0-9_-]+)/g,
    },

    // 9. CSS Pseudo-classes (e.g., :hover, :active)
    {
      type: "pseudo-class",
      pattern: /:(\w+)/g,
    },

    // 10. CSS Pseudo-elements (e.g., ::before, ::after)
    {
      type: "pseudo-element",
      pattern: /::(\w+)/g,
    },

    // 11. CSS Media Queries (e.g., @media screen and (max-width: 600px))
    {
      type: "media-query",
      pattern: /@media[\s\S]*?{[\s\S]*?}/g,
    },

    // 12. CSS @rules (e.g., @import, @keyframes)
    {
      type: "at-rule",
      pattern: /@([a-zA-Z0-9\-]+)(\s*[^;]*)/g,
    },
  ],
};
