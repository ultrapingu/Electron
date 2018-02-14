const EventSpawner = require('./event-spawner.js')

class ResourceGenerator extends EventSpawner {

	constructor(identifier) {

		super()

		this._identifier = identifier
		this._name = ''
		this._type = null
		this._profile = null
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

	get type() {
		return this._type
	}

	set type(str) {
		this._type = str
		spawnEvent('onChanged', this)
	}

	get profile() {
		return this._profile
	}

	set profile(str) {
		this._profile = str
		spawnEvent('onChanged', this)
	}
}

module.exports = ResourceGenerator;
