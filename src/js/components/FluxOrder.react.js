var React = require('react');
var FluxOrderEntry = require("./FluxOrderEntry.react");
var FluxOrder = React.createClass({
  render: function(){
    var FluxOrderNodes = this.props.data.map(function(order){
      return (
        <FluxOrderEntry name={order.name} dish={order.dish}>
        </FluxOrderEntry>
      )
    });
    return (
      <div id="FluxOrder">
        <table>
          <tr>
            <th>Name</th><th>Dish</th>
          </tr>
          {FluxOrderNodes}
        </table>
      </div>
    )
  }
});

module.exports = FluxOrder;
