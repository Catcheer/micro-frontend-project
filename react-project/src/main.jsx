import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import MyRoute from "./routes/router";

import { Provider } from "react-redux";
import store from "@/store/index.js";
import { setNavTopHight, setIsSubApp } from "@/store/settingSlice.js";

// import App from './App.tsx'


function render(props = {}) {

  // const container = props.container;
  console.log(document.getElementById("reactroot"))
  createRoot(
     document.getElementById("reactroot")
  ).render(
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>

          <MyRoute />

        </Provider>
      </ConfigProvider>
    </StrictMode>
  );

 
}

render();