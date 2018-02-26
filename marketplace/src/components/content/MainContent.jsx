import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Card } from 'antd';
import Filter from "./Filter.jsx";
const { Meta } = Card;
let names = []
export default class MainContent extends Component {
	constructor(props){
		super(props)
		this.state = {
		    filteredProducts: [],
		    lastLength:0,
		}
	}
	componentDidUpdate(){
		names=[]
	}
	onSelect = (value) => {
	  console.log('onSelect', value);
	  this.props.filterByName(value);
	}
	handleSearch = (value) => {
	    console.log(value)
	    this.props.filterByName(value);
	}
	addCartProduct = (e) => {
		console.log(e.target.value)
	}
	render(){
		// const marks = {
		//   this.props.min: `${this.props.min}`,
		//   this.props.max: `${this.props.max}`
		// };
		this.props.products.forEach(p=>{
			names.push(p.name);
		})
		return (
				<div className="main-content">

					<Filter
						filterByPrice={this.props.filterByPrice}
						filterAvailable={this.props.filterAvailable}
						filterByStock={this.props.filterByStock}
						orderByPrice={this.props.orderByPrice}
						orderByA={this.props.orderByA}
						orderByQuantity={this.props.orderByQuantity}
						orderByName={this.props.orderByName}
						names={this.names}
						number_available={this.props.number_available}
						products={this.props.products}
					>
					</Filter>

					<div className="card-container">
					
					{this.props.products.map(d=>{
						return (

								<Card
									key={d.id}
									className="card"
								    style={{ width: 300 }}
								    cover={<img alt="example" src="img/food-blur.png" />}
								    actions={[<Icon product={d.id} onClick={()=>this.props.addCartProduct(d)} type="plus-circle-o" />, <Icon type="ellipsis" />]}
								  >
								    <Meta
								      title={d.name}
								      description={d.price}
								    />
								    {"quantity "+d.quantity}
								    {"available "+d.available}
								  </Card>

							)
					})}
					</div>
				</div>
			);
	};
};

MainContent.propTypes = {
  products: PropTypes.array.isRequired
};