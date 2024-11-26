import React,{useState,useEffect} from 'react'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


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

  return <Menu style={{borderBottom:'0px'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}


export default HeaderNav