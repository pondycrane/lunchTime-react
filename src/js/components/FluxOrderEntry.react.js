var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");

var FluxOrderEntry = React.createClass({
  removeItem: function() {
    var index = this.props.index;
    lunchwhatActions.removeItem(index);
  },
  render: function() {
    return (
      <div className="FluxOrderEntry">
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.dish}</td>
          <td><button type="button" onClick={this.removeItem} >delete</button></td>
        </tr>
      </div>
    )
  }
});


module.exports = FluxOrderEntry;
