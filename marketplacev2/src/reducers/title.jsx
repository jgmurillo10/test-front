const title = (state = 'Todos los productos', action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.title;
    default:
      return state;
  }
};

export default title;
