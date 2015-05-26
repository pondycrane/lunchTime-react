var React = require('react');
var lunchorderStore = require("../stores/LunchorderStore");
var HistoryEntry = require("./HistoryEntry.react");
var historyStore = require("../stores/HistoryStore");
var userStore = require("../stores/UserStore");

firebaseRef = new Firebase("https://lunchwhat.firebaseio.com/Users/");

var FluxMessage = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    this.bindAsArray(firebaseRef, "userList");
  },
  render: function(){
    var orders = [];
    var allOrders = this.props.orderList;
    for (var key in allOrders) {
      orders.push(<HistoryEntry name={allOrders[key].name} dish={allOrders[key].dish} price={allOrders[key].price} createdAtString={allOrders[key].createdAtString} index={key} />);
    }
    return (
      <div id="FluxMessage">
        <h2>{this.props.currentUser} got {this.props.currentUserAmount}</h2>
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Dish</th><th>Price</th><th>Date</th>
            </tr>
          </tbody>
          {orders}
        </table>
      </div>
    )
  }
});

module.exports = FluxMessage;
