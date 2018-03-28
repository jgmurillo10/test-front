import React from 'react';
import { Modal, Icon, Button } from 'antd';
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
      title="Mi carrito"
      visible={visible}
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
      {
        products.map(p=>(<p>{p.name} {p.order}</p>))
      }
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
