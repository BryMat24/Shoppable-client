import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import alanBtn from '@alan-ai/alan-sdk-web';
import { openShoppingCart } from './utils/AlanService'

const app = createApp(App)

alanBtn({
    key: import.meta.env.VITE_ALAN_KEY,
    onCommand: (commandData) => {
        if (commandData.command === 'openCart') {
            console.log("test");
            openShoppingCart();
        }
    }
});

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.mount('#app')
