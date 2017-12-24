import React, { Component } from 'react';
import './App.css';

import DATA from './data';

import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';

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
  
  handleairlineSelected = (value) => {
    if (value !== "all") {
      value = parseInt(value, 10);
    }
    
    this.setState({airline: value});
  }
  
  handleairportSelected = (value) => {
    this.setState({airport: value});
  }
  
  clearFilters = () => {
    this.setState(this.defaultState);
  }
  
  currentSelectedAirlines = (route) => {
    return this.state.airline === "all" || route.airline === this.state.airline;
  };
    
  currentSelecedAirports = (route) => {
    return this.state.airport === "all" || route.src === this.state.airport || route.dest === this.state.airport;
  };
    
  sortAirportsByName = DATA.airports.sort((a, b) => (
    (a.name).localeCompare(b.name)
  ));    
  
  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];
    
    const filteredRoutes = DATA.routes.filter((route) => {
      return this.currentSelectedAirlines(route) && this.currentSelecedAirports(route);
    });
    
    const filteredAirlines = DATA.airlines.map((airline) => {
      const active = filteredRoutes.some((route) => route.airline === airline.id );
      return Object.assign({}, airline, {active});
    });
    
    const filteredAirports = this.sortAirportsByName.map((airport) => {
      const active = filteredRoutes.some((route) => route.src === airport.code || route.dest === airport.code );
      return Object.assign({}, airport, {active});
    });
    
    const defaultSelected = this.state.airline === this.defaultState.airline && this.state.airport === this.defaultState.airport;
    
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map routes={filteredRoutes}
               valueKey="code"
               value={this.state.airport} 
               onSelect={this.handleairportSelected}
          />
          
          <p>
            Show routes on
            <Select 
              options={filteredAirlines} 
              valueKey="id" titleKey="name" activeKey="active"
              allTitle="All Airlines" 
              value={this.state.airline}
              onSelect={this.handleairlineSelected} 
            />
            flying in or out of
            <Select 
              options={filteredAirports} 
              valueKey="code" titleKey="name" activeKey="active"
              allTitle="All Airports" 
              value={this.state.airport}
              onSelect={this.handleairportSelected} 
            />
            <button onClick={this.clearFilters} disabled={defaultSelected}>Show All Routes</button>
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