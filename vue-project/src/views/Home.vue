<template>
  <Navbar />
  <section id="home-section">
    <div class="carousel-container">
      <div class="carousel">
        <div class="slider-wrapper">
          <img
            src="https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <img
            src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <img
            src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <img
            src="https://images.pexels.com/photos/3965539/pexels-photo-3965539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <img
            src="https://images.pexels.com/photos/6311687/pexels-photo-6311687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
        <router-link :to="{ name: 'product' }">
          <button class="discover-more">Discover More</button>
        </router-link>
      </div>
    </div>

    <div class="home-category-wrap">
      <h1 target-scroll>Shop Our Top Categories</h1>
      <div class="shop-category-wrap">
        <div
          class="shop-category-single-item"
          target-scroll
          @click="filterByCategory(category.id)"
          v-for="category in categories"
        >
          <img :src="category.imageUrl" alt="" class="category-image" />
          <div class="shop-category-description">{{ category.name }}</div>
        </div>
      </div>
    </div>

    <div id="best-seller">
      <h1 target-scroll>Top Rated</h1>
      <div class="card-container">
        <Card v-for="product in topRated" :key="product.id" :product="product" />
      </div>
    </div>
    <div id="new-arrival">
      <h1 target-scroll>New Arrival</h1>
      <div class="card-container">
        <Card v-for="product in newestArrival" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
  <Footer />
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useProductStore } from '../stores/product'
import Card from '../components/ProductCard.vue'

export default {
  components: {
    Footer,
    Navbar,
    Card
  },
  methods: {
    ...mapActions(useProductStore, ['getNewestArrival', 'getTopRated', 'getCategories']),
    filterByCategory(categoryId) {
      this.page = 1
      this.categoryId = categoryId

      this.selectedCategoryName = this.categories.find((el) => el.id == this.categoryId)
        ? this.categories.find((el) => el.id == this.categoryId).name
        : ''

      this.$router.push({ name: 'product' })
    }
  },
  computed: {
    ...mapWritableState(useProductStore, ['selectedCategoryName', 'categoryId', 'page']),
    ...mapState(useProductStore, ['categories']),
    ...mapState(useProductStore, ['newestArrival', 'topRated'])
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
  },
  created() {
    this.getCategories()
    this.getNewestArrival()
    this.getTopRated()
  }
}
</script>
