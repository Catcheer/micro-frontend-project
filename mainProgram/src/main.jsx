import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerMicroApps, start } from 'qiankun';

import { Provider } from "react-redux";
import store from "./store/index.js";
import {setNavTopHight} from "./store/settingSlice.js";


const listener = (callback)=>{
  console.log('--------------------', store.getState())
  callback && callback(store.getState())
}


let cancelListener = store.subscribe(listener)
console.log(cancelListener)


const NAV_TOP_HEIGHT = 45;
store.dispatch(setNavTopHight(NAV_TOP_HEIGHT));

const VITE_SUBPROGRAM_ENTRY = import.meta.env.VITE_SUBPROGRAM_ENTRY
console.log('process----------------------------',VITE_SUBPROGRAM_ENTRY)
registerMicroApps([
  {
    name: 'react-project',
    entry: `//${VITE_SUBPROGRAM_ENTRY}:9003/app-react`,
    container: '#container',
    activeRule: '/app-react',
    props: {
       listener,
       changeNavTopHight:(height)=>{
        store.dispatch(setNavTopHight(height));
       }
    },
  },
  {
    name: 'vue-project',
    entry: `//${VITE_SUBPROGRAM_ENTRY}:9004//app-vue`,
    container: '#container',
    activeRule: '/app-vue',
    props: {
      listener,
      changeNavTopHight:(height)=>{
       store.dispatch(setNavTopHight(height));
      }
   },
  },

]);
// 启动 qiankun
start();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
