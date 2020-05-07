import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import middleware from './middleware'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
<BrowserRouter>
  <App />
</BrowserRouter>
</Provider>,
  document.getElementById('root')
);
