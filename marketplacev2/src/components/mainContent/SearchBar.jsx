import React from 'react';
import { Input, Icon } from 'antd';

const Search = Input.Search;
const filter = () => {
  return (
    <Icon onClick={() => console.log('onClickFilter')} type="filter" />
  );
};
const SearchBar = () => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Search
        addonAfter={filter()}
        placeholder="Buscar productos..."
        onSearch={value => console.log(value)}
      />
      <div>
      </div>
    </div>
  );
};

export default SearchBar;
