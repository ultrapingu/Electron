const remote = require('electron').remote
const path = require('path')
const fs = require('fs');

module.exports = {

	registerComponent: function(layout, componentName, onRegister) {

		layout.registerComponent(componentName, function (container, state) {

			// Create content
			var resourcePath = remote.getCurrentWindow().resourcePath
			var htmlPath = path.join(resourcePath, 'html', 'window', componentName + '.html')

			fs.readFile(htmlPath, "utf8", function (err, html) {

				if (err) {

					container.getElement().append('<p>Failed to load window ' + htmlPath + '</p>');
					throw err;
				}

				container.getElement().append(html);
			});

			if (onRegister) {

				onRegister(container, state)
			}
		});
	}
}
