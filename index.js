var Parser = require("htmlparser2").Parser;
var IncrementalDOM = require("incremental-dom");

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var text = IncrementalDOM.text;
var patch = IncrementalDOM.patch;


/**
 * build IDOM for ast node
 * @private
 * @param {Object} node - An AST node to render
 */
function renderToIDom(html) {
	var parser = new Parser({
		onopentag: function (name, attrs) {
			var argsArray = [name, null, null];
			
			// convert attribs object into a flat array
			for (var attr in attrs) {
				argsArray.push(attr);
				argsArray.push(attrs[attr]);
			}
			
			elementOpen.apply(null, argsArray);
		},
		ontext: text,
		onclosetag: elementClose
	}, {decodeEntities: true});
	
	parser.write(html);
	parser.end();
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