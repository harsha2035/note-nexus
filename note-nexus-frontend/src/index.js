import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Ensure this path is correct
import './index.css'; // Ensure this path is correct
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
