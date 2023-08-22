<template>
  <div class="checkout">
    <Map />
    <div class="checkout-order-container">
      <div class="checkout-order-box">
        <h2>Your Order</h2>
        <table class="checkout-order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productsInCart" :key="product.id">
              <td>
                {{ product.Product.title }}
                <span class="product-quantity">x {{ product.quantity }}</span>
              </td>
              <td>{{ formatToRupiah(product.quantity * product.Product.price) }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="handleCheckout">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Map from '../components/Map.vue'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'
export default {
  components: {
    Map
  },
  computed: {
    ...mapState(useCartStore, ['productsInCart'])
  },
  methods: {
    ...mapActions(useCartStore, ['getProductInCart']),
    ...mapActions(useOrderStore, ['checkout']),
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    handleCheckout() {
      this.checkout()
    }
  },
  mounted() {
    this.getProductInCart()
  }
}
</script>
