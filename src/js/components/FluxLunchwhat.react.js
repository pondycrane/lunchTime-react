var React = require('react');
var FluxToday = require("./FluxToday.react");
var FluxOrder = require("./FluxOrder.react");
var FluxMessage = require("./FluxMessage.react");

var FluxLunchwhat = React.createClass({
  render: function(){
    return (
      <div id="FluxLunchwhat">
        <FluxToday/>
        <FluxMessage/>
      </div>
    )
  }
});

module.exports = FluxLunchwhat;
