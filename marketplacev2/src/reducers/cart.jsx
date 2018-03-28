const cart = (state = { visible: false, products: [] }, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log('ADD_PRODUCT');
      return Object.assign({}, state, {
        products: [...state.products, {...action.product, order: action.quantity}],
      });
    case 'TOGGLE_CART':
      return Object.assign({}, state, {
        visible: !state.visible,
      });
    case 'DELETE_PRODUCT':
      const products = state.products.filter(p => p.id !== action.product.id);
      return Object.assign({}, state, {
        products,
      });
    case 'DELETE_PRODUCTS':
      return Object.assign({}, state, {
        products: [],
      });
    default:
      return state;
  }
};

export default cart;
