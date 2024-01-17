import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './provider/UserProvider.jsx'
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <PrimeReactProvider>
    <UserProvider>

    <App />
    </UserProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
