import React, { useState, useEffect } from 'react';
import './App.css'; // You can define your own styling in this CSS file

function App() {
  const [data, setData] = useState([]);
  const tokenLookup = {
    1: 'BTC/USD',
    2: 'ETH/USD',
    3: 'LTC/USD',
    4: 'ADA/USD',
    5: 'DOGE/USD',
    6: 'SHIB/USD',
    7: 'ARB/USD',
    8: 'SOL/USD',
    9: 'MATIC/USD',
    10: 'AVAX/USD',
    11: 'GBP/USD',
    12: 'EUR/USD',
    13: 'USD/JPY',
    14: 'AUD/USD',
    15: 'USD/CAD',
    24: 'XAG/USD',
    25: 'XAU/USD',
    26: 'USD/CNH',
    27: 'USD/CHF',
    28: 'USD/MXN',
    30: 'USDT/USD',
    31: 'ATOM/USD',
    32: 'DOT/USD',
    33: 'BNB/USD',
    34: 'PEPE/USD',
    35: 'XRP/USD',
    36: 'CRV/USD',
    38: 'OP/USD',
    // Add more entries as needed
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.vela.exchange/graph/trade_activities/42161/0x0468a85ddd74daa10975bd9a15ca255b1e566e83/'
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  //   const formatCurrency = (value, decimalPlaces) => {
  //   const uintValue = value; // Assuming value is a string representing the UINT value
  //   const decimals = 1e18; // This is the scale of the UINT values in your data
  //   const decimalValue = Number(uintValue) / decimals; // Convert UINT to decimal
    
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 6,
  //     maximumFractionDigits: 6,
  //   }).format(decimalValue * 1e-12); // Adjust for the desired decimal shift
  // };

  const formatCurrency = (value, decimalPlaces) => {
    const uintValue = value; // Assuming value is a string representing the UINT value
    const decimals = 1e18; // This is the scale of the UINT values in your data
    const decimalValue = Number(uintValue) / decimals; // Convert UINT to decimal
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(decimalValue * 1e-12); // Adjust for the desired decimal shift
  };

  const toTitleCase = (str) => {
    return str
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const account = data.length > 0 ? data[0].account : '';

  return (
    <div className="App">
      {/* <h1>Trade Activities - {account}</h1> */}
      <h1>Trade Activities - </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Action Type</th>
            <th>Average Price</th>
            <th>Token ID</th>
            <th>Collateral</th>
            <th>Created At</th>
            <th>Position Fee</th>
            <th>Funding Fee</th>
            <th>Borrow Fee</th>
            <th>Is Long</th>
            <th>Is Win</th>
            <th>Is Plus</th>
            <th>Mark Price</th>
            <th>Pos ID</th>
            <th>Position Type</th>
            <th>Profit Loss</th>
            <th>Trade Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{toTitleCase(entry.actionType)}</td>
              <td>{formatCurrency(entry.averagePrice, 6)}</td>
              <td>{tokenLookup[parseInt(entry.tokenId)]}</td>
              <td>{formatCurrency(entry.collateral, 2)}</td>
              <td>{new Date(entry.createdAt * 1000).toLocaleString()}</td>
              <td>{formatCurrency(entry.positionFee, 2)}</td>
              <td>{formatCurrency(entry.fundingFee, 2)}</td>
              <td>{formatCurrency(entry.borrowFee, 2)}</td>
              <td>{entry.isLong.toString()}</td>
              <td>{entry.isWin.toString()}</td>
              <td>{entry.isPlus.toString()}</td>
              <td>{formatCurrency(entry.markPrice, 6)}</td>
              <td>{entry.posId}</td>
              <td>{entry.positionType}</td>
              <td>{formatCurrency(entry.profitLoss, 2)}</td>
              <td>{formatCurrency(entry.tradeVolume, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
