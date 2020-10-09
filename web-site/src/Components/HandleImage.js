import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';

export class HandleImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFile: null,
            hiddenText: "",
            encrypted: false,
            decodedText: "",
            decrypted: false
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
            <div><br></br><p>Ecnrypted Image:</p><img className="imageFormat" src={this.state.imageFile}/><br></br></div>
            : null
        );
    }

    enterText = () => {
        return (
            (this.state.imageFile != null) ? 
            <div><Button variant="primary" onClick={this.decodeImageBtnPressed}>Decode Image</Button>{' '}
            <input className="inputText" type="text" onChange={this.getText}></input>
            <Button variant="primary" onClick={this.hideTextSubmission}>Hide Message into Image</Button>{' '}
            </div> 
            : null
        );
    }

    decodeImageBtnPressed = () => {
        this.setState({decrypted: true});
        // perform action to decrypt image here
    }

    showDecodedText = () => {
        // display decoded text from image, should be null if image doesn't exist or has no message
        return (
            this.state.decrypted ? 
            ((this.state.decodedText !== "") ? <div>Decoded Text: {this.state.DecodeText} </div> : <div>No Message Found</div>)
            : null 
        );
    }

    render () {
        return (<div>
            <p> Upload Image To Get Started:</p>
            <img className="imageFormat" src={this.state.imageFile}/>
            {(this.state.imageFile === null) ? 
            <input clasName="inputBtn" type="file" name="img" id="" accept="image/*" onChange={this.toggleUploadFile}/>
            : null }
            {this.enterText()}
            {this.showDecodedText()}
            {this.ecnryptedImage()}
            </div>);
    }
}