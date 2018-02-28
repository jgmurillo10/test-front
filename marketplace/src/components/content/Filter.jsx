import React, { Component } from "react";
import { AutoComplete, Input, Icon, Button, Card, Slider, Checkbox } from 'antd';
export default class Filter extends Component {
	state = {
		selected: 'caret-',
	}
	handleClick = (key,attr,desc) => {
		this.props.orderBy(attr,desc);
		this.setState({key:key});
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
									<div className="dimension">
										<div className="dimension-label">
											<p>Precio</p>
										</div>
										<div>
										    <Icon key={1} onClick={()=>this.handleClick(1,"price",false)} className="dimension-button" type={`${this.state.key==1?this.state.selected:""}down`} />
										    <Icon key={2} onClick={()=>this.handleClick(2,"price",true)} className="dimension-button" type={`${this.state.key==2?this.state.selected:""}up`}  />
									    </div>
									</div>

									<div className="dimension">
										<div className="dimension-label">
											<p>Disponibilidad</p>
										</div>
										<div>
										    <Icon key={3} onClick={()=>this.handleClick(3,"available",false)} className="dimension-button" type={`${this.state.key==3?this.state.selected:""}down`} />
										    <Icon key={4} onClick={()=>this.handleClick(4,"available",true)} className="dimension-button" type={`${this.state.key==4?this.state.selected:""}up`} />
									    </div>
									</div>
									<div className="dimension">
										<div className="dimension-label">
											<p>Cantidad</p>
										</div>
										<div>
										    <Icon key={5} onClick={()=>this.handleClick(5,"quantity",false)} className="dimension-button" type={`${this.state.key==5?this.state.selected:""}down`} />
										    <Icon key={6} onClick={()=>this.handleClick(6,"quantity",true)} className="dimension-button" type={`${this.state.key==6?this.state.selected:""}up`}  />
									    </div>
									</div>
									<div className="dimension">
										<div className="dimension-label">
											<p>Nombre</p>
										</div>
										<div>
										    <Icon key={7} onClick={()=>this.handleClick(7,"name",false)} className="dimension-button" type={`${this.state.key==7?this.state.selected:""}down`} />
										    <Icon key={8} onClick={()=>this.handleClick(8,"name",true)} className="dimension-button" type={`${this.state.key==8?this.state.selected:""}up`} />
									    </div>
									</div>
									
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