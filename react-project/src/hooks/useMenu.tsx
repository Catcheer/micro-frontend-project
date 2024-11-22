import React from 'react';

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  type MenuItem = Required<MenuProps>['items'][number];
  const  menuList = [
    {
      label:'首页',
      key:'/',
      icon:<PieChartOutlined />,
    },
    
    {
      label:'商品中心',
      key:'/procuct',
      icon:<UserOutlined />,
      children:[
        {
          label:'价格管理',
          key:'/productPriceManage',
        },
        {
          label:'图片管理',
          key:'/procuctImageManage',
        },
        {
          label:'评价管理',
          key:'/productCommentManage',
        }
      ]
    },
    {
      label:'Team111',
      key:'sub2',
      icon:<TeamOutlined />,
      children:[
        {
          label:'Team 1',
          key:'6',
        },
        {
          label:'Team 2',
          key:'8',
       
        }
      ]
    },
    {
      label:'Files',
      key:'9',
      icon:<FileOutlined />,
    },
    {
      label:'关于我们',
      key:'/about',
      icon:<DesktopOutlined />,
    },
  ]
  

export default function useMenu(){

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  function getMenuList(list){
    let arr :MenuItem[] =[]

    list.forEach((item:any)=>{
      if(item.children){
        item.children =getMenuList(item.children)
      }
      arr.push(getItem(item.label,item.key,item.icon,item.children))
    })

    return arr
}

  const items: MenuItem[] = getMenuList(menuList)

  return {menuList,menuItems:items}
}