var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _orders = {
  list: [],
  user: "Peter"
}

var firebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Orders/");

firebaseRef.orderByChild('name').equalTo(_orders.user).limitToLast(30).on("child_added", function(dataSnapshot) {
  var order = dataSnapshot.val();
  _orders.list.push(order);
  historyStore.emit(CHANGE_EVENT);
});

firebaseRef.orderByChild('name').equalTo(_orders.user).limitToLast(30).on("child_removed", function(dataSnapshot) {
  var order = dataSnapshot.val();
  for (i=0; i<_orders.list.length; i++) {
    if (_orders.list[i]._id === order._id) {
      var index = i
    }
  }
  _orders.list.splice(index, 1);
  historyStore.emit(CHANGE_EVENT);
});


var historyStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  updateHistory: function(user){
    _orders.user = user
    _orders.list = []
    firebaseRef.orderByChild('name').equalTo(_orders.user).on("child_added", function(snap) {
      var order = snap.val();
      _orders.list.push(order);
      historyStore.emit(CHANGE_EVENT)
    });
  },
  getHistoryList: function() {
    return _orders.list
  }
});

module.exports = historyStore;
