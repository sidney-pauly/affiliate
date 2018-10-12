<template lang="html">

<div class="card text-center mb-3 text-dark w-100 h-100" @click="redirect">
  <div class="card-header h-100">
    <b-img-lazy center :src="productData.Listings[0].Images[0]" fluid-grow />
  </div>
  <div class="card-body align-bottom">
    <h5 class="card-title">{{productData.Title}}</h5>
    <p class="card-text">Preis: {{getPriceRange()}}</p>
    <b-button :to="'/products/product-details/' + productData._id">Details</b-button>
  </div>
</div>
</template>

<script>
export default {
  props: ['productData'],
  methods: {
    getPriceRange: function(){
    var min = this.productData.Listings.reduce(
      (acc, loc) =>
        acc.Price < loc.Price
          ? acc
          : loc
    )
    var max = this.productData.Listings.reduce(
      (acc, loc) =>
        acc.Price > loc.Price
          ? acc
          : loc
    );
    return min.DisplayPrice + '-' + max.DisplayPrice;
  },
  redirect: function(){
    this.$router.push(
        {
          path: '/products/product-details/' + this.productData._id
        });
  }
  }
}
</script>

<style lang="css" scoped>

</style>
