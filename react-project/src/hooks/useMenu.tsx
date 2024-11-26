import React ,{ useEffect}from 'react';

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
       
      ]
    },
    {
      label:'订单管理',
      key:'/order',
      icon:<TeamOutlined />,
      children:[
        {
          label:'订单列表',
          key:'/orderList',
        }
      ]
    },
    {
      label:'关于我们',
      key:'/about',
      icon:<DesktopOutlined />,
    },
   
  ]
  

export  function useMenu(){

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


export const useFindOpenKeys = (path:string)=>{
  if(!path) return ['/']
  if(!menuList || !menuList.length) return  ['/']
  let obj = menuList.find(item=>item?.key===path)
  if(obj){  //在第一层  无需递归查找
    return  [obj]
  }
 
  let arr:MenuItem[] =[]
  let founded =false
 function getKey(list:MenuItem[],path:string){
  
   for(let i=0;i<list.length;i++){
   
     let current = list[i]
  
     function inner(item:any,path:string){
     
      arr.push(item)
      if(item.key===path){
        founded = true
        return
        
      }else if(item.children && item.children.length>0){
        let children = item.children
        getKey(children,path)
      }else {
        if(i===list.length-1){
          arr=[]
        }else{
          arr.pop()
        }
        
      }

     }
     inner(current,path)
     if(founded){
       break
     }
   }
  
 }

 getKey(menuList,path)
//  arr.pop()
console.log('arr',arr)
return arr
 
  
}