import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
var router = {
  width: '80%',
  display: 'flex',
  justifyContent: 'center',
}
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router style={router}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);


reportWebVitals();
