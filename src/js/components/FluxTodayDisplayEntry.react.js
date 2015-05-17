var React = require('react');

var FluxTodayDisplayEntry = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.dish}</td>
        <td>{this.props.names}</td>
        <td>{this.props.price}</td>
        <td>{this.props.total}</td>
      </tr>
    )
  }
})



module.exports = FluxTodayDisplayEntry;
