var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var lunchwhatActions = {
  addItem: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    })
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  },
  adjustUserAmount: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.ADJUST_USER_AMOUNT,
      data: index
    })
  }
};

module.exports = lunchwhatActions;
