import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
// import category from './category';
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
