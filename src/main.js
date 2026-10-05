import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import './style.css'

import { MotionPlugin } from '@vueuse/motion'

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .mount('#app')
