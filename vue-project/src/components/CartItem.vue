<template>
  <div class="cart-item">
    <div class="remove-item" @click="handleDeleteCartItem">
      <span>&times;</span>
    </div>
    <div class="item-img">
      <img :src="cartProduct.Product.imageUrl" alt="photo" />
    </div>
    <div class="item-detail">
      <p>{{ cartProduct.Product.title }}</p>
      <p>{{ formatToRupiah(cartProduct.Product.price) }}</p>
      <div class="qty">
        <span @click="handleUpdateQuantity('decrement')">-</span>
        <p>{{ cartProduct.quantity }}</p>
        <span @click="handleUpdateQuantity('increment')">+</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCartStore } from '../stores/cart'
export default {
  props: ['cartProduct'],
  methods: {
    ...mapActions(useCartStore, ['deleteCartItem', 'updateCartItemQuantity']),
    handleDeleteCartItem() {
      this.deleteCartItem(this.cartProduct.Product.id)
    },
    handleUpdateQuantity(updateStatus) {
      this.updateCartItemQuantity({ updateStatus, id: this.cartProduct.Product.id })
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
