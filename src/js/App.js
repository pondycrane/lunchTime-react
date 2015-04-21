var React = require('react');
var FluxLunchwhat = require("./components/FluxLunchwhat.react");
var OrderData = require('./OrderData');

var data = [
  {name: "Pete Hunt", dish: "fish"},
  {name: "Hank Huang", dish: "shao-la"}
];

OrderData.init();
React.render(<FluxLunchwhat data={data} />, document.getElementById('app'));
