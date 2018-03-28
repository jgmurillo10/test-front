import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Cascader } from 'antd';
import { connect } from 'react-redux';
import MenuComponent from './MenuComponent';
import Cart from './Cart';
import { fetchProducts, fetchProductsByCategory } from '../../actions';
import './menu.css';

const sizeIcon = {
  fontSize: 24,
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
};
const resetHeader = {
  margin: 0,
  padding: 0,
};
let value;
const getSublevelName = (arr, id) => {
  arr.forEach(d => {
    if (d.children) {
      getSublevelName(d.children, id);
    } else {
      if (d.value === id) {
        value = d;
        return d;
      }
    }
  });
};
const onChange = (e, fetchProducts, fetchProductsByCategory, categories) => {
  const sublevelId = e[e.length - 1];
  getSublevelName(categories, sublevelId);
  if (sublevelId) {
    fetchProductsByCategory(sublevelId, value.label);
  } else {
    fetchProducts();
  }

}
const HeaderComponent = ({ categories, fetchProducts, fetchProductsByCategory }) => (
  <div style={resetHeader}>
    <Row type="flex" justify="center" align="middle">
      <Col xs={0} sm={2} md={2} lg={2} xl={2}>
        <Icon onClick={() => fetchProducts()} style={sizeIcon} type="shop" />
      </Col>
      <Col xs={0} sm={20} md={20} lg={20} xl={20}>
        <MenuComponent />
      </Col>
      <Col xs={{ span: 0 }} sm={2} md={2} lg={2} xl={2}>
        <Cart />
      </Col>
    </Row>
    <Row type="flex" justify="space-between" align="middle">
      <Col xs={8} sm={0} md={0} lg={0} xl={0}>
        <Icon style={Object.assign({}, sizeIcon, { paddingTop: '0em' })} type="shop" onClick={() => fetchProducts()} />
      </Col>
      <Col xs={8} sm={0} md={0} lg={0} xl={0}>
        <Cascader
          options={categories}
          onChange={(e) => onChange(e,fetchProducts, fetchProductsByCategory, categories)}
          placeholder="Menu"
        />
      </Col>
      <Col xs={8} sm={0} md={0} lg={0} xl={0}  style={{ paddingTop: '0em' }}>
        <Cart />
      </Col>
    </Row>

  </div>
);

HeaderComponent.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories.items,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchProductsByCategory: (category, categoryName) => dispatch(fetchProductsByCategory(category, categoryName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
