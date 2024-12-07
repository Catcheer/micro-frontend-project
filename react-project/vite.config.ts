import { build, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";
import { fileURLToPath, URL } from "node:url";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  let config = {
   base: "http://localhost:9003/",
   build: {
    outDir: 'subProgramReact',
    },
    server: {
      port: 9003,
    },
    output: {
      library: `${env.VITE_APP_NAME}}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${env.VITE_APP_NAME}`,
    },
    plugins: [
      react(),

      qiankun("react-project", {
        useDevMode: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };

  return config;
});
