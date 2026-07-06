
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
import StudentList from '@/pages/student/list/index.tsx'
import Login from '@/pages/login/index.tsx'
import UserCenter from '@/pages/userCenter/index.tsx'
import UserManage from '@/pages/sysManage/userManage/index.tsx'
import RoleManage from '@/pages/sysManage/roleManage/index.tsx'
import PermissionManage from '@/pages/sysManage/permissionManage/index.tsx'
import ClassManage from '@/pages/classManage/index.tsx'
import TeacherManage from '@/pages/teacherManage/index.tsx'
import OperationLog from '@/pages/operationLog/index.tsx'

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
        path: "/classList",
        element: <ProtectedRoute permission="class:list"><ClassManage /></ProtectedRoute>,
        // element: <ClassManage />,
      },
      {
        path: "/teacherList",
        element: <ProtectedRoute permission="teacher:list"><TeacherManage /></ProtectedRoute>,
        // element: <TeacherManage />,
      },
      {
        path: "/studentList",
        element: <ProtectedRoute permission="student:list"><StudentList /></ProtectedRoute>,
      },
      {
        path: "/userManage",
        element: <ProtectedRoute permission="user:list"><UserManage /></ProtectedRoute>,
      },
      {
        path: "/roleManage",
        element: <ProtectedRoute permission="role:list"><RoleManage /></ProtectedRoute>,
      },
      {
        path: "/permissionManage",
        // element: <ProtectedRoute permission="permission:list"><PermissionManage /></ProtectedRoute>,
        element: <PermissionManage />,
      },
      {
        path: "/operationLog",
        element: <OperationLog />,
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