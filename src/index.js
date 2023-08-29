import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import TradeActivity from "./pages/TradeActivity.js";
import Home from "./pages/Home.js";
import OpenPositions from "./pages/OpenPositions.js";
import NoPage from "./pages/NoPage.js";
import ClosedPositions from './pages/ClosedPositions';
import Deposits from './pages/Deposits';
import Withdrawals from './pages/Withdrawals';

export default function App() {
  return (
    
    <BrowserRouter basename="/trade-activity-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" component={<Home />} />
          <Route index element={<Home />} />
          <Route path="trade-activity" element={<TradeActivity />} />
          <Route path="open-positions" element={<OpenPositions />} />
          <Route path="closed-positions" element={<ClosedPositions />} />
          <Route path="deposits" element={<Deposits />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

