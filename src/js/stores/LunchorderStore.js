var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: [
    {name: "Pete Hunt", dish: "fish", price: "20", createdAtString: "Mon May 04 2015", category: "consume"},
    {name: "Pete Hunt", dish: "fish", price: "20", createdAtString: "Mon May 04 2015", category: "consume"},
    {name: "Hank Huang", dish: "shao-la", price: "20", createdAtString: "Mon May 04 2015", category: "consume"},
    {name: "Mr. Anderson", dish: "huHa", price: "20", createdAtString: "Mon May 04 2015", category: "consume"},
    {name: "Walker", dish: "Paul", price: "20", createdAtString: "Mon May 04 2015", category: "consume"}
  ]
}
var _orders = {
  list: []
}

var firebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Orders/");
console.log(firebaseRef);


firebaseRef.on("child_added", function(dataSnapshot) {
  var order = dataSnapshot.val();
  _orders.list.push(order);
  lunchorderStore.emit(CHANGE_EVENT);
});


var addItem = function(item) {
  _store.list.push(item);
}

var removeItem = function(index) {
  _store.list.splice(index, 1);
}

var lunchorderStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function() {
    return _store.list
  },
  getOrderList: function() {
    return _orders.list
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      lunchorderStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      lunchorderStore.emit(CHANGE_EVENT);
      break;
    default:
      return true
  }
})

module.exports = lunchorderStore;
