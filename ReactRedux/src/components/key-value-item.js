import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd  from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import $ from 'jquery'

class KeyValueItem extends Component {

	constructor(props) {
		super(props);
		// let isEmpty = (props.itemKey);
		// this.state = $.extend({
		// 	itemKey: '',
		// 	itemValue: '',
		// 	onAdd: (key, value) => {},
		// 	onRemove: (key, value) => {},
		// 	onItemChange: (key) => {}
		// }, props, {isNew: isEmpty});
	}

	onKeyChange(value) {
		console.log('onKeyChange');
	}

	onValueChange(value) {
		console.log('onValueChange');
	}

	onAdd() {
		console.log('onAdd');
	}

	onRemove() {
		console.log('onAdd');
	}

	render() {

		console.log(this.props)
		console.log(this.state)

		let keyChangeHandler = (event, value) => this.onKeyChange(value).bind(this);
		let valueChangeHandler = (event, value) => this.onKeyChange(value).bind(this);
		let addHandler = (event, value) => this.onAdd().bind(this);
		let removeHandler = (event, value) => this.onRemove().bind(this);

		const buttonStyle = {marginRight: 20};

		let addButton = () => (<FloatingActionButton mini={true} style={buttonStyle}><ContentAdd /></FloatingActionButton>);
		let removeButton = () => (<FloatingActionButton mini={true} style={buttonStyle}><ContentClear /></FloatingActionButton>);

		let keyEditor = (<TextField ref="key" hintText="name" defaultValue={this.props.itemKey} onChange={keyChangeHandler} />);
		let valueEditor = (<TextField hintText="value" ref="value" defaultValue={this.props.itemValue} onChange={valueChangeHandler} />);
		let button = this.props.isNew ? addButton() : removeButton()

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
	onAdd: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	onItemChange: React.PropTypes.func
}

export default KeyValueItem;
