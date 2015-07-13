var parse = require("html-parse-stringify").parse;
var IncrementalDOM = require("incremental-dom");

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var elementVoid = IncrementalDOM.elementVoid;
var text = IncrementalDOM.text;
var patch = IncrementalDOM.patch;

/**
 * build IDOM for ast node
 * @private
 * @param {Object} node - An AST node to render
 */
function renderAstNode(node) {
	if (node.type == "text") {
		text(node.content);
	}
	
	if (node.type == "tag") {
		var argsArray = [node.name, null, null];
			
		// convert attribs object into a flat array
		for (var attr in node.attrs) {
			argsArray.push(attr);
			argsArray.push(node.attrs[attr]);
		}
		
		if (node.voidElement) {
			elementVoid.apply(null, argsArray);
		} else {
			elementOpen.apply(null, argsArray);
			
			for (var i = 0, len = node.children.length; i < len; i++) {
				renderAstNode(node.children[i]);
			}
		
			elementClose(node.name);
		}
	}
}

/**
 * render function for IDOM that takes a string of HTML
 * @param {String} html - The string of HTML to render
 */
function renderToIDom(html) {
	var ast = parse(html);
	
	if (Array.isArray(ast)) {
		ast.forEach(renderAstNode);
	} else {
		renderAstNode(ast);
	}
};

/**
 * apply the HTML to an element via Incremental DOM's `patch`
 * @param {Element} el - The element to apply the patch to
 * @param {String} html - A string of HTML
 */
function patchHTML(el, html) {
	patch(el, function() {
		return renderToIDom(html);
	});
}

module.exports = {
	renderToIDom: renderToIDom,
	patchHTML: patchHTML
}