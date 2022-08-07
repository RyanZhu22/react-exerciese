import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
const { Sider, Content } = Layout;

function App() {
  return (
    <Layout id='app'>
      <Header></Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <footer>Respect | Copyright &copy; 2022 Author</footer>
    </Layout>
  )
}


export default App
