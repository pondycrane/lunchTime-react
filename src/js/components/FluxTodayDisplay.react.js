var React = require('react');
var lunchorderStore = require("../stores/LunchorderStore");
var FluxTodayDisplayEntry = require('./FluxTodayDisplayEntry.react');

var FluxTodayDisplay = React.createClass({
  getInitialState: function(){
    return {
      list: lunchorderStore.getOrderList('today')
    }
  },
  summarize: function() {
    conclude = {}
    temp = this.state.list
    for (var i=0; i<temp.length; i++) {
      if (Object.keys(conclude).indexOf(temp[i].dish)<0) {
        conclude[temp[i].dish] = {}
        conclude[temp[i].dish]['names'] = []
        conclude[temp[i].dish]['total'] = 0
      }
      conclude[temp[i].dish]['names'].push(temp[i].name)
      conclude[temp[i].dish]['total'] += parseFloat(temp[i].price)
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
      list: lunchorderStore.getOrderList('today')
    })
  },
  render: function() {
    concludes = []
    nowState = this.summarize()
    for (key in nowState) {
      concludes.push(<FluxTodayDisplayEntry dish={key} names={nowState[key]['names'].join(',')} total={nowState[key]['total']}/>);
    }
    return (
      <table>
        <tbody>
          <tr><th>dish</th><th>names</th><th>price</th></tr>
          {concludes}
        </tbody>
      </table>
    )
  }
})

module.exports = FluxTodayDisplay;
