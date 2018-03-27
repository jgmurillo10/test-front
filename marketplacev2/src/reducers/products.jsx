const products = (state = { category: '', isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
      });
    case 'REQUEST_PRODUCTS_CATEGORY':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_PRODUCTS_CATEGORY':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
        category: action.category,
      });
    case 'SET_CATEGORY_FILTER':
      return state.items.filter(p => p.sublevel_id === +action.id);
    case 'SEARCH':
      return state.items.filter(p => p.name.includes(action.query));
    default:
      return state;
  }
};

export default products;
