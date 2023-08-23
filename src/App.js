// import React, { useState, useEffect } from 'react';
// import './App.css'; // You can define your own styling in this CSS file

// function App() {
//   const [data, setData] = useState([]);
//   const [lastFetchTime, setLastFetchTime] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [inputAddress, setInputAddress] = useState('0x40988180c9cc5e7d0ac4e8055545b76a4470fe14'); // Default address
//   const [totalProfit, setTotalProfit] = useState(0); // New state for total profit
  
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true); // Set loading state
//       try {
//         const response = await fetch(
//           `https://api.vela.exchange/graph/trade_activities/42161/${inputAddress}`
//         );
//         const jsonData = await response.json();

//         if (lastFetchTime === null || jsonData[0]?.createdAt < lastFetchTime) {
//           setData(jsonData);
//           setLastFetchTime(jsonData[0]?.createdAt);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false); // Clear loading state
//       }
//     }

//     fetchData();
//   }, [inputAddress, lastFetchTime]); // Only inputAddress and lastFetchTime
  
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true); // Set loading state
//       try {
//         const apiUrl = `https://api.vela.exchange/graph/trade_activities/42161/${encodeURIComponent(inputAddress)}/`;
//         console.log('API URL:', apiUrl);
    
//         const response = await fetch(apiUrl);
//         const jsonData = await response.json();
//         console.log('Fetched Data:', jsonData);
    
//         if (lastFetchTime === null || jsonData[0]?.createdAt > lastFetchTime) {
//           setData(jsonData);
//           setLastFetchTime(jsonData[0]?.createdAt);
//         }

      
//         // Calculate total profit
//         const calculatedTotalProfit = data.reduce((total, activity) => {
//           return total + parseFloat(activity.profitLoss);
//         }, 0);
//         setTotalProfit(calculatedTotalProfit);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false); // Clear loading state
//       }
//     }

//     fetchData();
//     const interval = setInterval(fetchData, 30000); // Every 30 seconds

//     return () => {
//       clearInterval(interval);
//     };
//   }, [data, inputAddress, lastFetchTime]);

//   const tokenLookup = {
//     1: 'BTC/USD',
//     2: 'ETH/USD',
//     3: 'LTC/USD',
//     4: 'ADA/USD',
//     5: 'DOGE/USD',
//     6: 'SHIB/USD',
//     7: 'ARB/USD',
//     8: 'SOL/USD',
//     9: 'MATIC/USD',
//     10: 'AVAX/USD',
//     11: 'GBP/USD',
//     12: 'EUR/USD',
//     13: 'USD/JPY',
//     14: 'AUD/USD',
//     15: 'USD/CAD',
//     24: 'XAG/USD',
//     25: 'XAU/USD',
//     26: 'USD/CNH',
//     27: 'USD/CHF',
//     28: 'USD/MXN',
//     30: 'USDT/USD',
//     31: 'ATOM/USD',
//     32: 'DOT/USD',
//     33: 'BNB/USD',
//     34: 'PEPE/USD',
//     35: 'XRP/USD',
//     36: 'CRV/USD',
//     38: 'OP/USD',
//     // Add more entries as needed
//   };

//     const formatCurrency = (value, decimalPlaces) => {
//     const uintValue = value; // Assuming value is a string representing the UINT value
//     const decimals = 1e18; // This is the scale of the UINT values in your data
//     const decimalValue = Number(uintValue) / decimals; // Convert UINT to decimal
    
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: decimalPlaces,
//       maximumFractionDigits: decimalPlaces,
//     }).format(decimalValue * 1e-12); // Adjust for the desired decimal shift
//   };

//   const toTitleCase = (str) => {
//     return str
//       .split('_')
//       .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
//       .join(' ');
//   };

//   const handleAddressChange = (event) => {
//     setInputAddress(event.target.value);
//   };
 

//   return (
//     <div className="App">
     
//       <div className="header">
      
//       <div className="logo-container">
//         <img
//           src={`${process.env.PUBLIC_URL}/logo.svg`}
//           alt="React Logo"
//           className={`logo ${isLoading ? 'spin' : ''}`}
//         />
//       </div> 
//       <h1>Trade Activities - </h1>
//       <input className='address-input'
//           type="text"
//           value={inputAddress}
//           onChange={handleAddressChange}
//           placeholder="Enter an address"
//         />
//         <div className="total-profit">Total Profit: {formatCurrency(totalProfit, 2)}</div> {/* Display total profit */}
     
//       </div>
//       <table className={`table ${isLoading ? 'hidden' : ''}`}>
//         <thead>
//           <tr>
//             <th>Action Type</th>
//             <th>Average Price</th>
//             <th>Token ID</th>
//             <th>Collateral</th>
//             <th>Created At</th>
//             <th>Position Fee</th>
//             <th>Funding Fee</th>
//             <th>Borrow Fee</th>
//             <th>Is Long</th>
//             <th>Is Win</th>
//             <th>Is Plus</th>
//             <th>Mark Price</th>
//             <th>Pos ID</th>
//             <th>Position Type</th>
//             <th>Profit Loss</th>
//             <th>Trade Volume</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((entry, index) => (
//             <tr key={index}>
//               <td>{toTitleCase(entry.actionType)}</td>
//               <td>{formatCurrency(entry.averagePrice, 6)}</td>
//               <td>{tokenLookup[parseInt(entry.tokenId)]}</td>
//               <td>{formatCurrency(entry.collateral, 2)}</td>
//               <td>{new Date(entry.createdAt * 1000).toLocaleString()}</td>
//               <td>{formatCurrency(entry.positionFee, 2)}</td>
//               <td>{formatCurrency(entry.fundingFee, 2)}</td>
//               <td>{formatCurrency(entry.borrowFee, 2)}</td>
//               <td>{entry.isLong.toString()}</td>
//               <td>{entry.isWin.toString()}</td>
//               <td>{entry.isPlus.toString()}</td>
//               <td>{formatCurrency(entry.markPrice, 6)}</td>
//               <td>{entry.posId}</td>
//               <td>{entry.positionType}</td>
//               <td>{formatCurrency(entry.profitLoss, 2)}</td>
//               <td>{formatCurrency(entry.tradeVolume, 2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//     </div>
//   );
// }

// export default App;
