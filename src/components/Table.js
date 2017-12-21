import React, { Component } from 'react';

class Table extends Component {
  render() {
    const headerCells = this.props.columns.map((col) => { 
      return <th key={col.name}>{col.name}</th>;
    });
    
    const bodyRows = this.props.rows.map((row) => {
      const rows = this.props.columns.map((col) => {
        const value = row[col.property];
        return <td key={col.property}>{this.props.format(col.property, value)}</td>;
      });
      return <tr key={Object.values(row)}>{rows}</tr>;
    });
    
    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              { headerCells }
            </tr>
          </thead>
          <tbody>
            { bodyRows }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;