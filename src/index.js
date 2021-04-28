import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import UserProvider from './App/Providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
