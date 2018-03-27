import { combineReducers } from 'redux';
import products from './products.jsx';
import categories from './categories.jsx';
import visibilityFilter from './visibilityFilter';
import title from './title';
import cart from './cart';
import displayFilter from './displayFilter';

export default combineReducers({
  categories,
  products,
  visibilityFilter,
  title,
  cart,
  displayFilter,
});
