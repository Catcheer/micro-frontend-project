import React, { useState ,useEffect} from "react";

import { Menu, Layout ,Breadcrumb} from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];


import {useMenu,useFindOpenKeys} from '../hooks/useMenu.jsx'
import {useSelector} from 'react-redux'

import {selectSetting} from '../store/settingSlice'

const { Header, Content, Sider } = Layout;

export default function MainLayout() {
  const setting = useSelector(selectSetting)
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  let menuItems:MenuItem[] = useMenu().menuItems

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


  const handleOnOpenChange = (openKeys)=>{
    setCurOpenKeys(openKeys)
  }
  const handleOnClickMenu = ({ item, key, keyPath, domEvent }) => {
    navigate(key);
    setCurrent(key);
  };
  return (
    <Layout style={{ height: `calc(100vh - ${setting.navTopHight}px)` }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultOpenKeys={["/"]}
          openKeys={curOpenKeys}
          theme="dark"
          selectedKeys={[current]}
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={menuItems}
          onOpenChange={handleOnOpenChange}
          onClick={handleOnClickMenu}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ padding: '10px 0px' }} items={breadList} />
        <div
            style={{
              padding: '20px 10px',
           
              background: 'white',
            }}
          >
          <Outlet />
          {/* <div>outlet</div> */}
        </div>
        </Content>
      </Layout>
    </Layout>
  );
}
