<template>
  <li class="table-row" @click="seeDetail">
    <div class="col col-1" data-label="Job Id">{{ order.id }}</div>
    <div class="col col-3" data-label="Amount">{{ formatDate(order.updatedAt) }}</div>
  </li>
</template>

<script>
export default {
  props: ['order'],
  methods: {
    formatDate(isoDateString) {
      const date = new Date(isoDateString)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    seeDetail() {
      this.$router.push({ name: 'orderDetail', params: { id: this.order.id } })
    }
  }
}
</script>
