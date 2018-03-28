import React from 'react';
import { Modal, Icon, Button, Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { toggleCart } from '../../actions';

const sizeIcon = {
  fontSize: 24,
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
};
const Cart = ({ visible, products, toggle }) => (
  <div>
    <Icon style={sizeIcon} onClick={toggle} type="shopping-cart" />
    <Modal
      width="80%"
      title="Mi carrito"
      visible={visible}
      onCancel={toggle}
      footer={[
        <Button key="back" onClick={toggle}>Seguir comprando</Button>,
        <Button key="submit" type="primary" onClick={toggle} disabled={products.length === 0}>
          Comprar todo
        </Button>,
      ]}
    >
      {
        products.length === 0 ? (<p>Aún no tienes nada en tu carrito, sigue comprando</p>) : ''
      }
      <Row gutter={16}>
        {
          products.map((p,i) => (
            <Col key={p.id} span={4} md={6} sm={12} xs={24}>
              <Card
                key={p.id}
                title={p.name}
                extra={[<Icon key={p.id} type="delete" />, <Icon key={i} type="edit" />]}
              >
                <p>{p.order} unidades</p>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Modal>
  </div>
);

const mapStateToProps = state => ({
  visible: state.cart.visible,
  products: state.cart.products,
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
