<template>
  <div class="table-container">
    <h2>Order Detail</h2>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-3">Title</div>
        <div class="col col-3">Quantity</div>
        <div class="col col-3">Price Per Item</div>
        <div class="col col-3">Total Per Item</div>
      </li>
      <Row v-for="detail in currentOrderDetail" :key="detail.id" :detail="detail" />
    </ul>
    <div class="router-link-container">
      <router-link :to="{ name: 'home' }" class="router-link">
        <div>Home</div>
      </router-link>
      <router-link :to="{ name: 'order' }" class="router-link">
        <div>Order</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Row from '../components/OrderDetailRow.vue'
import { useOrderStore } from '../stores/order'

export default {
  components: {
    Row
  },
  computed: {
    ...mapState(useOrderStore, ['currentOrderDetail'])
  },
  methods: {
    ...mapActions(useOrderStore, ['getOrderDetail'])
  },
  created() {
    const id = this.$route.params.id
    this.getOrderDetail(id)
  }
}
</script>

<style>
.router-link-container {
  display: flex;
  gap: 10px;
}
</style>
