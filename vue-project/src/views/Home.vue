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
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e48b497e63cc46b800_base%20camp%20duffel%2002-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Pink Bag</h3>
              <p class="product-price">$300</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55cc9361a8ecce6d4_flower%20leptop%20sleeve-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Pink Bag</h3>
              <p class="product-price">$300</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e7e006821d3b04db74_Tote%20Medium-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Pink Bag</h3>
              <p class="product-price">$300</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="new-arrival">
      <h1 target-scroll>New Arrival</h1>
      <div class="card-container">
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e7e006821d3b04db74_Tote%20Medium-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Pink Bag</h3>
              <p class="product-price">$300</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e54b76914b262f2448_headphone-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Green headset</h3>
              <p class="product-price">$200</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
        <div class="card" target-scroll>
          <div class="card-image-box">
            <img
              src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e74b769109fd2f245a_tomford%20watch-min.png"
              alt="photo"
            />
            <div class="add-wishlist-button">
              <img
                src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="product-title-wrapper">
              <h3 class="product-title">Red Watch</h3>
              <p class="product-price">$100</p>
            </div>
            <div class="product-rating">
              <div class="star-wrap">
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
                <img
                  src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9d9ee08987e0ffb064bca_Star.svg"
                  alt="product-star"
                  class="product-star"
                />
              </div>
              <div class="total-rating">(121)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Footer,
    Navbar
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
