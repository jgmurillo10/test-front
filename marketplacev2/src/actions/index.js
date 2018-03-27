export const addProduct = (id, quantity, product) => ({
  type: 'ADD_PRODUCT',
  id,
  quantity,
  product,
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