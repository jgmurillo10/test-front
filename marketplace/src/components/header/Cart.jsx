import React, { Component } from "react";
import { Icon, Modal, Button } from "antd";

export default class Cart extends Component {
	state = {
	    loading: false,
	    visible: false,
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
	}
	handleCancel = () => {
	  this.setState({ visible: false });
	}
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

			        		this.props.cart_products.map(p=>{
			        			return <p>{p}</p>
			        		})
			        		:
			        		<p>No has agregado nada a tu carrito</p>
			        	}
			        </Modal>
				</div>
			);
	};
};