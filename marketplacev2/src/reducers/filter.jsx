const filter = (state = {
  displayFilter: false,
  sortName: '',
  filterName: '',
  desc: false,
  disabled: true,
}, action) => {
  switch (action.type) {
    case 'SHOW_FILTER':
      return Object.assign({}, state, {
        displayFilter: !state.displayFilter,
      });
    case 'SET_SORT_NAME':
      return Object.assign({}, state, {
        sortName: action.filterName,
        disabled: false,
        displayFilter: true,
      });
    case 'SET_DESC':
      return Object.assign({}, state, {
        desc: action.desc,
      });
    case 'RESET_FILTER':
      return Object.assign({}, state, {
        displayFilter: false,
        sortName: '',
        filterName: '',
        desc: false,
        disabled: true,
      });
    default:
      return state;
  }
};

export default filter;
