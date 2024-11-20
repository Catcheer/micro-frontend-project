
import {
    createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";

  import App from './App.jsx'
  import Home from './pages/Home.jsx'

  const router= createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ],{
    basename: '/app-react'
  });


  export default function MyRoute(){
    return <RouterProvider router={router} />
  }