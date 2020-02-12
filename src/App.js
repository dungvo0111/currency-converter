import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyOptions from "./CurrencyOptions";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInput, setAmountInput] = useState(1);
  const [inputAtFromCurrency, setInputAtFromeCurrency] = useState(true);

  var fromInput, toInput;
  if (inputAtFromCurrency) {
    fromInput = amountInput;
    toInput = amountInput * exchangeRate;
  } else {
    toInput = amountInput;
    fromInput = amountInput / exchangeRate;
  }
  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
      )
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = e => {
    setAmountInput(e.target.value);
    setInputAtFromeCurrency(true);
  };

  const handleToAmountChange = e => {
    setAmountInput(e.target.value);
    setInputAtFromeCurrency(false);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyOptions
        currencies={currencies}
        selectedCurrency={fromCurrency}
        changeCurrency={e => setFromCurrency(e.target.value)}
        amountInput={fromInput}
        changeAmount={handleFromAmountChange}
      />
      <div className="equal">=</div>
      <CurrencyOptions
        currencies={currencies}
        selectedCurrency={toCurrency}
        changeCurrency={e => setToCurrency(e.target.value)}
        amountInput={toInput}
        changeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
