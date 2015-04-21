var React = require('react');
var FluxOrderEntry = React.createClass({
  render: function() {
    return (
      <div className="FluxOrderEntry">
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.dish}</td>
        </tr>
      </div>
    )
  }
});


module.exports = FluxOrderEntry;
