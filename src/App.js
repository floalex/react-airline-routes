import React, { Component } from 'react';
import './App.css';

import DATA from './data';

import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  defaultState = {
    airline: "all",
    airport: "all"
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
  
  airportSelected = (value) => {
    this.setState({airport: value});
  }
  
  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];
    
    const currentSelectedAirlines = (route) => {
      return this.state.airline === "all" || route.airline === this.state.airline;
    };
    
    const currentSelecedAirports = (route) => {
      return this.state.airport === "all" || route.src === this.state.airport || route.dest === this.state.airport;
    };
    
    const filteredRoutes = DATA.routes.filter((route) => {
      return currentSelectedAirlines(route) && currentSelecedAirports(route);
    });
    
    const filteredAirlines = DATA.airlines.map((airline) => {
      const active = filteredRoutes.some((route) => route.airline === airline.id );
      return Object.assign({}, airline, {active});
    });
    
    const filteredAirports = DATA.airports.map((airport) => {
      const active = filteredRoutes.some((route) => route.src === airport.code || route.dest === airport.code );
      return Object.assign({}, airport, {active});
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
              valueKey="id" titleKey="name" activeKey="active"
              allTitle="All Airlines" 
              value={this.state.airline}
              onSelect={this.airlineSelected} 
            />
            flying in or out of
            <Select 
              options={filteredAirports} 
              valueKey="code" titleKey="name" activeKey="active"
              allTitle="All Airports" 
              value={this.state.airport}
              onSelect={this.airportSelected} 
            />
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