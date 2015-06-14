var React = require('react');

currentRestaurantRef = new Firebase("https://lunchwhat.firebaseio.com/nowRestaurant/");

var FilePickerMenu = React.createClass({
	mixins: [ReactFireMixin],
	componentWillMount: function() {
		this.bindAsObject(currentRestaurantRef, "nowStore"); 
	},
	getInitialState: function() {
		return {
			nowStore: {
				filePickerKey:''
			}
		}
	}, 
  render: function(){
    return (
      <div id="FilePickerMenu">
        <img src={"https://www.filepicker.io/api/file/"+this.state.nowStore.filePickerKey} alt={"Delicious"} height={"400"} width={"400"}/>
      </div>
    )
  }
})


module.exports = FilePickerMenu;
