var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");
var userStore = require("../stores/UserStore");

var FluxOrderEntry = React.createClass({
  removeItem: function() {
    var index = this.props._id;
    lunchwhatActions.removeItem(index);
    thisAdjust = {
      user_name: this.props.name,
      actionType: 'addCredit',
      credit: this.props.price
    }
    lunchwhatActions.addItem(thisAdd);
    lunchwhatActions.adjustUserAmount(thisAdjust);
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
