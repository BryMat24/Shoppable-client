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
      <span class="material-symbols-outlined" v-if="isLoggedIn"> history </span>
      <!-- <span class="material-symbols-outlined">favorite</span> -->
      <span class="material-symbols-outlined" @click="logout" v-if="isLoggedIn"> logout </span>
      <div class="shopping-cart-button" v-if="isLoggedIn">
        <span class="material-symbols-outlined" shopping-cart-button @click="openCart">
          shopping_cart
        </span>
        <div class="rounded-circle">{{ totalItemInCart }}</div>
      </div>
    </div>
  </div>
  <Cart />
</template>

<script>
import { mapActions, mapWritableState, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import Cart from '../components/Cart.vue'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/product'

export default {
  components: {
    Cart
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLoggedIn']),
    ...mapState(useCartStore, ['totalItemInCart']),
    ...mapWritableState(useProductStore, ['searchInput', 'selectedCategoryName', 'categoryId'])
  },
  methods: {
    ...mapActions(useProductStore, ['getFilteredProducts']),
    ...mapActions(useCartStore, ['openShoppingCart']),
    logout() {
      this.$router.push({ name: 'home' })
      this.isLoggedIn = false
      localStorage.clear()
    },
    performSearch(e) {
      this.searchInput = e.target.value
      const currentRouteName = this.$route.name
      this.selectedCategoryName = ''
      this.categoryId = ''

      if (currentRouteName === 'product') {
        this.getFilteredProducts()
      } else {
        this.$router.push({ name: 'product' })
      }
    },
    navigate(page) {
      this.$router.push({ name: page })
    },
    openCart() {
      this.openShoppingCart()
    }
  }
}
</script>
