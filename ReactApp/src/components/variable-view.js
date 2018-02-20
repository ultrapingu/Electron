/***************************
* Variable View Component
*
*  React component which is used to view and edit a single variable.
*
***************************/

const React = require('react')
const Component = React.Component

class VariableView extends Component {
  deleteVariable(id){
    this.props.onDeleteVariable(id);
  }

  render() {
    return (
      <li className="variable-view">
	  	<h3>Variable</h3>
        <strong>Name: </strong> {this.props.variable.name}
      </li>
    );
  }
}

VariableView.propTypes = {
  variable: React.PropTypes.object,
  onDeleteVariable: React.PropTypes.func
}

export default VariableView;
