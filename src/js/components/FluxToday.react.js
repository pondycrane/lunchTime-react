var React = require('react/addons');
var FilePickerMenu = require("./FilePickerMenu.react");
var CountDown = require("./CountDown.react");
var FluxOrder = require("./FluxOrder.react");
var FluxMessage = require("./FluxMessage.react");
var Adminarea = require("./Adminarea.react");

firebaseRef = new Firebase("https://lunchwhat.firebaseio.com/Orders/");
firebaseUserRef = new Firebase("https://lunchwhat.firebaseio.com/Users/");

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
	this.bindAsArray(firebaseUserRef, "users"); 
  },
  getInitialState: function() {
    return {
	users: [{"user_name":"Peter","user_amount":"0"}],
      currentUser: 'Peter',
      currentUserAmount: "0"
    }
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
    firebaseRef.push(thisAdd);
	newAmount = (parseFloat(this.state.currentUserAmount)-parseFloat(thisAdd.price)).toString(); 
	this.state.currentUserAmount = newAmount; 
    firebaseUserRef.orderByChild("user_name").equalTo(thisAdd.name).on('child_added', function(snapshot){
      tempFirebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Users/"+snapshot.key());
      tempFirebaseRef.child('user_amount').set(newAmount);
      tempFirebaseRef.off();
    });
  },
  handleChange: function(nowUser) {
    currentUser = nowUser;
    temp = this.state;
    temp.currentUser = currentUser;
    for (var i=0; i<this.state.users.length; i++) {
      if (this.state.users[i].user_name == this.state.currentUser) {
        temp.currentUserAmount = this.state.users[i].user_amount
      }
    }
    this.setState(temp);
    this.bindAsArray(firebaseRef.orderByChild('name').equalTo(this.state.currentUser).limitToLast(30), "orderList");
  },
  removeItem: function(name, price) {
	  for (i=0; i<this.state.users.length; i++) {
		  if (this.state.users[i].user_name == name) {
			  currentAmount = this.state.users[i].user_amount; 
		  }
	  }
	  newAmount = (parseFloat(currentAmount)+parseFloat(price)).toString(); 
    firebaseUserRef.orderByChild("user_name").equalTo(name).on('child_added', function(snapshot){
      tempFirebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Users/"+snapshot.key());
      tempFirebaseRef.child('user_amount').set(newAmount);
      tempFirebaseRef.off();
    });
	if (this.state.currentUser == name) {
		this.state.currentUserAmount = newAmount; 
	}
  },
  addCredit: function() {
    thisAdd = {}
    thisAdd.name = document.getElementById('nameInput').value;
    thisAdd.dish = "Add credit";
    thisAdd.price = document.getElementById('creditAdd').value;
    if (thisAdd.price == "") {
			alert("Can't leave it blank!");
			return false;
		}
		if (isNaN(thisAdd.price)) {
			alert("Price must be numbers");
			return false;
		}
    document.getElementById('creditAdd').value = '';
    thisAdd.category = 'save';
    thisAdd.createdAt = new Date();
    thisAdd.createdAtString = (new Date()).toDateString();
    thisAdd._id = makeid();
    thisAdjust = {
      user_name: thisAdd.name,
      actionType: thisAdd.category,
      credit: thisAdd.price
	}
	firebaseRef.push(thisAdd);
	newAmount = (parseFloat(this.state.currentUserAmount)+parseFloat(thisAdd.price)).toString(); 
	this.state.currentUserAmount = newAmount; 
    firebaseUserRef.orderByChild("user_name").equalTo(thisAdd.name).on('child_added', function(snapshot){
      tempFirebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Users/"+snapshot.key());
      tempFirebaseRef.child('user_amount').set(newAmount);
      tempFirebaseRef.off();
    });
  }, 
  render: function() {
    return (
      <div id="FluxToday" class="mui-container">
        <FilePickerMenu/>
		<h2 className="sub-header">Order now!</h2>
		<CountDown/>
        <form>
          <UserOptions data={this.state.users} currentUser={this.state.currentUser} onChange={this.handleChange} ref="userOptions"/>
          <input id="dishInput" placeholder="Dish Name"></input>
          <input id="priceInput" placeholder="Price"></input>
          <button onClick={this.addItem} type="submit">Add order</button>
        </form>
        <FluxOrder removeItem={this.removeItem}/>
        <FluxMessage orderList={this.state.orderList} currentUser={this.state.currentUser} currentUserAmount={this.state.currentUserAmount} ref='fluxMessage'/>
		<h2 className="sub-header">For admin only</h2>
		<Adminarea currentUser={this.state.currentUser} addCredit={this.addCredit}/>
      </div>
    )
  }
})

module.exports = FluxToday;
