import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { HashRouter } from 'react-router-dom';

const RootComponent = () => {
  return (
    <React.StrictMode>
      <App /> 
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <RootComponent /> 
  </HashRouter>
);
