import React, { Component } from "react";
import { Menu, Icon, Cascader } from "antd";
import PropTypes from "prop-types";
import Cart from "./Cart.jsx";
export default class HeaderMenu extends Component {
  handleClick = (e,f) => {
    this.setState({
      current: e.key,
    });
  }
  onChange = (value,self) => {
    if(value.length!==0){
      this.props.setData(value[value.length-1]);  
      this.props.selectMenu(value);
    }
  }
  displayRender = (label) => {
    return label[label.length - 1];
  }
  render() {
    return (
      <div className="header effect-7">
        <div className="header-logo">
          <Icon type="shop" />
        </div>
        
        <div className="header-menu">
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            onChange={this.onChangeMenu}
          >
            {this.props.categories.length!==0?
              this.props.categories.map((d,i)=>{
                  return (
                          <Menu.Item key={i}>
                            <Cascader key={d.id} defaultValue={[]}  options={d.children} displayRender={this.displayRender} showSearch expandTrigger="hover" onChange={(e, self)=>this.onChange(e,self)} placeholder={d.label} />
                          </Menu.Item>
                          )  
                
                
              })
              : ""}
          
           
          </Menu>
        </div>
        <div className="header-cart">
            <Cart
              changeOrder={this.props.changeOrder}
              deleteItem={this.props.deleteItem}
              grandTotal={this.props.grandTotal}
              removeCartProducts={this.props.removeCartProducts}
              cart_products={this.props.cart_products}
            />
        </div>
      </div>
         
    );
  };
};
HeaderMenu.propTypes = {
  categories: PropTypes.array.isRequired
};