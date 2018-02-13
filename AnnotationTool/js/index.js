const $ = require('jquery')
window.$ = $
const GoldenLayout = require('golden-layout');
const remote = require('electron').remote
const path = require('path')

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

function addWindowComponents(layout) {

	require('./window/annotation-metadata.js').init(layout)
	require('./window/annotation-variables.js').init(layout)
	require('./window/annotation-resource-generators.js').init(layout)
	require('./window/annotation-stats.js').init(layout)
}

addWindowComponents(layout)

layout.init();
