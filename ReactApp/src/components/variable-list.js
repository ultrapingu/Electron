/***************************
* Variable List Component
*
*  React component which is comprised of a list of variable items.
*
***************************/

const React = require('react')
const Component = React.Component
const VariableItem = require('./variable-item');
const PropTypes = require('prop-types')

class VariableList extends Component {

	deleteVariable(id){
		this.props.onDeleteVariable(id);
	}

	render() {
		let variableItems;
		if(this.props.variables){
			variableItems = this.props.variables.map(variable => {
				//console.log(project);
				return (
					<VariableItem onDeleteVariable={this.deleteVariable.bind(this)} key={variable.id} variable={variable} />
				);
			});
		}
		return (
			<div className="variable-list">
				<ul>
					{variableItems}
				</ul>
			</div>
		);
	}
}

VariableList.propTypes = {
	variables: PropTypes.array,
	onDeleteVariable: PropTypes.func
}

module.exports =  VariableList;
