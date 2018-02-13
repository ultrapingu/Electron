class Annotation {

	constructor() {

		this._variables = []
		this._resourceGenerators = []
		this._filePath
		this._isSaved = true
	}

	get variables() {

		return this._variables
	}

	get resourceGenerators() {

		return this._resourceGenerators
	}

	get filePath() {

		return this._filePath
	}

	get isSaved() {

		return this._isSaved
	}

	save(path) {

		if ( path == false ) {

			return false
		}

		const fs = require('fs')
		var json = JSON.stringify(annotation, null, 2);
		fs.writeFile(annotationFilePath, json, 'utf8', function (err) {

			if ( err ) {

				return false
			}
			else {

				return true
			}
		});

		this._filePath = path
		this._isSaved = true
	}

	static load(path) {

		if ( path == false ) {

			return null
		}

		const fs = require('fs')
		var loadedObject = JSON.parse(fs.readFileSync(path, 'utf8'))

		if (loadedObject.variables && loadedObject.resourceGenerators) {

			var annotation = new Annotation()
			annotation._variables = loadedObject.variables
			annotation._resourceGenerators = loadedObject.resourceGenerators

			return annotation
		}
		else {

			return null
		}
	}
};

module.exports = Annotation;
