var React = require('react');
var HistoryEntry = require("./HistoryEntry.react");

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
        <h2 className="sub-header">{this.props.currentUser} got {this.props.currentUserAmount}</h2>
		<div className="table-responsive">
			<table className="table table-striped">
			  <tbody>
				<tr>
				  <th>Name</th><th>Dish</th><th>Price</th><th>Date</th>
				</tr>
				{orders}
			  </tbody>
			</table>
		</div>
      </div>
    )
  }
});

module.exports = FluxMessage;
