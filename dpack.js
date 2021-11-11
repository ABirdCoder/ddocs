const elm = document.currentScript;


const highlightScript = document.createElement("script");
const hightlightCss = document.createElement("link");
const darkTheme = document.createElement("link")
const docsScript = document.createElement("script");
const docsCss = document.createElement("link");

highlightScript.src = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.3.1/build/highlight.min.js";
docsScript.src = "https://cdn.jsdelivr.net/gh/BobTheBirdCodar/ddocs@latest/docs.js";

hightlightCss.rel = "stylesheet";
hightlightCss.href = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.3.1/build/styles/default.min.css";
docsCss.rel = "stylesheet";
docsCss.href = "https://cdn.jsdelivr.net/gh/BobTheBirdCodar/ddocs@latest/docs.css";

darkTheme.rel = "stylesheet";
darkTheme.href = "https://highlightjs.org/static/demo/styles/atom-one-dark.css";
darkTheme.disabled = "disabled";
darkTheme.id = "DDarkTheme";

document.head.appendChild(highlightScript);
document.head.appendChild(hightlightCss);
document.head.appendChild(docsCss);
document.head.appendChild(docsScript);
document.head.appendChild(darkTheme);

elm.remove();
