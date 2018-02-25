import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Input, AutoComplete, Card, Slider, Checkbox, Button } from 'antd';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const { Meta } = Card;
const dataSource = [{
  title: '话题',
  children: [{
    title: 'AntDesign',
    count: 10000,
  }, {
    title: 'AntDesign UI',
    count: 10600,
  }],
}, {
  title: '问题',
  children: [{
    title: 'AntDesign UI 有多好',
    count: 60100,
  }, {
    title: 'AntDesign 是啥',
    count: 30010,
  }],
}, {
  title: '文章',
  children: [{
    title: 'AntDesign 是一个设计语言',
    count: 100000,
  }],
}];
const options = dataSource.map(group => (
	  <OptGroup
	    key={group.title}
	    label={renderTitle(group.title)}
	  >
	    {group.children.map(opt => (
	      <Option key={opt.title} value={opt.title}>
	        {opt.title}
	        <span className="certain-search-item-count">{opt.count} 人 关注</span>
	      </Option>
	    ))}
	  </OptGroup>
	)).concat([
	  <Option disabled key="all" className="show-all">
	    <a
	      href="https://www.google.com/search?q=antd"
	      target="_blank"
	      rel="noopener noreferrer"
	    >
	      查看所有结果
	    </a>
	  </Option>,
	]);
	function renderTitle(title) {
	  return (
	    <span>
	      {title}
	      <a
	        style={{ float: 'right' }}
	        href="https://www.google.com/search?q=antd"
	        target="_blank"
	        rel="noopener noreferrer"
	      >更多
	      </a>
	    </span>
	  );
	}
export default class MainContent extends Component {
	
	Complete =() => {
	  return (
	    <div className="certain-category-search-wrapper" style={{ width: 250 }}>
	      <AutoComplete
	        className="certain-category-search"
	        dropdownClassName="certain-category-search-dropdown"
	        dropdownMatchSelectWidth={false}
	        dropdownStyle={{ width: 300 }}
	        size="large"
	        style={{ width: '100%' }}
	        dataSource={options}
	        placeholder="input here"
	        optionLabelProp="value"
	      >
	        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
	      </AutoComplete>
	    </div>
	  );
	}
	onChangeSlider = (value) => {
	  console.log('onChange: ', value);
	}
	renderTitle = (title) => {
	  return (
	    <span>
	      {title}
	      <a
	        style={{ float: 'right' }}
	        href="https://www.google.com/search?q=antd"
	        target="_blank"
	        rel="noopener noreferrer"
	      >更多
	      </a>
	    </span>
	  );
	}

	onAfterChangeSlider = (value) => {
	  console.log('onAfterChange: ', value);
	}
	onChangeCheckBox = (e) => {
	  console.log(`checked = ${e.target.checked}`);
	}
	render(){
		return (
				<div className="main-content">

					<div className="main-search">
						{this.Complete()}

					</div>
					<div className="main-filter">
						<div className="main-filter-order">
							<Card title="Ordenar resultados"  style={{  }}>
							    <Button>Precio <Icon type="up" /> <Icon type="down" /></Button>
								<Button>Disponibilidad <Icon type="up" /> <Icon type="down" /></Button>
								<Button>Cantidad <Icon type="up" /> <Icon type="down" /></Button>
								
							 </Card>
						</div>
						<div className="mail-filter-filer">

							<Card title="Filtrar resultados"  style={{  }}>
							   	<p>Disponibilidad</p>
								<Checkbox onChange={this.onChangeSlider}>Mostrar disponibles (#)</Checkbox>
								<p>Precio</p>
								<Slider range step={10} defaultValue={[20, 50]} onChange={this.onChangeSlider} onAfterChange={this.onAfterChangeSlider} />
								<p>Cantidad en stock</p>
								<Slider defaultValue={30} onChange={this.onChangeSlider} onAfterChange={this.onAfterChangeSlider} />

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
								    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
								    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
								  >
								    <Meta
								      title={d.name}
								      description={d.price}
								    />
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