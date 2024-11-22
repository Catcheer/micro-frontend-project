
import {
    createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
  import ErrorPage from "../error-page.jsx";
  import App from '../App.tsx'
  import Home from '@/pages/home/index.jsx'
  import About from '@/pages/about/index.jsx'
  import ProductPriceManage from '@/pages/product/priceManagement/index.tsx'

  const router= createBrowserRouter([
  
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/productPriceManage",
          element: <ProductPriceManage />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
   
  ],{
    basename: '/app-react'
  });


  export default function MyRoute(){
    return (<> 
    
    <RouterProvider router={router} /> 
</>)
  }