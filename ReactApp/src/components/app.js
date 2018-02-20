import React, { Component } from 'react';
//const $ = require('jquery');
const VariableList = require('./variable-list');

class App extends Component {

	constructor(){
		super();
		this.state = {
			annotation: {
				variables: [],
				resourceGenerators: []
			}
		}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	handleAddVariable(variable){
		let variables = this.state.annotation.variables;
		variables.push(variable);
		this.setState({
			annotation: {
				variables: variables,
				resourceGenerators: this.state.annotation.resourceGenerators
			}
		});
	}

	handleDeleteVariable(id){
		let variables = this.state.annotation.variables;
		let index = variables.findIndex(x => x.id === id);
		variables.splice(index, 1);
		this.setState({
			annotation: {
				variables: variables,
				resourceGenerators: this.state.annotation.resourceGenerators
			}
		});
	}

	render() {
		return (
			<div className="App">
				<VariableList addVariable={this.handleAddVariable.bind(this)} onDeleteVariable={this.handleDeleteVariable.bind(this)} />
			</div>
		);
	}
}

module.exports = App;
