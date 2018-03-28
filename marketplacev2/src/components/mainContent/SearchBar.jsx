import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon, message } from 'antd';
import FilterSortComponent from './FilterSortComponent';
import { showFilter, fetchSearchProducts } from '../../actions';

const Search = Input.Search;
const SearchBar = ({
  displayFilter,
  category,
  setFilter,
  search,
}) => {
  const filter = () => (
    <Icon
      style={{ cursor: 'pointer' }}
      onClick={
        () => {
          if (category !== -1) {
            setFilter();
          } else {
            message.error('Sólo puedes filtrar luego de seleccionar una categoría.');
          }
        }
      }
      type="filter"
    />
  );
  return (
    <div style={{ margin: '1em' }}>
      <Search
        addonAfter={filter()}
        placeholder="Buscar productos..."
        onSearch={value => search(category, value)}
      />
      {(displayFilter && category !== -1) ? <FilterSortComponent /> : ''}
    </div>
  );
};

const mapStateToProps = state => ({
  displayFilter: state.filter.displayFilter,
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
