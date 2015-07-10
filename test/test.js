var html2IDOM = require("../html2idom");
var patch = require("incremental-dom").patch;

function render() {
	return html2IDOM("<h1 class='hi'>Hello, Incremental DOM</h1>");
}

patch(document.querySelector("#test"), render);