import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index.jsx';
import {Toaster} from 'react-hot-toast';
// import { createStore } from 'redux';
// import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer:rootReducer,
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <BrowserRouter>
     <App />
     <Toaster/>
     </BrowserRouter>
    </Provider>
 
 
 
  </React.StrictMode>

);
