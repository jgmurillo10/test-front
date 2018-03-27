import React from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;
const Products = ({ products }) => {
  return (
    <Row>
      {
        products.map(p => (
          <Col key={p.id} span={4} md={6} sm={12} xs={24} >
            <Card
              style={{ margin: '1em' }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={p.name}
                description={p.price}
              />
            </Card>
          </Col>
        ))
      }
    </Row>
  )
};

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
