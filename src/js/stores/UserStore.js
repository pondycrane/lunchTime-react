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

var adjustUserAmount = function(data) {
  nowUser = {}
  for (i=0; i<_users.list.length; i++) {
    if (_users.list[i].user_name == data.user_name) {
      nowUser = _users.list[i]
    }
  }
  if (nowUser != {}) {
    if (data.actionType == 'addCredit') {
      nowUser.user_amount = (parseFloat(nowUser.user_amount)+parseFloat(data.credit)).toString();
    } else {
      nowUser.user_amount = (parseFloat(nowUser.user_amount)-parseFloat(data.credit)).toString();
    }
    firebaseRef.orderByChild("user_name").equalTo(nowUser.user_name).on('child_changed', function(){
      userStore.emit(CHANGE_EVENT);
    });
    firebaseRef.orderByChild("user_name").equalTo(nowUser.user_name).on('child_added', function(snapshot){
      tempFirebaseRef =  new Firebase("https://lunchwhat.firebaseio.com/Users/"+snapshot.key());
      tempFirebaseRef.child('user_amount').set(nowUser.user_amount);
      tempFirebaseRef.off();
    });
  }
}


var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getUserList: function(mode) {
    return _users.list
  },
  getSpecificUser: function(inquery) {
    result = {}
    for (i=0; i<_users.list.length; i++) {
      if (_users.list[i].user_name == inquery) {
        result = _users.list[i]
      }
    }
    return result
  }
});

AppDispatcher.register(function(payload){
  action = payload.action;
  switch(action.actionType){
    case appConstants.ADJUST_USER_AMOUNT:
      adjustUserAmount(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    default:
      return true
  }
})

module.exports = userStore;
