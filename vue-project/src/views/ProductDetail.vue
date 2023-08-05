<template>
  <Navbar />
  <section id="product-detail">
    <div class="product-overview-section">
      <img :src="productDetail.imageUrl" alt="photo" id="product-photo" />
      <div class="product-info-container">
        <h1 class="product-name">{{ productDetail.title }}</h1>
        <p class="product-description">
          {{ productDetail.description }}
        </p>
        <div class="product-rating">
          <div class="star-wrap">
            <img
              v-for="star in roundedRating"
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
              alt="product-star"
              class="product-star"
            />
          </div>
        </div>
        <h3 class="product-price">{{ formatToRupiah(productDetail.price) }}</h3>

        <div id="add-to-chart-form">
          <div class="custom-select">
            <h3>Quantity</h3>
            <input type="number" class="custom-input" min="1" v-model="quantity" />
            <span class="custom-arrow"></span>
          </div>
          <button class="add-to-chart-button" @click.prevent="handleAddToCart">ADD TO CART</button>
        </div>
      </div>
    </div>
    <div id="similar-product-section">
      <h1>Similar Products</h1>
      <div class="card-container">
        <Card v-for="product in similarProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'
import Card from '../components/ProductCard.vue'

export default {
  data() {
    return {
      quantity: 1
    }
  },
  components: {
    Navbar,
    Card
  },
  methods: {
    ...mapActions(useProductStore, ['getProductDetail', 'getSimilarProducts']),
    ...mapActions(useCartStore, ['addProductToCart']),
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    handleAddToCart() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'login' })
      } else {
        this.addProductToCart({ id: this.productDetail.id, quantity: this.quantity })
      }
    }
  },
  computed: {
    ...mapState(useProductStore, ['productDetail', 'similarProducts']),
    ...mapState(useUserStore, ['isLoggedIn']),
    roundedRating() {
      return Math.round(this.productDetail.rating) || 0
    }
  },
  watch: {
    // Watch for changes to the route's id parameter
    '$route.params.id': {
      immediate: true, // Run the handler immediately on component creation
      handler(newId) {
        // Fetch data based on the new route's id parameter
        this.getProductDetail(newId)
        this.getSimilarProducts(newId)
      }
    }
  }
}
</script>
