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
      return d.sublevel_id === ids[0]
    })
    console.log(this.state.products)
    this.setState({
      products:filteredProducts
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