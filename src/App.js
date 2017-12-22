import React, { Component } from 'react';
import './App.css';

import DATA from './data';

import Table from './components/Table';
import Select from './components/Select';

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
    
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on
            <Select 
              options={filteredAirlines} 
              valueKey="id" titleKey="name"
              allTitle="All Airlines" 
              value={this.state.airline}
              onSelect={this.airlineSelected} 
            />
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