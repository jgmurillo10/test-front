import React from 'react';
import { Row, Col, Icon } from 'antd';
import MenuComponent from './MenuComponent';
import './menu.css';

const sizeIcon = {
  fontSize: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  cursor: 'pointer',
};
const resetHeader = {
  margin: 0,
  padding: 0,
};
const HeaderComponent = () => {
  return (
    <div style={resetHeader}>
      <Row type="flex" justify="center" align="middle">
        <Col xs={0} sm={2} md={2} lg={2} xl={2}>
          <Icon style={sizeIcon} type="shop" />
        </Col>
        <Col xs={0} sm={20} md={20} lg={20} xl={20}>
          <MenuComponent />
        </Col>
        <Col xs={{ span: 0 }} sm={2} md={2} lg={2} xl={2}>
          <Icon style={sizeIcon} type="shopping-cart" />
        </Col>
      </Row>
      
      <Row>
        <Col xs={24} sm={0} md={0} lg={0} xl={0}>
          Responsive menu
        </Col>
      </Row>

    </div>
  );
};

export default HeaderComponent;
