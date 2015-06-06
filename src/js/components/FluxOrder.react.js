var React = require('react');
var FluxOrderEntry = require("./FluxOrderEntry.react");
var FluxTodayDisplay = require("./FluxTodayDisplay.react");

firebaseRef = new Firebase("https://lunchwhat.firebaseio.com/Orders/");

var FluxOrder = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    this.bindAsArray(firebaseRef.limitToLast(50), "orderList");
  },
  getInitialState: function() {
    return {
      orderList: []
    }
  },
  removeItem: function(index, name, price) {
    firebaseRef.orderByChild('_id').equalTo(index).on("child_added", function(snap) {
      snap.ref().remove();
    });
    if (typeof this.props.removeItem === 'function') {
        this.props.removeItem(name, price);
    }
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
		<h2 className="sub-header">Today's summary</h2>
        <FluxTodayDisplay list={allOrders}/>
		<h2 className="sub-header">Today's order listing</h2>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Name</th><th>Dish</th><th>Price</th><th>CreatedAt</th><th></th>
            </tr>
            {orders}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = FluxOrder;
