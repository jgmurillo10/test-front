import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Input, Card, Slider, Checkbox, Button, AutoComplete } from 'antd';
import * as d3 from "d3";
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const { Meta } = Card;
let names = []



export default class MainContent extends Component {
	constructor(props){
		super(props)
		this.state = {
		    dataSource: [],
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
	onChangeSlider = (value) => {
	  this.props.filterByPrice(value);
	}
	formatter = (value) => {
	  return `$${value}`;
	}
	onChangeSliderStock = (value) => {
	  console.log('onChangeStock: ', value);
	 
	  this.props.filterByStock(value);
	}
	
	onAfterChangeSlider = (value) => {
	  console.log('onAfterChange: ', value);
	}
	onAfterChangeSliderStock = (value) => {
	  console.log('onAfterChange: ', value);
	}
	onChangeCheckBox = (e) => {
	  console.log(`checked = ${e.target.checked}`);
	  this.props.filterAvailable(e.target.checked);
	}
	render(){
		// const marks = {
		//   this.props.min: `${this.props.min}`,
		//   this.props.max: `${this.props.max}`
		// };
		const { dataSource } = this.state;
		this.props.products.map(p=>{
			names.push(p.name);
		})
		return (
				<div className="main-content">

					<div className="main-search">
						<AutoComplete
					        dataSource={names}
					        style={{ width: 200 }}
					        onSelect={this.onSelect}
					        onSearch={this.handleSearch}
					        placeholder="Search products"
					     >
					       <Input suffix={<Icon type="search" />} />
					     </AutoComplete>

					</div>
					<div className="main-filter">
						<div className="main-filter-order">
							<Card title="Ordenar resultados"  style={{  }}>
							    <Button className="order-buttons" onClick={this.props.orderByPrice}>Precio <Icon type="up" /> <Icon type="down" /></Button>
								<Button className="order-buttons" onClick={this.props.orderByA}>Disponibilidad <Icon type="up" /> <Icon type="down" /></Button>
								<Button className="order-buttons" onClick={this.props.orderByQuantity}>Cantidad <Icon type="up" /> <Icon type="down" /></Button>
								<Button className="order-buttons" onClick={this.props.orderByName}>Nombre <Icon type="up" /> <Icon type="down" /></Button>
								
							 </Card>
						</div>
						<div className="main-filter-filter">

							<Card title="Filtrar resultados"  style={{  }}>
							   	<p>Disponibilidad</p>
								<Checkbox onChange={this.onChangeCheckBox}>Mostrar disponibles ({this.props.number_available} de {this.props.products.length})</Checkbox>
								<p>Precio</p>
								<Slider tipFormatter={this.formatter}  range min={this.props.minPrice} max={this.props.maxPrice} step={10} onChange={this.onChangeSlider} onAfterChange={this.onAfterChangeSlider} />
								<p>Cantidad en stock</p>
								<Slider defaultValue={[0,300]} range min={this.props.minQuantity} max={this.props.maxQuantity} step={1} onChange={this.onChangeSliderStock} onAfterChange={this.onAfterChangeSliderStock} />

							 </Card>
							
						</div>
					</div>

					<div className="card-container">
					
					{this.props.products.map(d=>{
						return (

								<Card
									key={d.id}
									className="card"
								    style={{ width: 300 }}
								    cover={<img alt="example" src="img/food-blur.png" />}
								    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
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