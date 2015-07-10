#html2IDOM

Convert a string of HTML into an [Incremental DOM](https://github.com/google/incremental-dom) render.

##Installation

```
npm install html2IDOM
```

##Usage

```
var html2IDOM = require("html2IDOM");
var patch = require("incremental-dom").patch;

// get you view's el
var el = document.getElementById("view");

function render() {
    var html = callYourFavoriteTemplatingSystem();
    
    return html2IDOM(html);
}

// apply update via incremental dom
patch(el, render);
```

