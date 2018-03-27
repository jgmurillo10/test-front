import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import visibilityFilter from './visibilityFilter';
import title from './title';
import cart from './cart';

export default combineReducers({
  categories,
  products,
  visibilityFilter,
  title,
  cart,
});
