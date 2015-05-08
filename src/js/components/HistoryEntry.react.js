var React = require('react');

var HistoryEntry = React.createClass({
  render: function() {
    return (
        <tr id="HistoryEntry">
          <td>{this.props.name}</td>
          <td>{this.props.dish}</td>
          <td>{this.props.price}</td>
          <td>{this.props.createdAtString}</td>
        </tr>
    )
  }
});


module.exports = HistoryEntry;
