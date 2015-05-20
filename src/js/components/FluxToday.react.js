var React = require('react');
var lunchwhatActions = require("../actions/LunchwhatActions");
var userStore = require("../stores/UserStore");
var FluxTodayDisplay = require("./FluxTodayDisplay.react");
var FluxOrder = require("./FluxOrder.react");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 17; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var UserOptions = React.createClass({
  render: function() {
    var options = this.props.data.map(function (user) {
      return (
        <option value={user.user_name}>
          {user.user_name}
        </option>
      );
    });
    return (
      <select id="nameInput">
        {options}
      </select>
    );
  }
});

var FluxToday = React.createClass({
  getInitialState: function() {
    return {
      users: userStore.getUserList()
    }
  },
  componentDidMount: function(){
    userStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    userStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: userStore.getUserList()
    })
  },
  addItem: function(event){
    event.preventDefault();
    thisAdd = {}
    thisAdd.name = document.getElementById('nameInput').value;
    thisAdd.dish = document.getElementById('dishInput').value;
    thisAdd.price = document.getElementById('priceInput').value;
    if (thisAdd.price == "") {
			alert("Can't leave it blank!");
			return false;
		}
		if (thisAdd.dish == "") {
			alert("Can't leave it blank!");
			return false;
		}
		if (isNaN(thisAdd.price)) {
			alert("Price must be numbers");
			return false;
		}
    document.getElementById('nameInput').value = '';
    document.getElementById('dishInput').value = '';
    document.getElementById('priceInput').value = '';
    thisAdd.category = 'consume';
    thisAdd.createdAt = new Date();
    thisAdd.createdAtString = (new Date()).toDateString();
    thisAdd._id = makeid();
    lunchwhatActions.addItem(thisAdd);
  },
  render: function() {
    return (
      <div id="FluxToday">
        <p>This is Today</p>
        <form>
          <UserOptions data={this.state.users}/>
          <input id="dishInput" placeholder="Dish Name"></input>
          <input id="priceInput" placeholder="Price"></input>
          <button onClick={this.addItem} type="submit">Add order</button>
        </form>
        <FluxTodayDisplay/>
        <FluxOrder/>
      </div>
    )
  }
})
//<input id="nameInput" placeholder="User Name"></input>

module.exports = FluxToday;
