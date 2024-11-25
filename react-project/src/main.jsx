import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyRoute from "./routes/router";

import { Provider } from "react-redux";
import store from "@/store/index.js";

// import App from './App.tsx'

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

function render(props = {}) {
  console.log("props----------------", props);
  const container = props.container;
  createRoot(
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
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
  render({});
}
