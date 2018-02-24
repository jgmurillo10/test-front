import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import HeaderMenu from './components/header/Header.jsx';
const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="header"> 
            <HeaderMenu></HeaderMenu>
          </Header>
          <Layout>
            <Content className="content">main content</Content>
          </Layout>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </div>    
    );
  }
}

export default App;