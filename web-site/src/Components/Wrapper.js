import React, { Component } from 'react';

export default class Wrapper extends Component {
  shouldComponentUpdate() {
    // component will never update
    return false;
  }

  componentWillReceiveProps(nextProps) {
    // though never re-rendered, the component will receive new props here
  //  this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  componentDidMount() {
    // component reaching DOM by setting ref attribute in jsx
  //  console.log(this.props.image);
    this.encode = global.steg.encode(this.props.secret, this.props.image);
    
  }
  render() {
    //  console.log("works for me")
      console.log(global.steg);
    return <div style={{ height: '50vh' }} ref="encode" />;
  }
}