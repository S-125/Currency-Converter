import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { GoArrowSwitch } from "react-icons/go";

function App() {
  const [amount, setAmount] = useState(0);
  const [rates, setRates] = useState("USD");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  useEffect(() => {
    console.log(amount);
    const fetchData=async()=>{
      try{
        const response=await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setRates(response.data.rates);
        
      }
      catch(error){
        console.log(error);
      }
    };fetchData();
  },[]);
  const convertCurrency = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2)); // Convert and round to 2 decimals
    } else {
      setConvertedAmount("Invalid currency selection");
    }
  };
  const flip=()=>{
    const temp=fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="box">
    <div className='Container'>
         <h1>Currency Converter</h1>
         <input type="text" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)} />
         <div className="setCountry">
         <p>From</p>
         <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
          {Object.keys(rates).map((currency)=>(
            <option key={currency} value={currency}>{currency}</option>
          ))}
         </select>
         <button onClick={flip}><GoArrowSwitch/></button>
         <p>To</p>
          <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}> 
          {Object.keys(rates).map((currency)=>(
            <option key={currency} value={currency}>{currency}</option>
          ))}
          </select><br/>
          </div>
           <div className='convert'>

          <button className='convertbtn' onClick={convertCurrency}>Convert</button>
          <p className='result'> {convertedAmount !== null && <span className='display'>Converted Amount: {convertedAmount} {toCurrency}</span>}</p>
          </div>
   
    </div>
    </div>
  )
}

export default App
