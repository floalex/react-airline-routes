import React, { Component } from 'react';
import './App.css';

import DATA from './data';

import Table from './components/Table';

class App extends Component {
  defaultState = {
    airline: "all",
  }
  
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  
  formatValue = (property, value) => {
    if (property === "airline") {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }
  
  airlineSelected = (value) => {
    if (value !== "all") {
      value = parseInt(value, 10);
    }
    
    this.setState({airline: value});
  }
  
  handleChange = (event) => {
    event.preventDefault();
    this.airlineSelected(event.target.value);
  }
  
  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];
    
    const filteredRoutes = DATA.routes.filter((route) => {
      return this.state.airline === "all" || route.airline === this.state.airline;
    });
    
    const filteredAirlines = DATA.airlines.filter((airline) => {
      const active = filteredRoutes.some((route) => route.airline === airline.id );
      return Object.assign({}, airline, {active});
    });
    
    let options = filteredAirlines.map((option) => {
      const value = option["id"];
      return <option key={value} value={value}>
        { option["name"] }
      </option>;
    });
    options.unshift(<option key="all" value="all">All Airlines</option>);
    
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on
            <select value={this.state.value} onChange={this.handleChange}>
              { options }
            </select>
            flying
          </p>
            
          <Table 
            className="routes-table" 
            columns={columns} 
            rows={filteredRoutes} 
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;