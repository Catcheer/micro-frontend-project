import {useEffect} from "react";
import {useSelector} from 'react-redux'
import { selectSetting } from "./store/settingSlice";
import "./App.css";
import HeaderNav from './components/HeaderNav'

import MainRouter from "./routes/index";


function App() {
  let setting = useSelector(selectSetting)
  console.log(setting)

  useEffect(()=>{
    // console.log(window.location.pathname)
    if(window.location.pathname==='/'){
      window.location.href='/app-master'
    }
    
    
  },[])

  return (
    <div>
    
      <HeaderNav />
     
      <div className="content__wrapper" style={{paddingTop:setting.navTopHight }}>
       
          {/* 主应用路由 */}
          <MainRouter />
       
        {/* 子应用挂载点 */}
        <div id="container"></div>
      </div>
    </div>
  );
}

export default App;
