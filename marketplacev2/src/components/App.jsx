import { Layout } from 'antd';
import React from 'react';
import HeaderComponent from './header/HeaderComponent';
import MainContent from './mainContent/MainContent';

const { Header, Content } = Layout;
const App = () => (
  <div>
    <Layout>
      <Header style={{ backgroundColor: 'white' }}>
        <HeaderComponent />
      </Header>
      <Content>
        <MainContent />
      </Content>
    </Layout>
  </div>
);

export default App;
