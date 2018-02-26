import React, { Component } from "react";
import { AutoComplete, Input, Icon, Button, Card, Slider, Checkbox } from 'antd';
export default class Filter extends Component {

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
		return(
			<div>
				<div className="main-search">
							<AutoComplete
						        dataSource={[]}
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
			</div>

		)
	}
}