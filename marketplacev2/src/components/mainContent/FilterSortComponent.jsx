import React from 'react';
import { Row } from 'antd';
import Filter from './FilterSort/Filter';
import Sort from './FilterSort/Sort';

const FilterSortComponent = () => {
  const filterStyle = {
    backgroundColor: 'white',
    marginTop: '1em',
    padding: '1em',
    borderRadius: '0.5em',
  };
  return (
    <div style={filterStyle}>
      <Row type="flex" justify="center">
        <Sort />
        <Filter />
      </Row>
    </div>
  );
};

export default FilterSortComponent;
