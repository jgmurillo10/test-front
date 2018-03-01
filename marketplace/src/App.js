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
    reset:false,
    keyFilter:-1,

  }
  componentDidMount(){
    // this.getProducts();
    this.onGetData();
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

  removeCartProducts = () => {
    this.setState({
      cart_products: [],
    }, ()=>{this.onSetData()})
  }
  filterByName = (name) => {
      let query = `/products/sublevel/${this.state.sublevel_id}/search?name=${name}`;
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({products}));
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
    let query = `/products/sublevel/${this.state.sublevel_id}?min_price=${values_price[0]}&max_price=${values_price[1]}&min_quantity=${values_quantities[0]}&max_quantity=${values_quantities[1]}`;
    fetch(query)
      .then(res => res.json())
      .then(products => this.setState({products}));
  }

  orderBy = (by,desc) => {
      let query = `/products/sublevel/${this.state.sublevel_id}/order?by=${by}&desc=${desc}`;
      fetch(query)
        .then(res => res.json())
        .then(products => this.setState({ products }));
  }
  setData = (sublevel_id) =>{
      //get all the products from the same sublevel_id
      this.setKeyFilter(-1);
      // this.setState({categories:[]},()=>{
      //    fetch('/categories')
      //   .then(res => res.json())
      //   .then(categories => this.setState({ categories }));
      // })
     
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
          this.setState({maxPrice:p.price});
        });
      
  } 
  deleteItem = (id) => {
    let del_pos = -1;
    this.state.cart_products.forEach((c,i)=>{
      if(c.id === id){
        del_pos = i;
      }
    })
    let new_arr = this.state.cart_products;
    new_arr.splice(del_pos,1);
    this.setState({
      cart_products: new_arr,
    }, ()=>{
      this.recalculateTotalCost();
      this.onSetData();
    })

  }
  getCartProduct = (id) => {
    let product;
    let index;
    this.state.cart_products.forEach((a,i)=>{
      if (a.id === id) {product=a;}
    })
    product.index = index;
    return product;
  }
  addCartProduct = (product,quantity) => {

    let totalCost = quantity * product.price;
    //check if the item is already in the array
    let found=false;
    let new_arr = this.state.cart_products;
    this.state.cart_products.forEach(p=>{
      if(product.id === p.id){
        product.order += quantity;
        product.totalCost = product.order*product.price;
        product.totalCostFormat= "$"+product.totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        new_arr[product.index] = product;
        this.setState({
          cart_products:new_arr,
        }, ()=>{this.recalculateTotalCost(); this.onSetData()})
        found=true;
      }
    })
    if(found) return false;
    product.order = quantity; 
    product.totalCost = totalCost;
    product.totalCostFormat = "$"+totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    new_arr.push(product)
    this.setState({
      cart_products:new_arr
    },()=>{
      this.recalculateTotalCost();
      this.onSetData();
    })
    return true;
  }
  changeOrder = (id, valueOrder) => {
    let p = this.getCartProduct(id);
    p.order = valueOrder;
    p.totalCost = p.order * p.price;
    p.totalCostFormat = "$"+p.totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    let new_arr = this.state.cart_products;
    new_arr[p.index] = p;

    this.setState({
      cart_products: new_arr,
    },()=>{
      this.recalculateTotalCost();
    })
    
  };
  recalculateTotalCost = (arr) => {
    let grand = 0;
    this.state.cart_products.forEach(c=>{
      grand+= c.price*c.order;
    })
    this.setState({
      grandTotal: grand,
    });
  }
  //function that sets local storage information
  onSetData = () => {
    console.log('onSetData')
    localStorage.setItem("cart_products", JSON.stringify(this.state.cart_products));
  }
  onGetData = () => {
    const cached = localStorage.getItem("cart_products");
    if(cached){
      this.setState({cart_products:JSON.parse(cached)}, ()=>{
        this.recalculateTotalCost();
      });
    }
    else {
      return false;
    }
  }
  setKeyFilter = (keyFilter) => {
    this.setState({keyFilter});
  }
  selectMenu = (values) => {
    this.setState({selectedMenu: values});
  }
  render() {
    return (
      <div>
        <Layout>
        
          <Header className="header-container"> 
            {this.state.categories!==0?
            <HeaderMenu 
              selectMenu={this.selectMenu}
              changeOrder={this.changeOrder}
              deleteItem={this.deleteItem}
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
                <MainContent
                  reset={this.state.reset}
                  keyFilter={this.state.keyFilter}
                  setKeyFilter={this.setKeyFilter}
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
              
              
            </Content>
          </Layout>
          <Footer className="footer"> 
            <div>El Baratón</div>
          </Footer>
        </Layout>
      </div>    
    );
  }
}

export default App;