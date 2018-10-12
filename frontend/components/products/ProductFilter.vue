<template lang="html">
  <div class="">
    <b-form-input v-model="filter.query"
                  type="text"
                  placeholder="Product Name"/>

    <button type="button" name="button" v-on:click="$store.dispatch('getProducts', filter)">Filter Produts</button>
  </div>
</template>

<script>
export default {
  computed: {
    filter () {
      return this.$store.state.productFilter;
    }
  }
}
</script>

<style lang="css">
</style>
