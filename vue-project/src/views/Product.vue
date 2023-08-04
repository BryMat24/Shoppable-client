<template>
  <Navbar />
  <section id="product-section">
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
    </div>

    <div class="sort-filter-container">
      <div v-if="selectedCategoryName" class="filter-indicator">
        <p>{{ selectedCategoryName }}</p>
        <span class="material-symbols-outlined closeFilter" @click="closeFilter"> close </span>
      </div>
      <select name="categories" id="" @change="filterByCategory">
        <option value="">All</option>
        <option :value="category.id" v-for="category in categories">{{ category.name }}</option>
      </select>
    </div>

    <div class="product-content">
      <h1>Our Products</h1>
      <div class="card-container">
        <Card v-for="product in products" :key="product.id" :product="product" target-scroll />
      </div>
    </div>
  </section>
  <div class="changePageAction">
    <button @click="changePage('Prev')" v-if="page !== 1">Previous</button>
    <p>{{ page }}</p>
    <div class="next-button">
      <button @click="changePage('Next')" v-if="products.length === 12">Next</button>
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import Footer from '../components/Footer.vue'
import { useProductStore } from '../stores/product'
import Card from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'

export default {
  computed: {
    ...mapWritableState(useProductStore, ['page', 'categoryId', 'selectedCategoryName']),
    ...mapState(useProductStore, ['categories', 'products'])
  },
  components: {
    Footer,
    Card,
    Navbar
  },
  methods: {
    ...mapActions(useProductStore, ['getCategories', 'getFilteredProducts']),
    changePage(navigate) {
      if (navigate === 'Next') this.page++
      else this.page--

      this.getFilteredProducts()
    },
    filterByCategory(e) {
      this.categoryId = e.target.value
      this.page = 1

      this.selectedCategoryName = this.categories.find((el) => el.id == this.categoryId)
        ? this.categories.find((el) => el.id == this.categoryId).name
        : ''

      this.getFilteredProducts()
    },
    closeFilter() {
      this.selectedCategoryName = ''
      this.categoryId = ''
      this.page = 1
      this.getFilteredProducts()
    }
  },
  created() {
    this.getCategories()
    this.getFilteredProducts()
  }
}
</script>
