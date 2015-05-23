var React = require('react');
var lunchorderStore = require("../stores/LunchorderStore");
var HistoryEntry = require("./HistoryEntry.react");
var historyStore = require("../stores/HistoryStore");
var userStore = require("../stores/UserStore");

var FluxMessage = React.createClass({
  getInitialState: function() {
    return {
      orderList: historyStore.getHistoryList(),
      currentUser: {
        user_name: "Peter",
        user_amount: "0"
      }
    }
  },
  componentDidMount: function() {
    var dom = React.findDOMNode(this);
    historyStore.addChangeListener(this._onChange);
    //lunchorderStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    orderList = historyStore.getHistoryList()
    userDetail = userStore.getSpecificUser()
    if (this.state.orderList.length > 0) {
      currentUser = userStore.getSpecificUser(orderList[0].name);
      this.setState({
        orderList: orderList,
        currentUser: currentUser
      })
    } else {
      this.setState({
        orderList: orderList,
        currentUser: {
          user_name: "Peter",
          user_amount: "0"
        }
      })
    }
  },
  componentWillUnmount: function() {
    historyStore.removeChangeListener(this._onChange);
  },  render: function(){
    var orders = [];
    var allOrders = this.state.orderList;
    for (var key in allOrders) {
      orders.push(<HistoryEntry name={allOrders[key].name} dish={allOrders[key].dish} price={allOrders[key].price} createdAtString={allOrders[key].createdAtString} index={key} />);
    }
    return (
      <div id="FluxMessage">
        <h2>{this.state.currentUser.user_name} got {this.state.currentUser.user_amount}</h2>
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
