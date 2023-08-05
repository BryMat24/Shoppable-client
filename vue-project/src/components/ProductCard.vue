<template>
  <div class="card" target-scroll>
    <div class="card-image-box">
      <img :src="product.imageUrl" alt="photo" />
    </div>
    <div class="product-card-info">
      <div class="product-title-wrapper">
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-price">{{ formatToRupiah(product.price) }}</p>
      </div>
      <div class="product-rating">
        <div class="star-wrap">
          <img
            v-for="star in roundedRating"
            :key="star"
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
            alt="product-star"
            class="product-star"
          />
        </div>
        <div class="total-rating">{{ product.rating }}</div>
      </div>
      <button class="add-to-cart-button" @click="handleAddToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

export default {
  props: ['product'],
  methods: {
    ...mapActions(useCartStore, ['addProductToCart']),
    handleAddToCart() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'login' })
      } else {
        this.addProductToCart({ id: this.product.id })
      }
    },
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    roundedRating() {
      return Math.round(this.product.rating)
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    })

    const hiddenElement = document.querySelectorAll('[target-scroll]')
    hiddenElement.forEach((el) => observer.observe(el))
  }
}
</script>
