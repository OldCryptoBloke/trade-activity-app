import React, { useState, useEffect } from 'react';
import './App.css'; // You can define your own styling in this CSS file
const Withdrawals = () => {
    
    const [data, setData] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inputAddress, setInputAddress] = useState('0x4c2b0B4Fff1bb49A94d66130e40771351319A751'); // Default address
    
    
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true); // Set loading state
        try {
          const response = await fetch(
            `https://api.vela.exchange/graph/withdraws/42161/${inputAddress}`
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
          const apiUrl = `https://api.vela.exchange/graph/withdraws/42161/${encodeURIComponent(inputAddress)}/`;
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
        <h1>Withdrawals - </h1>
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
  
  export default Withdrawals;
  
