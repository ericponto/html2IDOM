#html2idom

Convert a string of HTML into an [Incremental DOM](https://github.com/google/incremental-dom) render.

HTML parsing done by [htmlparser2](https://github.com/fb55/htmlparser2), which is a very fast and accurate HTML parser. However, it comes at a cost up front as it adds around 40kb (min and gzipped) to your code.

If that dependency is too large,then there is a light version (`require("html2idom/light")`) using [html-parse-stringy](https://github.com/HenrikJoreteg/html-parse-stringify), which is much smaller in size, but slower when parsing HTML. If you are only dealing with small sets of HTML, then this option might be better.


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
