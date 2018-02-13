const $ = require('jquery')
window.$ = $
const GoldenLayout = require('golden-layout');
const remote = require('electron').remote
const path = require('path')

var layout = new GoldenLayout({
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
});

layout.on('stackCreated', function (stack) {
	stack
		.header
		.controlsContainer
		.find('.lm_close') //get the close icon
		.off('click') //unbind the current click handler
		.click(function () {
			//add your own
			if (confirm('really close this?')) {
				stack.remove();
			}
		});
});

layout.on('tabCreated', function (tab) {
	tab
		.closeElement
		.off('click') //unbind the current click handler
		.click(function () {
			//add your own
			if (confirm('really close this?')) {
				tab.contentItem.remove();
			}
		});
});

function updatePosition(lmElement, webview) {
	const element = $(lmElement);
	let css = element.offset();

	css['width'] = lmElement.width();
	css['height'] = lmElement.height();

	const isVisible = lmElement.is(":visible");

	if (isVisible) {
		$(webview).show();
	} else {
		$(webview).hide();
	}

	// css['display'] = ;
	// const isVisible = element.parentNode.style.display != 'none';
	// css['display'] = element.parent().style;

	console.log(`Updating webview "${webview.attr('id')}": display: ${isVisible}, width:${css.width}, height:${css.height}, top:${css.top}, left:${css.left}`);

	$(webview).css(css);
}

function addWindowComponents(layout, updatePosition) {

	require('./window/annotation-metadata.js').init(layout, updatePosition)
	require('./window/annotation-variables.js').init(layout, updatePosition)
	require('./window/annotation-resource-generators.js').init(layout, updatePosition)
	require('./window/annotation-stats.js').init(layout, updatePosition)
}

addWindowComponents(layout, updatePosition)




layout.init();
