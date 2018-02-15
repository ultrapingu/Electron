const EventSpawner = require('./event-spawner.js')

class Variable extends EventSpawner {

	constructor(identifier) {

		super()

		this._identifier = identifier
		this._name = ''
		this._description = ''
		this._inputDatatype = ''
		this._outputDatatype = ''
		this._mappings = null
		this._unit = ''
		this._format = ''
		this._language = ''
	}

	get identifier() {
		return this._identifier
	}

	get name() {
		return this._name
	}

	set name(str) {
		this._name = str
		spawnEvent('onChanged', this)
	}

	get description() {
		return this._description
	}

	set description(str) {
		this._description = str
		spawnEvent('onChanged', this)
	}

	get inputDatatype() {
		return this._inputDatatype
	}

	set inputDatatype(str) {
		this._inputDatatype = str
		spawnEvent('onChanged', this)
	}

	get outputDatatype() {
		return this._outputDatatype
	}

	set outputDatatype(str) {
		this._outputDatatype = str
		spawnEvent('onChanged', this)
	}

	get mappings() {
		return this._mappings
	}

	set mappings(ary) {
		this._mappings = ary
		spawnEvent('onChanged', this)
	}

	get unit() {
		return this._unit
	}

	set unit(str) {
		this._unit = str
		spawnEvent('onChanged', this)
	}

	get format() {
		return this._format
	}

	set format(str) {
		this._format = str
		spawnEvent('onChanged', this)
	}

	get language() {
		return this._language
	}

	set language(str) {
		this._language = str
		spawnEvent('onChanged', this)
	}
}

module.exports = Variable;
