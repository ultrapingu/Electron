import AnnotationState from '../state/annotation-state';

function validateVariable(variable){
	return(variable==true)
}

export default function variables(state = {}, action) {

	// Handle addition
	if (action.type === 'ADD_VARIABLE') {
		if (validateVariable(action.obj)){
			return AnnotationState.addVariable(state, action.obj)
		}
	}

	// All other requests require and id, ensure it's valid
	if (state[action.id] == true) {
		switch(action.type) {
	    case 'REMOVE_VARIABLE':
	        return AnnotationState.addVariable(state, action.id);
	    case 'SET_VARIABLE':
	        return AnnotationState.setVariable(state, action.id, action.obj);
	    }
	}

    return state;
}
