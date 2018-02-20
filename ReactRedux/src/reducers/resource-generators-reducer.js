import AnnotationState from '../state/annotation-state';

function validateResourceGenerator(resourceGenerator){
	return(resourceGenerator==true)
}

export default function resourceGenerators(state = {}, action) {

	// Handle addition
	if (action.type === 'ADD_RESOURCEGENERATOR') {
		if (validateResourceGenerator(action.obj)){
			return AnnotationState.addResourceGenerator(state, action.obj)
		}
	}

	// All other requests require and id, ensure it's valid
	if (state[action.id] == true) {
		switch(action.type) {
	    case 'REMOVE_RESOURCEGENERATOR':
	        return AnnotationState.addResourceGenerator(state, action.id);
	    case 'SET_RESOURCEGENERATOR':
	        return AnnotationState.setResourceGenerator(state, action.id, action.obj);
	    }
	}

    return state;
}
