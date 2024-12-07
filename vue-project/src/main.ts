import "./assets/main.css";

import { createApp, type HtmlHTMLAttributes,watch } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";

import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

// let router = null
// let instance = null
// let history = null

let appRoot: any;

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
    __INJECTED_PUBLIC_PATH__BY__QIANKUN: string;
  }
}

function render(props: QiankunProps) {
//   let { setSetting } = useSetting();
let rootStore = createPinia()
console.log('rootStore---------------------',rootStore.state.value)
  console.log("props----------------", props);
  const container = props.container as HTMLElement;
  appRoot = createApp(App);
  appRoot.use(rootStore);
  appRoot.use(ElementPlus);
  appRoot.use(router);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    appRoot.component(key, component);
  }

  appRoot.mount(container ? container.querySelector("#app") : "#app");
  console.log("appRoot-------", appRoot);

  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("子应用render");
    let { listener ,changeNavTopHight} = props;
    if (listener) {
      listener((mainAppState: any) => {
        console.log("子应用监听到主应用状态变化", mainAppState);
           
            rootStore.state.value.setting = {
                navTopHight: mainAppState.setting.navTopHight,
                isSubApp:true
            }
           
      });
    }
    if(changeNavTopHight){
      
       watch(()=>rootStore.state.value.setting.navTopHight, (newValue, oldValue) => {
        console.log('子应用监听到主应用状态变化')
        changeNavTopHight(newValue)
      })
      }
  } else {
    console.log("独立运行");
  }
}

renderWithQiankun({
  mount(props) {
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount() {
    appRoot.unmount();
  },
  update: function (props: QiankunProps): void | Promise<void> {
    throw new Error("Function not implemented.");
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
