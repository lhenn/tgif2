import React, { Component } from 'react';
import './App.css';
import Histogram from './components/Histogram.js'

class App extends Component {
  state = {
    congress: ["115", "114", "113"],
    chambers: ["House", "Senate"],
    parties: [],
    selectedCongress: "115",
    selectedChamber: "House",
    selectedParty: "",
    isLoading:true
  }
  componentDidMount() {
    this.getData(this.state.selectedCongress, this.state.selectedChamber);
  }
  getData = () => {
    this.setState({
      isLoading:true
    });
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
          const parties =
          [{
            name:"Total",
            members: result.results[0].members
          },
          {
            name: "Democrats",
            members: result.results[0].members.filter(m => m.party === "D")
          },
          {
            name:"Republicans",
            members: result.results[0].members.filter(m => m.party === "R")
          }]
          const independents = result.results[0].members.filter(m => m.party === "I");
          if(independents.length > 0) {
            parties.push({
              name:"Independents",
              members: independents
            })
          }
          this.setState({
            parties:parties,
            selectedParty:"Total",
            isLoading:false
          });
        })
        .catch(error => console.log(error))
  }
  handleCongressChange = (e) => {
    this.setState({
      selectedCongress:e.target.value
    }, () => {
      this.getData();
    });
  }
  handleChamberChange = (e) => {
    this.setState({
      selectedChamber:e.target.value
    }, () => {
      this.getData();
    });
  }
  handlePartyChange = (e) => {
    this.setState({
      selectedParty:e.target.value
    });
  }
  isChecked = (value) => {
    if(value === this.state.selectedParty ||
      value === this.state.selectedChamber ||
      value === this.state.selectedCongress) return true;
    return false;
  }

  render() {
    const congressOptions = this.state.congress.map(c => {
      return (
        <div key={c}>
          <input
            type="radio"
            name="congressOption"
            id={c}
            value={c}
            onChange={this.handleCongressChange}
            defaultChecked={this.isChecked(c)}>
          </input>
          <label>{c}</label>
        </div>
      )
    })
    const chamberOptions = this.state.chambers.map(ch => {
      return (
        <div key={ch}>
          <input
            type="radio"
            name="chamberOption"
            id={ch}
            value={ch}
            onChange={this.handleChamberChange}
            defaultChecked={this.isChecked(ch)}>
          </input>
          <label>{ch}</label>
        </div>
      )
    })
    const partyOptions = this.state.parties.map(p => {
      return (
        <div key={p.name}>
          <input
            type="radio"
            name="dataset"
            id={p.name}
            value={p.name}
            onChange={this.handlePartyChange}
            defaultChecked={this.isChecked(p.name)}
          />
          <label>{p.name}</label>
        </div>
      )
    })
    if(this.state.isLoading) {
      return (
        <div>Data is loading...</div>
      )
    } else {
      return (
        <div className="App">
          <h1> Congress Info </h1>
          <h3>select congress</h3>
          <div>
            {congressOptions}
          </div>
          <h3>select chamber</h3>
          <div>{chamberOptions}</div>
          <h3>select party</h3>
          <div>{partyOptions}</div>
          <Histogram
            dataType = 'loyalty'
            totalMembers={this.state.parties.filter(p => p.name === "Total")[0]}
            partyMembers={this.state.parties.filter(p => p.name === this.state.selectedParty)[0]}
          />
          <Histogram
            dataType = 'attendance'
            totalMembers={this.state.parties.filter(p => p.name === "Total")[0]}
            partyMembers={this.state.parties.filter(p => p.name === this.state.selectedParty)[0]}
          />
        </div>
      );
    }
  }
}

export default App;
