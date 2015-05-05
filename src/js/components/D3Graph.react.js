var React = require('react');

var d3Graph = React.createClass({
  componentDidMount: function() {
    d3.select('svg').append('rect').attr('height',30).attr('width',30).attr('fill','blue'); 
  },
  render: function(){
    return (
      <svg id="d3Graph" height="200" width="200">
        <text y="50">This is a d3Graph</text>
      </svg>
    )
  }
});

module.exports = d3Graph;
