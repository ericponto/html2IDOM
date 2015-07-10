#html2idom

Convert a string of HTML into an [Incremental DOM](https://github.com/google/incremental-dom) render.

HTML parsing done by [htmlparser2](https://github.com/fb55/htmlparser2).

##Installation

```
npm install html2idom
```

##Usage

```
var html2idom = require("html2idom");
var patch = require("incremental-dom").patch;

// get you view's el
var el = document.getElementById("view");

function render() {
    var html = callYourFavoriteTemplatingSystem();
    
    return html2idom(html);
}

// apply update via incremental dom
patch(el, render);
```

