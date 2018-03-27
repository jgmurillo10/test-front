const categoryFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_CATEGORY_FILTER':
			return action.categoryFilter
		default:
			return state
	}
}

export default categoryFilter