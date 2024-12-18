import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig((({mode})=>{
  const root = process.cwd()
  const env = loadEnv(mode, root)

  let config ={
    base: "http://47.96.121.113:9004/",
    build: {
      outDir: 'subProgramVue',
    },
    server: {
      port: 9004,
    },
    output:{
      library:`${env.VITE_APP_NAME}}-[name]`,
      libraryTarget:'umd',
      jsonpFunction:`webpackJsonp_${env.VITE_APP_NAME}`
    },
    plugins: [
      vue(),
      vueDevTools(),
      qiankun('vue-project',{
        useDevMode: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },

  }
  return config
}))
