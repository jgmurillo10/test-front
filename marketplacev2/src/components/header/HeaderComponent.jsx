import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';
import MenuComponent from './MenuComponent';
import { fetchProducts } from '../../actions';
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
const HeaderComponent = ({ dispatch }) => (
  <div style={resetHeader}>
    <Row type="flex" justify="center" align="middle">
      <Col xs={0} sm={2} md={2} lg={2} xl={2}>
        <Icon onClick={() => dispatch(fetchProducts())} style={sizeIcon} type="shop" />
      </Col>
      <Col xs={0} sm={20} md={20} lg={20} xl={20}>
        <MenuComponent />
      </Col>
      <Col xs={{ span: 0 }} sm={2} md={2} lg={2} xl={2}>
        <Icon style={sizeIcon} type="shopping-cart" />
      </Col>
    </Row>
    <Row type="flex" justify="space-between" align="middle">
      <Col xs={8} sm={0} md={0} lg={0} xl={0}>
        <Icon style={Object.assign({}, sizeIcon, { paddingTop: '1em' })} type="menu-fold" />
      </Col>
      <Col xs={8} sm={0} md={0} lg={0} xl={0}>
        <Icon style={Object.assign({}, sizeIcon, { paddingTop: '1em' })} type="shop" />
      </Col>
      <Col xs={8} sm={0} md={0} lg={0} xl={0}>
        <Icon style={Object.assign({}, sizeIcon, { paddingTop: '1em' })} type="shopping-cart" />
      </Col>
    </Row>

  </div>
);

HeaderComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(HeaderComponent);
