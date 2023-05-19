import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

const app = createApp(App)

// Configure global dependencies
app.config.globalProperties.$axios = axios

app.use(router)

app.mount('#app')