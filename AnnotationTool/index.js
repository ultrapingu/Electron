const {ipcRenderer} = require('electron')
const Annotation = require('./annotation.js');
const path = require('path')
const url = require('url')

let $ = require('jquery')
let fs = require('fs')
let filename = 'recentResources'

function loadContent() {

	$('#variables-table tbody > tr').remove()
	$('#resource-generator-table tbody > tr').remove()

	// Request annotation from main
	console.log("Requesting annotation")
	var annotation = ipcRenderer.sendSync('getAnnotation')

	console.log("Annotation after request " + annotation)
	console.log("Variables after request " + annotation.variables)

	// Populate the variables table
	if (annotation && annotation.variables) {

		console.log(annotation.variables)
		annotation.variables.forEach(function(variable) {

			console.log(variable.name)

			let unit = variable.unit ? variable.unit : "N/A"
			let format = variable.format ? variable.format : "N/A"
			let mappings = variable.mappings ? variable.mappings.length : "N/A"

			let updateString = '<tr><td>'+ variable.name + '</td><td>'+ variable.inputDatatype +'</td><td>' + variable.outputDatatype +'</td><td>' + mappings +'</td><td>' + unit +'</td><td>' + format +'</td></tr>'
			$('#variables-table tbody').append(updateString)
		});
	}

	// Populate the resource generator
	if (annotation && annotation.resourceGenerators) {

		annotation.resourceGenerators.forEach(function(resourceGenerator) {

			let profile = resourceGenerator.profile ? resourceGenerator.profile : "N/A"

			let updateString = '<tr><td>'+ resourceGenerator.name + '</td><td>'+ resourceGenerator.resource +'</td><td>' + profile +'</td></tr>'
			$('#resource-generator-table tbody').append(updateString)
		});
	}
}

$('#create-resource-generator').on('click', () => {

	ipcRenderer.send('transitionMainWindow', 'create-resource-generator.html')
})

$('#create-variable').on('click', () => {

	ipcRenderer.send('transitionMainWindow', 'create-variable.html')
})

ipcRenderer.on('annotationChanged', (event) => {

	loadContent()
})

loadContent()
