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
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png"
            alt=""
            class="category-image"
          />
        </div>
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png"
            alt=""
            class="category-image"
          />
        </div>
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
            alt=""
            class="category-image"
          />
        </div>
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png"
            alt=""
            class="category-image"
          />
        </div>
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png"
            alt=""
            class="category-image"
          />
        </div>
        <div class="shop-category-single-item" target-scroll>
          <img
            src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png"
            alt=""
            class="category-image"
          />
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
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import Card from '../components/ProductCard.vue'

export default {
  components: {
    Footer,
    Navbar,
    Card
  },
  methods: {
    ...mapActions(useProductStore, ['getNewestArrival', 'getTopRated'])
  },
  computed: {
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
    this.getNewestArrival()
    this.getTopRated()
  }
}
</script>
