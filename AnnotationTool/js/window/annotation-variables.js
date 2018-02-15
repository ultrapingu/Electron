const wh = require('../window-helper.js')

drawList(container) {

	var viewer = container.getElement().find('viewer')
	viewer.empty()

	// Create list group
	var listGroupStr = '<ul class="list-group variables-list" ></ul>'
	var listGroup = $(listGroupStr)
	viewer.html(listGroup)

	// Create search bar
	var searchBarStr = '<li class="list-group-header" ><input class="form-control" type="text" placeholder="Variable Name" ></li>'
	var searchBar = $(searchBarStr)
	listGroup.html(searchBar)

	// Add variables
	for (variable in window.annotation.variables) {

		var mediaBody = ''

		// Add Name
		mediaBody = mediaBody + '<strong>' + variable.name + '</strong>'

		// Add Datatypes
		mediaBody = mediaBody + '<p>' + variable.inputDatatype + ' -> ' + variable.outputDatatype + '</p>'

		// Add Mappings
		if (variable.mappings != null) {
			mediaBody = mediaBody + '<p>Mappings: ' + variable.mappings.length + '</p>'
		}

		// Add Unit
		if (variable.unit != null) {
			mediaBody = mediaBody + '<p>Unit: ' + variable.unit + '</p>'
		}

		// Add Format
		if (variable.format != null) {
			mediaBody = mediaBody + '<p>Format: ' + variable.format + '</p>'
		}

		// Add Language
		if (variable.language != null) {
			mediaBody = mediaBody + '<p>Language: ' + variable.language + '</p>'
		}

		mediaBody = '<div class="media-body" >' + mediaBody + '</div>';
		var img = '<img class="img-circle media-object pull-left" src="../assets/icons/png/' + variable.outputDatatype + '.png" width="32" height="32" >';
		var html = '<li class="list-group-item" >' + img + mediaBody + '</li>';

		listGroup.append(html)
	}

	// Add create new button
	var searchBarStr = '<li class="list-group-header" ><input class="form-control" type="text" placeholder="Variable Name" ></li>'
	var searchBar = $(searchBarStr)
	listGroup.html(searchBar)
}

module.exports = {

	init: function(layout) {

		wh.registerComponent(layout, 'annotation-variables', function (container, state) {

		});
	}
}
