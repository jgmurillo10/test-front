import React, { Component } from "react";
import { Icon, Modal, Button, Table, notification, Card, InputNumber } from "antd";
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
	onChange(id, value) {
	  this.props.changeOrder(id,value);
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
			          width="80%"
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
				        		<div className="cart-container">
				        			{this.props.cart_products.map(p=>{
				        				return (<Card className="cart-item" key={p.id} title={p.name} extra={<Icon className="pointer" onClick={()=>this.props.deleteItem(p.id)} type="close" />} style={{ width: 300 }}>
				        													    <p>{"$"+p.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} per unit</p>
				        													    <InputNumber size="small" min={1} max={p.quantity}  defaultValue={p.order} onChange={(value)=>this.onChange(p.id, value)} /> <span> units</span>
				        													    <p>{p.totalCostFormat}</p>
				        													  </Card>)
				        			})}
				        		</div>
				        		<div>
				        			<h4>Total Cost: {"$"+this.props.grandTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h4>
				        		</div>
			        		</div>
			        		:
			        		<p>No has agregado nada a tu carrito</p>
			        	}
			        </Modal>
				</div>
			);
	};
};