
import React, { useEffect } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  ConfigProvider,
  // theme
} from 'antd';

import ErrorPage from "../error-page.js";
import App from '../App.tsx'
import Home from '@/pages/home/index.js'
import About from '@/pages/about/index.js'
import ProductPriceManage from '@/pages/product/priceManagement/index.tsx'
import ProductImageManage from '@/pages/product/imageManagement/index.tsx'
import OrderList from '@/pages/order/list/index.tsx'
import StudentList from '@/pages/student/list/index.tsx'
import Login from '@/pages/login/index.tsx'
import UserCenter from '@/pages/userCenter/index.tsx'
import UserManage from '@/pages/sysManage/userManage/index.tsx'
import RoleManage from '@/pages/sysManage/roleManage/index.tsx'
import PermissionManage from '@/pages/sysManage/permissionManage/index.tsx'
import { ProtectedRoute } from '@/components/Permission'



export const router = createBrowserRouter([

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
        path: "/usercenter",
        element: <UserCenter />,
      },
      {
        path: "/login",
        element: <Login />,
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
        path: "/studentList",
        element: <ProtectedRoute permission="student:list"><StudentList /></ProtectedRoute>,
      },
      {
        path: "/userManage",
        // element: <UserManage />,
        element: <ProtectedRoute permission="user:list"><UserManage /></ProtectedRoute>,
      },
      {
        path: "/roleManage",
        // element: <RoleManage />,
        element: <ProtectedRoute permission="role:list"><RoleManage /></ProtectedRoute>,
      },
      {
        path: "/permissionManage",
        // element: <PermissionManage />,
        element: <ProtectedRoute permission="permission:list"><PermissionManage /></ProtectedRoute>,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

], {
  basename: '/app-react'
});


export default function MyRoute() {
  useEffect(() => {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      window.location.href = '/app-react'
    }


  }, [])
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