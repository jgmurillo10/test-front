const initialState = {
  selected: {},
  toggleProduct: false,
  title: 'Todos los productos',
  category: -1,
  isFetching: false,
  items: [],
};
const products = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: true,
        title: 'Todos los productos',
        category: -1,
      });
    case 'RECEIVE_PRODUCTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
      });
    case 'REQUEST_PRODUCTS_CATEGORY':
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
    case 'REQUEST_SORT':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_SORT':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products,
      });
    case 'REQUEST_AVAIBILITY':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_AVAIBILITY':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.products
      })
    case 'TOGGLE_PRODUCT':
      return Object.assign({}, state, {
        toggleProduct: !state.toggleProduct,
        selected: action.product,
      });
    case 'RECEIVE_MIN_MAX':
      return Object.assign({}, state, {
        items: action.products,
      });
    default:
      return state;
  }
};

export default products;
