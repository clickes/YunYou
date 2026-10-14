import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages 把项目页部署在子路径（https://<user>.github.io/<repo>/），
// 由 CI 注入 VITE_BASE 指定该前缀；本地 dev / build 不设此变量，回落到 '/'，
// 行为与改动前完全一致。
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
})
