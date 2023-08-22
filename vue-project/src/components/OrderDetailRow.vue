<template>
  <li class="table-row">
    <div class="col col-3" data-label="Amount">{{ detail.Product.title }}</div>
    <div class="col col-3" data-label="Amount">{{ detail.quantity }}</div>
    <div class="col col-3">{{ detail.Product.price }}</div>
    <div class="col col-3">{{ totalPriceProduct }}</div>
  </li>
</template>

<script>
export default {
  props: ['detail'],
  computed: {
    totalPriceProduct() {
      return this.detail.Product.price * this.detail.quantity
    }
  }
}
</script>
