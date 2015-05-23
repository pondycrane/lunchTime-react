var React = require('react');

var CountDown = React.createClass({
  getInitialState: function(){
    seconds = 0
    today = new Date();
    dateLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 50)
    if (new Date() > dateLimit) {
      seconds = 0;
		} else {
			diff = (dateLimit - new Date())/1000;
      seconds = diff;
		}
    return {
      seconds: seconds,
      formatted: "00:00:00"
    }
  },
  secondChange: function() {
    if (this.state.seconds > 0) {
      newSeconds = this.state.seconds - 1;
      newFormatted = this.getFormattedTime(newSeconds);
      this.setState({seconds: newSeconds, formatted: newFormatted});
    }
  },
  getFormattedTime: function(totalSeconds) {
    var seconds = parseInt(totalSeconds % 60);
    var minutes = parseInt(totalSeconds / 60) % 60;
    var hours = parseInt(totalSeconds / 3600);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ':' + minutes + ':' + seconds;
  },
  componentDidMount: function () {
    if (this.state.seconds > 0) {
      setInterval(this.secondChange, 1000);
    }
  },
  render: function(){
    return (
      <p>Time remaining {this.state.formatted}</p>
    )
  }
})


module.exports = CountDown;
