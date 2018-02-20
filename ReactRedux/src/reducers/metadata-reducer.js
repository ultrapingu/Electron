import AnnotationState from '../state/annotation-state';

var defaultValue = {
	name: '',
	description: '',
	author: ''
};

export default function metadata(state = defaultValue, action) {

	switch(action.type) {
	case 'SET_METADATA':
		return AnnotationState.setMetadataItem(state, action.key, action.value);
	case 'REMOVE_METADATA':
		return AnnotationState.removeMetadataItem(state, action.key);
	}

	return state;
}
