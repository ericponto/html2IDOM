var html2idom = require("../strict");

html2idom.patchHTML(document.querySelector("#test"), "<h1 class='hi'>Hello, Incremental DOM</h1>");