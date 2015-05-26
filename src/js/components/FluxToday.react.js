var React = require('react/addons');
var lunchwhatActions = require("../actions/LunchwhatActions");
var userStore = require("../stores/UserStore");
var FilePickerMenu = require("./FilePickerMenu.react");
var CountDown = require("./CountDown.react");
var FluxOrder = require("./FluxOrder.react");
var historyStore = require("../stores/HistoryStore");
var FluxMessage = require("./FluxMessage.react");

firebaseRef = new Firebase("https://lunchwhat.firebaseio.com/Orders/");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 17; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var UserOptions = React.createClass({
  getInitialState: function(){
    return {
      currentUser: 'Peter'
    }
  },
  change: function() {
    nowName = document.getElementById('nameInput').value;
    this.setState({currentUser: nowName});
    if (typeof this.props.onChange === 'function') {
        this.props.onChange(nowName);
    }
  },
  render: function() {
    var options = this.props.data.map(function (user) {
      return (
        <option value={user.user_name}>
          {user.user_name}
        </option>
      );
    });
    return (
      <select id="nameInput" onChange={this.change} value={this.state.currentUser} ref="nameInput">
        {options}
      </select>
    );
  }
});

var FluxToday = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    this.bindAsArray(firebaseRef.orderByChild('name').equalTo(this.state.currentUser).limitToLast(30), "orderList");
  },
  getInitialState: function() {
    return {
      users: userStore.getUserList(),
      currentUser: 'Peter',
      currentUserAmount: "0"
    }
  },
  componentDidMount: function(){
    userStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    userStore.removeChangeListener(this._onChange);
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
    thisAdjust = {
      user_name: thisAdd.name,
      actionType: thisAdd.category,
      credit: thisAdd.price
    }
    lunchwhatActions.addItem(thisAdd);
    lunchwhatActions.adjustUserAmount(thisAdjust);
  },
  handleChange: function(nowUser) {
    //currentUser = React.findDOMNode(this.refs.userOptions.refs.nameInput).value;
    currentUser = nowUser;
    temp = this.state;
    temp.currentUser = currentUser;
    for (var i=0; i<this.state.users.length; i++) {
      if (this.state.users[i].user_name == this.state.currentUser) {
        temp.currentUserAmount = this.state.users[i].user_amount
      }
    }
    this.setState(temp);
    console.log(temp);
    this.bindAsArray(firebaseRef.orderByChild('name').equalTo(this.state.currentUser).limitToLast(30), "orderList");
  },
  _onChange: function() {
    this.setState({
      list: userStore.getUserList()
    })
  },
  render: function() {
    return (
      <div id="FluxToday">
        <CountDown/>
        <FilePickerMenu/>
        <form>
          <UserOptions data={this.state.users} currentUser={this.state.currentUser} onChange={this.handleChange} ref="userOptions"/>
          <input id="dishInput" placeholder="Dish Name"></input>
          <input id="priceInput" placeholder="Price"></input>
          <button onClick={this.addItem} type="submit">Add order</button>
        </form>
        <FluxOrder/>
        <FluxMessage orderList={this.state.orderList} currentUser={this.state.currentUser} currentUserAmount={this.state.currentUserAmount} ref='fluxMessage'/>
      </div>
    )
  }
})

module.exports = FluxToday;
