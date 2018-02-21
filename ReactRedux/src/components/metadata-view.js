import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AnnotationState from '../state/annotation-state'
import AnnotationActions from '../actions/annotation-actions';
import RaisedButton from 'material-ui/RaisedButton';
import KeyValueEditor from './key-value-editor'
import Divider from 'material-ui/Divider';

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
		console.log('onItemChange - ' + key + ":" + value)
	}

	onAdd(key, value) {
		console.log('onItemChange - ' + key + ":" + value)
	}

	onRemove(key) {
	}

	render() {

		let changeHandler = (key, value) => this.onKeyChange(key, value);
		let addHandler = (key, value) => this.onAdd(key, value);
		let removeHandler = (key) => this.onRemove(key);

		// Index items
		var idx = 0
		let rows = [];
		if(this.props.metadata){
			for (var key in this.props.metadata) {
				rows.push({itemKey: key, itemValue: this.props.metadata[key]});
			}
		}
		var result = (
			<div>
				<div style={{display:'inline-block', width: '100%'}}>
					<h1 style={{display: 'inline'}} >Edit Metadata</h1>
					<RaisedButton style={{float:'right', display:'block'}} label="Save" />
				</div>
				<Divider style={{marginTop:'10px'}} />
				<KeyValueEditor rows={rows} onAdd={addHandler} onRemove={removeHandler} onRowChanged={changeHandler} />
			</div>
		);
		return result;
	}
}

MetadataView.PropTypes = {
	metadata: PropTypes.object
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
