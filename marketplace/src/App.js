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
      this.setState({ categories: categories });
    })
  }
  getProducts = () => {
    d3.json("data/products.json", (err,products) => {
      if(err) return;
      this.setState({ products: products});
    })
  };
  getSubLevels = (category) => {
      console.log(category)
      if(!category.sublevels){
        return 1;
      }
      else{
        category.sublevels.map((c)=>{
          return this.getSubLevels(c)+1;
        })
      }

  };
  getCategoriesLevels = (categories,i) => {
    categories.forEach((c) => {
      if(!c.level){
        c.level = i;
        if (c.sublevels) {
          this.getCategoriesLevels(c.sublevels,i++);
        }
        else{
          return;
        }
      }
      
    })
    console.log(categories);
    
  }
  render() {
    return (
      <div>
        <Layout>
        
          <Header className="header-container"> 
            {this.state.categories!==0?
            <HeaderMenu categories={this.state.categories} ></HeaderMenu>:''
            }
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