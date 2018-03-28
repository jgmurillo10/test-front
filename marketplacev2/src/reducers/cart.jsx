const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, { ...action.product, quantity: action.quantity }];
    default:
      return state;
  }
};

export default cart;
