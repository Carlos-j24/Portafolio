import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import blog from './vite-plugin-blog.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), blog()],
})
