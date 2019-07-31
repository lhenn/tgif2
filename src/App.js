import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    congress: ["113", "114", "115"],
    chambers: ["House", "Senate"],
    selectedChamber: "House",
    selectedCongress: "115",
    members: []
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const propublicaURL = "https://api.propublica.org/congress/v1/" + this.state.selectedCongress + "/" + this.state.selectedChamber + "/members.json";
    const propublicaAPIkey = 'E58FNEqHGDgcK00Ty0XoyVpupxkLQXMc3okUc8EU';
    fetch(propublicaURL, {
            method: "GET",
            headers: new Headers({
            "X-API-KEY":propublicaAPIkey
            })
        })
        .then(res => res.json())
        .then((result) => {
          this.setState({
            members:[...result.results[0].members]
          });
          console.log(this.state.members);
        })
  }
  handleChamberChange = (e) => {
    this.setState({
      selectedChamber:e.target.value
    });
    this.getData();
  }
  handleCongressChange = (e) => {
    this.setState({
      selectedCongress:e.target.value
    });
    this.getData();
  }
  render() {
    const chamberOptions = this.state.chambers.map(c => {
      return (
        <div key={c}>
          <input type="radio" name="chamberOption" id={c} value={c} onChange={this.handleChamberChange}></input>
          <label>{c}</label>
        </div>
      )
    })
    const congressOptions = this.state.congress.map(c => {
      return (
        <option key={c} value={c} >Congress {c}</option>
      )
    })
    return (
      <div className="App">
        <h1> Congress Info </h1>
        <select onChange={this.handleCongressChange}>
          {congressOptions}
        </select>
        <div>{chamberOptions}</div>
      </div>
    );
  }
}

export default App;
