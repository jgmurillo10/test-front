import data from './products.json';
const products = (state = data, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return data;
    case 'SET_CATEGORY_FILTER':
      return data.filter(p => p.sublevel_id === +action.id);
    case 'ADD_PRODUCT':
      return state;
    case 'DELETE_PRODUCT':
      return state;
    case 'EDIT_PRODUCT':
      return state;
    default:
      return state;
  }
};

export default products;
