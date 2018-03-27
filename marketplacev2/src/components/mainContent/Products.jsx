import React from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { addProduct } from '../../actions';

const { Meta } = Card;
const Products = ({ products, addProduct }) => {
  return (
    <div>
      <h2>{`Mostrando ${products.length} productos`}</h2>
      <Row>
        {
          products.map(p => (
            <Col key={p.id} span={4} md={6} sm={12} xs={24} >
              <Card
                style={{ margin: '1em 0' }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[
                  <Icon type="ellipsis" />,
                  <Icon
                    onClick={() => addProduct(p)}
                    type="shopping-cart"
                  />
                ]}
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
    </div>
  )
};

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  addProduct: p => dispatch(addProduct(p.id,1, p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
