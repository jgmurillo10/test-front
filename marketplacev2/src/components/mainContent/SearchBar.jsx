import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';
import FilterComponent from './FilterComponent';
import { showFilter, fetchSearchProducts } from '../../actions';

const Search = Input.Search;
const SearchBar = ({
  displayFilter,
  category,
  setFilter,
  search,
}) => {
  const filter = () => (
    <Icon style={{ cursor: 'pointer' }} onClick={() => setFilter()} type="filter" />
  );
  return (
    <div style={{ margin: '1em' }}>
      <Search
        addonAfter={filter()}
        placeholder="Buscar productos..."
        onSearch={value => search(category, value)}
      />
      {displayFilter ? <FilterComponent /> : ''}
    </div>
  );
};

const mapStateToProps = state => ({
  displayFilter: state.displayFilter,
  category: state.products.category,
});

const mapDispatchToProps = dispatch => ({
  setFilter: () => dispatch(showFilter()),
  search: (category, query) => dispatch(fetchSearchProducts(category, query)),
});

SearchBar.propTypes = {
  displayFilter: PropTypes.bool.isRequired,
  category: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
