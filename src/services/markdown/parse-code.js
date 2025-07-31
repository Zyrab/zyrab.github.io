import Domo from "@zyrab/domo";
export const parseCode = (code, name) => {
  let styledCode = [];
  let lastIndex = 0;
  while (lastIndex < code.length) {
    let bestMatch = null;
    let bestPattern = null;

    for (const pattern of regex[name] || regex.js) {
      let regex = new RegExp(pattern.pattern, "g");
      regex.lastIndex = lastIndex;
      let match = regex.exec(code);

      if (match && (!bestMatch || match.index < bestMatch.index)) {
        bestMatch = match;
        bestPattern = pattern;
      }
    }

    if (!bestMatch) {
      styledCode.push(Domo("span").txt(code.slice(lastIndex)));
      break;
    }

    if (bestMatch.index > lastIndex) {
      styledCode.push(Domo("span").txt(code.slice(lastIndex, bestMatch.index)));
    }

    styledCode.push(Domo("span").cls(bestPattern.type).txt(bestMatch[0]));

    lastIndex = bestMatch.index + bestMatch[0].length;
  }

  return Domo().child([
    Domo()
      .cls("flex jc-sb p-0.5 bg-pprim")
      .child([
        Domo("p").cls("md").txt(name),
        Domo("span").cls("sm pointer txt-bege copyCode").data({ code }).txt("Copy"),
      ]),
    Domo("pre")
      .cls("p-1 bg-accent overflowX-auto tab-2 md")
      .child([Domo("code").child(styledCode)]),
  ]);
};

const escapeHtml = (str = "") =>
  String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const regex = {
  js: [
    { type: "comment", pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
    {
      type: "keyword",
      pattern: /\b(let|const|var|if|else|for|while|do|switch|case|break|continue|return|import|export)\b/,
    },
    { type: "string", pattern: /(["'`])(?:(?=(\\?))\2.)*?\1/ },
    { type: "number", pattern: /\b\d+(\.\d+)?\b/ },
    { type: "boolean", pattern: /\b(true|false|null)\b/ },
    { type: "function", pattern: /\b[a-zA-Z_]\w*(?=\s*\()/ },
    {
      type: "operator",
      pattern: /(?!\/\/)(?!\/\*)[%=&|<>!?^~]+/,
    },
    { type: "class", pattern: /\bclass\s+([A-Z][a-zA-Z0-9_]*)\b/ },
    { type: "property", pattern: /\b[a-zA-Z_]\w*(?=\s*[:(])/ },
    { type: "object", pattern: /\b[a-zA-Z_]\w*(?=\s*\.)/ },
    { type: "template-string", pattern: /`(?:\\.|[^`])*`/ },
    { type: "regex", pattern: /\/(?!\/)(?:\\.|[^\/\r\n])+\/[gimsuy]*/ },
  ],
  html: [
    {
      type: "tag",
      pattern: /<([a-zA-Z0-9]+)>|<([a-zA-Z0-9]+)|>|<\/([a-zA-Z0-9]+)>/,
    },
    { type: "attribute", pattern: /(?<=\s)([a-zA-Z]+)(?=\s*=)/g },

    { type: "comment", pattern: /<!--[\s\S]*?-->/g },
    { type: "string", pattern: /(["'])(.*?)\1/g },
    { type: "doctype", pattern: /<!DOCTYPE\s+[a-zA-Z]+\s*[^>]*>/g },
    {
      type: "self-closing-tag",
      pattern: /<([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)\/>/g,
    },
    {
      type: "entity",
      pattern: /&[a-zA-Z0-9#]+;/g,
    },
  ],
  css: [
    {
      type: "comment",
      pattern: /\/\*[\s\S]*?\*\//g,
    },

    {
      type: "media-query",
      pattern: /@media[\s\S]*?{[\s\S]*?}/g,
    },

    {
      type: "at-rule",
      pattern: /@([a-zA-Z0-9\-]+)(\s*[^;{]*)/g,
    },

    {
      type: "pseudo-element",
      pattern: /::([a-zA-Z0-9_-]+)/g,
    },

    {
      type: "pseudo-class",
      pattern: /:([a-zA-Z0-9_-]+)/g,
    },

    {
      type: "id",
      pattern: /#([a-zA-Z0-9_-]+)/g,
    },

    {
      type: "class",
      pattern: /\.([a-zA-Z0-9_-]+)/g,
    },

    {
      type: "color",
      pattern: /\b(#(?:[0-9a-fA-F]{3}){1,2}|rgb(?:a)?\([0-9,.\s%]+\)|hsl(?:a)?\([0-9,.\s%°]+\))\b/g,
    },

    {
      type: "unit",
      pattern: /\b(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|deg|s)\b/g,
    },

    {
      type: "value",
      pattern: /\b([a-zA-Z0-9#.\-%\(\)]+)(?=\s*;|\s*\})/g,
    },

    {
      type: "property",
      pattern: /\b([a-zA-Z\-]+)(?=\s*:)/g,
    },

    // Optional: restrict selector to tags (not already matched classes/ids)
    {
      type: "selector",
      pattern: /\b([a-zA-Z][a-zA-Z0-9-]*)\b(?=\s*\{)/g,
    },
  ],
};
