import React from 'react'
import { Row, Col, Icon } from 'antd'
import MenuComponent from './MenuComponent'
import './menu.css'
const HeaderComponent = ({ dispatch }) => {
	return (
		<div className="menu">
			<Row>
				<Col align="center" span={2}>
					<Icon type="shop" />
				</Col>

				<Col align="center" span={20}>
					<MenuComponent />
				</Col>

				<Col align="center" span={2}>
					<Icon type="shopping-cart" />
				</Col>
			</Row>
		</div>
	)
}

export default HeaderComponent