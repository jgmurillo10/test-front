import data from './categories.json';
const categories = (state = data, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return data
    default:
      return state;
  }
};

export default categories;
