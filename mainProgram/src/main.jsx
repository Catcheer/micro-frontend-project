import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerMicroApps, start } from 'qiankun';



registerMicroApps([
  {
    name: 'react-project',
    entry: '//localhost:3001/app-react',
    container: '#container',
    activeRule: '/app-react',
  },
  {
    name: 'vue-project',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/app-vue',
  },

]);
// 启动 qiankun
start();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
