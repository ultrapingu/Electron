const {ipcRenderer} = require('electron')
let $ = require('jquery')
let fs = require('fs')

function createVariable() {

	var variable = {}
	variable.name = $('#Name').val().trim()
	variable.inputDatatype = $('#InputDatatype').val()
	variable.outputDatatype = $('#OutputDatatype').val()

	let unit = $('#Unit').val().trim()
	if (unit.length > 0)
		variable.unit = unit

	let format = $('#Format').val().trim()
	if (format.length > 0)
		variable.format = format

	// This is a total hack
	if (variable.outputDatatype.toUpperCase() == "CODING")
		variable.mappings = [];


	return variable;
}

function isNameUnique() {

	// Request annotation from main
	var annotation = ipcRenderer.sendSync('getAnnotation')

	// Populate the variables table
	var exists = false
	if (annotation && annotation.variables) {

		let name = $('#Name').val().trim().toUpperCase();
		annotation.variables.forEach(function(variable) {

			if (variable.name.toUpperCase() == name) {

				exists = true
				return
			}
		});
	}

	return !exists
}

$('#add').on('click', () => {

	if ( isNameUnique() ) {

		var variable = createVariable()
		ipcRenderer.send('addVariableToAnnotation', variable)
		ipcRenderer.send('transitionMainWindow', 'index.html')
	}
	else {

		const {dialog} = require('electron').remote
		console.log(dialog)
		dialog.showErrorBox("Failed to add", "The variable was not added because it's name is not unique.")
		return
	}
})
