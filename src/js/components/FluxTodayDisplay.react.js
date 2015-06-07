var React = require('react');
var FluxTodayDisplayEntry = require('./FluxTodayDisplayEntry.react');

var FluxTodayDisplay = React.createClass({
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
  render: function() {
    concludes = []
	totalCount = 0
	totalPrice = 0
    nowState = this.summarize()
    for (key in nowState) {
      concludes.push(<FluxTodayDisplayEntry count={nowState[key]['count']} price={nowState[key]['price']} dish={nowState[key]['dish']} names={nowState[key]['names'].join(',')} total={nowState[key]['total']}/>);
		totalCount += nowState[key]['count']; 
		totalPrice += parseFloat(nowState[key]['total']);
	}
    return (
      <table className="table table-hover">
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
