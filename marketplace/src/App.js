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
    products:[]
  }
  componentDidMount(){
    this.getCategories();
    this.getProducts();
  }
  getCategories = () => {
    d3.json("data/categories.json", (err,categories) => {
      if (err) {return};
      this.setState({ categories: categories })
    })
  }
  getProducts = () => {
    d3.json("data/products.json", (err,products) => {
      if(err) return;
      console.log(products)
      this.setState({ products: products})
    })
  }
  render() {
    return (
      <div>
        <Layout>
        
          <Header className="header-container"> 
            <HeaderMenu categories={this.state.categories} ></HeaderMenu>
          </Header>
        
          
          <Layout>
            <Content>
              <MainContent products={this.state.products}>
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