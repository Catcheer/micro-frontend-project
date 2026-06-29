import React, { useState, useEffect } from 'react';


import { Breadcrumb, Layout, Menu, theme, Button, message, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useMenu, useFindOpenKeys } from './hooks/useMenu.jsx'
import { userLogout } from '@/api/login';
import { getLoginRedirectPath } from '@/utils/loginRedirect';
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

  const [username, setUsername] = useState('用户');

  useEffect(() => {
    const loadUsername = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          setUsername(userObj.nickname || userObj.username || '用户');
        } else {
          setUsername('用户');
        }
      } catch (e) {
        console.error('Failed to parse user info', e);
        setUsername('用户');
      }
    };

    loadUsername();
    window.addEventListener('auth-change', loadUsername);
    return () => {
      window.removeEventListener('auth-change', loadUsername);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const data = await userLogout()
      if (data?.code === 200) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('roles')
        localStorage.removeItem('permissions')
        window.dispatchEvent(new Event('auth-change'))
        window.location.href = getLoginRedirectPath('/app-react/login')
        return
      }
      message.error(data?.message || '退出登录失败')
    } catch (error) {
      message.error('退出登录失败')
    }
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleOnClickMenu = ({ item, key, keyPath, domEvent }: any) => {
    navigate(key)
    setCurrent(key)
  }

  const handleOnOpenChange = (openKeys: string[]) => {
    setCurOpenKeys(openKeys)
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
        <Content style={{}}>
          {
            !hideMenu() && (
              <div className='mb-4 bg-white px-8 flex justify-between items-center' >
                <Breadcrumb style={{ padding: '10px 0px' }} items={breadList} />
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                  <div className="flex items-center gap-1 hover:text-blue-500 transition-colors" style={{ padding: '4px 8px', cursor: 'pointer' }}>
                    <UserOutlined />
                    <span className="font-medium">{username}</span>
                    <DownOutlined style={{ fontSize: '10px' }} />
                  </div>
                </Dropdown>
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