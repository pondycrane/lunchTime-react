var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");
var lunchorderStore = require("../stores/LunchorderStore");

var ha = function(event){
  event.preventDefault();
  thisAdd = {}
  thisAdd.name = document.getElementById('nameInput').value;
  document.getElementById('nameInput').value = '';
  thisAdd.dish = document.getElementById('dishInput').value;
  document.getElementById('dishInput').value = ''; 
  console.log(thisAdd);
  lunchwhatActions.addItem(thisAdd);
}

var FluxToday = React.createClass({
  getInitialState: function() {
    return {
      orderToday: []
    }
  },
  addItem: function() {
    var index = this.props.order;
    lunchwhatActions.addItem(order);
  },
  componentDidMount: function(){
    lunchorderStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    lunchorderStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: lunchorderStore.getList()
    })
  },
  render: function() {
    return (
      <div id="FluxToday">
        <p>This is Today</p>
        <form>
          <input id="nameInput"></input><input id="dishInput"></input><button onClick={ha} type="submit">Add order</button>
        </form>
      </div>
    )
  }
})

module.exports = FluxToday;
