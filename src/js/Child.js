var React = require('react');
var Child = React.createClass({
  render: function(){
    return (
      <div>
        and this is the haha <b>{this.props.name}</b>.
      </div>
    )
  }
});

module.exports = Child;
