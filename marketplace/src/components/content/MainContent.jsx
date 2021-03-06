import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Card, Modal, InputNumber, notification, Input } from 'antd';
import Filter from "./Filter.jsx";
const { Meta } = Card;
const Search = Input.Search;
let names = []
export default class MainContent extends Component {
	constructor(props){
		super(props)
		this.state = {
		    filteredProducts: [],
		    lastLength:0,
		    ModalText: 'Content of the modal',
		    visible: false,
		    confirmLoading: false,
		    maxUnits:1,
		    product:{},
		    units:1,
		    value:''
		}
	}
	componentDidUpdate(){
		names=[]
	}
	onSelect = (value) => {
	  this.props.filterByName(value);
	}
	handleSearch = (value) => {
	    this.setState({value});
	    this.props.filterByName(value);
	}
	onChange = (value) => {
	  this.setState({
	  	units:value,
	  })
	}

	showModal = () => {
	  this.setState({
	    visible: true,
	  });
	}
	handleOk = () => {
	  this.setState({
	    ModalText: 'Agregando al carrito',
	    confirmLoading: true,
	  });
	  this.props.addCartProduct(this.state.product, this.state.units)
	  setTimeout(() => {
	    this.setState({
	      visible: false,
	      confirmLoading: false,
	    });
	  }, 10);

	  this.openNotificationWithIcon('success',"El producto fue agregado correctamente a tu carrito.")
	}
	handleCancel = () => {
	  this.setState({
	    visible: false,
	  });
	}
	openNotificationWithIcon = (type,msg) => {
	  notification[type]({
	    message: 'Hey',
	    description: msg,
	  });
	};
	handleAddProductCart = (e) => {
		if(e.available){
			this.setState({
				ModalText: `Vas a agregar ${e.name} a tu carrito. Hay ${e.quantity} unidades disponibles. Por favor ingresa el número de unidades que deseas agregar`,
				maxUnits: e.quantity,
				product: e,
			})
			this.showModal();
		}else{
			this.openNotificationWithIcon('warning',"Este producto no está disponible.")
		}

	}
	onChangeQuery = (e) => {
	    this.setState({ value: e.target.value });
	  }
	render(){
		const suffix = this.state.value!==''? <Icon className="icon-suffix" type="close-circle" onClick={()=>this.handleSearch('')} /> :'';
		const { visible, confirmLoading, ModalText, maxUnits } = this.state;
		this.props.products.forEach(p=>{
			names.push(p.name);
		})
		return (
				<div className="main-content">
					<div className="main-search">
						{
							// this.props.products.length!==0?
								<Search suffix={suffix} value={this.state.value} onChange={this.onChangeQuery} placeholder="Buscar productos..." enterButton="Buscar" onSearch={value => this.props.filterByName(value)} size="large" />
							// : 
							// 	''
						}
					</div>
					<Filter
						keyFilter={this.props.keyFilter}
						setKeyFilter={this.props.setKeyFilter}
						reset={this.props.reset}
						filterBy={this.props.filterBy}
						filterAvailable={this.props.filterAvailable}
						minPrice={this.props.minPrice}
						maxPrice={this.props.maxPrice}
						minQuantity={this.props.minQuantity}
						maxQuantity={this.props.maxQuantity}
						orderBy={this.props.orderBy}
						names={this.names}
						number_available={this.props.number_available}
						products={this.props.products}
					>
					</Filter>
					{
						<div className="card-container">
							{this.props.products.map(d=>{
								return (

										<Card
											key={d.id}
											className="card"
										    style={{ width: 300 }}
										    cover={<img className="card-image" alt="example" src="img/package.jpg" />}
										    actions={[]}
										  >
										    <Meta
										      title={d.name}
										      description={"$"+d.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
										    />
										    {"quantity "+d.quantity}
										    {"available "+d.available}

										    <Icon className="card-add" product={d.id} onClick={()=>this.handleAddProductCart(d)} type="shopping-cart" />
										  </Card>

									)
							})}
						</div>
					}
					
					<div>
						<Modal title="Agregar al carrito"
				          visible={visible}
				          onOk={this.handleOk}
				          confirmLoading={confirmLoading}
				          onCancel={this.handleCancel}
				        >
				        	<div className="modal-add">
				        		<div>
				        			<img className="modal-img" alt="example" src="img/package.jpg" />
				        		</div>
				        		<div>
						          	<p>{ModalText}</p>
						           	<InputNumber type="number" min={1} max={maxUnits} defaultValue={1} onChange={this.onChange} />
				        		</div>
				        		
				        	</div>
				        </Modal>
				    </div>
				</div>
			);
	};
};

MainContent.propTypes = {
  products: PropTypes.array.isRequired
};