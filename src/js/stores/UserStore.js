var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _users = {
  list: []
}

var firebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Users/");

firebaseRef.orderByChild('user_name').on("child_added", function(dataSnapshot) {
  var user = dataSnapshot.val();
  _users.list.push(user);
  userStore.emit(CHANGE_EVENT);
});


var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getUserList: function(mode) {
    return _users.list
  }
});

module.exports = userStore;
