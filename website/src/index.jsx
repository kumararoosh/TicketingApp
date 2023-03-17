import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import config from './config.json';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as AWS from 'aws-sdk';
import Dashboard from './components/Dashboard';
import UserData from './components/UserData';
import Login from './components/Login';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
