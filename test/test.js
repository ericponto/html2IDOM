var html2idom = require("../html2idom");
var patch = require("incremental-dom").patch;

function render() {
	return html2idom("<h1 class='hi'>Hello, Incremental DOM</h1>");
}

patch(document.querySelector("#test"), render);