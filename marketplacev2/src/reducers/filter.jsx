const initialState = {
  displayFilter: false,
  sortName: '',
  filterName: '',
  desc: false,
  disabledSort: true,
  disabledFilter: true,
  productsStats: []
};
const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_FILTER':
      return Object.assign({}, state, {
        displayFilter: !state.displayFilter,
      });
    case 'SET_SORT_NAME':
      return Object.assign({}, state, {
        sortName: action.sortName,
        disabledSort: false,
        displayFilter: true,
      });
    case 'SET_FILTER_NAME':
      return Object.assign({}, state, {
        filterName: action.filterName,
        disabledFilter: false,
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
        disabledFilter: true,
        disabledSort: true,
      });
    case 'RECEIVE_STATS':
      const newStateStats = Object.assign({}, state, {
        productsStats: [...state.productsStats, action.product],
      });
      if (newStateStats.productsStats.length === 4) {
        const minQuantity = Math.min.apply(Math, newStateStats.productsStats.map(p => p.quantity));
        const minPrice = Math.min.apply(Math, newStateStats.productsStats.map(p => p.price));
        const maxQuantity = Math.max.apply(Math, newStateStats.productsStats.map(p => p.quantity));
        const maxPrice = Math.max.apply(Math, newStateStats.productsStats.map(p => p.price));
        return Object.assign({}, newStateStats, {
          maxPrice,
          minPrice,
          maxQuantity,
          minQuantity,
        })
      }
      return newStateStats;
    default:
      return state;
  }
};

export default filter;
