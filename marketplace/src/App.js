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
    // fetch('/products/available')
    //   .then(res => res.json())
    //   .then(availableProducts => this.setState({ 
    //     availableProducts,
    //     number_available: availableProducts.length,
    //     }));
    fetch('/products/min/price')
      .then(res => res.json())
      .then(minPrice => this.setState({ minPrice }));
    fetch('/products/max/price')
      .then(res => res.json())
      .then(maxPrice => this.setState({ maxPrice }));
    fetch('/products/min/quantity')
      .then(res => res.json())
      .then(minQuantity => this.setState({ minQuantity }));
    fetch('/products/max/quantity')
      .then(res => res.json())
      .then(maxQuantity => this.setState({ maxQuantity }));
    
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
  

  setData = (sublevel_id) =>{
      fetch(`/products/sublevel/${sublevel_id}`)
        .then(res => res.json())
        .then(products => this.setState({ products }));
  }
  
  render() {
    return (
      <div>
        <Layout>
        
          <Header className="header-container"> 
            {this.state.categories!==0?
            <HeaderMenu 
              setData={this.setData}
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
              {this.state.products.length !== 0 ?
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
              :
              <div className="banner">

                Bienvenido a tu tienda, para ver nuestros productos selecciona una categoría en el menú superior.

              </div>

              }
              
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