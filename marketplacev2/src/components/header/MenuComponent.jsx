import React from 'react'
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MenuComponent = ({ dispatch }) => {
	return (
		<div>
			<Menu
		        onClick={()=>console.log('click')}
		        mode="horizontal"
		        style={{'border':'1px solid black'}}
		      >
		         <SubMenu title={<span>Bebidas</span>}>
		          <MenuItemGroup title="Item 1">
		            <Menu.Item key="setting:1">Option 1</Menu.Item>
		            <Menu.Item key="setting:2">Option 2</Menu.Item>
		          </MenuItemGroup>
		          <MenuItemGroup title="Item 2">
		            <Menu.Item key="setting:3">Option 3</Menu.Item>
		            <Menu.Item key="setting:4">Option 4</Menu.Item>
		          </MenuItemGroup>
		        </SubMenu>
		        <SubMenu title={<span>Desayunos</span>}>
		          <MenuItemGroup title="Item 1">
		            <Menu.Item key="setting:1">Option 1</Menu.Item>
		            <Menu.Item key="setting:2">Option 2</Menu.Item>
		          </MenuItemGroup>
		          <MenuItemGroup title="Item 2">
		            <Menu.Item key="setting:3">Option 3</Menu.Item>
		            <Menu.Item key="setting:4">Option 4</Menu.Item>
		          </MenuItemGroup>
		        </SubMenu>
		         <SubMenu title={<span>Almuerzos</span>}>
		          <MenuItemGroup title="Item 1">
		            <Menu.Item key="setting:1">Option 1</Menu.Item>
		            <Menu.Item key="setting:2">Option 2</Menu.Item>
		          </MenuItemGroup>
		          <MenuItemGroup title="Item 2">
		            <Menu.Item key="setting:3">Option 3</Menu.Item>
		            <Menu.Item key="setting:4">Option 4</Menu.Item>
		          </MenuItemGroup>
		        </SubMenu>
		        <SubMenu title={<span>Vinos</span>}>
		          <MenuItemGroup title="Item 1">
		            <Menu.Item key="setting:1">Option 1</Menu.Item>
		            <Menu.Item key="setting:2">Option 2</Menu.Item>
		          </MenuItemGroup>
		          <MenuItemGroup title="Item 2">
		            <Menu.Item key="setting:3">Option 3</Menu.Item>
		            <Menu.Item key="setting:4">Option 4</Menu.Item>
		          </MenuItemGroup>
		        </SubMenu>
		      </Menu>
		</div>
	)
}

export default MenuComponent