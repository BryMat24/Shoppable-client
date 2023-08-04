import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initAlanBtn } from './utils/AlanService'

const app = createApp(App)
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

initAlanBtn();
app.use(pinia)
app.use(router)
app.mount('#app')
