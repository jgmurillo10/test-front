import React from 'react';
import { connect } from 'react-redux';
import Products from './Products';
import SearchBar from './SearchBar';

const MainContent = ({ title }) => {
  return (
    <div style={{ margin: '1em', minHeight: '90vh' }}>
      <h1>{title}</h1>
      <SearchBar />
      <Products />
    </div>
  );
};

const mapStateToProps = state => ({
  title: state.title,
});

export default connect(mapStateToProps)(MainContent);