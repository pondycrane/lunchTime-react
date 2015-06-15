var React = require('react');



var FilePickerMenu = React.createClass({ 
  render: function(){
    return (
      <div id="FilePickerMenu">
        <img src={"https://www.filepicker.io/api/file/"+this.props.nowStore.filePickerKey} alt={"Delicious"} height={"400"} width={"400"}/>
      </div>
    )
  }
})


module.exports = FilePickerMenu;
