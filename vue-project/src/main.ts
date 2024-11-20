import './assets/main.css'

import { createApp, type HtmlHTMLAttributes } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import {
    renderWithQiankun,
    qiankunWindow,
    type QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'

// let router = null
// let instance = null
// let history = null

let app :any

declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: boolean,
    __INJECTED_PUBLIC_PATH__BY__QIANKUN: string,
    }
}



function render(props:QiankunProps) {
    console.log('props----------------',props)
    const  container  = props.container as HTMLElement
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    
    app.mount(container?container.querySelector('#app'):'#app')
    
    if(qiankunWindow.__POWERED_BY_QIANKUN__){
        console.log('子应用render')
    }else{
        console.log('独立运行')
    }
    
}


renderWithQiankun({
    mount(props) {
        render(props)
    },
    bootstrap() {
        console.log('bootstrap')
    },
    unmount() {
        app.unmount()
    },
    update: function (props: QiankunProps): void | Promise<void> {
        throw new Error('Function not implemented.')
    }
})

if(!qiankunWindow.__POWERED_BY_QIANKUN__){
    render({})
}