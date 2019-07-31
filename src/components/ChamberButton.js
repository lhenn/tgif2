import React, { Component } from 'react';

class ChamberButton extends Component {
  state = {
    chamber:""
  }
  handleDivisionClick = (e) => {
    this.setState({
      chamber:e.target.value
    })

  }
  render() {

    return (
        <button onClick={this.handleDivisionClick}>{this.props.chamber}</button>
    );
  }
}

export default ChamberButton;
