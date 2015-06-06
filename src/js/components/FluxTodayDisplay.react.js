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
    if (typeof this.props.list != "undefined") {
      temp = this.props.list
      for (var i=0; i<temp.length; i++) {
        indexName = temp[i].dish+'_'+temp[i].price.toString()
        if (Object.keys(conclude).indexOf(indexName)<0 ) {
          conclude[indexName] = {}
          conclude[indexName]['names'] = []
          conclude[indexName]['total'] = 0
		  conclude[indexName]['count'] = 0
          conclude[indexName]['dish'] = temp[i].dish
          conclude[indexName]['price'] = temp[i].price
        }
        conclude[indexName]['names'].push(temp[i].name)
        conclude[indexName]['total'] += parseFloat(temp[i].price)
		conclude[indexName]['count'] += 1
      }
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
	totalCount = 0
	totalPrice = 0
    nowState = this.summarize()
    for (key in nowState) {
      concludes.push(<FluxTodayDisplayEntry count={nowState[key]['count']} price={nowState[key]['price']} dish={nowState[key]['dish']} names={nowState[key]['names'].join(',')} total={nowState[key]['total']}/>);
		totalCount += nowState[key]['count']; 
		totalPrice += parseFloat(nowState[key]['price']);
	}
    return (
      <table className="table">
        <tbody>
          <tr><th>dish</th><th>names</th><th>price</th><th>count</th><th>total</th></tr>
          {concludes}
		  <tr><td></td><td></td><td></td><td>{totalCount}</td><td>{totalPrice}</td></tr>
        </tbody>
      </table>
    )
  }
})

module.exports = FluxTodayDisplay;
