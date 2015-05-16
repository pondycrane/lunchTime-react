var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");
var lunchorderStore = require("../stores/LunchorderStore");
var FluxTodayDisplay = require("./FluxTodayDisplay.react");

var FluxToday = React.createClass({
  addItem: function(event){
    event.preventDefault();
    thisAdd = {}
    thisAdd.name = document.getElementById('nameInput').value;
    document.getElementById('nameInput').value = '';
    thisAdd.dish = document.getElementById('dishInput').value;
    document.getElementById('dishInput').value = '';
    thisAdd.price = document.getElementById('priceInput').value;
    document.getElementById('priceInput').value = '';
    thisAdd.category = 'consume';
    thisAdd.createdAt = new Date();
    thisAdd.createdAtString = (new Date()).toDateString(); 
    lunchwhatActions.addItem(thisAdd);
  },
  render: function() {
    return (
      <div id="FluxToday">
        <p>This is Today</p>
        <form>
          <input id="nameInput"></input><input id="dishInput"></input><input id="priceInput"></input><button onClick={this.addItem} type="submit">Add order</button>
        </form>
        <FluxTodayDisplay/>
      </div>
    )
  }
})

module.exports = FluxToday;
