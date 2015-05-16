var React = require('react');
var lunchorderStore = require("../stores/LunchorderStore");
var HistoryEntry = require("./HistoryEntry.react");

var FluxMessage = React.createClass({
  getInitialState: function() {
    return {
      orderList: lunchorderStore.getOrderList()
    }
  },
  componentDidMount: function() {
    var dom = React.findDOMNode(this);
    lunchorderStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      orderList: lunchorderStore.getOrderList()
    })
  },
  componentWillUnmount: function() {
    lunchorderStore.removeChangeListener(this._onChange);
  },  render: function(){
    var orders = [];
    var allOrders = this.state.orderList;
    for (var key in allOrders) {
      orders.push(<HistoryEntry name={allOrders[key].name} dish={allOrders[key].dish} price={allOrders[key].price} createdAtString={allOrders[key].createdAtString} index={key} />);
    }
    return (
      <div id="FluxMessage">
        <p>and this is the FluxMessage.</p>
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
