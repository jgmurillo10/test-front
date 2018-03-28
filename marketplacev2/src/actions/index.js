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

export const setSortName = filterName => ({
  type: 'SET_SORT_NAME',
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

export const deleteProduct = id => ({
  type: 'DELETE_PRODUCT',
  id,
});

export const buyCart = () => ({
  type: 'BUY_CART',
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

export const setAvaibilityFilter = available => ({
  type: 'SET_AVAIBILITY_FILTER',
  available,
});

export const setStockFilter = (min, max) => ({
  type: 'SET_STOCK_FILTER',
  min,
  max,
});

