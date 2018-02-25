import React, { Component } from "react";
import { Menu, Icon, Cascader, Input } from "antd";
import PropTypes from "prop-types";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class HeaderMenu extends Component {
  componentDidMount(){

  }
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.props.filterData(value);
  }

  render() {
    return (
      <div className="header effect-7">
        <div className="header-logo">
          <Icon className="header-icon" type="shop" />
        </div>
        
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
        <div className="header-cart">
                  <Icon type="shopping-cart" />
        </div>
      </div>
         
    );
  };
};
HeaderMenu.propTypes = {
  categories: PropTypes.array.isRequired
};