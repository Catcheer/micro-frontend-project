import React, {  useState ,useEffect} from 'react';


import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { Outlet } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
// import useCurrentLocation from './hooks/useCurrentLocation.js';
import useMenu from './hooks/useMenu.jsx'

const { Header, Content, Sider } = Layout;

let menuItems  = useMenu().menuItems


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current,setCurrent] = useState('/')
  let path = useLocation().pathname
  useEffect(()=>{
   
    setCurrent(path)
  },[path])


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleOnClickMenu =({ item, key, keyPath, domEvent })=>{
    console.log(item)
    console.log(key)
    console.log(keyPath)
    console.log(domEvent)
    navigate(key)
    setCurrent(key)
  }
console.log('currentcurrentcurrentcurrentcurrent',current)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu openKeys={['/procuct']} theme="dark" selectedKeys={[current]} defaultSelectedKeys={['/']} mode="inline" items={menuItems}  onClick={handleOnClickMenu}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb items={[{ title: 'sample'} ,{title:'test'}]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
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