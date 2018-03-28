const initialState = JSON.parse(localStorage.getItem('cart')) || {
  visible: false,
  products: [],
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const p = state.products.filter(d => d.id === action.product.id);
      let n = {};
      if (p.length !== 0) {
        const i = state.products.indexOf(p[0]);
        n = state.products[i];
        n.order += action.quantity;
        state.products[i] = n;
        const newStateAdd = Object.assign({}, state, {
          products: [...state.products],
        });
        localStorage.setItem('cart', JSON.stringify(newStateAdd));
        return newStateAdd;
      }
      else {
        n = {...action.product, order: action.quantity};
        const newState = Object.assign({}, state, {
          products: [...state.products, n],
        });
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
      }
    case 'EDIT_PRODUCT':
      const q = state.products.filter(d => d.id === action.product.id);
      let m = {};
      const i = state.products.indexOf(q[0]);
      m = state.products[i];
      m.order = action.quantity;
      state.products[i] = m;
      const newStateEdit = Object.assign({}, state, {
        products: [...state.products],
      });
      localStorage.setItem('cart', JSON.stringify(newStateEdit));
      return newStateEdit;
    case 'TOGGLE_CART':
      const newStateToggle = Object.assign({}, state, {
        visible: !state.visible,
      });
      localStorage.setItem('cart', JSON.stringify(newStateToggle));
      return newStateToggle;
    case 'DELETE_PRODUCT':
      const products = state.products.filter(p => p.id !== action.product.id);
      const newStateDelete = Object.assign({}, state, {
        products,
      });
      localStorage.setItem('cart', JSON.stringify(newStateDelete));
      return newStateDelete;
    case 'DELETE_PRODUCTS':
      const newStateDeleteAll = Object.assign({}, state, {
        products: [],
      });
      localStorage.setItem('cart', JSON.stringify(newStateDeleteAll));
      return newStateDeleteAll;
    default:
      return state;
  }
};

export default cart;
