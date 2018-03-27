const displayFilter = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_FILTER':
      return !state;
    default:
      return state;
  }
};

export default displayFilter;
