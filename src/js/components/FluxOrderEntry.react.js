var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");

var FluxOrderEntry = React.createClass({
  removeItem: function() {
    var index = this.props.index;
    lunchwhatActions.removeItem(index);
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
