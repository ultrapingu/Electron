class AnnotationActions {

	static setMetadataItem(key, value) {
		return {
			type: 'SET_METADATA',
			key: key,
			value: value
		};
	}

	static removeMetadataItem(key) {
		return {
			type: 'REMOVE_METADATA',
			key: key
		};
	}

	static addVariable(variable) {
		return {
			type: 'ADD_VARIABLE',
			obj: variable
		};
	}

	static removeVariable(id) {
		return {
			type: 'REMOVE_VARIABLE',
			id: id
		};
	}

	static removeVariable(id, variable) {
		return {
			type: 'SET_VARIABLE',
			id: id,
			obj: variable
		};
	}

	static addResourceGenerator(resourceGenerator) {
		return {
			type: 'ADD_RESOURCEGENERATOR',
			obj: resourceGenerator
		};
	}

	static removeResourceGenerator(id) {
		return {
			type: 'REMOVE_RESOURCEGENERATOR',
			id: id
		};
	}

	static setResourceGenerator(id, resourceGenerator) {
		return {
			type: 'SET_RESOURCEGENERATOR',
			id: id,
			obj: resourceGenerator
		};
	}
}

export default AnnotationActions
