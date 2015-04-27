var React = require('react');

var FluxTodayDisplayEntry = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.dish}</td>
        <td>{this.props.names}</td>
      </tr>
    )
  }
})



module.exports = FluxTodayDisplayEntry;
