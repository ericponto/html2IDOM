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
		var attribsArray = [];
			
		// convert attribs object into a flat array
		for (var attr in node.attrs) {
			attribsArray.push(attr);
			attribsArray.push(node.attrs[attr]);
		}
		
		var argsArray = [node.name, null, null].concat(attribsArray);
		
		if (node.voidElement) {
			elementVoid.apply(null, argsArray);
		} else {
			elementOpen.apply(null, argsArray);
			
			node.children.forEach(function(child) {
				renderAstNode(child);
			});
		
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