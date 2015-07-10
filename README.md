#html2idom

Convert a string of HTML into an [Incremental DOM](https://github.com/google/incremental-dom) render.

HTML parsing done by [html-parse-stringy](https://github.com/HenrikJoreteg/html-parse-stringify), which requires HTML to be written more strictly and may not handle edge cases of valid HTML. If you want a more proper HTML parser, use "html2idom/strict", which uses [htmlparser2](https://github.com/fb55/htmlparser2) to parse the HTML but is much heavier.

##Installation

```
npm install html2idom
```

##Usage

```
var patchHTML = require("html2idom").patchHTML;

// get you view's el
var el = document.getElementById("view");
var html = "<h1 class='greetings'>Hello, World</h1>";

// apply the HTML to the el via incremental dom
patchHTML(el, HTML);
```
