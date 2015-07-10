var Parser = require("htmlparser2").Parser;
var IncrementalDOM = require("incremental-dom");

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var text = IncrementalDOM.text;

module.exports = function html2idom(html) {
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