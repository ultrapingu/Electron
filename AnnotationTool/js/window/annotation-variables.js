const remote = require('electron').remote
const path = require('path')

module.exports = {

   init: function(layout) {

		 layout.registerComponent('annotation-variables', function (container, state) {

       // Create content
       var resourcePath = remote.getCurrentWindow().resourcePath
       var htmlPath = path.join(resourcePath, 'html', 'window', 'annotation-variables.html')
       webview = $('<webview src="' + htmlPath + '" nodeintegration disablewebsecurity autosize></webview>');
       webview.attr("id", "webview-content");
       webview.css({"position": "absolute"});

       container.getElement().append(webview);

       webview.show();
		 });
   }
}
