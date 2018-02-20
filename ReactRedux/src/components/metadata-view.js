import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AnnotationState from '../state/annotation-state'
import AnnotationActions from '../actions/annotation-actions';
import KeyValueEditor from './key-value-editor'

// Pure react component. Should not be connected to redux store; its container
// should be connected to the store.
export class MetadataView extends React.Component {
	setMetadataItem(key, value) {
		this.props.setMetadataItem(key, value);
	}

	removeMetadataItem(key) {
		this.props.removeMetadataItem(key);
	}

	onItemChange(key, value) {
		this.onRowChanged(key, value)
	}

	onAdd(key, value) {
		this.onAdd(key, value)
	}

	onRemove(key) {
		this.onRemove(key)
	}

	render() {

		let changeHandler = (key, value) => this.onKeyChange(key, value).bind(this);
		let addHandler = (key, value) => this.onAdd(key, value).bind(this);
		let removeHandler = (key) => this.onRemove(key).bind(this);

		// Index items
		var idx = 0
		let rows = [];
		if(this.props.metadata){
			for (var key in this.props.metadata) {
				rows.push({itemKey: key, itemValue: this.props.metadata[key]});
			}
		}
		var result = (
			<KeyValueEditor rows={rows} onAdd={addHandler} onRemove={removeHandler} onRowChanged={changeHandler} />
		);
		return result;
	}
}

MetadataView.PropTypes = {
	metadata: PropTypes.object,
	onAdd: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	onRowChanged: React.PropTypes.func
}

function mapStateToProps(state) {
	return {
		metadata: state.metadata,
	}
}

function mapDispatchToProps(dispatch) {
    return {
		setMetadataItem: (key, value) => dispatch(AnnotationActions.setMetadataItem(key, value)),
		removeMetadataItem: (key) => dispatch(AnnotationActions.removeMetadataItem(key)),
    };
}

export const MetadataViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MetadataView);
