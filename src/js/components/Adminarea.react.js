var React = require('react');

firebaseStoresRef = new Firebase("https://lunchwhat.firebaseio.com/Stores/");

var StoreListing = React.createClass({
	render: function(){
		return <option value={this.props.storeName}>{this.props.storeName}</option>
	}
})

var Adminarea = React.createClass({
	mixins: [ReactFireMixin],
	componentWillMount: function() {
		this.bindAsObject(firebaseStoresRef, "stores"); 
	},
	getInitialState: function() {
		return {stores:{}}
	},
	addCredit: function(event) {
		event.preventDefault();
		if (typeof this.props.addCredit === 'function') {
			this.props.addCredit();
		}
	},
	pickin: function(event) {
		event.preventDefault(); 
		filepicker.setKey('AiD66Zr4PS4aUqLQzYQmbz');
		filepicker.pickAndStore(
		  {
			openTo: '/Imagesearch/lolcats'
		  },
		  {},
		  function(Blobs){
			console.log(JSON.stringify(Blobs));
			buchi = Blobs[0].url.split('/'); 
			  thisPush = {
				storeName: document.getElementById('storeNameInput').value, 
				phone: document.getElementById('storePhoneInput').value, 
				address: document.getElementById('storeAddressInput').value,
				menu: [], 
				filePickerKey: [buchi[buchi.length-2], buchi[buchi.length-1]].join('/')
			  }
			  restaurantRef = new Firebase("https://lunchwhat.firebaseio.com/Stores/"+thisPush.storeName);
			  restaurantRef.set(thisPush); 
			  currentRestaurantRef = new Firebase("https://lunchwhat.firebaseio.com/nowRestaurant/");
			  currentRestaurantRef.set(thisPush); 
		  },
		  function(error){
			console.log(JSON.stringify(error));
		  },
		  function(progress){
			  console.log(JSON.stringify(progress));
		  }
		);
	}, 
	render: function() {
		storeShowcase = []
		for (storeName in this.state.stores) {
			storeShowcase.push(<StoreListing storeName={storeName}/>); 
		}
		return (
			<div id="Adminarea">
				<select>
					{storeShowcase}
				</select>
				<form>
					<input id='storeNameInput' type="text" placeholder="Store Name"></input>
					<input id='storePhoneInput' type="text" placeholder="Phone"></input>
					<input id='storeAddressInput' type="text" placeholder="Address"></input>
					<button onClick={this.pickin}>Upload File</button>
				</form>
				<form>
				  <input id="creditAdd" placeholder="Amount"></input>
				  <button onClick={this.addCredit} type="submit">Add order</button>
				</form>
			</div>
		)
	}
});


module.exports = Adminarea; 