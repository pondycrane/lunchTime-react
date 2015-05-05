var React = require('react');
var FluxOrderEntry = require("./FluxOrderEntry.react");
var lunchorderStore = require("../stores/LunchorderStore");



var FluxOrder = React.createClass({
  getInitialState: function() {
    return {
      list: lunchorderStore.getList()
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
      list: lunchorderStore.getList()
    })
  },
  render: function(){
    var orders = [];
    var allOrders = this.state.list;
    for (var key in allOrders) {
      orders.push(<FluxOrderEntry name={allOrders[key].name} dish={allOrders[key].dish} index={key} />);
    }
    return (
      <div id="FluxOrder">
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Dish</th>
            </tr>
            {orders}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = FluxOrder;
