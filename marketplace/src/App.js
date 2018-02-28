import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";
import HeaderMenu from "./components/header/Header.jsx";
import MainContent from "./components/content/MainContent.jsx";
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
    let totalCost = quantity * product.price;
    console.log("addCartProduct")
    product.order = quantity; 
    product.totalCost = totalCost
    let actual_cost = this.state.grandTotal;
    this.setState({
      grandTotal: actual_cost+=totalCost,
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
      let query = `/products/sublevel/${this.state.sublevel_id}/available`;
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({ products }));
    }else {
      let query = `/products/sublevel/${this.state.sublevel_id}`;
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({ products }));
    }

  }
  filterBy = (values_price, values_quantities) => {
    let query = `/products/sublevel/${this.state.sublevel_id}?min_price=${values_price[0]}&max_price=${values_price[1]}&min_quantity=${values_quantities[0]}&max_quantity=${values_quantities[1]}`
    console.log(query)
    fetch(query)
      .then(res => res.json())
      .then(products => this.setState({products}));
  }

  orderBy = (by,desc) => {
    console.log(by,desc);
      let query = `/products/sublevel/${this.state.sublevel_id}/order?by=${by}&desc=${desc}`;
      console.log(query)
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({ products }));
  }
  setData = (sublevel_id) =>{
      //get all the products from the same sublevel_id
      let query = `/products/sublevel/${sublevel_id}`;
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({ products,sublevel_id:sublevel_id }));
      //get all the available products
      let query_ava = `/products/sublevel/${sublevel_id}/available`
      fetch(query_ava)
        .then(res => res.json())
        .then(availableProducts => this.setState({availableProducts,number_available:availableProducts.length}));
      let query_min_quantity =`/products/sublevel/${sublevel_id}/stats/min?attribute=quantity`;
      let query_min_price =`/products/sublevel/${sublevel_id}/stats/min?attribute=price`;
      let query_max_quantity =`/products/sublevel/${sublevel_id}/stats/max?attribute=quantity`;
      let query_max_price =`/products/sublevel/${sublevel_id}/stats/max?attribute=price`;
      fetch(query_min_quantity)
        .then(res => res.json())
        .then(p => this.setState({minQuantity:p.quantity}));
      fetch(query_min_price)
        .then(res => res.json())
        .then(p => this.setState({minPrice:p.price}));
      fetch(query_max_quantity)
        .then(res => res.json())
        .then(p => this.setState({maxQuantity:p.quantity}));
      fetch(query_max_price)
        .then(res => res.json())
        .then(p => {
          this.setState({maxPrice:p.price})
          console.log(p.price)
        });
      
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
                filterBy={this.filterBy}
                orderBy={this.orderBy}
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