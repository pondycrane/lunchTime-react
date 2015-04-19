var React = require('react');
var FluxOrder = require("./FluxOrder.react");
var FluxMessage = require("./FluxMessage.react");


var FluxLunchwhat = React.createClass({
  render: function(){
    return (
      <div id="FluxLunchwhat">
        <div> This is the Lunchwhat. </div>
        <b>{this.props.order}</b>
        <FluxOrder/>
        <FluxMessage/>
      </div>
    )
  }
});

module.exports = FluxLunchwhat;
