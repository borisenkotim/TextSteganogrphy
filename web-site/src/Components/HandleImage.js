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
        this.baseState = this.state;
      }

    toggleUploadFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({imageFile: URL.createObjectURL(event.target.files[0]) });
    }

    getText = (event) => {
        // console.log(event.target.value);
        this.setState({hiddenText: event.target.value});
    }
    
    decodeImageBtnPressed = () => {
        this.setState({decrypted: true});
        // perform action to decrypt image here and save text to state.decodText
    }

    hideTextBtnPressed = () => {
        // perform action to hide text into image here
        if (this.state.hiddenText != null && this.state.hiddenText !== "" && this.state.imageFile != null) {
            // perform action to hide text into image here

            this.setState({encrypted: true})
            console.log(this.state.hiddenText);
        }
        
    }
    
    ecnryptedImage = () => {
        // should show encypted image
        return (<div><br></br><p>Ecnrypted Image:</p><img className="imageFormat" src={this.state.imageFile}/><br></br></div>
        );
    }

    decodeAndHideTextBtns = () => {
        return (
            (this.state.imageFile != null) ? 
            <div><Button variant="primary" onClick={this.decodeImageBtnPressed}>Decode Image</Button>{' '}
            <input className="inputText" type="text" onChange={this.getText}></input>
            <Button variant="primary" onClick={this.hideTextBtnPressed}>Hide Message into Image</Button>{' '}
            {this.showDecodedText()}
            </div> 
            : null
        );
    }

    showDecodedText = () => {
        // display decoded text from image, should be null if image doesn't exist or has no message
        return (
            this.state.decrypted ? 
            ((this.state.decodedText !== "") ? <div>Decoded Text: {this.state.DecodeText} </div> : <div>No Message Found</div>)
            : null 
        );
    }

    reset = () => {
        // resets component
        this.setState(this.baseState);
    }

    render () {
        return (<div>
            {(this.state.imageFile === null) ? 
            <p> Upload Image To Get Started:</p> : null }
            <img className="imageFormat" src={this.state.imageFile}/>
            {(this.state.imageFile === null) ? 
            <input clasName="inputBtn" type="file" name="img" id="" accept="image/*" onChange={this.toggleUploadFile}/>
            : null }
            {this.state.encrypted ? this.ecnryptedImage() : this.decodeAndHideTextBtns()}
            {(this.state.imageFile != null) ? <Button variant="secondary" onClick={this.reset}>Restart</Button> : null }
            </div>);
    }
}