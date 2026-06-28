import React, { useState, useEffect } from 'react';


import { Breadcrumb, Layout, Menu, theme, Button, message } from 'antd';

import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useMenu, useFindOpenKeys } from './hooks/useMenu.jsx'
import { userLogout } from '@/api/login';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;
import { selectSetting } from "@/store/settingSlice.js";
import { useSelector } from "react-redux";


const App: React.FC = () => {
  let setting = useSelector(selectSetting)
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('/')
  // let [menuItems,setMenuItems] = useState<MenuItem[]>([])
  let menuItems: MenuItem[] = useMenu().menuItems


  console.log('menuItems', menuItems)

  let path = useLocation().pathname

  let openkeys = useFindOpenKeys(path)
  let openKeyItems = openkeys.slice(0, openkeys.length - 1).map(item => item.key)

  let [curOpenKeys, setCurOpenKeys] = useState(openKeyItems)


  let breadList = openkeys.map(item => { return { title: item.label } })

  useEffect(() => {
    setCurrent(path)
    let openkeys = useFindOpenKeys(path)
    let openKeyItems = openkeys.slice(0, openkeys.length - 1).map(item => item.key)
    setCurOpenKeys(openKeyItems)
  }, [path])


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleOnClickMenu = ({ item, key, keyPath, domEvent }) => {

    navigate(key)
    setCurrent(key)
  }

  const handleOnOpenChange = (openKeys) => {
    setCurOpenKeys(openKeys)
  }

  const handleLogout = async () => {
    try {
      const data = await userLogout()
      if (data?.code === 200) {
        localStorage.removeItem('token')
        const redirect = encodeURIComponent(window.location.pathname + window.location.search)
        console.log('redirect----', redirect)

        window.location.href = `/app-react/login?redirect=${redirect}`
        return
      }
      message.error(data?.message || '退出登录失败')
    } catch (error) {
      message.error('退出登录失败')
    }
  }

  const hideMenu = () => {
    return current === '/login' || current === '/register'
  }

  return (
    <Layout style={{ minHeight: `calc(100vh - ${setting?.navTopHight || 0}px)` }}>
      {!hideMenu() && (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu defaultOpenKeys={['/']} openKeys={curOpenKeys} theme="dark" selectedKeys={[current]} defaultSelectedKeys={['/']} mode="inline" items={menuItems} onOpenChange={handleOnOpenChange} onClick={handleOnClickMenu} />
        </Sider>
      )}
      <Layout>
        {/* {!hideMenu() && (
          <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            
          </Header>
        )} */}
        <Content style={{ margin: '0 16px' }}>
         {
!hideMenu() && (
   <div className='mb-4 bg-white px-8 flex justify-between items-center' >
            <Breadcrumb style={{ padding: '10px 0px' }} items={breadList} />
            <Button type="link" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
)
         }
          <div
            style={{
            
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;