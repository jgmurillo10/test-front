import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Products from './Products';
import SearchBar from './SearchBar';

const MainContent = ({ title }) => (
  <div style={{ margin: '1em', minHeight: '90vh' }}>
    <h1 style={{ textAlign: 'center' }}>{title}</h1>
    <SearchBar />
    <Products />
  </div>
);

const mapStateToProps = state => ({
  title: state.products.title,
});

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MainContent);
