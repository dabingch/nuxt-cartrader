// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import app from './app.vue'

const pinia = createPinia()
const nuxtApp = createApp(app)

nuxtApp.use(pinia)
nuxtApp.mount('#app')
