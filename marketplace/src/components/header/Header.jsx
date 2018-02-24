import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Input } from 'antd';
import * as d3 from "d3";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderMenu extends Component {
  
  constructor(props){
    super(props);
    const categories = this.getCategories();
    this.state = {
      current: 'mail',
      categories: categories,
    }

  }
 
  getCategories = () => {
    d3.json("data/categories.json", function(err,data){
      if (err) {return};
      return data;
    })
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <h1>EL BARATÓN</h1>
        </div>
        <div className="header-search-bar">
          <Input placeholder="Search for products" />
        </div>
        <div className="header-menu">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
          
            <Menu.Item key="mail">
              <Icon type="mail" />Navigation One
            </Menu.Item>
            <Menu.Item key="app" disabled>
              <Icon type="appstore" />Navigation Two
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </Menu.Item>
          </Menu>
        </div>
      </div>
         
    );
  }
}

export default HeaderMenu;