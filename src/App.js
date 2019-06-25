import React from 'react'
import { hot } from 'react-hot-loader'
import Routes from './components/Routes'
// https://github.com/gaearon/react-hot-loader/issues/1227
const App = () => (
  <React.Fragment>
      <Routes />
  </React.Fragment>
  
)
export default hot(module)(App)
