import React, { Component } from "react";
import { Menu, Icon, Cascader } from "antd";
import PropTypes from "prop-types";
import Cart from "./Cart.jsx";
export default class HeaderMenu extends Component {
  handleClick = (e) => {
    console.log(e)
    this.setState({
      current: e.key,
      lastSelf:false,
    });
  }
  onChange = (value,self) => {
    if(this.state.lastSelf){

    }
    console.log(value)
    console.log(self)
    // self[0].label = "";
    if(value.length!==0){
      this.props.setData(value[value.length-1]);  
      this.setState({lastSelf:self});
    }
  }

  render() {
    return (
      <div className="header effect-7">
        <div className="header-logo">
          <Icon  className="header-icon" type="shop" />
        </div>
        
        <div className="header-menu">
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
          >
            {this.props.categories.length!==0?
              this.props.categories.map((d,i)=>{
                  return (
                          <Menu.Item key={i}>
                            <Cascader key={d.id} options={d.children} onChange={(e, self)=>this.onChange(e,self)} placeholder={d.label} />
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