<template>
  <div class="table-container">
    <h2>Order History</h2>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Order Id</div>
        <div class="col col-3">Date</div>
      </li>
      <Row v-for="order in orderHistory" :key="order.id" :order="order" />
    </ul>
    <router-link :to="{ name: 'home' }" class="router-link">
      <div>Home</div>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Row from '../components/OrderHistoryRow.vue'
import { useOrderStore } from '../stores/order'

export default {
  components: {
    Row
  },
  computed: {
    ...mapState(useOrderStore, ['orderHistory'])
  },
  methods: {
    ...mapActions(useOrderStore, ['getOrderHistory'])
  },
  created() {
    this.getOrderHistory()
  }
}
</script>
