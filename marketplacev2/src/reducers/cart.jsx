const cart = (state = { visible: false, products: [] }, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const p = state.products.filter(d => d.id === action.product.id);
      console.log(p,'p')
      let n = {};
      if (p.length !== 0) {
        const i = state.products.indexOf(p[0]);
        n = state.products[i];
        console.log(n,'n',state.products,'state.products',p,'p') 
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
