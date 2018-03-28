const initialState = {
  selected: '',
  isFetching: false,
  items: [],
};
const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CATEGORIES':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_CATEGORIES':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories,
      });
    default:
      return state;
  }
};

export default categories;
