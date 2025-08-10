import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite"; // 新增 loadEnv
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { codeInspectorPlugin } from 'code-inspector-plugin';
import tailwindcss from "@tailwindcss/vite";


import path from "path";

const baseURL = "http://localhost:3000";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      codeInspectorPlugin({
        bundler: "vite",
        showSwitch: true,
        editor: "code",
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 80,
      host: "0.0.0.0",
      open: true, // 自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        "/dev-api": {
          target: baseURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
    build: {
      emptyOutDir: true,
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
