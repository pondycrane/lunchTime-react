var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: [
    {name: "Pete Hunt", dish: "fish"},
    {name: "Hank Huang", dish: "shao-la"},
    {name: "Mr. Anderson", dish: "huHa"},
    {name: "Walker", dish: "Paul"}
  ]
}

var addItem = function(item) {
  _store.list.push(item);
  console.log(_store.list);
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