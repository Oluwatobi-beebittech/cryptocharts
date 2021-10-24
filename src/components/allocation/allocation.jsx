import React, { Component } from "react";
import "./allocation.css";
import { cryptoList } from "../../data/cryptocurrencies";

class Allocation extends Component {
  constructor(props) {
    super(props);
    let cryptoArray = cryptoList;
    let cryptoListWithValues = cryptoArray.map((cryptoCoin) => {
      return { coin: cryptoCoin, value: 0 };
    });
    this.state = {
      investmentAmount: 0.01,
      fromYear: 2018,
      toYear: 2020,
      cryptoList: cryptoListWithValues,
      error: "",
    };
  }

  handleSliderChange = (value, coin) => {
    let interimState = [...this.state.cryptoList];
    let indexOfCoin = interimState.findIndex(
      (cryptoObj) => cryptoObj.coin === coin
    );
    interimState[indexOfCoin].value = value;
    this.setState({ cryptoList: interimState });
  };

  handleInvestmentAmountChange = (e) => {
    this.setState({ investmentAmount: e.target.value });
  };

  handleFromDateChange = (e) => {
    this.setState({ fromYear: e.target.value });
  };

  handleToDateChange = (e) => {
    this.setState({ toYear: e.target.value });
  };

  handleAnalyze = (totalPortfolioPercent) => {
    if (totalPortfolioPercent === 100) {
      this.setState({ error: "" });
      this.props.history.push({
        pathname: "/analyze",
        state: { ...this.state },
      });
    } else {
      this.setState({
        error: "Portfolio should add up to 100% before analysis",
      });
    }
  };
  render() {
    let totalPortfolioPercent = 0;
    this.state.cryptoList.map(
      (crypto) =>
        (totalPortfolioPercent =
          parseInt(crypto.value, 10) + totalPortfolioPercent)
    );
    let totalPortfolioEqualTo100Status = totalPortfolioPercent === 100;
    const message =
      totalPortfolioPercent > 100 ? "Portfolio should be equal to 100%" : "";
    const warningFont = !totalPortfolioEqualTo100Status
      ? "text-red-500"
      : "text-green-700";

    return (
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <h1>Asset</h1>
          <h2>Portfolio</h2>
          <div className="space-x-4">
            <React.Fragment>
              <label>Investment($):</label>
              <input
                type="number"
                min="0.01"
                max="2500"
                step="0.01"
                className="w-1/4"
                onChange={this.handleInvestmentAmountChange}
                value={this.state.investmentAmount}
              />
            </React.Fragment>
            <React.Fragment>
              <label>From:</label>
              <select
                name="assets"
                className="py-2 px-3 shadow-lg rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={this.handleFromDateChange}
                value={this.state.fromYear}
              >
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
              </select>
            </React.Fragment>
          </div>

          <div className="space-x-4">
            <label>To:</label>
            <select
              name="assets"
              className="py-2 px-3 shadow-lg rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={this.handleToDateChange}
              value={this.state.toYear}
            >
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
            </select>
          </div>

          {this.state.cryptoList.map((cryptoObj, id) => {
            return (
              <React.Fragment key={id}>
                <div className="bg-green-50 rounded-lg p-2">
                  <input
                    value={cryptoObj.coin}
                    className="py-2 px-3 shadow-lg rounded-lg border border-transparent "
                    disabled
                  />
                </div>
                <div className="bg-green-50 rounded-lg p-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cryptoObj.value}
                    className="slider mt-3 shadow-lg"
                    onChange={(e) => {
                      let value = e.target.value;
                      this.handleSliderChange(value, `${cryptoObj.coin}`);
                    }}
                  />
                  {cryptoObj.value}%{" "}
                  <var>
                    $
                    {(
                      (cryptoObj.value / 100) *
                      this.state.investmentAmount
                    ).toFixed(2)}
                  </var>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <p className={`${warningFont} font-bold text-right`}>
          {totalPortfolioPercent}%
        </p>
        <p className="text-right text-red-500">{message}</p>
        <button className="rounded-lg px-2 py-1 bg-green-600 text-white">
          + Add Asset
        </button>
        <button
          className="block rounded-lg mx-auto w-2/3 bg-blue-600 py-1 px-3 text-white"
          onClick={() => this.handleAnalyze(totalPortfolioPercent)}
        >
          Analyze portfolio
        </button>
        <strong className="text-yellow-700">{this.state.error}</strong>
      </form>
    );
  }
}

export default Allocation;
