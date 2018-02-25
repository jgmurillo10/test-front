import React, { Component } from "react";
import { Menu, Icon, Cascader, Input } from "antd";
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
  componentDidMount(){

  }
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  }
  renderMenu = () => {
    this.props.categories.map((d,i)=>{
                  return (<Menu.Item key={d.id}>{d.name}</Menu.Item>)              
    })
  }
  onChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className="header">
        {/*<div className="header-logo">
                  <Icon className="header-icon" type="shop" />
                  <h3>EL</h3>
                </div>*/}
        
        <div className="header-menu">
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
          >
            {this.props.categories.length!==0?
              this.props.categories.map((d,i)=>{
                  return (<Menu.Item key={d.id}>

                    <Cascader key={d.id} options={d.children} onChange={this.onChange} placeholder={d.label} />

                    </Menu.Item>)  
                
                
              })
              : ""}
          
           
          </Menu>
        </div>
        {/*<div className="header-cart">
                  <Icon type="shopping-cart" />
                </div>*/}
      </div>
         
    );
  };
};
HeaderMenu.propTypes = {
  categories: PropTypes.array.isRequired
};