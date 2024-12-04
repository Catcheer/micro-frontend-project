import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

import MenuManagement from '@/views/Sys/MenuManagement/index.vue'
import DicManagement from '@/views/Sys/DicManagement/index.vue'
import LogManagement from '@/views/Sys/LogManagement/index.vue'

import Layout from '@/components/Layout.vue'

console.log(import.meta.env.BASE_URL)
const router = createRouter({
  history: createWebHistory("/app-vue"),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/sys',
          name: 'sys',
          redirect: '/sys/MenuManagement',
          children:[
            {
              path: '/sys/MenuManagement',
              name: 'MenuManagement',
              component: MenuManagement
            },
            {
              path: '/sys/DicManagement',
              name: 'DicManagement',
              component: DicManagement
            },
            {
              path: '/sys/LogManagement',
              name: 'LogManagement',
              component: LogManagement
            },
          ]
        },
        {
          path: '/about',
          name: 'AboutView',
          component: AboutView
        },
      ]
    },
   
  ],
})

export default router
