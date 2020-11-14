import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';
import '../steganography.min.js'

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
       // console.log(steg); // not working

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
           // this.performEncryption();

            this.setState({encrypted: true})
            console.log(this.state.hiddenText);
        }
        
    }

    performEncryption = () => {
        var getBit = function(number, location) {
            return ((number >> location) & 1);
          };
          
          var getBitsFromNumber = function(number) {
            var bits = [];
            for (var i = 0; i < 16; i++) {
              bits.push(getBit(number, i));
            }
            return bits;
          };

        //   var messageBits = [];
        // for (var i = 0; i < message.length; i++) {
        //     var code = message.charCodeAt(i);
        //     var bits = getBitsFromNumber(code);
        //     messageBits = messageBits.concat(bits);
        // }
        
        // var imgData = ctx.getImageData(0, 0, width, height);
        // var colors = imgData.data;
        // var hash = sjcl.hash.sha256.hash(password);
        // var messageSize = 0, pos = 0;
        // var setBit = function(number, location, bit) {
        //     return (number & ~(1 << location)) | (bit << location);
        //   };
        //   // ...
        //   colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
        // while (pos < 16) {
        //     var rand = hash[pos % hash.length] * (pos + 1);
        //     var loc = Math.abs(rand) % colors.length;
        //     // ...
        //     var bit = getBit(bytes[loc], 0);
        //     messageSize = setBit(messageSize, pos, bit);
        //     pos++;
        // }
        
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
            <input className="inputBtn" type="file" name="img" id="" accept="image/*" onChange={this.toggleUploadFile}/>
            : null }
            {this.state.encrypted ? this.ecnryptedImage() : this.decodeAndHideTextBtns()}
            {(this.state.imageFile != null) ? <Button variant="secondary" onClick={this.reset}>Restart</Button> : null }
            </div>);
    }
}