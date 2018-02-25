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
  }
  componentDidMount(){
    this.getCategories();
    this.getProducts();
  }
  getCategories = () => {
    d3.json("data/categories.json", (err,categories) => {
      if (err) {return};
      this.setState({ categories: categories });
    })
  }
  getProducts = () => {
    d3.json("data/products.json", (err,products) => {
      if(err) return;
      this.setState({ 
        products: products,
        data:products 
      });
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
  orderByQuantity = (order) => {
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
              filterData={this.filterData}
              categories={this.state.categories} >
            </HeaderMenu>:''
            }
          </Header>
        
          
          <Layout>
            <Content>
              <MainContent 
                orderByPrice={this.orderByPrice}
                orderByName={this.orderByName}
                orderByQuantity={this.orderByQuantity}
                orderByA={this.orderByAvailibity}
                products={this.state.products}>
              </MainContent>
            </Content>
          </Layout>
          <Footer className="footer">El Baratón </Footer>
        </Layout>
      </div>    
    );
  }
}

export default App;