import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './redux'
import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './containers/Routes'

import App from './containers/App'

const mountNode = document.getElementById('root')

const preloadedState = {}
const { store } = configureStore(preloadedState)

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router>
        <Routes />
      </Router>
    </App>
  </Provider>,
  mountNode,
)
