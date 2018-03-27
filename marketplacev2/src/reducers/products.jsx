import data from './products.json';

const products = (state = data, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return data;
    case 'SET_CATEGORY_FILTER':
      return data.filter(p => p.sublevel_id === +action.id);
    case 'SEARCH':
      console.log('search',state,action)
      return data.filter(p => p.name.includes(action.query));
    default:
      return state;
  }
};

export default products;
