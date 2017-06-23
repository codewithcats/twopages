import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Header, Content} from './app/view/components'
import router from './app/router'
import reduxStore from './app/state/store'
import {Provider as ReduxProvider} from 'react-redux'

if (process.env.NODE_ENV !== 'production') {
  let createClass = React.createClass
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass
    }
  })
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

async function render(component, element) {
  return new Promise((resolve) => {
    ReactDOM.render(component, element, (...args) => {
      resolve(args)
    })
  })
}

async function init() {
  await render((
    <ReduxProvider store={reduxStore}>
      <Header />
    </ReduxProvider>
  ), document.getElementById('header'))

  await render((
    <ReduxProvider store={reduxStore}>
      <Content />
    </ReduxProvider>
  ), document.getElementById('root'))

  registerServiceWorker();
  router.start('/dashboard')
}

init()

