import fetch from 'cross-fetch';

export const requestCategories = () => ({
  type: 'REQUEST_CATEGORIES',
});

export const receiveCategories = categories => ({
  type: 'RECEIVE_CATEGORIES',
  categories,
});

export const errorCategories = error => ({
  type: 'ERROR_CATEGORIES',
  error,
});

export const fetchCategories = () => {
  return function (dispatch) {
    dispatch(requestCategories());

    return fetch('/categories')
      .then(
        response => response.json(),
        error => dispatch(errorCategories(error)),
      )
      .then(json => dispatch(receiveCategories(json)));
  };
};

const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

const receiveProducts = products => ({
  type: 'RECEIVE_PRODUCTS',
  products,
});

const errorProducts = error => ({
  type: 'ERROR_PRODUCTS',
  error,
});
export const fetchProducts = () => {
  return function (dispatch) {
    dispatch(requestProducts());
    dispatch(resetFilter());

    return fetch('/products')
      .then(
        response => response.json(),
        error => dispatch(errorProducts(error)),
      )
      .then(json => dispatch(receiveProducts(json)));
  };
};

const requestProductsByCategory = (category, categoryName) => ({
  type: 'REQUEST_PRODUCTS_CATEGORY',
  category,
  categoryName,
});

const receiveProductsByCategory = (category, products) => ({
  type: 'RECEIVE_PRODUCTS_CATEGORY',
  category,
  products,
});

const errorProductsByCategory = error => ({
  type: 'ERROR_PRODUCTS_CATEGORY',
  error,
});

export const fetchProductsByCategory = (category, categoryName) => {
  return function (dispatch) {
    dispatch(requestProductsByCategory(category, categoryName));
    dispatch(resetFilter());

    return fetch(`/products/sublevel/${category}`)
      .then(
        response => response.json(),
        error => dispatch(errorProductsByCategory(error)),
      )
      .then(json => dispatch(receiveProductsByCategory(category, json)));
  };
};

const requestSearchProducts = query => ({
  type: 'REQUEST_SEARCH_PRODUCTS',
  query,
});

const receiveSearchProducts = (query, products) => ({
  type: 'RECEIVE_SEARCH_PRODUCTS',
  query,
  products,
});

const errorSearchProducts = error => ({
  type: 'ERROR_SEARCH_PRODUCTS',
  error,
});

export const fetchSearchProducts = (category, query) => {
  if (category === -1) {
    return function (dispatch) {
      dispatch(requestSearchProducts());
      const q = '/products';
      return fetch(q)
        .then(
          response => response.json(),
          error => dispatch(errorSearchProducts(error)),
        )
        .then(json =>
          dispatch(receiveSearchProducts(
            query,
            json.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
          )));
    };
  }
  return function (dispatch) {
    dispatch(requestSearchProducts());
    const q = `/products/sublevel/${category}/search?name=${query}`;
    return fetch(q)
      .then(
        response => response.json(),
        error => dispatch(errorSearchProducts(error)),
      )
      .then(json => dispatch(receiveSearchProducts(query, json)));
  };
};

const requestSort = (by, desc) => ({
  type: 'REQUEST_SORT',
  by,
  desc,
});

const receiveSort = products => ({
  type: 'RECEIVE_SORT',
  products,
});

const errorSort = error => ({
  type: 'ERROR_SORT',
  error,
});

export const fetchSort = (category, by, desc) => {
  return function (dispatch) {
    dispatch(requestSort(by, desc));
    const q = `/products/sublevel/${category}/order?by=${by}&desc=${desc}`;
    return fetch(q)
      .then(
        response => response.json(),
        error => dispatch(errorSort(error)),
      )
      .then(json => dispatch(receiveSort(json)));
  };
};

export const addProduct = (id, quantity, product) => ({
  type: 'ADD_PRODUCT',
  id,
  quantity,
  product,
});

export const editProduct = (id,quantity, product) => ({
  type: 'EDIT_PRODUCT',
  id,
  quantity,
  product,
});

export const toggleProduct = product => ({
  type: 'TOGGLE_PRODUCT',
  product,
});

export const setSortName = sortName => ({
  type: 'SET_SORT_NAME',
  sortName,
});

export const setFilterName = filterName => ({
  type: 'SET_FILTER_NAME',
  filterName,
});

export const setDesc = desc => ({
  type: 'SET_DESC',
  desc,
});

export const resetFilter = () => ({
  type: 'RESET_FILTER',
});

export const showFilter = () => ({
  type: 'SHOW_FILTER',
});

export const toggleCart = () => ({
  type: 'TOGGLE_CART',
});

export const deleteProduct = product => ({
  type: 'DELETE_PRODUCT',
  product,
});

export const deleteProducts = () => ({
  type: 'DELETE_PRODUCTS',
});

export const setTitle = title => ({
  type: 'SET_TITLE',
  title,
});

export const setCategoryFilter = id => ({
  type: 'SET_CATEGORY_FILTER',
  id,
});

export const setPriceFilter = (min, max) => ({
  type: 'SET_PRICE_FILTER',
  min,
  max,
});

export const requestAvaibility = available => ({
  type: 'REQUEST_AVAIBILITY',
});

export const receiveAvailability = products => ({
  type: 'RECEIVE_AVAIBILITY',
  products,
});

export const errorAvailability = error => ({
  type: 'ERROR_AVAIBILITY',
  error,
});

export const fetchAvailability = (category, available) => {
  return function (dispatch) {
    dispatch(requestAvaibility(available));
    let q;
    if (available) {
      q = `/products/sublevel/${category}/available`;
    } else {
      q = `/products/sublevel/${category}`;
    }
    return fetch(q)
      .then(
        response => response.json(),
        error => dispatch(errorAvailability(error)),
      )
      .then(json => dispatch(receiveAvailability(json)))
  }
};

const requestMinMax = () => ({
  type: 'REQUEST_MIN_MAX',
});

const receiveMinMax = products => ({
  type: 'RECEIVE_MIN_MAX',
  products,
});

export const fetchMinMax = (category, filter, min, max, minPrice, maxPrice) => {
  return function (dispatch) {
    dispatch(requestMinMax());
    let q = `/products/sublevel/${category}?min_${filter}=${min}&max_${filter}=${max}`;
    if (filter === 'quantity') {
      q += `&min_price=${minPrice}&max_price=${maxPrice}`;
    }
    console.log(q);
    return fetch(q)
      .then(response => response.json())
      .then(json => dispatch(receiveMinMax(json)));
  }
}

const requestStats = () => ({
  type: 'REQUEST_STATS',
});

const receiveStats = (product) => ({
  type: 'RECEIVE_STATS',
  product,
});

export const fetchStats = () => {
  return function (dispatch) {
    dispatch(requestStats());
    let queries = [
      '/products/min/price',
      '/products/min/quantity',
      '/products/max/price',
      '/products/max/quantity',
    ];
    const res = queries.map(q=> {
      fetch(q)
        .then(response => response.json())
        .then(json => dispatch(receiveStats(json)));
    });
  }
}

export const setStockFilter = (min, max) => ({
  type: 'SET_STOCK_FILTER',
  min,
  max,
});

