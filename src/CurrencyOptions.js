import React from "react";
import uuidv4 from "uuid/v4";

export default function CurrencyOptions(props) {
  const {
    currencies,
    selectedCurrency,
    changeCurrency,
    amountInput,
    changeAmount
  } = props;
  return (
    <div>
      <input type="number" value={amountInput} onChange={changeAmount} />
      <select value={selectedCurrency} onChange={changeCurrency}>
        {currencies.map(item => (
          <option key={uuidv4()}>{item}</option>
        ))}
      </select>
    </div>
  );
}
