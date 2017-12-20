import React, { Component } from 'react';
import './App.css';

import DATA from './data'

class App extends Component {
  render() {
    const tableComponents = DATA.routes.map((route) => (
      <Table
        airline={route.airline}
        src={route.src}
        dest={route.dest}
      />
    ));
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <div>
            <table className='routes-table'>
              <thead>
                <tr>
                  <th key='Airline'>Airline</th>
                  <th key='Source Airport'>Source Airport</th>
                  <th key='Destination Airport'>Destination Airport</th>
                </tr>
              </thead>
              <tbody>
                {tableComponents}
               </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    return (
      <tr>
        <td>
          {DATA.getAirlineById(this.props.airline).name}
        </td>
        <td>
          {DATA.getAirportByCode(this.props.src).name}
        </td>
        <td>
          {DATA.getAirportByCode(this.props.dest).name}
        </td>
      </tr>
    );
  }
}

export default App;