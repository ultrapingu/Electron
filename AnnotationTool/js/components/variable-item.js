/***************************
* Variable Item Component
*
*  React component which represents a single item in a variable list.
*
***************************/

const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')

class VariableItem extends Component {
  deleteVariable(id){
    this.props.onDeleteVariable(id);
  }

  render() {
    return (
      <li className="variable-item">
        <strong>{this.props.variable.name}</strong> <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a>
      </li>
    );
  }
}

VariableItem.propTypes = {
  variable: PropTypes.object,
  onDeleteVariable: PropTypes.func
}

export default VariableItem;
