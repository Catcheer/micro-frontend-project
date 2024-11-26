import React from 'react'
import {
    createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
  import { ConfigProvider,
    // theme
   } from 'antd';

import MainLayout from '../components/MainLayout'
import ErrorPage from '../components/ErrorPage'
import Home from '../pages/Home/index.jsx'
import MenusManagement from '../pages/MenusManagement/index'
import Department from '../pages/OrganizationalStructure/Department.jsx'
import Employee from '../pages/OrganizationalStructure/Employee.jsx'

  const router= createBrowserRouter([
  
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
            path: "/menusManagement",
            element: <MenusManagement />,
          },
          {
            path: "/department",
            element: <Department />,
          },
          {
            path: "/employee",
            element: <Employee />,
          },
      ],
    },
   
  ],{
    basename: '/app-master'
  });


  function MainRouter () {
    return (
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
    )
}


export default MainRouter