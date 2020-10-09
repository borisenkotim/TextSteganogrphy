import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';

export class HandleImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFile: null,
            hiddenText: "",
            encrypted: false
        };
      }

    toggleUploadFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({imageFile: URL.createObjectURL(event.target.files[0]) });
    }

    getText = (event) => {
        // console.log(event.target.value);
        this.setState({hiddenText: event.target.value});
    }

    hideTextSubmission = () => {
        // perform action to hide text into image here
        if (this.state.hiddenText != null && this.state.hiddenText !== "" && this.state.imageFile != null) {
            // perform action to hide text into image here

            this.setState({encrypted: true})
            console.log(this.state.hiddenText);
        }
        
    }
    
    ecnryptedImage = () => {
        return (
            this.state.encrypted ?
            <div><br></br><h2>Ecnrypted Image:</h2><br></br><img className="imageFormat" src={this.state.imageFile}/><br></br></div>
            : null
        );
    }
    render () {
        return (<div>
            <h2> Upload Image Here:</h2>
            <img className="imageFormat" src={this.state.imageFile}/><br></br>
            <input clasName="inputBtn" type="file" name="img" id="" accept="image/*" onChange={this.toggleUploadFile}/><br></br>
            {(this.state.imageFile != null) ? 
                <div><input className="inputText" type="text" onChange={this.getText}></input>
                <Button variant="primary" onClick={this.hideTextSubmission}>Hide Message into Image</Button>{' '}
                </div> 
            : null
            }
            {this.ecnryptedImage()}
            </div>);
    }
}