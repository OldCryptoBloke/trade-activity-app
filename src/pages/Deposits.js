import React, { useState, useEffect } from 'react';
import './App.css'; // You can define your own styling in this CSS file
const Deposits = () => {
    
    const [data, setData] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inputAddress, setInputAddress] = useState('0x4c2b0B4Fff1bb49A94d66130e40771351319A751'); // Default address
    
    
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true); // Set loading state
        try {
          const response = await fetch(
            `https://api.vela.exchange/graph/deposits/42161/${inputAddress}`
          );
          const jsonData = await response.json();
  
          if (lastFetchTime === null || jsonData[0]?.createdAt < lastFetchTime) {
            setData(jsonData);
            setLastFetchTime(jsonData[0]?.createdAt);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Clear loading state
        }
      }
  
      fetchData();
    }, [inputAddress, lastFetchTime]); // Only inputAddress and lastFetchTime
    
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true); // Set loading state
        try {
          const apiUrl = `https://api.vela.exchange/graph/deposits/42161/${encodeURIComponent(inputAddress)}/`;
          console.log('API URL:', apiUrl);
      
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          console.log('Fetched Data:', jsonData);
      
          if (lastFetchTime === null || jsonData[0]?.createdAt > lastFetchTime) {
            setData(jsonData);
            setLastFetchTime(jsonData[0]?.createdAt);
          }
  
        
         
  
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Clear loading state
        }
      }
  
      fetchData();
      const interval = setInterval(fetchData, 30000); // Every 30 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, [data, inputAddress, lastFetchTime]);
  
    // const tokenLookup = {
    //   1: 'BTC/USD',
    //   2: 'ETH/USD',
    //   3: 'LTC/USD',
    //   4: 'ADA/USD',
    //   5: 'DOGE/USD',
    //   6: 'SHIB/USD',
    //   7: 'ARB/USD',
    //   8: 'SOL/USD',
    //   9: 'MATIC/USD',
    //   10: 'AVAX/USD',
    //   11: 'GBP/USD',
    //   12: 'EUR/USD',
    //   13: 'USD/JPY',
    //   14: 'AUD/USD',
    //   15: 'USD/CAD',
    //   24: 'XAG/USD',
    //   25: 'XAU/USD',
    //   26: 'USD/CNH',
    //   27: 'USD/CHF',
    //   28: 'USD/MXN',
    //   30: 'USDT/USD',
    //   31: 'ATOM/USD',
    //   32: 'DOT/USD',
    //   33: 'BNB/USD',
    //   34: 'PEPE/USD',
    //   35: 'XRP/USD',
    //   36: 'CRV/USD',
    //   38: 'OP/USD',
    //   // Add more entries as needed
    // };
  
      const formatCurrency = (value, decimalPlaces) => {
      const uintValue = value; // Assuming value is a string representing the UINT value
      const decimals = 1e6; // This is the scale of the UINT values in your data
      const decimalValue = Number(uintValue) / decimals; // Convert UINT to decimal
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(decimalValue * 1e-0); // Adjust for the desired decimal shift
    };
  
    const handleAddressChange = (event) => {
      setInputAddress(event.target.value);
    };
   
  
    return (
      <div className="App">
       
        <div className="header">
        
        <div className="logo-container">
          <img
            src={`${process.env.PUBLIC_URL}/logo.svg`}
            alt="React Logo"
            className={`logo ${isLoading ? 'spin' : ''}`}
          />
        </div> 
        <h1>Deposits - </h1>
        <input className='address-input'
            type="text"
            value={inputAddress}
            onChange={handleAddressChange}
            placeholder="Enter an address"
          />
          
       
        </div>
        <table className={`table ${isLoading ? 'hidden' : ''}`}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Created At</th>
              <th>TX</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{formatCurrency(entry.amount, 2)}</td>
              <td>{new Date(entry.createdAt * 1000).toLocaleString()}</td>
              <td><a
          href={`https://arbiscan.io/tx/${entry.trasactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {entry.trasactionHash}
        </a></td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    );
  };
  
  export default Deposits;
  
