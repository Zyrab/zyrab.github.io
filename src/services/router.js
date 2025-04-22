let _routes = {};
let _listeners = [];
const _scrollPositions = {};
let _previousUrl = "";

let _root = document.createElement("main");
_root.id = "main";

function init() {
  ["DOMContentLoaded", "popstate"].forEach((event) =>
    window.addEventListener(event, async () => {
      saveScroll(_previousUrl);
      const url = path();
      load(url);
      _previousUrl = url;
      restoreScroll();
    })
  );
}

async function render({ component, meta }, params) {
  try {
    const content = await component(params);
    _root.replaceChildren();

    if (content instanceof HTMLElement) {
      _root.appendChild(content);
    } else if (typeof content === "string") {
      const wrapper = document.createElement("div");
      wrapper.textContent = content;
      _root.appendChild(wrapper);
    } else {
      throw new Error("Unsupported component output type");
    }
    if (meta) {
      document.title = meta?.title;
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", meta?.description);
    }
  } catch (error) {
    console.error("Rendering error:", error);
    const fallback = _routes["*"]?.component?.({ error: error.message });
    if (fallback) {
      _root.replaceChildren();
      _root.appendChild(fallback);
    }
  }
}
async function go(path) {
  saveScroll(_previousUrl);
  await load(path);
  _previousUrl = path;
  restoreScroll();
}

const path = () => window.location.pathname + window.location.hash;

function info() {
  const { segments } = parseUrl(path());
  const { routeData, params } = match(segments);
  return { meta: routeData.meta || {}, params, segments };
}

function parseUrl(url) {
  // Remove the hash from the URL
  const pureUrl = url.includes("#") ? url.split("#")[0] : url;
  // Split the URL into segments keepinig '/' for nested routes
  const segments = pureUrl.split(/(?=\/)/g).filter(Boolean);
  return {
    segments,
    pureUrl,
  };
}

function match(segments) {
  if (!segments.length) return { routeData: _routes["/"] || _routes["*"] };

  let current = _routes;
  let params = {};

  for (const segment of segments) {
    if (current[segment]) {
      // exact match found go deeper
      current = current[segment].children || current[segment];
    } else {
      // look for dynamic route
      const dynamic = Object.keys(current).find((k) => k.includes(":"));
      if (!dynamic) return { routeData: _routes["*"], params: {} };

      const parmName = dynamic.split(":")[1];
      params = { ...params, [parmName]: segment.replace("/", "") };
      current = current[dynamic].children || current[dynamic];
    }
  }
  // we send for rendering default child if component doesnt exists
  const final = current.component ? current : current["/"] || _routes["*"];

  return { params, routeData: final };
}

async function load(url) {
  const { segments, pureUrl } = parseUrl(url);
  const { routeData, params } = match(segments);

  if (path() !== url) {
    history.pushState(null, null, pureUrl);
  }

  if (url === _previousUrl) return;

  await render(routeData, params);
  if (_listeners.length > 0) notify(info());
}

function notify(info) {
  _listeners.forEach((cb) => cb(info));
}
function saveScroll(path = window.location.pathname) {
  _scrollPositions[path] = window.scrollY;
}

function restoreScroll() {
  const pos = _scrollPositions[window.location.pathname];
  window.scrollTo(0, pos || 0);
}

export const Router = {
  mount: () => _root,
  init,
  go,
  back: () => history.back(),
  path,
  prev: () => _previousUrl || "/",
  segments: () => parseUrl(path()).segments,
  info,
  routes: (config) => {
    _routes = config;
  },
  listen: (fn) => {
    if (typeof fn === "function") _listeners.push(fn);
  },
};
