import React, { Component } from "react";
import { Icon, Modal, Button, Table, notification } from "antd";
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <p>{text}</p>,
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
}, {
  title: 'Units',
  dataIndex: 'order',
  key: 'order',
},{
  title: 'Total',
  dataIndex: 'totalCostFormat',
  key: 'totalCostFormat',
}];
export default class Cart extends Component {
	state = {
	    loading: false,
	    visible: false,
	    grandTotal: 0,
	}
	showModal = () => {
	    this.setState({
	      visible: true,
	    });
	}
	handleOk = () => {
	  this.setState({ loading: true });
	  this.props.removeCartProducts();
	  setTimeout(() => {
	    this.setState({ loading: false, visible: false });
	  }, 1000);
	  this.openNotificationWithIcon('success',"Has comprado todos los elementos de tu carrito, vuelve pronto.")

	}
	handleCancel = () => {
	  this.setState({ visible: false });
	}
	openNotificationWithIcon = (type,msg) => {
	  notification[type]({
	    message: 'Hey',
	    description: msg,
	  });
	};
	render(){
		const { visible, loading } = this.state;
		let disabled = this.props.cart_products.length === 0 ? true : false;
		return(
				<div>
					<Icon onClick={this.showModal} type="shopping-cart" />
					<Modal
			          visible={visible}
			          title="Carrito de compras"
			          onOk={this.handleOk}
			          onCancel={this.handleCancel}
			          footer={[
			            <Button key="back" onClick={this.handleCancel}>Seguir comprando</Button>,
			            <Button disabled={disabled} key="submit" type="primary" loading={loading} onClick={this.handleOk}>
			              Comprar
			            </Button>,
			          ]}
			        >
			        	<h2>Productos</h2>
			        	{this.props.cart_products.length !== 0 ?

			        		<div>
				        		<Table columns={columns} dataSource={this.props.cart_products} />
				        		<p>{`Costo total $${this.props.grandTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}</p>
			        		</div>
			        		:
			        		<p>No has agregado nada a tu carrito</p>
			        	}
			        </Modal>
				</div>
			);
	};
};