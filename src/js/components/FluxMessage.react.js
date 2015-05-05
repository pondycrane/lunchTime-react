var React = require('react');
var D3Graph = require("./D3Graph.react");

createChart = function(dom) {
  //d3.select(dom).select('svg').append('text').text('append success!').attr('y',70);
}


var FluxMessage = React.createClass({
  componentDidMount: function() {
    var dom = React.findDOMNode(this);
    //createChart(dom);
  },
  render: function(){
    return (
      <div id="FluxMessage">
        <D3Graph/>
        <p>and this is the FluxMessage.</p>
      </div>
    )
  }
});

module.exports = FluxMessage;
