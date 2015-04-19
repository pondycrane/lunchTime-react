var React = require('react');
var FluxLunchwhat = require("./components/FluxLunchwhat.react");
var OrderData = require('./OrderData');

OrderData.init();
console.log(localStorage.getItem('order'));
React.render(<FluxLunchwhat />, document.getElementById('app'));
