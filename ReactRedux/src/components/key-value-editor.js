import React, { Component } from 'react';
import KeyValueItem from './key-value-item';
import $ from 'jquery'

class KeyValueEditor extends Component {

	constructor(props) {
		super(props);
		this.state = $.extend({
			rows: [],
			onAdd: (key, value) => {},
			onRemove: (key, value) => {},
			onRowChanged: (key) => {}
		}, props);
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

		let renderRow = function(itemKey, itemValue, idx) {
			console.log(itemKey + " - " + itemValue + " - " + idx)
			return (
				<KeyValueItem itemKey={itemKey} itemKey={itemValue} onAdd={addHandler} onRemove={removeHandler} onItemChange={changeHandler} key={idx} />
			);
		}

		let rows = this.state.rows.map((row, i) => renderRow(row.itemKey, row.itemValue, i));
		console.log(rows)

		return (
			<ul className="key-value-item">
				{rows}
				{renderRow('', '', rows.length)}
			</ul>
		);
	}
}

KeyValueEditor.propTypes = {
	rows: React.PropTypes.array,
	onAdd: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	onRowChanged: React.PropTypes.func
}

export default KeyValueEditor;
