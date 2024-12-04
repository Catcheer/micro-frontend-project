
import React,{useEffect} from 'react';

import {
    createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
  import { ConfigProvider,
    // theme
   } from 'antd';

  import ErrorPage from "../error-page.jsx";
  import App from '../App.tsx'
  import Home from '@/pages/home/index.jsx'
  import About from '@/pages/about/index.jsx'
  import ProductPriceManage from '@/pages/product/priceManagement/index.tsx'
  import ProductImageManage from '@/pages/product/imageManagement/index.tsx'
  import OrderList from '@/pages/order/list/index.tsx'

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
          path: "/procuctImageManage",
          element: <ProductImageManage />,
        },
        {
          path: "/orderList",
          element: <OrderList />,
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
    useEffect(()=>{
      // console.log(window.location.pathname)
      if(window.location.pathname==='/'){
        window.location.href='/app-react'
      }
      
      
    },[])
    return (<> 
     <ConfigProvider
      theme={{
        // algorithm: theme.compactAlgorithm,
        token: {
          // colorPrimary: '#00b96b',
          borderRadius: 1,
          // colorBgContainer: '#fafafa'
        },
        
      }}
     >
    <RouterProvider router={router} /> 
    </ConfigProvider>
</>)
  }