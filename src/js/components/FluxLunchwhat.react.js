var React = require('react');
var FluxOrder = require("./FluxOrder.react");
var FluxMessage = require("./FluxMessage.react");

var FluxLunchwhat = React.createClass({
  render: function(){
    return (
      <div id="FluxLunchwhat">
        <div> This is the Lunchwhat. </div>
        <FluxOrder data={this.props.data}/>
        <FluxMessage/>
      </div>
    )
  }
});

module.exports = FluxLunchwhat;
