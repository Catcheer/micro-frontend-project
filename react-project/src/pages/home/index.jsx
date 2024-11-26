import { useState } from 'react'
import reactLogo from '@/assets/app-react/react.svg'
import viteLogo from '/vite.svg'
// import '../../App.css'
import { useNavigate } from "react-router-dom";
function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => {
                navigate('/about')
            }}>about</button>
    </>
  )
}

export default Home
