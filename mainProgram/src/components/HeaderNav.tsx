import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {selectSetting} from "../store/settingSlice.js";
import Logo from '../assets/app-react/react.svg'
import Profile from '../assets/profile_1.png'
import './nav.less'

const items: MenuItem[] = [
    {
      label: 'master-app',
      key: 'app-master',
      icon: <MailOutlined />,
    },
    {
      label: 'app-react',
      key: 'app-react',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'app-vue',
      key: 'app-vue',
      icon: <SettingOutlined />,
   
    },
    
  ];
function HeaderNav()  {
    const [current, setCurrent] = useState('app-master');
    let setting = useSelector(selectSetting)
    useEffect(()=>{
      let pathName = window.location.pathname
      console.log(pathName)
      let reg = /(\app\-[a-z]*)\/?.*/
      let result = pathName.match(reg)
       if(result){
        setCurrent(result[1])
       }
    },[])

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    window.history.pushState({key:`${e.key}`}, '', `/${e.key}`)
    setCurrent(e.key);
  };

  return <div className='header-nav' style={{height:setting.navTopHight+'px'}}>
    <div className='logo_wrap'>
      <img className='logo_img' src={Logo} alt="" /> <span className='logo_text'>XXXXX系统</span>
    </div>
    <Menu  style={{borderBottom:'0px',flex:1,display:'flex',alignItems:'center'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <div className='user_wrap'>
      <img className='user_img' src={Profile} alt="" />
    </div>
  </div>
}



export default HeaderNav