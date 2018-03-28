import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import App from './components/App';
import rootReducer from './reducers';
import { fetchProducts, fetchCategories, fetchStats } from './actions';
import registerServiceWorker from './registerServiceWorker';
import './App.css';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);
store.dispatch(fetchProducts());
store.dispatch(fetchCategories());
store.dispatch(fetchStats());

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
