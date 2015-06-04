var React = require('react');

var FluxOrderEntry = React.createClass({
  removeItem: function() {
    var index = this.props._id;
    if (typeof this.props.removeItem === 'function') {
        this.props.removeItem(index, this.props.name, this.props.price);
    }
  },
  render: function() {
    return (
        <tr id="FluxOrderEntry">
          <td>{this.props.name}</td>
          <td>{this.props.dish}</td>
          <td>{this.props.price}</td>
          <td>{this.props.createdAtString}</td>
          <td><button type="button" onClick={this.removeItem} >delete</button></td>
        </tr>
    )
  }
});


module.exports = FluxOrderEntry;
