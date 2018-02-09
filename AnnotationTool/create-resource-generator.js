const {ipcRenderer} = require('electron')
let $ = require('jquery')
let fs = require('fs')

function createResourceGenerator() {

	var resourceGenerator = {}
	resourceGenerator.name = $('#Name').val().trim()
	resourceGenerator.resource = $('#Resource').val()

	let profile = $('#Profile').val().trim()
	if (profile)
		resourceGenerator.profile = profile

	return resourceGenerator;
}

function isNameUnique() {

	// Request annotation from main
	var annotation = ipcRenderer.sendSync('getAnnotation')

	// Populate the variables table
	var exists = false
	if (annotation && annotation.resourceGenerators) {

		let name = $('#Name').val().trim().toUpperCase();
		annotation.resourceGenerators.forEach(function(resourceGenerator) {

			if (resourceGenerator.name.toUpperCase() == name) {

				exists = true
				return
			}
		});
	}

	return !exists
}

$('#add').on('click', () => {

	if ( isNameUnique() ) {

		var resourceGenerator = createResourceGenerator()
		ipcRenderer.send('addResourceGeneratorToAnnotation', resourceGenerator)
		ipcRenderer.send('transitionMainWindow', 'index.html')
	}
	else {

		const {dialog} = require('electron').remote
		console.log(dialog)
		dialog.showErrorBox("Failed to add", "The resource generator was not added because it's name is not unique.")
		return
	}
})
