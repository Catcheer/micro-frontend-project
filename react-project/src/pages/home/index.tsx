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
     欢迎来到学生管理系统
    </>
  );
}

export default Home;
