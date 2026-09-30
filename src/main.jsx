import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoanProvider } from './context/LoanContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoanProvider>
        <App />
      </LoanProvider>
    </BrowserRouter>
  </React.StrictMode>
);
