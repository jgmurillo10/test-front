import data from './products.json';
const products = (state = data, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return data;
    case 'SET_CATEGORY_FILTER':
      return data.filter(p => p.sublevel_id === +action.id);
    default:
      return state;
  }
};

export default products;
