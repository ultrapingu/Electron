class EventSpawner {

	constructor() {

		this._events = {}
	}

	registerEventHandler(eventName, handler) {

		this._events[eventName] = this._events[eventName] || []
		this._events[eventName] = this._events[eventName].concat([handler])
	}

	unregisterEventHandler(eventName, handler) {

		this._events[eventName] = this._events[eventName] || []
		for (i = 0; i < this._events[eventName].length; i++) {

			if (this._events[eventName][i] == handler) {

				this._events[eventName] = this._events[eventName].splice(i, 1)
				return
			}
		}

		this._events[eventName] = this._events[eventName].concat([handler])
	}

	spawnEvent(eventName) {

		console.log('Running event: ' + eventName)

		if (this._events[eventName]) {

			var args = arguments.length > 0 ? arguments.splice(0, 1) : []
			this._events[eventName].foreach(function(handler) {

				handler.apply(null, args);
			});
		}
	}
};

module.exports = EventSpawner;
