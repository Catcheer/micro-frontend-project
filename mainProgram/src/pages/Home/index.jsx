import {useSelector,useDispatch} from 'react-redux'

import {selectSetting,setNavTopHight} from '../../store/settingSlice'
import { Button } from 'antd';


function Home() {
  const setting = useSelector(selectSetting)
  let dispatch = useDispatch()
  return (
    <div>
      <h1>这是主应用的首页</h1>
      <div>navTopHight:
        <span style={{fontSize:'20px'}}>{setting.navTopHight}</span>
      </div>
      <div>
      <Button type="primary" onClick={()=>{
        dispatch(setNavTopHight(setting.navTopHight+1))
      }}>加</Button>
      <div style={{height:'10px'}}></div>
      {/* app-react/procuctImageManage */}
      <Button type="primary" onClick={()=>{
        window.location.href='./app-react/procuctImageManage'
      }}>跳转到react应用商品中心/价格管理页面</Button>
      </div>
    </div>
  );
}


export default Home;