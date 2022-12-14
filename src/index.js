import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import history from './History'
import store from './store/store'

// window.process = {}
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
// window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
