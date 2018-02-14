const Variable = require('./variable.js')
const ResourceGenerator = require('./resource-generator.js')
const EventSpawner = require('./event-spawner.js')

class Annotation extends EventSpawner {

	constructor() {

		super()

		this._variables = []
		this._resourceGenerators = []
		this._filePath
		this._isSaved = true
		this._idCounter = 0
	}

	onVariableChanged(variable) {

		if (!(variable instanceof Variable)) {
			throw 'not instance of variable'
		}

		if (variable.identifier == null) {
			throw 'variable has invalid id'
		}

		this._isSaved = false

		spawnEvent('onVariableChanged', variable)
		onVariablesChanged()
	}

	onVariablesChanged() {

		this._isSaved = false

		spawnEvent('onVariablesChanged', this._variables)
	}

	onResourceGeneratorChanged(resourceGenerator) {

		if (!(resourceGenerator instanceof ResourceGenerator)) {
			throw 'not instance of resource generator'
		}

		if (resourceGenerator.identifier == null) {
			throw 'resource generator has invalid id'
		}

		this._isSaved = false

		spawnEvent('onResourceGeneratorChanged', resourceGenerator)
		onResourceGeneratorsChanged()
	}

	onResourceGeneratorsChanged() {

		this._isSaved = false

		spawnEvent('onResourceGeneratorsChanged', this._resourceGenerators)
	}

	get variables() {

		return this._variables
	}

	getVariable(identifier) {

		for (variable in this._variables) {
			if (variable.identifier() == identifier) {
				return variable
			}
		}

		return null
	}

	createVariable() {

		return new Variable(this._idCounter++)
	}

	addVariable(variable) {

		if (!(variable instanceof Variable)) {
			throw 'not instance of variable'
		}

		if (variable.identifier == null) {
			throw 'variable has invalid id'
		}

		var storedVar = getVariable(variable.identifier())
		if (storedVar) {

			throw 'variable already exists'
		}

		variable.registerEventHandler('onChanged', onVariableChanged)
		this._variables.push(variable)

		spawnEvent('onVariableCreated', storedVariable)
		onVariablesChanged()
	}

	get resourceGenerators() {

		return this._resourceGenerators
	}

	getResourceGenerator(identifier) {

		for (resourceGenerator in this._resourceGenerators) {
			if (resourceGenerator.identifier() == identifier) {
				return resourceGenerator
			}
		}

		return null
	}

	createResourceGenerator(resourceGenerator) {

		return new ResourceGenerator(this._idCounter++)
	}

	addResourceGenerator(resourceGenerator) {

		if (!(resourceGenerator instanceof ResourceGenerator)) {
			throw 'not instance of resource generator'
		}

		if (resourceGenerator.identifier == null) {
			throw 'resource generator has invalid id'
		}

		var storedResourceGenerator = getResourceGenerator(resourceGenerator.identifier())
		if (storedResourceGenerator) {

			throw 'resource generator already exists'
		}

		resourceGenerator.registerEventHandler('onChanged', onResourceGeneratorChanged)
		this._resourceGenerators.push(resourceGenerator)

		spawnEvent('onResourceGeneratorCreated', storedResourceGenerator)
		onResourceGeneratorsChanged()
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
