import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

async function render(component, element) {
  return new Promise((resolve) => {
    ReactDOM.render(component, element, (...args) => {
      resolve(args)
    })
  })
}

registerServiceWorker();
