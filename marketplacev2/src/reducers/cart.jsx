const cart = (state = { visible: false, products: [] }, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const p = state.products.filter(d => d.id === action.product.id);
      let n = {};
      if (p.length !== 0) {
        const i = state.products.indexOf(p[0]);
        n = state.products[i];
        n.order += action.quantity;
        state.products[i] = n;
        return Object.assign({}, state, {
          products: [...state.products],
        });
      }
      else {
        n = {...action.product, order: action.quantity};
        return Object.assign({}, state, {
          products: [...state.products, n],
        });
      }
    case 'EDIT_PRODUCT':
      const q = state.products.filter(d => d.id === action.product.id);
      let m = {};
      const i = state.products.indexOf(q[0]);
      m = state.products[i];
      m.order = action.quantity;
      state.products[i] = m;
      return Object.assign({}, state, {
        products: [...state.products],
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
