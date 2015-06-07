var React = require('react');

var Adminarea = React.createClass({
	addCredit: function(event) {
		event.preventDefault();
		if (typeof this.props.addCredit === 'function') {
			this.props.addCredit();
		}
	},
	render: function() {
		return (
			<form>
			  <input id="creditAdd" placeholder="Amount"></input>
			  <button onClick={this.addCredit} type="submit">Add order</button>
			</form>
		)
	}
});


module.exports = Adminarea; 