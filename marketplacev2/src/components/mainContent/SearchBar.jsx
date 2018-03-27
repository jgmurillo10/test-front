import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import FilterComponent from './FilterComponent';

const Search = Input.Search;
class SearchBar extends Component {
  state = {
    showFilter: false,
  }
  filter = () => {
    return (
      <Icon onClick={() => this.setState({showFilter: !this.state.showFilter})} type="filter" />
    )
  }
  render() {
    return (
      <div style={{ marginBottom: 16 }}>
        <Search
          addonAfter={this.filter()}
          placeholder="Buscar productos..."
          onSearch={value => console.log(value)}
        />
        {this.state.showFilter?<FilterComponent />:''}
      </div>
    );
  }
  
};

export default SearchBar;
