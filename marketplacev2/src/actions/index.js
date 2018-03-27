import fetch from 'cross-fetch';

export const requestCategories = () => ({
  type: 'REQUEST_CATEGORIES',
});

export const receiveCategories = categories => ({
  type: 'RECEIVE_CATEGORIES',
  categories,
});

export const fetchCategories = () => {
  return function (dispatch) {
    dispatch(requestCategories());

    return fetch('/categories')
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(receiveCategories(json)));
  };
};

export const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

export const receiveProducts = products => ({
  type: 'RECEIVE_PRODUCTS',
  products,
});

export const fetchProducts = () => {
  return function (dispatch) {
    dispatch(requestProducts());

    return fetch('/products')
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(receiveProducts(json)));
  };
};

export const requestProductsByCategory = (category, categoryName) => ({
  type: 'REQUEST_PRODUCTS_CATEGORY',
  category,
  categoryName,
});

export const receiveProductsByCategory = (category, products) => ({
  type: 'RECEIVE_PRODUCTS_CATEGORY',
  category,
  products,
});

export const fetchProductsByCategory = (category, categoryName) => {
  return function (dispatch) {
    dispatch(requestProductsByCategory(category, categoryName));

    return fetch(`/products/sublevel/${category}`)
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(receiveProductsByCategory(category, json)));
  };
};

export const requestSearchProducts = query => ({
  type: 'REQUEST_SEARCH_PRODUCTS',
  query,
});

export const receiveSearchProducts = (query,products) => ({
  type: 'RECEIVE_SEARCH_PRODUCTS',
  query,
  products,
});

export const fetchSearchProducts = (category, query) => {
  if (category === '') {
    return function (dispatch) {
      dispatch(requestSearchProducts());
      let q = '/products';
      return fetch(q)
        .then(
          response => response.json(),
          error => console.log('An error ocurred', error),
        )
        .then(json => {
          dispatch(receiveSearchProducts(query,json.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))));
        });
    };
  }
  return function (dispatch) {
    dispatch(requestSearchProducts());
    let q = `/products/sublevel/${category}/search?name=${query}`;
    return fetch(q)
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(receiveSearchProducts(query,json)));
  };
};

export const addProduct = (id, quantity, product) => ({
  type: 'ADD_PRODUCT',
  id,
  quantity,
  product,
});

export const showFilter = () => ({
  type: 'SHOW_FILTER',
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

export const sortPrice = asc => ({
  type: 'SORT_PRICE',
  asc,
});

export const sortAvailable = asc => ({
  type: 'SORT_AVAILABLE',
  asc,
});

export const sortQuantity = asc => ({
  type: 'SORT_QUANTITY',
  asc,
});

export const sortName = asc => ({
  type: 'SORT_STOCK',
  asc,
});