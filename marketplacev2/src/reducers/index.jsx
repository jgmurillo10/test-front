import { combineReducers } from 'redux'
import products from './products'
import categoryFilter from './categoryFilter'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
	products,
	visibilityFilter,
	categoryFilter
})