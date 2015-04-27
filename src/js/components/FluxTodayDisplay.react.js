var React = require('react');
var lunchorderStore = require("../stores/LunchorderStore");
var FluxTodayDisplayEntry = require('./FluxTodayDisplayEntry.react');

var FluxTodayDisplay = React.createClass({
  getInitialState: function(){
    return {
      list: lunchorderStore.getList()
    }
  },
  summarize: function() {
    conclude = {}
    temp = this.state.list
    for (var i=0; i<temp.length; i++) {
      if (Object.keys(conclude).indexOf(temp[i].dish)<0) {
        conclude[temp[i].dish] = []
      }
      conclude[temp[i].dish].push(temp[i].name)
    }
    return conclude
  },
  componentDidMount: function(){
    lunchorderStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    lunchorderStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: lunchorderStore.getList()
    })
  },
  render: function() {
    concludes = []
    nowState = this.summarize()
    for (key in nowState) {
      concludes.push(<FluxTodayDisplayEntry dish={key} names={nowState[key].join(',')}/>);
    }
    return (
      <table>
        <tbody>
          <tr><th>dish</th><th>names</th></tr>
          {concludes}
        </tbody>
      </table>
    )
  }
})

module.exports = FluxTodayDisplay;
