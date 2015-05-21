var React = require('react');
var FluxOrderEntry = require("./FluxOrderEntry.react");
var lunchorderStore = require("../stores/LunchorderStore");


var FluxOrder = React.createClass({
  getInitialState: function() {
    return {
      list: lunchorderStore.getOrderList('today')
    }
  },
  componentDidMount: function(){
    lunchorderStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    lunchorderStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: lunchorderStore.getOrderList('today')
    })
  },
  render: function(){
    var orders = [];
    var allOrders = this.state.list;
    for (var key=0; key < allOrders.length; key++) {
      orders.push(<FluxOrderEntry name={allOrders[key].name} dish={allOrders[key].dish} price={allOrders[key].price} createdAtString={allOrders[key].createdAtString} _id={allOrders[key]._id} />);
    }
    return (
      <div id="FluxOrder">
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Dish</th><th>Price</th><th>CreatedAt</th>
            </tr>
            {orders}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = FluxOrder;
