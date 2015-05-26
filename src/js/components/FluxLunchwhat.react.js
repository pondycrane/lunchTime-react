var React = require('react');
var FluxToday = require("./FluxToday.react");
var FluxOrder = require("./FluxOrder.react");

var FluxLunchwhat = React.createClass({
  render: function(){
    return (
      <div id="FluxLunchwhat">
        <FluxToday/>
      </div>
    )
  }
});

module.exports = FluxLunchwhat;
