import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// const pinia = createPinia()

app.use(router)
// app.use(pinia)

app.mount('#app')
