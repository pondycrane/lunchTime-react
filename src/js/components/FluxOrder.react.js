var React = require('react');
var FluxOrderEntry = require("./FluxOrderEntry.react");
var lunchorderStore = require("../stores/LunchorderStore");
var FluxTodayDisplay = require("./FluxTodayDisplay.react");

firebaseRef = new Firebase("https://lunchwhat.firebaseio.com/Orders/");

var FluxOrder = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    this.bindAsArray(firebaseRef.limitToLast(50), "orderList");
  },
  getInitialState: function() {
    return {
      list: lunchorderStore.getOrderList('today'),
      orderList: []
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
  removeItem: function(index) {
    firebaseRef.orderByChild('_id').equalTo(index).on("child_added", function(snap) {
      snap.ref().remove();
    });
  },
  render: function(){
    allOrders = []
    today = new Date();
    for (i=0; i<this.state.orderList.length; i++) {
      if (today.toDateString() === this.state.orderList[i].createdAtString) {
        allOrders.push(this.state.orderList[i]);
      }
    }
    var orders = [];
    /*
    var allOrders = this.state.list;
    */
    for (var key=0; key < allOrders.length; key++) {
      orders.push(<FluxOrderEntry removeItem={this.removeItem} name={allOrders[key].name} dish={allOrders[key].dish} price={allOrders[key].price} createdAtString={allOrders[key].createdAtString} _id={allOrders[key]._id} />);
    }
    return (
      <div id="FluxOrder">
        <FluxTodayDisplay list={allOrders}/>
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
