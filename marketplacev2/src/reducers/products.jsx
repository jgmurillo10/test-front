const products = (state = [], action) => {
	switch(action.type) {
		case 'ADD_PRODUCT':
			return state
		case 'DELETE_PRODUCT':
			return state
		default:
			return state
	}
}

export default products