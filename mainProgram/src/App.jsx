import "./App.css";
import HeaderNav from './components/HeaderNav'

import MainRouter from "./routes/index";

function App() {
  return (
    <div>
      <div className="header_nav">
      <HeaderNav />
      </div>
      <div className="content__wrapper">
        <div>
          {/* 主应用路由 */}
          <MainRouter />
        </div>
        {/* 子应用挂载点 */}
        <div id="container"></div>
      </div>
    </div>
  );
}

export default App;
