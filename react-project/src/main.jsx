import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyRoute from "./routes/router";

import { Provider } from "react-redux";
import store from "@/store/index.js";
import {setNavTopHight,setIsSubApp} from "@/store/settingSlice.js";

// import App from './App.tsx'

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

function render(props = {}) {
  
  const container = props.container;
  createRoot(
    container
      ? container.querySelector("#reactroot")
      : document.getElementById("reactroot")
  ).render(
    <StrictMode>
      <Provider store={store}>
        
        <MyRoute />
       
      </Provider>
    </StrictMode>
  );

  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("子应用render");
  } else {
    console.log("独立运行");
  }
}

renderWithQiankun({
  mount(props) {
    console.log("mounted");
    let {listener,changeNavTopHight} =props
    if(listener){
     listener((mainAppState)=>{
       console.log("子应用监听到主应用状态变化",mainAppState)
       store.dispatch(setNavTopHight(mainAppState.setting.navTopHight))
     })
    }
    if(changeNavTopHight){
      store.subscribe(()=>{
        let state = store.getState()
        changeNavTopHight(state.setting.navTopHight)
      })
    }
    store.dispatch(setIsSubApp(true))
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount() {
    console.log("unmount");
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  store.dispatch(setNavTopHight(0))
  store.dispatch(setIsSubApp(false))
  render({});
}
