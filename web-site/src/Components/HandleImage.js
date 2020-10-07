import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';
//import {FileDialogue} from './FileDialogue';

export class HandleImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {uploadFile: false};
      }


    toggleUploadFile = () => {
        this.setState({uploadFile: !this.state.uploadFile});
        this.handleFileSelect();
    }
    componentDidMount(){
        this.fileSelector = buildFileSelector();
    }
      
    handleFileSelect = (e) => {
        //e.preventDefault();
        this.fileSelector.click();
    }
    render () {
        return (<div>
            <h1> Upload Image that you would like encrypt here</h1>
            <Button variant="primary" onClick={this.toggleUploadFile}>Upload</Button>{' '}
            </div>);
    }
}

function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }