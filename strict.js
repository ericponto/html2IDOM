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
		onopentag: function (name, attribs) {
			var attribsArray = [];
			
			// convert attribs object into a flat array
			for (var attr in attribs) {
				attribsArray.push(attr);
				attribsArray.push(attribs[attr]);
			}
			
			elementOpen.apply(null, [name, null, null].concat(attribsArray));
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