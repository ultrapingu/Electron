const remote = require('electron').remote
const path = require('path')

module.exports = {

   init: function(layout, updatePosition) {

		 layout.registerComponent('annotation-resource-generators', function (container, state) {

			 let webview = null;
			 let element = $(container.getElement());

			 // Set id
			 const containerId = 'window-annotation-resource-generators'
			 element.attr('id', containerId)

			 container.on('open', function () {

				 // Create content
				 var resourcePath = remote.getCurrentWindow().resourcePath
				 var htmlPath = path.join(resourcePath, 'html', 'window', 'annotation-resource-generators.html')
				 webview = $('<webview src="' + htmlPath + '" nodeintegration disablewebsecurity autosize></webview>');
				 webview.attr("id", "webview-content");
				 webview.css({"position": "absolute"});

				 // Add web content to window
				 $(".lm_root").append(webview);

				 updatePosition(element, webview);

				 const observer = new MutationObserver(function (mutations) {
					 mutations.forEach(function (mutation) {
						 console.log("Mutation detected: ", mutation, mutation.target.getAttribute('id'));
						 updatePosition(element, webview);
					 });
				 });
				 var config = { attributes: true, attributeFilter: ['style'] };

				 const elementNode = document.getElementById(containerId);
				 observer.observe(elementNode.parentNode, config);

				 webview.show();
			 });
		 });
   }
}
