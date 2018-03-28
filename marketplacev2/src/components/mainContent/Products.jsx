import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Row, Col, Modal } from 'antd';
import { connect } from 'react-redux';
import { addProduct, toggleProduct } from '../../actions';
import showConfirm from './Confirm';
import './spinner.css';

const { Meta } = Card;
const Products = ({ products, loading, visible, selected, addProductCart, toggleProduct }) => {
  return (
    <div>
      <h2 style={{ margin: '1em' }} >{`Mostrando ${products.length} productos`}</h2>
      <Row>
        {
          products.map(p => (
            <Col key={p.id} span={4} md={6} sm={12} xs={24} >
              <Card
                loading={loading}
                style={{ margin: '1em' }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[
                  <Icon
                    onClick={() => toggleProduct(p)}
                    type="ellipsis"
                  />,
                  <span disabled={!p.available}>
                    <Icon
                      onClick={() => showConfirm(p, addProductCart)}
                      type="shopping-cart"
                    />
                  </span>,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={p.name}
                  description={`$${p.price}`}
                />
                <br />
                <p>
                  {
                    p.available ?
                    (<span>Disponible <Icon type="check-circle-o" /> </span>)
                    :
                    (<span>No disponible <Icon type="close-circle-o" /> </span>)
                  }
                </p>
              </Card>
            </Col>
          ))
        }
      </Row>
      <Modal
        title={`Producto ${selected.name}`}
        visible={visible}
        onOk={toggleProduct}
        onCancel={toggleProduct}
      >
        <p>id: {selected.id}</p>
        <p>disponible
          {
            selected.available ?
            (<Icon type="check-circle-o" />) :
            (<Icon type="close-circle-o" />)
          }
        </p>
        <p>precio: $ {selected.price}</p>
        <p>cantidad: {selected.quantity} (en stock)</p>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.isFetching || state.categories.isFetching,
  visible: state.products.toggleProduct,
  selected: state.products.selected,
});

const mapDispatchToProps = dispatch => ({
  addProductCart: (p, q) => dispatch(addProduct(p.id, q, p)),
  toggleProduct: p => dispatch(toggleProduct(p)),
});

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired,
    sublevel_id: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    selected: PropTypes.object,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  addProductCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
