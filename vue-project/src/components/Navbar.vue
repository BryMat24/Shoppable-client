<template>
  <div id="navbar">
    <div class="navbar-left">
      <label class="hamburger-menu">
        <input type="checkbox" />
      </label>
      <aside class="sidebar">
        <ul>
          <li>Products</li>
          <li>Shopping Cart</li>
          <li>Wish List</li>
          <li>Order History</li>
        </ul>
      </aside>
      <div class="brand-name" @click="navigate('home')">NAME</div>
    </div>
    <div class="searchbar">
      <span class="material-symbols-outlined"> search </span>
      <input type="text" placeholder="Search your product" @keyup.enter="performSearch" />
    </div>
    <div class="navbar-button">
      <span
        class="material-symbols-outlined login-button"
        @click="navigate('login')"
        v-if="!isLoggedIn"
      >
        person
      </span>
      <span class="material-symbols-outlined" @click="navigate('order')" v-if="isLoggedIn">
        history
      </span>
      <!-- <span class="material-symbols-outlined">favorite</span> -->
      <span class="material-symbols-outlined" @click="logout" v-if="isLoggedIn"> logout </span>
      <div class="shopping-cart-button" v-if="isLoggedIn">
        <span class="material-symbols-outlined" shopping-cart-button @click="openCart">
          shopping_cart
        </span>
        <div class="rounded-circle">3</div>
      </div>
    </div>
  </div>
  <Cart />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useUserStore } from '../stores/user'
import Cart from '../components/Cart.vue'
import { useCartStore } from '../stores/cart'

export default {
  components: {
    Cart
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLoggedIn']),
    ...mapWritableState(useCartStore, ['cartIsOpen'])
  },
  methods: {
    ...mapActions(useCartStore, ['toggleShoppingCart']),
    logout() {
      this.$router.push({ name: 'home' })
      this.isLoggedIn = false
      localStorage.clear()
    },
    navigate(page) {
      this.$router.push({ name: page })
    },
    openCart() {
      this.toggleShoppingCart()
    }
  }
}
</script>
