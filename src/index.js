import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
reportWebVitals();
