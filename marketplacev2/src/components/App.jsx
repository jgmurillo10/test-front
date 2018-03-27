import { Affix, Layout, BackTop } from 'antd';
import React from 'react';
import HeaderComponent from './header/HeaderComponent';
import MainContent from './mainContent/MainContent';

const { Header, Content } = Layout;
const headerStyle = {
  margin: 0, padding: 0, backgroundColor: 'white', boxShadow: '0 10px 8px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.12)',
};
const App = () => (
  <div>
    <BackTop />
    <Layout>
      <Affix>
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
      </Affix>
      <Content>
        <MainContent />
      </Content>
    </Layout>
  </div>
);

export default App;
