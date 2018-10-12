<template>
  <div class="bg-dark text-white h-100">
    <div class="container-fluid">
      <br>
      <br>
      <ProductFilter/>
      <br>
      <br>

      <div v-if="!$store.state.productFilterLoading" class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 col" v-for="product in $store.state.products">
          <Product :productData="product"  />
        </div>
      </div>
      <div v-else>
        <h2>Loading ...</h2>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Product from '@/components/products/Product.vue'
import ProductFilter from '@/components/products/ProductFilter.vue'

export default {
  components: {
    Product,
    ProductFilter
  }
}
</script>

<style scoped>
  .col {
    margin-bottom: 20px;
  }
</style>
