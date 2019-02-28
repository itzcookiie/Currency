import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  state = {
    name: [],
    currency: [],
    base: ""
  };

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=GBP")
      .then(response => response.json())
      .then(data => {
        let currency = data.rates;
        let store = [];
        for (let keys in currency) {
          store = [...store, keys];
        }
        this.setState({
          name: store,
          currency
        });
      });
  }

  exchangeRate = () => {
    let currency = this.state.currency;
    let name = this.state.base;
    return currency[name];
  };

  selectedBase = event => {
    this.setState({
      base: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <select onChange={event => this.selectedBase(event)}>
          <option defaultValue>Pick a currency</option>
          {this.state.name.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <table className="currency-table">
          <thead>
            <tr>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody className="currency-body">
            <tr>{this.exchangeRate()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
