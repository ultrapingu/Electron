const $ = require('jquery')
window.$ = $
const GoldenLayout = require('golden-layout');
const remote = require('electron').remote
const path = require('path')
const Annotation = require('./classes/annotation.js')
const React = require('react')

// Components
const VariableList = require('./components/variable-list.js')

var config = {
	content: [{
		type: 'column',
		content: [{
			type: 'component',
			componentName: 'annotation-metadata'
		},
		{
			type: 'row',
			content: [{
				type: 'component',
				componentName: 'annotation-variables'
			},
			{
				type: 'component',
				componentName: 'annotation-resource-generators'
			}]
		},
		{
			type: 'component',
			componentName: 'annotation-stats'
		}]
	}]
};

// Load/Create layout
var layout, savedState = localStorage.getItem('savedState');
if(savedState !== null) {

	layout = new GoldenLayout(JSON.parse(savedState));
}
else {

	layout = new GoldenLayout(config);
}

layout.on( 'stateChanged', function() {

	var state = JSON.stringify(layout.toConfig());
	localStorage.setItem('savedState', state);
});

function setupAnnotation(filePath) {

	// Attempt to load
	if (filePath) {

		window.annotation = Annotation.load(filePath);
	}

	// If not loaded, create default
	window.annotation = window.annotation || new Annotation()
}

function addWindowComponents(layout) {

	require('./window/annotation-metadata.js').init(layout)

	//console.log(VariableList);
	layout.registerComponent( 'annotation-variables', VariableList );

	require('./window/annotation-variable-editor.js').init(layout)
	require('./window/annotation-resource-generators.js').init(layout)
	require('./window/annotation-resource-generator-editor.js').init(layout)
	require('./window/annotation-stats.js').init(layout)
}

setupAnnotation(remote.getCurrentWindow().args.filePath)
addWindowComponents(layout)

layout.init();
