import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";
import HeaderMenu from "./components/header/Header.jsx";
import MainContent from "./components/content/MainContent.jsx";
import * as d3 from "d3";
const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {
    categories:[],
    products:[],
    data: [],
    availableProducts: [],
    number_available: 0,
    cart_products: [],
    grandTotal:0,
    users:[],

  }
  componentDidMount(){
    // this.getProducts();
    fetch('/categories')
      .then(res => res.json())
      .then(categories => this.setState({ categories }));
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products, data:products }));
    fetch('/products/available')
      .then(res => res.json())
      .then(availableProducts => this.setState({ 
        availableProducts,
        number_available: availableProducts.length,
        }));
      

    
  }
  addCartProduct = (product,quantity) => {
    let totalCost = quantity * Number(product.price.replace("$","").replace(",",""));
    console.log("addCartProduct")
    product.order = quantity; 
    product.totalCost = totalCost
    this.setState({
      grandTotal: this.state.grandTotal+=totalCost
    })
    product.totalCostFormat = "$"+totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    console.log(product);
    this.state.cart_products.push(product)
  }
  removeCartProducts = () => {
    console.log("remove cart_products")
    this.setState({
      cart_products: [],
    })
  }
  getMinMaxPrice = () => {

    let maxPrice = ( d3.max(this.state.data.map(function(d){return Number(d.price.replace("$","").replace(",",""));})) );
    let minPrice = ( d3.min(this.state.data.map(function(d){return Number(d.price.replace("$","").replace(",",""));})) );
    this.setState({
      minPrice: minPrice,
      maxPrice: maxPrice,
    })
  }
  getMinMaxQuantity = () => {
    let maxQuantity = ( d3.max(this.state.data.map(function(d){return d.quantity;})) );
    let minQuantity = ( d3.min(this.state.data.map(function(d){return d.quantity;})) );
    this.setState({
      minQuantity: minQuantity,
      maxQuantity: maxQuantity,
    })
  }
  getProducts = () => {
    d3.json("data/products.json", (err,products) => {
      if(err) return;
      let availableProducts = products.filter((d) => {
        return d.available === true
      })
      
      this.setState({ 
        products: products,
        data:products,
        availableProducts: availableProducts,
        number_available: availableProducts.length,
      });
      this.getMinMaxPrice();
      this.getMinMaxQuantity();
    })
  };
  filterData = (ids) => {
    let filteredProducts = this.state.data.filter((d) => {
      return d.sublevel_id === ids[ids.length-1]
    })
    this.setState({
      products:filteredProducts
    })

  }
  filterByName = (name) => {
      let filteredProducts = this.state.products.filter((d) => {
        return d.name.toLowerCase().includes(name.toLowerCase());
      })
      this.setState({
        products:filteredProducts
      })
    }
  filterAvailable = (check) => {
    if(check){
    this.setState({
      products:this.state.availableProducts
    })
    }else {
      this.setState({
        products:this.state.data
      })
    }

  }
  filterByPrice = (values) => {
    let filteredProducts = this.state.data.filter((d) =>{
      let p = Number(d.price.replace("$","").replace(",",""))
      return p >= values[0] && p <= values[1]
    })
    this.setState({
      products: filteredProducts,
    })
  }
  filterByStock = (n) => {
    let filteredProducts = this.state.data.filter((d) =>{
      return d.quantity >= n[0] && d.quantity <= d[1]
    })
    this.setState({
      products: filteredProducts,
    })
  }
  orderByPrice = (order) => {
    let sorted = this.sortByKey(this.state.products,"price",true);
    this.setState({
      products: sorted,
    })
  }
  sortByKey = (array, key,parseNumber) => {
    console.log(array)
    return array.sort(function(a, b) {
      var x,y;
      x = a[key];
      y = b[key];
      if(parseNumber){
        x = Number(a[key].replace("$","").replace(",",""));
        y = Number(b[key].replace("$","").replace(",",""));
        console.log(x,y)
      }
      
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      
    });
  }
  orderByAvailibity = (order) => {
    let sorted = this.sortByKey(this.state.products,"available");
    this.setState({
      products: sorted,
    })
  }
  orderByStock = (order) => {
    let sorted = this.sortByKey(this.state.products,"quantity");
    this.setState({
      products: sorted,
    })
  }
  orderByName = (order) => {
    let sorted = this.sortByKey(this.state.products,"name");
    this.setState({
      products: sorted,
    })
  }
  
  
  render() {
    return (
      <div>
        <Layout>
        
          <Header className="header-container"> 
            {this.state.categories!==0?
            <HeaderMenu 
              grandTotal={this.state.grandTotal}
              removeCartProducts={this.removeCartProducts}
              cart_products={this.state.cart_products}
              filterData={this.filterData}
              categories={this.state.categories} >
            </HeaderMenu>:''
            }
          </Header>
        
          
          <Layout>
            <Content>
              <MainContent
                addCartProduct={this.addCartProduct}
                minPrice={this.state.minPrice}
                maxPrice={this.state.maxPrice}
                minQuantity={this.state.minQuantity}
                maxQuantity={this.state.maxQuantity}
                number_available={this.state.number_available}
                filterByName={this.filterByName} 
                filterAvailable={this.filterAvailable}
                filterByPrice={this.filterByPrice}
                filterByStock={this.filterByStock}
                orderByPrice={this.orderByPrice}
                orderByName={this.orderByName}
                orderByQuantity={this.orderByQuantity}
                orderByA={this.orderByAvailibity}
                products={this.state.products}>
              </MainContent>
            </Content>
          </Layout>
          <Footer className="footer"> 
            El Baratón
          </Footer>
        </Layout>
      </div>    
    );
  }
}

export default App;