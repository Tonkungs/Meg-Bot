/** @format */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
// import registerServiceWorker from './registerServiceWorker';

import store from './store/store'

const AppWithRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<AppWithRouter />, document.getElementById('root'))
// registerServiceWorker()
