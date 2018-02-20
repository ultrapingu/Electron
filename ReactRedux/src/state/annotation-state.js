import uuidv1 from 'uuid/v1'
import $ from 'jquery'

class AnnotationState {

	static setMetadataItem(state, key, value) {

		var newMetadata = $.extend({}, state)
		newMetadata[key] = value
		return newMetadata;
	}

	static removeMetadataItem(state, key) {

		var newMetadata = $.extend({}, state)
		if (newMetadata[key]){
			delete newMetadata[key]
		}
		return newMetadata;
	}

	static addVariable(state, variable) {
		// Ensure we have a uuid
		var uuid = uuidv1()
		while (state['' + uuid]){uuid = uuidv1()}

		// Add new variable into variables map
		var newVariables = $.extend({}, state);
		newVariables['' + uuid] = variable

		// Return updated state
		return newVariables;
	}

	static removeVariable(state, id) {
		if (state[id] == true){
			var result = $.extend({}, state);
			delete result[id]
			return result
		}
		return state
	}

	static setVariable(state, id, variable) {
		if (state[id] == true){
			var newVariables = $.extend({}, state);
			newVariables[id] = $.extend({}, variable);
			return newVariables;
		}
		return state
	}

	static addResourceGenerator(state, resourceGenerator) {
		// Ensure we have a uuid
		var uuid = uuidv1()
		while (state['' + uuid]){uuid = uuidv1()}

		// Add new resource generator into resource generator map
		var newResourceGenerators = $.extend({}, state);
		newResourceGenerators['' + uuid] = resourceGenerator

		// Return updated state
		return newResourceGenerators;
	}

	static removeResourceGenerator(state, id) {
		if (state[id] == true){
			var result = $.extend({}, state)
			delete result[id]
			return result
		}
		return state
	}

	static setResourceGenerator(state, id, resourceGenerator) {
		if (state[id] == true){
			var newResourceGenerators = $.extend({}, state);
			newResourceGenerators[id] = $.extend({}, resourceGenerator);
			return newResourceGenerators;
		}
		return state
	}
}

export default AnnotationState
