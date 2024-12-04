import { useState } from "react";
import { Button } from "antd";
// import reactLogo from '@/assets/app-react/react.svg'
// import viteLogo from '/vite.svg'
// import '../../App.css'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectSetting, setNavTopHight } from "@/store/settingSlice.js";
function Home() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  let { isSubApp, navTopHight } = useSelector(selectSetting);
  const dispatch = useDispatch();

  return (
    <>
      {isSubApp && (
        <div>
          <div>
            我是主应用传来的数据:{" "}
            <span style={{ fontSize: "20px" }}>{navTopHight}</span>
          </div>
          {/* 
            修改本应用的store内的 navTopHight值，
            main.jsx内监听 store变化，调用主应用传来的changeNavTopHight 方法，实现修改主应用导航栏高度
             if(changeNavTopHight){
      store.subscribe(()=>{
        let state = store.getState()
        changeNavTopHight(state.setting.navTopHight)
      })
    }
            */}
          <Button
            type="primary"
            onClick={() => {
              dispatch(setNavTopHight(navTopHight - 1));
            }}
          >
            修改主应用的数据 减
          </Button>
          <div style={{ height: "10px" }}></div>
          <Button
        type="primary"
        onClick={() => {
          // navigate("app-master/employee");
          window.location.href='./app-master/employee'
        }}
      >
        跳转到主应用组织架构/员工管理
      </Button>
      <div style={{ height: "10px" }}></div>
        </div>
      )}

      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          我是本地state数据 count is {count}
        </Button>
      </div>
      <div style={{ height: "10px" }}></div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/about");
        }}
      >
        跳转到本应用关于我们
      </Button>
    </>
  );
}

export default Home;
