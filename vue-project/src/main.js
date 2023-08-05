import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { getAlanInstance } from './utils/AlanService'

const app = createApp(App)

if (localStorage.getItem('access_token')) {
    getAlanInstance()
}

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.mount('#app')
