import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import content from './vite-plugin-content.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), content()],
})
