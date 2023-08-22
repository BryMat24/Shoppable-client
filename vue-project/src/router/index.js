import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import ProductPage from '../views/Product.vue'
import OrderPage from '../views/Order.vue'
import OrderDetailPage from '../views/OrderDetail.vue'
import ProductDetailPage from '../views/ProductDetail.vue'
import CheckoutPage from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetailPage
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
    },
    {
      path: '/orders/:id',
      name: 'orderDetail',
      component: OrderDetailPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.getItem('access_token')) next({ name: 'home' })
  else if (to.name === 'order' && !localStorage.getItem('access_token')) next({ name: 'home' })
  else next()
})

export default router
