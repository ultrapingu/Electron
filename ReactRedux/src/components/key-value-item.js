import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import $ from 'jquery'
import IconButton from 'material-ui/IconButton';
import {red500} from 'material-ui/styles/colors';

class KeyValueItem extends Component {

	constructor(props) {
		super(props);
		let isEmpty = (props.itemKey);
		this.state = $.extend({
			itemKey: '',
			itemValue: '',
			onRemove: () => {},
			onKeyChange: (itemKey, value, itemValue) => {},
			onValueChange: (itemKey, itemValue, value) => {}
		}, props, {isNew: isEmpty});
	}

	onKeyChange(value) {
		let { itemKey } = this.state
		let { itemValue } = this.state

		this.state.onKeyChange(itemKey, value, itemValue)
		itemKey = value;

		this.setState({ itemKey });
	}

	onValueChange(value) {
		let { itemKey } = this.state
		let { itemValue } = this.state

		this.state.onValueChange(itemKey, itemValue, value)
		itemValue = value;

		this.setState({ itemValue });
	}

	handleRemove() {
		this.state.onRemove()
	}

	render() {
		let keyChangeHandler = (event, value) => this.onKeyChange(value);
		let valueChangeHandler = (event, value) => this.onValueChange(value);
		let removeHandler = (event) => this.handleRemove();

		const buttonStyle = {marginRight: 20};

		let removeButton = () => (<IconButton tooltip="Remove" onClick={removeHandler}><ContentClear hoverColor={red500}  /></IconButton>);

		let keyEditor = (<TextField ref="key" hintText="key" defaultValue={this.props.itemKey} onChange={keyChangeHandler} />);
		let valueEditor = (<TextField hintText="value" ref="value" defaultValue={this.props.itemValue} onChange={valueChangeHandler} />);
		let button = removeButton()

		return (
			<li className="key-value-item">
				{keyEditor}
				{valueEditor}
				{button}
			</li>
		);
	}
}

KeyValueItem.propTypes = {
	itemKey: React.PropTypes.string,
	itemValue: React.PropTypes.string,
	onRemove: React.PropTypes.func,
	onKeyChange: React.PropTypes.func,
	onKValueChange: React.PropTypes.func
}

export default KeyValueItem;
