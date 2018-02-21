import React, { Component } from 'react';
import KeyValueItem from './key-value-item';
import $ from 'jquery'
import uuidv1 from 'uuid/v1'

class KeyValueEditor extends Component {

	constructor(props) {
		super(props);
		this.state = $.extend({
			rows: [],
			onAdd: (key, value) => {},
			onRemove: (key, value) => {},
			onKeyChanged: (oldKey, newKey, value) => {},
			onValueChanged: (key, oldValue, newValue) => {}
		}, props);

		// Add ids to the rows
		for (let i = 0; i < this.state.rows.length; i++) {
			this.state.rows[i].id = uuidv1()
		}
	}

	onKeyChanged(index, oldKey, newKey, value) {
		this.state.onKeyChanged(oldKey, newKey, value)
		let { rows } = this.state;
		rows[index].itemKey = newKey;
		this.setState({ rows });

		// Item was a new addition
		if ((oldKey === '') && (value === '')){
			this.handleAdd(newKey, value)
		}

		// If it was the blank row that was edited, it needs updating
		this.addBlankRow()
	}

	onValueChanged(index, key, oldValue, newValue) {
		this.state.onValueChanged(key, oldValue, newValue)
		let { rows } = this.state;
		rows[index].itemValue = newValue;
		this.setState({ rows });

		// Item was a new addition
		if ((key === '') && (oldValue === '')){
			this.handleAdd(key, newValue)
		}

		// If it was the blank row that was edited, it needs updating
		this.addBlankRow()
	}

	addBlankRow() {
		if ((this.state.rows.length == 0) || (!this.isEmpty(this.state.rows[this.state.rows.length - 1]))) {
			let { rows } = this.state;
			rows = rows.concat([{itemKey:'', itemValue:'', id: uuidv1()}]);
			this.setState({ rows });
		}
	}

	onRemove(id) {

		// Find index by id
		let index = this.state.rows.findIndex(function(element){
			return (element.id === id)
		});

		if (index > -1) {
			this.state.onRemove(this.state.rows[index].itemKey)
			let { rows } = this.state;
			rows.splice(index, 1)
			this.setState({ rows });
		}

		this.addBlankRow()
	}

	handleAdd(key, value) {

		this.state.onAdd(key, value)
	}

	isEmpty(row) {
		return ((row.itemKey.trim() === '') && (row.itemValue.trim() === ''))
	}

	componentWillMount() {
		this.addBlankRow()
	}

	render() {
		return (
			<ul className="key-value-item" style={{listStyleType: 'none'}} >
				{this.state.rows.map((row, i) =>
					<KeyValueItem itemKey={row.itemKey} itemValue={row.itemValue} onRemove={this.onRemove.bind(this, row.id)} onKeyChange={this.onKeyChanged.bind(this, i)} onValueChange={this.onValueChanged.bind(this, i)} key={row.id} />
				)}
			</ul>
		);
	}
}

KeyValueEditor.propTypes = {
	rows: React.PropTypes.array,
	onAdd: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	onKeyChanged: React.PropTypes.func,
	onValueChanged: React.PropTypes.func
}

export default KeyValueEditor;
