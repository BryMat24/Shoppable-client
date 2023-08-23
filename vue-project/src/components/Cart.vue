<template>
  <div class="shopping-cart-sidebar" shopping-cart-sidebar :class="{ active: cartIsActive }">
    <div class="cart-header">
      <div>Your Cart</div>
      <span class="close-btn" shopping-cart-button @click="handleCloseCart">&times;</span>
    </div>

    <p v-if="cartEmptyError" class="errorMessage">Cart is still empty</p>

    <div class="cart-items">
      <CartItem
        v-for="cartProduct in productsInCart"
        :key="cartProduct.id"
        :cartProduct="cartProduct"
      />
    </div>

    <div class="cart-actions">
      <div class="subtotal">
        <p>SUBTOTAL:</p>
        <p>
          <span class="subtotal-price">{{ formatToRupiah(cartTotalPrice) }}</span>
        </p>
      </div>
      <button @click="handleCheckout">Checkout</button>
    </div>
  </div>
  <div class="backdrop" v-if="backdropIsActive" @click="handleCloseCart"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'
import { useUserStore } from '../stores/user'
import { useOrderStore } from '../stores/order'

export default {
  data() {
    return {
      cartEmptyError: false
    }
  },
  components: {
    CartItem
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    ...mapState(useCartStore, [
      'productsInCart',
      'cartTotalPrice',
      'cartIsActive',
      'backdropIsActive'
    ])
  },
  methods: {
    ...mapActions(useCartStore, ['getProductInCart', 'closeShoppingCart']),
    ...mapActions(useOrderStore, ['checkout']),
    handleCloseCart() {
      this.cartEmptyError = false
      this.closeShoppingCart()
    },
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    handleCheckout() {
      if (this.productsInCart.length) {
        this.$router.push({ name: 'checkout' })
        this.handleCloseCart()
        this.cartEmptyError = false
      } else {
        this.cartEmptyError = true
      }
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.getProductInCart()
    }
  }
}
</script>
