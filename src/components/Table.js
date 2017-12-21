import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  
  previousPage = (event) => {
    event.preventDefault();
    this.setState({page: this.state.page - 1});
  }
  
  nextPage = (event) => {
    event.preventDefault();
    this.setState({page: this.state.page + 1});
  }
  
  selectPage = (i) => (event) => {
    event.preventDefault();
    this.setState({page: i});
  }
  
  render() {
    const headerCells = this.props.columns.map((col) => { 
      return <th key={col.name}>{col.name}</th>;
    });
    
    const start = this.state.page * this.props.perPage;
    const totalPages = Math.ceil(this.props.rows.length/this.props.perPage);
    
    const bodyRows = this.props.rows.slice(start, start + this.props.perPage).map((row) => {
      const rows = this.props.columns.map((col) => {
        const value = row[col.property];
        return <td key={col.property}>{this.props.format(col.property, value)}</td>;
      });
      return <tr key={Object.values(row)}>{rows}</tr>;
    });
    
    let displayPages = [];
    
    for (let i = 0; i < totalPages; i++) {
      if (i === this.state.page) {
        displayPages.push(i + 1);
      } else {
        displayPages.push(
          <a
            key={i}
            href={i}
            onClick={this.selectPage(i)}
          >
          {i + 1}
          </a>
        );
      }
    }
    
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
        <div className="pagination">
          <p>
            Showing {start + 1}-{start + bodyRows.length} of {this.props.rows.length} total routes
          </p>
          <button
            key="previous"
            disabled={this.state.page === 0}
            onClick={this.previousPage}
          >
            Previous Page
          </button>
          
          {displayPages}
          
          <button
            key="next"
            disabled={this.state.page + 1 === totalPages}
            onClick={this.nextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Table;