import React, { Component } from "react";
import { Icon, Card, Slider, Checkbox } from 'antd';
export default class Filter extends Component {
	state = {
		selected: 'caret-',
		min:0,
		max:10000000,
		range_price:[],
		range_quantity:[],
	}
	handleClick = (key,attr,desc) => {
		this.props.orderBy(attr,desc);
		this.setState({key:key});
	}
	formatter = (value) => {
		value = "$"+value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
	  	return value;
	}
	onAfterChangeSlider = (range_price) => {
	  this.setState({range_price});
	  if(this.state.range_quantity.length===0){
	  	this.props.filterBy(range_price,[0,this.props.maxQuantity])
	  }else {
	  	this.props.filterBy(range_price,this.state.range_quantity)
	  }

	}
	onAfterChangeSliderStock = (range_quantity) => {
		this.setState({range_quantity});
		if(this.state.range_price.length===0){
		  	this.props.filterBy([0,this.props.maxPrice],range_quantity)
		  }else {
		  	this.props.filterBy(this.state.range_price,range_quantity)
		  }
	}
	onChangeCheckBox = (e) => {
	  this.props.filterAvailable(e.target.checked);
	}
	render(){
		return(
			<div>
				<div className="main-filter">
					<div className="main-filter-order">
						<Card title="Ordenar resultados"  style={{  }}>
							<div className="dimension">
								<div className="dimension-label">
									<p>Precio</p>
								</div>
								<div>
								    <Icon key={1} onClick={()=>this.handleClick(1,"price",false)} className="dimension-button" type={`${this.state.key===1?this.state.selected:""}down`} />
								    <Icon key={2} onClick={()=>this.handleClick(2,"price",true)} className="dimension-button" type={`${this.state.key===2?this.state.selected:""}up`}  />
							    </div>
							</div>

							<div className="dimension">
								<div className="dimension-label">
									<p>Disponibilidad</p>
								</div>
								<div>
								    <Icon key={3} onClick={()=>this.handleClick(3,"available",false)} className="dimension-button" type={`${this.state.key===3?this.state.selected:""}down`} />
								    <Icon key={4} onClick={()=>this.handleClick(4,"available",true)} className="dimension-button" type={`${this.state.key===4?this.state.selected:""}up`} />
							    </div>
							</div>
							<div className="dimension">
								<div className="dimension-label">
									<p>Cantidad</p>
								</div>
								<div>
								    <Icon key={5} onClick={()=>this.handleClick(5,"quantity",false)} className="dimension-button" type={`${this.state.key===5?this.state.selected:""}down`} />
								    <Icon key={6} onClick={()=>this.handleClick(6,"quantity",true)} className="dimension-button" type={`${this.state.key===6?this.state.selected:""}up`}  />
							    </div>
							</div>
							<div className="dimension">
								<div className="dimension-label">
									<p>Nombre</p>
								</div>
								<div>
								    <Icon key={7} onClick={()=>this.handleClick(7,"name",false)} className="dimension-button" type={`${this.state.key===7?this.state.selected:""}down`} />
								    <Icon key={8} onClick={()=>this.handleClick(8,"name",true)} className="dimension-button" type={`${this.state.key===8?this.state.selected:""}up`} />
							    </div>
							</div>
							
						 </Card>
					</div>
					<div className="main-filter-filter">
						<Card title="Filtrar resultados"  style={{  }}>
						   	<p>Disponibilidad</p>
							<Checkbox onChange={this.onChangeCheckBox}>Mostrar disponibles ({this.props.number_available} de {this.props.products.length})</Checkbox>
							<p>Precio</p>
							<Slider tipFormatter={this.formatter} range   min={0} max={+this.props.maxPrice} step={+0.01} onChange={this.onChangeSlider} onAfterChange={this.onAfterChangeSlider} />
							<p>Cantidad en stock</p>
							<Slider range  min={0} max={+this.props.maxQuantity} step={+0.01} onChange={this.onChangeSliderStock} onAfterChange={this.onAfterChangeSliderStock} />
						</Card>
						
					</div>
				</div>
			</div>

		)
	}
}