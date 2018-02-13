const wh = require('../window-helper.js')

module.exports = {

	init: function(layout) {

		wh.registerComponent(layout, 'annotation-resource-generators')
	}
}
