import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';

class Histogram extends Component {
  constructor(props){
    super(props);
    this.createHistogram = this.createHistogram.bind(this)
  }
  // componentDidMount() {
  //   this.createHistogram();
  // }
  componentDidUpdate() {
    this.createHistogram();
  }
  createHistogram=()=>{
    console.log("rendering ;)", this.props.members)
  }
  render() {

    return <svg width='500' height='400'></svg>
  }
}

export default Histogram;
