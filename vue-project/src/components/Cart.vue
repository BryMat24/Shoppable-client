<template>
  <div class="shopping-cart-sidebar" shopping-cart-sidebar :class="{ active: cartIsActive }">
    <div class="cart-header">
      <div>Your Cart</div>
      <span class="close-btn" shopping-cart-button @click="handleToggleCart">&times;</span>
    </div>

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
  <div class="backdrop" v-if="backdropIsActive" @click="handleToggleCart"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

export default {
  components: {
    CartItem
  },
  computed: {
    ...mapState(useCartStore, [
      'productsInCart',
      'cartTotalPrice',
      'cartIsActive',
      'backdropIsActive'
    ])
  },
  methods: {
    ...mapActions(useCartStore, ['getProductInCart', 'toggleShoppingCart']),
    handleToggleCart() {
      this.toggleShoppingCart()
    },
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    }
  }
}
</script>
