import React, { useEffect, useState } from 'react';
import './App.css';
import InputRow from './inputRow';

const BASE_URL = 'https://api.frankfurter.app/latest';
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, [exchangeRate]); // Include exchangeRate in the dependency array

  useEffect(() => {
    if (fromCurrency !=null && toCurrency !=null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => setExchangeRate(data.rates[toCurrency]))
    }  
  }, [fromCurrency, toCurrency])



  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const handleSubmit = () => {
    // Fetch the exchange rates based on selected currencies
    const url = `${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  };

  return (
    <div>
      <ul
        className="d-flex p-2 nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
        id="pillNav2"
        role="tablist"
        style={{
          "--bs-nav-link-color": "var(--bs-white)",
          "--bs-nav-pills-link-active-color": "var(--bs-primary)",
          "--bs-nav-pills-link-active-bg": "var(--bs-white)",
        }}
      >
        <li className="nav-item" role="presentation">
          <button className="nav-link active rounded-5" id="home-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="true">
            Home
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link rounded-5" id="profile-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">
            Rates
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link rounded-5" id="contact-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">
            Information
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link rounded-5" id="contact-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">
            Contact
          </button>
        </li>
      </ul>
      <div className="container-fluid ">
        <div className='row mx-auto p-4'>
        <h1 className='heading'>
          Expert-Rates
        </h1>
        <h5>Currency Exchange</h5>
        <InputRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className='equals'> = </div>
        
        <InputRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
        </div>
        <button type="button" className="btn btn-primary btn-lg mt-4 ml-4" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <footer className="fixed-bottom bg-primary text-white text-center p-3">
        <div className="social-links mt-3 text-center">
          <a href="https://twitter.com/thankgodoo" className="twitter" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter" style={{ fontSize: '25px', marginRight: '20px', color: '#fff' }}></i>
          </a>
          <a href="https://www.facebook.com/" className="facebook" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook" style={{ fontSize: '25px', marginRight: '20px', color: '#fff' }}></i>
          </a>
          <a href="https://www.instagram.com/" className="instagram" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram" style={{ fontSize: '25px', marginRight: '20px', color: '#fff' }}></i>
          </a>
          <a href="https://www.linkedin.com/in/nweke-thankgod-31537aa4/" className="linkedin" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin" style={{ fontSize: '25px', marginRight: '20px', color: '#fff' }}></i>
          </a>
        </div>
        <p style={{ color: '#fff' }}> Portfolio: https://gorgeous-sunburst-177bb1.netlify.app/</p>
      </footer>
      </div>
  );
}

export default App;