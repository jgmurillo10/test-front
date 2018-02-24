import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Input } from "antd";
import PropTypes from "prop-types";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class HeaderMenu extends Component {
      // for (var i = 0; i<categories.length; i++) {
      //   let a = categories[i];
      //   if(a.sublevels)
      //   for(var j = 0; j < a.sublevels.length;j++){

      //   }
      // }


       // <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
       //        <MenuItemGroup title="Item 1">
       //          <Menu.Item key="setting:1">Option 1</Menu.Item>
       //          <Menu.Item key="setting:2">Option 2</Menu.Item>
       //        </MenuItemGroup>
       //        <MenuItemGroup title="Item 2">
       //          <Menu.Item key="setting:3">Option 3</Menu.Item>
       //          <Menu.Item key="setting:4">Option 4</Menu.Item>
       //        </MenuItemGroup>
       //      </SubMenu>
       //      <Menu.Item key="alipay">
       //        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
       //      </Menu.Item>
  handleClick = (e) => {
    console.log("click ", e);
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
            mode="horizontal"
          >
            {this.props.categories?
              this.props.categories.map((d,i)=>{
                  return (<Menu.Item key={d.id}>{d.name}</Menu.Item>)  
                
                
              })
              : ""}
          
           
          </Menu>
        </div>
      </div>
         
    );
  };
};
HeaderMenu.propTypes = {
  categories: PropTypes.array.isRequired
};