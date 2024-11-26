import React, {  useState ,useEffect} from 'react';


import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { Outlet } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";

import {useMenu,useFindOpenKeys} from './hooks/useMenu.jsx'
import type { MenuProps } from 'antd';
import { before } from 'node:test';
type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current,setCurrent] = useState('/')
  // let [menuItems,setMenuItems] = useState<MenuItem[]>([])
  let menuItems:MenuItem[] = useMenu().menuItems
  

  console.log('menuItems',menuItems)

  let path = useLocation().pathname

   let openkeys = useFindOpenKeys(path)
  let openKeyItems =   openkeys.slice(0,openkeys.length-1).map(item=>item.key)

   let [curOpenKeys,setCurOpenKeys]=useState(openKeyItems)
  

   let breadList = openkeys.map(item=>{return {title:item.label}})

  useEffect(()=>{
    setCurrent(path)
    let openkeys = useFindOpenKeys(path)
    let openKeyItems =   openkeys.slice(0,openkeys.length-1).map(item=>item.key)
    setCurOpenKeys(openKeyItems)
  },[path])


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleOnClickMenu =({ item, key, keyPath, domEvent })=>{
 
    navigate(key)
    setCurrent(key)
  }

  const handleOnOpenChange = (openKeys)=>{
    setCurOpenKeys(openKeys)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultOpenKeys={['/']} openKeys={curOpenKeys} theme="dark" selectedKeys={[current]} defaultSelectedKeys={['/']} mode="inline" items={menuItems} onOpenChange={handleOnOpenChange}  onClick={handleOnClickMenu}/>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ padding: '10px 0px' }} items={breadList} />
          <div
            style={{
              padding: '20px 10px',
              minHeight: 880,
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