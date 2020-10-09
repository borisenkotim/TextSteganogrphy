import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';

export class HandleImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {imageFile: null};
      }

    toggleUploadFile = event => {
        console.log(event.target.files[0]);
        this.setState({imageFile: URL.createObjectURL(event.target.files[0]) });
    }
    getText = event => {
        console.log(event.target.value);
    }
    render () {
        return (<div>
            <h1> Upload Image Here</h1>
            {/* <Button variant="primary" onClick={this.toggleUploadFile}>Upload</Button>{' '} */}
            <img className="imageFormat" src={this.state.imageFile}/> <br></br>
            <span><input clasName="inputBtn" type="file" name="img" id="" accept="image/*" onChange={this.toggleUploadFile}/></span> 
            <div><input className="inputText" type="text" onChange={this.getText}></input>
            <Button variant="primary">Hide Message into Image</Button>{' '}
            </div>
            </div>);
    }
}