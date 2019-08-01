import React, { Component } from 'react';
import './App.css';
import Histogram from './components/Histogram.js'

class App extends Component {
  state = {
    congress: ["115", "114", "113"],
    chambers: ["House", "Senate"],
    parties: ["Total", "Democrats", "Republicans"],
    selectedCongress: "115",
    selectedChamber: "House",
    selectedParty: "Total",
    isLoading:true,
    members: []
  }
  componentDidMount() {
    document.getElementById(this.state.selectedChamber).checked = true;
    this.getData(this.state.selectedCongress, this.state.selectedChamber);
  }
  getData = (congress, chamber) => {
    this.setState({
      isLoading:true
    });
    const propublicaURL = "https://api.propublica.org/congress/v1/" + congress + "/" + chamber + "/members.json";
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
            members:[...result.results[0].members],
            isLoading:false
          });
          console.log(this.state.members);
        })
  }
  handleCongressChange = (e) => {
    this.getData(e.target.value, this.state.selectedChamber);
    this.setState({
      selectedCongress:e.target.value
    });
  }
  handleChamberChange = (e) => {
    this.getData(this.state.selectedCongress, e.target.value);
    this.setState({
      selectedChamber:e.target.value
    });
  }
  handlePartyChange = (e) => {
    this.setState({
      selectedParty:e.target.value
    });
  }
  render() {
    const congressOptions = this.state.congress.map(c => {
      return (
        <option key={c} value={c} >Congress {c}</option>
      )
    })
    const chamberOptions = this.state.chambers.map(ch => {
      return (
        <div key={ch}>
          <input type="radio" name="chamberOption" id={ch} value={ch} onChange={this.handleChamberChange}></input>
          <label>{ch}</label>
        </div>
      )
    })
    const partyOptions = this.state.parties.map(p => {
      return (
        <div key={p}>
          <input type="radio" name="dataset" id={p} value={p}/>
          <label htmlFor={p}>{p}</label>
        </div>
      )
    })
    return (
      <div className="App">
        <h1> Congress Info </h1>
        <h3>select congress</h3>
        <select onChange={this.handleCongressChange}>
          {congressOptions}
        </select>
        <h3>select chamber</h3>
        <div>{chamberOptions}</div>
        <h3>select party</h3>
        <div>{partyOptions}</div>
        <Histogram members = {this.state.members}/>
      </div>
    );
  }
}

export default App;
