const products = (state = { title: 'Todos los productos', category: '', isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: true,
        title: 'Todos los productos',
        category: '',
      });
    case 'RECEIVE_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
      });
    case 'REQUEST_PRODUCTS_CATEGORY':
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true,
        title: `Productos de ${action.categoryName}`,
      });
    case 'RECEIVE_PRODUCTS_CATEGORY':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
        category: action.category,
      });
    case 'REQUEST_SEARCH_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_SEARCH_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
      });
    default:
      return state;
  }
};

export default products;
