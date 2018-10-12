<template lang="html">
  <div class="container">
    <ProductDetails :product="product"></ProductDetails>

  </div>
</template>

<script>
import ProductDetails from '@/components/products/ProductDetails.vue'
import axios from 'axios'

export default {
  components: {
    ProductDetails
  },
  asyncData ({ error, route }) {
    return axios.get('http://localhost:3001/product?' + 'id=' + route.params.id)
    .then((res) => {
      return { product: res.data }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'product not found: ' + e })
    })
  }
}
</script>

<style lang="css">
</style>
