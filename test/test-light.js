var html2idom = require("../light");

html2idom.patchHTML(document.querySelector("#test"), "<h1 class='hi'>Hello, Incremental DOM</h1>");