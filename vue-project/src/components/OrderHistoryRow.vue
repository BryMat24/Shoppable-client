<template>
  <li class="table-row" @click="seeDetail">
    <div class="col col-3">{{ order.id }}</div>
    <div class="col col-3">{{ formatDate(order.updatedAt) }}</div>
    <div class="col col-1">{{ formatToRupiah(order.totalPrice) }}</div>
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
    formatToRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    seeDetail() {
      this.$router.push({ name: 'orderDetail', params: { id: this.order.id } })
    }
  }
}
</script>
