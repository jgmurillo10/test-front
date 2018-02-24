import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Icon } from 'antd';
const { Meta } = Card;
export default class MainContent extends Component {
	render(){
		return (
				<div className="main-content">

					<div className="card-container">
					
					{this.props.products.map(d=>{
						return (

								<Card
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