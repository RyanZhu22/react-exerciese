import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useStore } from '@/store'
import { useEffect } from 'react'

const { Header, Sider } = Layout


const GeekLayout = () => {
    const { pathname } = useLocation()
    const { userStore, loginStore } = useStore()

    useEffect(() => {
        userStore.getUserInfo()
    }, [userStore])
    
    const navigate = new useNavigate()
    const onConfirm = () => {
        loginStore.loginOut()
        navigate('/login')
    }
    
    return (
        <Layout>
        <Header className="header">
            <div className="logo" />
            <div className="user-info">
            <span className="user-name">{userStore.userInfo.name}</span>
            <span className="user-logout">
                <Popconfirm 
                    onConfirm={onConfirm}
                    title="Whether to confirm withdrawal?" 
                    okText="exit" 
                    cancelText="cancel">
                <LogoutOutlined /> Exit
                </Popconfirm>
            </span>
            </div>
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[pathname]}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item icon={<HomeOutlined />} key="/">
                <Link to='/'>Overview of data</Link>
                </Menu.Item>
                <Menu.Item icon={<DiffOutlined />} key="/article">
                <Link to='/article'>Content management</Link>
                </Menu.Item>
                <Menu.Item icon={<EditOutlined />} key="/publish">
                <Link to='/publish'>Publish article</Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="layout-content" style={{ padding: 20 }}>
                {/* 二级路由默认页面 */}
                <Outlet />
            </Layout>
        </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)